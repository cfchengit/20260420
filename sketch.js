let capture;
let pg;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide(); // 隱藏預設的 HTML 影片元素，僅顯示在 Canvas 中
  
  // 建立一個與視訊畫面相同尺寸的繪圖圖層 (寬高的 60%)
  pg = createGraphics(windowWidth * 0.6, windowHeight * 0.6);
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
  
  // 清除繪圖圖層原本的內容，維持背景透明
  pg.clear();
  
  // 在圖層上繪製內容（以紅色邊框與文字為例）
  pg.stroke(255, 0, 0);
  pg.strokeWeight(8);
  pg.noFill();
  pg.rect(0, 0, pg.width, pg.height);
  pg.fill(255);
  pg.noStroke();
  pg.textAlign(CENTER, CENTER);
  pg.textSize(32);
  pg.text("這是重疊在上方的新圖層", pg.width / 2, pg.height / 2);
  
  // 將圖層像圖片一樣顯示在視訊畫面正上方
  image(pg, x, y, w, h);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  pg.resizeCanvas(windowWidth * 0.6, windowHeight * 0.6); // 確保視窗縮放時圖層也跟著縮放
}
