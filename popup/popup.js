/**
 * This script is included in popup.js
 * This is runing in extention popup
 * You can check popup console by right clicking on popup
 *
 * THIS SCRIPT CAN ONLY MANUPLATE POPUP CONTENT
 */

// TODO : get from local -> disply -> if updated store in local

const eventsUL = document.getElementsByClassName("events");

let all_events = {
  change: false,
  click: false,
  mouseover: false,
  mouseout: false,
  keydown: false,
  load: false,
  blur: false,
  focus: false,
  select: false,
  submit: false,
  reset: false,
  keypress: false,
  keyup: false,
  mousedown: false,
  mouseup: false,
  mousemove: false,
  dblclick: false,
  error: false,
  unload: false,
  resize: false,
};

// for debug (!dont forget to remove)
// chrome.storage.local.set({ events_tobe_removed: all_events }, function () {
//   console.log("Values are updated");
// });

function setStorage(events_values) {
  chrome.storage.local.set({ events_tobe_removed: events_values }, function () {
    console.log("Values are updated", events_values);
  });
}

chrome.storage.local.get(["events_tobe_removed"], function (result) {
  if (result["events_tobe_removed"] == undefined) {
    setStorage(all_events);
  } else {
    disply_events(result["events_tobe_removed"]);
  }
});
for (const ele of eventsUL) {
  ele.addEventListener("click", () => {
    all_events[ele.value] = ele.checked;
    setStorage(all_events);
  });
}

function disply_events(events) {
  all_events = events;
  for (const ele of eventsUL) {
    ele.checked = all_events[ele.value];
  }
}
