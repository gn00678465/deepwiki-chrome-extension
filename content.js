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
  const button = document.createElement('a');
  button.className = 'btn btn-sm';
  button.textContent = '在 DeepWiki 中開啟';
  button.style.marginRight = '8px';
  button.title = '在 DeepWiki 中開啟此頁面';
  button.href = '#';
  
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
  navBar.append(listItem);
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