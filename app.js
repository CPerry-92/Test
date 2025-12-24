(() => {
  const state = {
    selectedSeconds: 60,
    remainingSeconds: 60,
    score: 0,
    soundOn: true,
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

    btnSound: document.getElementById("btnSound"),
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

    // Fail-safe: never allow missing name list to stall the game
    if (names.length < 10) {
      return [
        "Name list missing or too short",
        "Check names.js exists and loads",
        "Ensure names.js loads before app.js",
        "Example Name",
        "Example Name"
      ];
    }

    // If we’ve used almost all names, reset used set.
    if (state.usedIndexes.size > names.length - 10) state.usedIndexes.clear();

    const picked = [];
    let safety = 0;

    while (picked.length < 5 && safety < 5000) {
      safety++;
      const idx = Math.floor(Math.random() * names.length);
      if (state.usedIndexes.has(idx)) continue;
      state.usedIndexes.add(idx);
      picked.push(names[idx]);
    }

    // Another fail-safe (in case something weird happens)
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

  function playBuzzer() {
    if (!state.soundOn) return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();

      const o = ctx.createOscillator();
      const g = ctx.createGain();

      o.type = "sawtooth";
      o.frequency.setValueAtTime(180, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.35);

      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.55);

      o.connect(g);
      g.connect(ctx.destination);

      o.start();
      o.stop(ctx.currentTime + 0.6);

      o.onended = () => ctx.close().catch(() => {});
    } catch {
      // ignore
    }
  }

  function updateSoundIcon() {
    el.btnSound.innerHTML = state.soundOn
      ? '<span aria-hidden="true">🔊</span>'
      : '<span aria-hidden="true">🔇</span>';
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
      // Ensure we still land on the game screen rather than appearing stuck
      showScreen(el.screenGame);
      clearTimers();
      showGameError("The turn could not start due to an error. Check your names.js file and script order.");
      // Provide something visible regardless
      el.namesList.innerHTML = "";
      ["Error starting turn", "Open browser console", "Fix names.js / ordering", "Then refresh", "Sorry!"].forEach(t => {
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
    playBuzzer();
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

  // Events
  el.btnPlay.addEventListener("click", goSettings);
  el.btnBackHome1.addEventListener("click", goHome);
  el.btnBackHome2.addEventListener("click", goSettings);

  el.timeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      el.timeButtons.forEach(b => b.classList.remove("time-btn-active"));
      btn.classList.add("time-btn-active");

      const seconds = clampInt(btn.dataset.seconds, 10, 600);
      state.selectedSeconds = seconds;
    });
  });

  el.btnStart.addEventListener("click", () => {
    startCountdownThenGame();
  });

  el.btnGuessed.addEventListener("click", () => {
    state.score += 1;
    updateHud();
    renderNames();
  });

  el.btnSkip.addEventListener("click", () => {
    renderNames();
  });

  el.btnNewNames.addEventListener("click", () => {
    renderNames();
  });

  el.btnEndEarly.addEventListener("click", () => {
    endTurn();
  });

  el.btnNextTurn.addEventListener("click", () => {
    closeModal();
    goSettings();
  });

  el.btnEndGame.addEventListener("click", () => {
    goHome();
  });

  el.btnSound.addEventListener("click", () => {
    state.soundOn = !state.soundOn;
    updateSoundIcon();
  });

  el.modalOverlay.addEventListener("click", (e) => {
    if (e.target === el.modalOverlay) closeModal();
  });

  // Init
  updateSoundIcon();
  goHome();
})();