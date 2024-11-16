const btn = document.getElementById("btn");
const colorCode = document.getElementById("color-code");
const copyBtn = document.getElementById("copy-btn");
const colorInput = document.getElementById("color-input");
const applyBtn = document.getElementById("apply-btn");

let randomNum = () => {
  return Math.floor(Math.random() * 256);
};

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

btn.addEventListener("click", changeColor);
window.addEventListener("load", changeColor);

copyBtn.addEventListener("click", () => {
  const color = colorCode.textContent;

  // クリップボードにコピー
  navigator.clipboard.writeText(color).then(() => {
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 2000);
  }).catch((err) => {
    console.error("Failed to copy text: ", err);
  });
});

// 入力値を背景色に適用
applyBtn.addEventListener("click", () => {
  const inputColor = colorInput.value.trim();

  // 入力値が有効なカラーコードか確認
  if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(inputColor)) {
    document.body.style.backgroundColor = inputColor;
  } else {
    alert("Invalid color code! Please enter a valid HEX color code.");
  }
});
