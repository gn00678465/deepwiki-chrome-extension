// Content script：在網頁環境中執行的腳本
console.log('DeepWiki Extension content script 已載入');

/**
 * 檢查當前頁面是否為 GitHub 頁面（透過檢查主機名）
 * @returns {boolean} 如果當前頁面在 github.com，則回傳 true，否則回傳 false
 */
function isGitHubPage() {
  return window.location.hostname === 'github.com';
}

/**
 * 在 GitHub 使用者介面中創建並插入「在 DeepWiki 中開啟」按鈕
 * 此函數尋找 GitHub 頁面上適當的導航元素，
 * 並插入自定義按鈕以重定向到 DeepWiki
 */
function insertDeepWikiButton() {
  // 只有在 GitHub 頁面上才插入按鈕
  if (!isGitHubPage()) return;

  // 尋找不同 GitHub 頁面上適當的導航元素
  // 這些選擇器針對不同類型的 GitHub 頁面上的各種 UI 元素
  const navBar = document.querySelector('ul.pagehead-actions, .file-navigation, .d-flex.mb-3.px-3.px-md-4.px-lg-5');
  if (!navBar) return;

  // 檢查是否已經添加按鈕以避免重複
  if (navBar.querySelector('.deepwiki-button-container')) return;

  // 創建按鈕容器
  const listItem = document.createElement('li');
  listItem.className = 'deepwiki-button-container';
  
  // 創建按鈕
  const button = document.createElement('button');
  button.className = 'dw-button';
  button.title = '在 DeepWiki 中開啟此頁面';
  
  // 創建 DeepWiki SVG 圖標
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 44 50');
  svg.setAttribute('style', 'stroke: none;');
  
  // 藍色路徑
  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('style', 'fill: #2A6DCE;');
  path1.setAttribute('d', 'M1.117,20.553l5.351,3.089c0.192,0.111,0.406,0.165,0.621,0.165c0.214,0,0.429-0.057,0.621-0.165l5.351-3.089 c0,0,0.015-0.012,0.022-0.017c0.081-0.049,0.158-0.108,0.227-0.175c0.01-0.01,0.02-0.022,0.03-0.032 c0.059-0.064,0.113-0.133,0.158-0.207c0.007-0.012,0.017-0.022,0.022-0.035c0.047-0.081,0.081-0.167,0.108-0.259 c0.005-0.02,0.01-0.039,0.015-0.059c0.022-0.094,0.039-0.19,0.039-0.291v-3.089c0-1.192,0.643-2.303,1.675-2.9s2.316-0.596,3.35,0 l2.675,1.545c0.086,0.049,0.177,0.084,0.271,0.111c0.02,0.005,0.04,0.012,0.059,0.017c0.091,0.022,0.185,0.035,0.278,0.037 c0.005,0,0.01,0,0.012,0c0.01,0,0.02-0.005,0.029-0.005c0.086,0,0.173-0.012,0.256-0.035c0.015-0.003,0.03-0.005,0.044-0.01 c0.091-0.025,0.18-0.062,0.264-0.108c0.007-0.005,0.017-0.005,0.025-0.01l5.351-3.089c0.384-0.222,0.621-0.631,0.621-1.074V4.69 c0-0.443-0.236-0.852-0.621-1.074l-5.356-3.087c-0.384-0.222-0.855-0.222-1.239,0l-5.351,3.089c0,0-0.015,0.012-0.022,0.017 c-0.081,0.049-0.158,0.108-0.227,0.175c-0.01,0.01-0.02,0.022-0.03,0.032c-0.059,0.064-0.113,0.133-0.158,0.207 c-0.007,0.012-0.017,0.022-0.022,0.034c-0.047,0.081-0.081,0.168-0.108,0.259c-0.005,0.02-0.01,0.039-0.015,0.059 c-0.022,0.094-0.039,0.19-0.039,0.291v3.089c0,1.192-0.643,2.303-1.675,2.902c-1.032,0.596-2.316,0.596-3.35,0L7.705,9.139 C7.618,9.09,7.527,9.055,7.434,9.028c-0.02-0.005-0.039-0.012-0.059-0.017C7.283,8.989,7.19,8.977,7.096,8.974 c-0.015,0-0.027,0-0.042,0c-0.089,0-0.175,0.012-0.259,0.034c-0.015,0.002-0.027,0.005-0.042,0.01 C6.663,9.043,6.574,9.08,6.49,9.127c-0.007,0.005-0.017,0.005-0.025,0.01l-5.348,3.092c-0.384,0.222-0.621,0.631-0.621,1.074v6.178 c0,0.444,0.236,0.852,0.621,1.074V20.553z');
  
  // 綠色路徑
  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('style', 'fill: #1DC19C;');
  path2.setAttribute('d', 'M30.262,22.097c1.032-0.596,2.316-0.596,3.35,0l2.675,1.545c0.086,0.049,0.177,0.084,0.271,0.111 c0.02,0.005,0.039,0.012,0.059,0.017c0.091,0.022,0.185,0.034,0.278,0.037c0.005,0,0.01,0,0.012,0c0.01,0,0.02-0.003,0.029-0.005 c0.086,0,0.173-0.012,0.256-0.034c0.015-0.003,0.03-0.005,0.044-0.01c0.091-0.025,0.177-0.062,0.264-0.108 c0.007-0.005,0.017-0.005,0.027-0.01l5.351-3.089c0.384-0.222,0.621-0.631,0.621-1.074v-6.179c0-0.443-0.237-0.852-0.621-1.074 L37.53,9.134c-0.384-0.222-0.855-0.222-1.239,0l-5.351,3.089c0,0-0.015,0.012-0.022,0.017c-0.081,0.049-0.158,0.108-0.227,0.175 c-0.01,0.01-0.02,0.022-0.029,0.032c-0.059,0.064-0.113,0.133-0.158,0.207c-0.007,0.012-0.017,0.022-0.022,0.035 c-0.047,0.081-0.081,0.168-0.108,0.259c-0.005,0.02-0.01,0.039-0.015,0.059c-0.022,0.094-0.039,0.19-0.039,0.291v3.089 c0,1.192-0.643,2.303-1.675,2.902c-1.032,0.596-2.316,0.596-3.35,0l-2.675-1.545c-0.086-0.049-0.177-0.084-0.271-0.111 c-0.02-0.005-0.039-0.012-0.059-0.017c-0.091-0.022-0.185-0.035-0.278-0.037c-0.015,0-0.027,0-0.042,0 c-0.089,0-0.175,0.012-0.259,0.035c-0.015,0.003-0.027,0.005-0.042,0.01c-0.091,0.025-0.18,0.062-0.264,0.108 c-0.007,0.005-0.017,0.005-0.025,0.01l-5.351,3.089c-0.384,0.222-0.621,0.631-0.621,1.074v6.179c0,0.443,0.236,0.852,0.621,1.074 l5.351,3.089c0,0,0.017,0.005,0.025,0.01c0.084,0.047,0.173,0.084,0.264,0.108c0.015,0.005,0.027,0.005,0.042,0.01 c0.086,0.02,0.172,0.032,0.261,0.035c0.012,0,0.027,0,0.039,0c0.094,0,0.187-0.015,0.278-0.037c0.02-0.005,0.037-0.01,0.057-0.017 c0.094-0.027,0.185-0.062,0.271-0.111l2.675-1.545c1.032-0.596,2.316-0.596,3.35,0c1.032,0.596,1.675,1.707,1.675,2.9v3.089 c0,0.101,0.015,0.197,0.039,0.291c0.005,0.02,0.01,0.039,0.015,0.059c0.027,0.091,0.061,0.177,0.108,0.259 c0.007,0.012,0.015,0.022,0.022,0.034c0.044,0.074,0.099,0.143,0.158,0.207c0.01,0.01,0.02,0.022,0.029,0.032 c0.067,0.066,0.143,0.123,0.227,0.175c0.007,0.005,0.012,0.012,0.022,0.017l5.351,3.089c0.192,0.111,0.406,0.165,0.621,0.165 c0.214,0,0.429-0.057,0.621-0.165l5.351-3.089c0.384-0.222,0.621-0.631,0.621-1.074v-6.179c0-0.443-0.236-0.852-0.621-1.074l-5.351-3.089c0,0-0.017-0.005-0.025-0.01c-0.084-0.047-0.173-0.084-0.264-0.108 c-0.015-0.005-0.027-0.005-0.042-0.01c-0.086-0.02-0.172-0.032-0.261-0.035c-0.012,0-0.027,0-0.039,0 c-0.094,0-0.187,0.015-0.278,0.037c-0.02,0.005-0.037,0.01-0.057,0.017c-0.094,0.027-0.185,0.062-0.271,0.111l-2.675,1.545 c-1.032,0.596-2.316,0.596-3.348,0c-1.032-0.596-1.675-1.707-1.675-2.902c0-1.195,0.643-2.303,1.675-2.9H30.262z');
  
  // 淺藍色路徑
  const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path3.setAttribute('style', 'fill: #1796E2;');
  path3.setAttribute('d', 'M27.967,38.054l-5.351-3.089c0,0-0.017-0.005-0.025-0.01c-0.084-0.047-0.172-0.084-0.264-0.108 c-0.015-0.005-0.03-0.005-0.044-0.01c-0.086-0.02-0.172-0.032-0.259-0.035c-0.015,0-0.027,0-0.042,0 c-0.094,0-0.187,0.015-0.278,0.037c-0.02,0.005-0.037,0.01-0.057,0.017c-0.094,0.027-0.185,0.062-0.271,0.111l-2.675,1.545 c-1.032,0.596-2.316,0.596-3.348,0c-1.032-0.596-1.675-1.707-1.675-2.902V30.52c0-0.101-0.015-0.197-0.039-0.291 c-0.005-0.02-0.01-0.039-0.015-0.059c-0.027-0.091-0.062-0.177-0.108-0.259c-0.007-0.012-0.015-0.022-0.022-0.035 c-0.044-0.074-0.099-0.143-0.158-0.207c-0.01-0.01-0.02-0.022-0.03-0.032c-0.066-0.066-0.143-0.123-0.227-0.175 c-0.007-0.005-0.012-0.012-0.022-0.017l-5.351-3.089c-0.384-0.222-0.855-0.222-1.239,0l-5.351,3.089 c-0.384,0.222-0.621,0.631-0.621,1.074v6.179c0,0.443,0.236,0.852,0.621,1.074l5.351,3.089c0,0,0.017,0.007,0.025,0.01 c0.084,0.047,0.17,0.084,0.261,0.108c0.015,0.005,0.03,0.007,0.044,0.01c0.084,0.02,0.17,0.032,0.256,0.035 c0.01,0,0.02,0.005,0.032,0.005c0.005,0,0.01,0,0.015,0c0.094,0,0.185-0.015,0.276-0.037c0.02-0.005,0.039-0.01,0.059-0.017 c0.094-0.027,0.185-0.062,0.271-0.111l2.675-1.545c1.032-0.596,2.316-0.596,3.35,0c1.032,0.596,1.675,1.707,1.675,2.9v3.089 c0,0.101,0.015,0.197,0.039,0.291c0.005,0.02,0.01,0.039,0.015,0.059c0.027,0.091,0.062,0.177,0.108,0.259 c0.007,0.012,0.015,0.022,0.022,0.035c0.044,0.074,0.099,0.143,0.158,0.207c0.01,0.01,0.02,0.022,0.03,0.032 c0.067,0.067,0.143,0.123,0.227,0.175c0.007,0.005,0.012,0.012,0.022,0.017l5.351,3.089c0.192,0.111,0.406,0.165,0.621,0.165 s0.429-0.057,0.621-0.165l5.351-3.089c0.384-0.222,0.621-0.631,0.621-1.074V39.13c0-0.443-0.236-0.852-0.621-1.074L27.967,38.054z');
  
  // 將所有路徑添加到 SVG
  svg.appendChild(path1);
  svg.appendChild(path2);
  svg.appendChild(path3);
  
  button.appendChild(svg);
  
  // 創建文字
  const text = document.createElement('p');
  text.className = 'dw-text';
  text.textContent = 'DeepWiki';
  button.appendChild(text);
  
  // 添加事件監聽器以重定向到 DeepWiki
  button.addEventListener('click', (e) => {
    e.preventDefault();
    
    // 獲取當前 URL 並將 github.com 替換為 deepwiki.com
    const currentURL = window.location.href;
    const deepWikiURL = currentURL.replace('github.com', 'deepwiki.com');
    
    // 導航至 DeepWiki 對應的 URL
    window.location.href = deepWikiURL;
  });

  // 將按鈕添加到列表項目中
  listItem.appendChild(button);
  
  // 在導航欄的開始處插入按鈕
  navBar.prepend(listItem);

  // 插入自定義樣式
  injectCustomStyles();
}

