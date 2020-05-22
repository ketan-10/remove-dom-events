/**
 * Background.js Runs on WHOLE CHROME Browser
 * you can check it running on extension setting background setting
 */



 /*
"browser_action": {
    "default_icon": "logo.png",
    "default_popup": "popup.html"
  }
*/


console.log("background running");
//console.log(document);


chrome.browserAction.onClicked.addListener((tab) => {
    let request= {
        txt : "hello"
    }

    chrome.tabs.sendMessage(tab.id,request);

});
