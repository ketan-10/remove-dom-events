/**
 * Content.js runs on actual site
 * When all site is loaded content.js runs
 */

console.log("hello ketan");

chrome.runtime.onMessage.addListener((request, sender, sendResponce) => {
  console.log(request.txt);
});

const resource_image_path = "resources/download.jpg";
const url = chrome.extension.getURL(resource_image_path);
console.log(url);
