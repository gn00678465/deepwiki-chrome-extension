/**
 * GitHub 到 DeepWiki Chrome 擴充功能的背景腳本（用於 Manifest V3 的 Service Worker）
 * 此腳本作為背景服務工作者執行
 */

/**
 * 處理擴充功能安裝事件
 * 設定擴充功能初始狀態
 */
chrome.runtime.onInstalled.addListener(() => {
  console.log('GitHub 到 DeepWiki 擴充功能已安裝');
  
  // 將擴充功能啟用狀態儲存在 chrome.storage 中
  // 由於不需要設定介面，因此無需複雜的設定
  chrome.storage.local.set({
    isEnabled: true
  });
});

/**
 * 監聽來自內容腳本或彈出視窗的訊息
 * 處理各種操作，包括 URL 轉換
 * @param {Object} request - 來自發送者的訊息物件
 * @param {Object} sender - 有關訊息發送者的詳細資料
 * @param {Function} sendResponse - 用於向發送者回傳回應的函數
 * @return {boolean} - 回傳 true 表示非同步回應
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // 當請求狀態時回應
  if (request.action === "getStatus") {
    sendResponse({status: "擴充功能正在執行中"});
  }
  
  // 處理 URL 轉換（如果需要）
  if (request.action === "convertToDeepWiki") {
    const githubUrl = request.url;
    // 在 URL 中將 github.com 替換為 deepwiki.com
    const deepwikiUrl = githubUrl.replace('github.com', 'deepwiki.com');
    sendResponse({url: deepwikiUrl});
  }
  
  // 確保回傳 true 如果您想要非同步發送回應
  return true;
});