let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide(); // 隱藏預設的 HTML 影片元素，僅顯示在 Canvas 中
}

function draw() {
  background('#e7c6ff');
  
  // 計算影像寬高為全螢幕的 60%
  let w = width * 0.6;
  let h = height * 0.6;
  // 計算置中的 X 軸與 Y 軸位置
  let x = (width - w) / 2;
  let y = (height - h) / 2;
  
  // 翻轉 X 軸以解決攝影機左右顛倒的問題
  push();
  translate(width, 0);
  scale(-1, 1);
  image(capture, x, y, w, h);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
