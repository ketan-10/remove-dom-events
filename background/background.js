/**
 * Background.js Runs on WHOLE CHROME Browser
 * you can check it running on extension setting background setting
 */




console.log("background running");
//console.log(document);


/** When extention is click, run this function 
 * Here we send message to content
 * (THIS wll only run if 'default_popup' not exist)
 * otherwise it will just open popup
 *  "browser_action": {
    <remove> "default_popup": <- remove this
  },
 */
chrome.browserAction.onClicked.addListener((tab) => {
    let request= {
        txt : "hello"
    }

    chrome.tabs.sendMessage(tab.id,request);

});
