/**
 * GitHub 到 DeepWiki Chrome 擴充功能的簡單彈出視窗腳本
 * 此腳本在擴充功能彈出視窗開啟時執行
 */

/**
 * DOM 內容載入時初始化彈出視窗
 * 檢查擴充功能狀態並顯示相關資訊
 */
document.addEventListener('DOMContentLoaded', () => {
  /**
   * 透過向背景腳本發送訊息來檢查擴充功能是否運行中
   * 這確認了服務工作者是否處於活動狀態
   */
  chrome.runtime.sendMessage({action: "getStatus"}, (response) => {
    console.log(response ? response.status : "背景腳本無回應");
  });
  
  /**
   * 查詢活動標籤頁以檢查我們是否正在 GitHub 上
   * 如果在 GitHub 頁面上則顯示特定的 UI 元素
   */
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const currentTab = tabs[0];
    const url = currentTab.url;
    
    // 檢查當前頁面是否是 GitHub 頁面
    if (url.includes('github.com')) {
      // 我們在 GitHub 上，顯示有關擴充功能功能的有用資訊
      const contentDiv = document.querySelector('.content');
      
      // 添加文字以表明我們已偵測到 GitHub 並提供使用說明
      const statusElement = document.createElement('p');
      statusElement.style.fontWeight = 'bold';
      statusElement.style.color = '#2ea44f';
      statusElement.textContent = '✓ 已偵測到 GitHub。請在存儲庫頁面標頭中尋找「在 DeepWiki 中開啟」按鈕。';
      
      contentDiv.appendChild(statusElement);
    }
  });
});