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
  
  pg.noStroke();
  pg.textAlign(CENTER, CENTER);
  pg.textSize(8); // 縮小文字以符合 20x20 的單位大小
  
  // 載入攝影機像素資料
  capture.loadPixels();
  if (capture.pixels && capture.pixels.length > 0) {
    let step = 20; // 設定單位為 20x20
    
    for (let y = 0; y < pg.height; y += step) {
      for (let x = 0; x < pg.width; x += step) {
        // 取得該單位中心的座標，映射回原始 capture 解析度並作左右反轉
        let cx = floor(map(x + step / 2, 0, pg.width, capture.width, 0)); 
        let cy = floor(map(y + step / 2, 0, pg.height, 0, capture.height));
        cx = constrain(cx, 0, capture.width - 1);
        cy = constrain(cy, 0, capture.height - 1);
        
        // 從一維陣列計算像素索引，每個像素包含 R, G, B, A 四個值
        let index = (cy * capture.width + cx) * 4;
        let r = capture.pixels[index + 0]; // pixel[0]
        let g = capture.pixels[index + 1]; // pixel[1]
        let b = capture.pixels[index + 2]; // pixel[2]
        
        // 計算 (R + G + B) / 3 的平均值
        let avg = floor((r + g + b) / 3);
        
        // 將計算出的平均值設為顏色填滿該 20x20 單位
        pg.fill(avg);
        pg.rect(x, y, step, step);
        
        // 在單位中心顯示數值文字，為了清晰度，根據背景亮度切換文字黑白
        pg.fill(avg > 128 ? 0 : 255);
        pg.text(avg, x + step / 2, y + step / 2);
      }
    }
  }
  
  // 將圖層像圖片一樣顯示在視訊畫面正上方
  image(pg, x, y, w, h);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  pg.resizeCanvas(windowWidth * 0.6, windowHeight * 0.6); // 確保視窗縮放時圖層也跟著縮放
}