/**
 * 注入自定義樣式到頁面中
 * 這些樣式僅影響我們的擴展按鈕
 */
function injectCustomStyles() {
  // 檢查是否已經注入樣式
  if (document.head.querySelector('#deepwiki-custom-styles')) return;
  
  const styleElement = document.createElement('style');
  styleElement.id = 'deepwiki-custom-styles';
  styleElement.textContent = `
    .deepwiki-button-container {
      display: inline-block;
      margin-right: 8px;
    }
    
    .dw-button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 28px;
      padding: 0 10px;
      gap: 6px;
      background-color: #181717;
      border: 2px solid #181717;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 400ms;
      font-size: 12px;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
    }
    
    .dw-button .dw-text {
      color: white;
      font-weight: 600;
      margin: 0;
      padding: 0;
      line-height: 1;
      transition: color 400ms;
    }
    
    .dw-button svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }
    
    .dw-button svg path {
      transition: fill 400ms;
    }
    
    .dw-button:hover {
      background-color: transparent;
    }
    
    .dw-button:hover .dw-text {
      color: #181717;
    }
    
    .dw-button:hover svg path {
      fill: #181717;
    }
    
    .dw-button:active {
      background-color: transparent;
      border-color: #181717;
    }
    
    .dw-button:active .dw-text {
      color: #181717;
    }
    
    .dw-button:active svg path {
      fill: #181717;
    }
    
    .dw-button:focus {
      outline: none;
      border-color: #181717;
    }
    
    .dw-button:focus:hover {
      border-color: #181717;
      background-color: transparent;
    }
    
    .dw-button:focus:hover .dw-text {
      color: #181717;
    }
    
    .dw-button:focus:hover svg path {
      fill: #181717;
    }
  `;
  
  document.head.appendChild(styleElement);
}

// 頁面載入時執行函數
insertDeepWikiButton();

/**
 * 設置 MutationObserver 以檢測單頁面導航的 URL 變化
 * GitHub 使用客戶端路由，因此我們需要監視 DOM 變化
 * 以指示網站內的導航
 */
let lastURL = location.href;
new MutationObserver(() => {
  const currentURL = location.href;
  if (currentURL !== lastURL) {
    lastURL = currentURL;
    // 添加延遲以確保導航後 DOM 已就緒
    setTimeout(insertDeepWikiButton, 500);
  }
}).observe(document.body, { subtree: true, childList: true });

/**
 * 監聽來自彈出視窗或背景腳本的訊息
 * 這提供了擴展組件之間的通信
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "performAction") {
    // 示例動作：獲取頁面標題
    const pageTitle = document.title;
    
    // 發送回應
    sendResponse({
      status: true,
      message: `頁面標題: ${pageTitle}`
    });
  }
  // 返回 true 表示將異步發送回應
  return true;
});