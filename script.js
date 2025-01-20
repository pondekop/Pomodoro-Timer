const btn = document.getElementById("btn");
const colorCode = document.getElementById("color-code");
const timerElement = document.getElementById("timer");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const skipBtn = document.getElementById("skip-btn");

// タイマーの初期値
let workTime = 25 * 60; // 作業時間 (25分)
let breakTime = 5 * 60; // 休憩時間 (5分)
let currentTime = workTime; // 現在のカウントダウン時間
let isWorking = true; // 作業中か休憩中か
let timer = null; // タイマーのインターバルID
let isRunning = false; // タイマーの状態（動作中かどうか）

let randomNum = () => Math.floor(Math.random() * 256);

let rgbToHex = (r, g, b) => {
  let toHex = (num) => num.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

let changeColor = () => {
  let r = randomNum();
  let g = randomNum();
  let b = randomNum();
  let randomColor = `rgb(${r},${g},${b})`;

  document.body.style.backgroundColor = randomColor;

  // RGBをHexに変換して表示
  colorCode.textContent = rgbToHex(r, g, b);
};

// タイマーをスタート／ポーズ
startBtn.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(timer);
    startBtn.innerHTML = `<ion-icon name="play-outline"></ion-icon>`;
  } else {
    startTimer();
    startBtn.innerHTML = `<ion-icon name="pause-outline"></ion-icon>`;
  }
  isRunning = !isRunning;
});

// タイマーをリセット
resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  currentTime = isWorking ? workTime : breakTime;
  updateTimerDisplay();
  isRunning = false;
  startBtn.innerHTML = `<ion-icon name="play-outline"></ion-icon>`;
});


// タイマーをスキップ
skipBtn.addEventListener("click", () => {
  clearInterval(timer);
  isWorking = !isWorking; // 状態を切り替える
  currentTime = isWorking ? workTime : breakTime; // 時間を変更
  updateTimerDisplay();
  isRunning = false;
  startBtn.innerHTML = `<ion-icon name="play-outline"></ion-icon>`;
});

// タイマー表示を更新
function updateTimerDisplay() {
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  timerElement.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// タイマー機能
function startTimer() {
  timer = setInterval(() => {
    if (currentTime > 0) {
      currentTime--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      isWorking = !isWorking; // 作業⇔休憩を切り替え
      currentTime = isWorking ? workTime : breakTime;
      updateTimerDisplay();
      alert(isWorking ? "作業時間スタート！" : "休憩時間スタート！");
      startTimer(); // 次のセッションを自動開始
    }
  }, 1000);
}

// 初期化
changeColor(); // ページ読み込み時にランダムな背景色を設定
updateTimerDisplay(); // 初期タイマー表示を設定
btn.addEventListener("click", changeColor); // ボタンクリックで背景色を変更