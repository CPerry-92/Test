(() => {
  const state = {
    selectedSeconds: 60,
    remainingSeconds: 60,
    score: 0,
    countdown: 5,

    deckMode: "people", // "people" | "tvfilm" | "mixed"
    usedIndexesByPool: {
      people: new Set(),
      tvfilm: new Set(),
      mixed: new Set()
    },

    turnTimerId: null,
    countdownTimerId: null
  };

  const el = {
    screenHome: document.getElementById("screenHome"),
    screenSettings: document.getElementById("screenSettings"),
    screenCountdown: document.getElementById("screenCountdown"),
    screenGame: document.getElementById("screenGame"),

    btnPlay: document.getElementById("btnPlay"),
    btnStart: document.getElementById("btnStart"),
    btnBackHome1: document.getElementById("btnBackHome1"),
    btnBackHome2: document.getElementById("btnBackHome2"),

    deckButtons: Array.from(document.querySelectorAll(".deck-btn")),
    timeButtons: Array.from(document.querySelectorAll(".time-btn")),

    countdownNumber: document.getElementById("countdownNumber"),

    timeRemaining: document.getElementById("timeRemaining"),
    score: document.getElementById("score"),
    deckLabel: document.getElementById("deckLabel"),

    itemsList: document.getElementById("itemsList"),
    btnGuessed: document.getElementById("btnGuessed"),
    btnSkip: document.getElementById("btnSkip"),
    btnNewItems: document.getElementById("btnNewItems"),
    btnEndEarly: document.getElementById("btnEndEarly"),

    modalOverlay: document.getElementById("modalOverlay"),
    finalScore: document.getElementById("finalScore"),
    btnNextTurn: document.getElementById("btnNextTurn"),
    btnEndGame: document.getElementById("btnEndGame"),

    gameError: document.getElementById("gameError")
  };

  function showScreen(screenEl) {
    [el.screenHome, el.screenSettings, el.screenCountdown, el.screenGame]
      .forEach(s => s.classList.remove("screen-active"));
    screenEl.classList.add("screen-active");
  }

  function clampInt(n, min, max) {
    const x = Number.parseInt(n, 10);
    if (Number.isNaN(x)) return min;
    return Math.min(max, Math.max(min, x));
  }

  function showGameError(message) {
    if (!el.gameError) return;
    el.gameError.hidden = false;
    el.gameError.textContent = message;
  }

  function clearGameError() {
    if (!el.gameError) return;
    el.gameError.hidden = true;
    el.gameError.textContent = "";
  }

  function closeModal() {
    el.modalOverlay.classList.remove("open");
    el.modalOverlay.setAttribute("aria-hidden", "true");
  }

  function openModal() {
    el.finalScore.textContent = String(state.score);
    el.modalOverlay.classList.add("open");
    el.modalOverlay.setAttribute("aria-hidden", "false");
  }

  function clearTimers() {
    if (state.turnTimerId) window.clearInterval(state.turnTimerId);
    if (state.countdownTimerId) window.clearInterval(state.countdownTimerId);
    state.turnTimerId = null;
    state.countdownTimerId = null;
  }

  function deckLabel(mode) {
    if (mode === "tvfilm") return "TV & Film";
    if (mode === "mixed") return "Mixed";
    return "People";
  }

  function getDecksSafe() {
    const decks = window.TAKE_A_GUESS_DECKS;
    if (!decks || typeof decks !== "object") return null;
    if (!Array.isArray(decks.people)) return null;
    if (!Array.isArray(decks.tvfilm)) return null;
    return decks;
  }

  function getPool(mode) {
    const decks = getDecksSafe();
    const people = decks ? decks.people : [];
    const tvfilm = decks ? decks.tvfilm : [];

    if (mode === "tvfilm") return { key: "tvfilm", items: tvfilm };
    if (mode === "mixed") return { key: "mixed", items: people.concat(tvfilm) };
    return { key: "people", items: people };
  }

  function pickFiveItems() {
    const decks = getDecksSafe();
    if (!decks) {
      return [
        "Decks not loaded",
        "Check decks.js exists",
        "Confirm script order",
        "Hard refresh / clear cache",
        "Then try again"
      ];
    }

    const pool = getPool(state.deckMode);
    const items = pool.items;

    if (!Array.isArray(items) || items.length < 20) {
      return [
        "Deck too small",
        "Please add more items",
        "Check TAKE_A_GUESS_DECKS",
        "people / tvfilm arrays",
        "Then refresh"
      ];
    }

    const used = state.usedIndexesByPool[pool.key] || new Set();
    state.usedIndexesByPool[pool.key] = used;

    if (used.size > items.length - 10) used.clear();

    const picked = [];
    let safety = 0;

    while (picked.length < 5 && safety < 20000) {
      safety++;
      const idx = Math.floor(Math.random() * items.length);
      if (used.has(idx)) continue;
      used.add(idx);
      picked.push(items[idx]);
    }

    while (picked.length < 5) {
      picked.push(items[Math.floor(Math.random() * items.length)]);
    }

    return picked;
  }

  function renderItems() {
    if (!el.itemsList) return;
    const items = pickFiveItems();
    el.itemsList.innerHTML = "";
    items.forEach(text => {
      const li = document.createElement("li");
      li.textContent = text;
      el.itemsList.appendChild(li);
    });
  }

  function updateHud() {
    if (el.timeRemaining) el.timeRemaining.textContent = String(state.remainingSeconds);
    if (el.score) el.score.textContent = String(state.score);
    if (el.deckLabel) el.deckLabel.textContent = deckLabel(state.deckMode);
  }

  function beginTurn() {
    clearGameError();

    // Hard safety checks: ensures we never render “blank”
    const decks = getDecksSafe();
    if (!decks) {
      showScreen(el.screenGame);
      renderItems(); // renders the diagnostic list
      showGameError("Decks not loaded. Ensure decks.js is present and loaded before app.js.");
      return;
    }
    if (!el.itemsList) {
      showScreen(el.screenGame);
      showGameError("UI mismatch. Ensure your HTML has: <ul id='itemsList'> and button id='btnNewItems'.");
      return;
    }

    state.remainingSeconds = state.selectedSeconds;
    state.score = 0;

    updateHud();
    renderItems();
    showScreen(el.screenGame);

    clearTimers();
    state.turnTimerId = window.setInterval(() => {
      state.remainingSeconds = clampInt(state.remainingSeconds - 1, 0, 9999);
      updateHud();
      if (state.remainingSeconds <= 0) endTurn();
    }, 1000);
  }

  function startCountdownThenGame() {
    clearTimers();
    clearGameError();

    state.countdown = 5;
    el.countdownNumber.textContent = String(state.countdown);
    showScreen(el.screenCountdown);

    state.countdownTimerId = window.setInterval(() => {
      state.countdown -= 1;
      el.countdownNumber.textContent = String(state.countdown);

      if (state.countdown <= 0) {
        window.clearInterval(state.countdownTimerId);
        state.countdownTimerId = null;
        beginTurn();
      }
    }, 1000);
  }

  function endTurn() {
    clearTimers();
    openModal();
  }

  function goHome() {
    closeModal();
    clearTimers();
    showScreen(el.screenHome);
  }

  function goSettings() {
    closeModal();
    clearTimers();
    showScreen(el.screenSettings);
  }

  // Navigation
  el.btnPlay.addEventListener("click", goSettings);
  el.btnBackHome1.addEventListener("click", goHome);
  el.btnBackHome2.addEventListener("click", goSettings);

  // Deck selection
  el.deckButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      el.deckButtons.forEach(b => b.classList.remove("deck-btn-active"));
      btn.classList.add("deck-btn-active");

      const deck = String(btn.dataset.deck || "people");
      state.deckMode = (deck === "tvfilm" || deck === "mixed") ? deck : "people";
    });
  });

  // Time selection
  el.timeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      el.timeButtons.forEach(b => b.classList.remove("time-btn-active"));
      btn.classList.add("time-btn-active");
      state.selectedSeconds = clampInt(btn.dataset.seconds, 10, 600);
    });
  });

  // Start
  el.btnStart.addEventListener("click", startCountdownThenGame);

  // Gameplay
  el.btnGuessed.addEventListener("click", () => {
    state.score += 1;
    updateHud();
    renderItems();
  });

  el.btnSkip.addEventListener("click", renderItems);
  el.btnNewItems.addEventListener("click", renderItems);
  el.btnEndEarly.addEventListener("click", endTurn);

  // Next turn: same settings (deck + time), straight into countdown
  el.btnNextTurn.addEventListener("click", () => {
    closeModal();
    startCountdownThenGame();
  });

  el.btnEndGame.addEventListener("click", goHome);

  el.modalOverlay.addEventListener("click", (e) => {
    if (e.target === el.modalOverlay) closeModal();
  });

  // Init
  goHome();
  updateHud();
})();
