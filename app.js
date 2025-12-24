/* global WHO_IS_IT_NAMES */

(() => {
  // -----------------------------
  // State
  // -----------------------------
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

  // -----------------------------
  // Elements
  // -----------------------------
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

    btnSound: document.getElementById("btnSound")
  };

  // -----------------------------
  // Utilities
  // -----------------------------
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

  function shuffle(array) {
    // Fisher–Yates
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function pickFiveNames() {
    const names = WHO_IS_IT_NAMES;
    if (!Array.isArray(names) || names.length < 10) {
      return ["Add names to names.js", "Example Name", "Example Name", "Example Name", "Example Name"];
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

  // -----------------------------
  // Sound (simple buzzer via Web Audio)
  // -----------------------------
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
      // If audio fails, silently ignore.
    }
  }

  function updateSoundIcon() {
    el.btnSound.innerHTML = state.soundOn ? '<span aria-hidden="true">🔊</span>' : '<span aria-hidden="true">🔇</span>';
  }

  // -----------------------------
  // Modal
  // -----------------------------
  function openModal() {
    el.finalScore.textContent = String(state.score);
    el.modalOverlay.classList.add("open");
    el.modalOverlay.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    el.modalOverlay.classList.remove("open");
    el.modalOverlay.setAttribute("aria-hidden", "true");
  }

  // -----------------------------
  // Timers
  // -----------------------------
  function clearTimers() {
    if (state.turnTimerId) window.clearInterval(state.turnTimerId);
    if (state.countdownTimerId) window.clearInterval(state.countdownTimerId);
    state.turnTimerId = null;
    state.countdownTimerId = null;
  }

  function startCountdownThenGame() {
    clearTimers();

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

  function beginTurn() {
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

  // -----------------------------
  // Navigation / Actions
  // -----------------------------
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

  // -----------------------------
  // Event handlers
  // -----------------------------
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

  // Close modal if clicking the dark overlay (not the modal itself)
  el.modalOverlay.addEventListener("click", (e) => {
    if (e.target === el.modalOverlay) closeModal();
  });

  // Initialise
  updateSoundIcon();
  goHome();
})();