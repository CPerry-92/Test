(() => {
  const state = {
    selectedSeconds: 60,
    remainingSeconds: 60,
    score: 0,
    countdown: 5,
    usedIndexes: new Set(),
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

    timeButtons: Array.from(document.querySelectorAll(".time-btn")),

    countdownNumber: document.getElementById("countdownNumber"),

    timeRemaining: document.getElementById("timeRemaining"),
    score: document.getElementById("score"),
    namesList: document.getElementById("namesList"),

    btnGuessed: document.getElementById("btnGuessed"),
    btnSkip: document.getElementById("btnSkip"),
    btnNewNames: document.getElementById("btnNewNames"),
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

  function getNamesArraySafe() {
    const list = window.WHO_IS_IT_NAMES;
    return Array.isArray(list) ? list : [];
  }

  function pickFiveNames() {
    const names = getNamesArraySafe();

    if (names.length < 50) {
      return [
        "Name list missing or too short",
        "Check names.js exists and loads",
        "Ensure names.js loads before app.js",
        "Example Name",
        "Example Name"
      ];
    }

    if (state.usedIndexes.size > names.length - 10) state.usedIndexes.clear();

    const picked = [];
    let safety = 0;

    while (picked.length < 5 && safety < 10000) {
      safety++;
      const idx = Math.floor(Math.random() * names.length);
      if (state.usedIndexes.has(idx)) continue;
      state.usedIndexes.add(idx);
      picked.push(names[idx]);
    }

    while (picked.length < 5) picked.push(names[Math.floor(Math.random() * names.length)]);
    return picked;
  }

  function renderNames() {
    const items = pickFiveNames();
    el.namesList.innerHTML = "";
    items.forEach(name => {
      const li = document.createElement("li");
      li.textContent = name;
      el.namesList.appendChild(li);
    });
  }

  function updateHud() {
    el.timeRemaining.textContent = String(state.remainingSeconds);
    el.score.textContent = String(state.score);
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

  function openModal() {
    el.finalScore.textContent = String(state.score);
    el.modalOverlay.classList.add("open");
    el.modalOverlay.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    el.modalOverlay.classList.remove("open");
    el.modalOverlay.setAttribute("aria-hidden", "true");
  }

  function clearTimers() {
    if (state.turnTimerId) window.clearInterval(state.turnTimerId);
    if (state.countdownTimerId) window.clearInterval(state.countdownTimerId);
    state.turnTimerId = null;
    state.countdownTimerId = null;
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
        beginTurnSafe();
      }
    }, 1000);
  }

  function beginTurnSafe() {
    try {
      beginTurn();
    } catch (err) {
      showScreen(el.screenGame);
      clearTimers();
      showGameError("The turn could not start. Check names.js and script order, then refresh.");

      el.namesList.innerHTML = "";
      ["Error starting turn", "Check names.js exists", "Check script order", "Refresh page", "Sorry!"].forEach(t => {
        const li = document.createElement("li");
        li.textContent = t;
        el.namesList.appendChild(li);
      });

      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  function beginTurn() {
    clearGameError();

    state.remainingSeconds = state.selectedSeconds;
    state.score = 0;

    updateHud();
    renderNames();
    showScreen(el.screenGame);

    clearTimers();
    state.turnTimerId = window.setInterval(() => {
      state.remainingSeconds = clampInt(state.remainingSeconds - 1, 0, 9999);
      updateHud();

      if (state.remainingSeconds <= 0) {
        endTurn();
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
  el.btnBackHome2.addEventListener("click", goSettings); // cancel countdown -> settings (keeps chosen time)

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

  // Gameplay actions
  el.btnGuessed.addEventListener("click", () => {
    state.score += 1;
    updateHud();
    renderNames();
  });

  el.btnSkip.addEventListener("click", renderNames);
  el.btnNewNames.addEventListener("click", renderNames);
  el.btnEndEarly.addEventListener("click", endTurn);

  // Next turn: SAME TIME LIMIT, straight into countdown
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
})();
