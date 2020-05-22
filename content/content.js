/**
 * Content.js runs on actual site
 * When all site is loaded content.js runs
 */

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

function setStorage(events_values) {
  console.log("first Time extenstion open");
  chrome.storage.local.set({ events_tobe_removed: events_values }, function () {
    console.log("Values are updated", events_values);
  });
}

/** When background will send a message we will recive here */

// TODO : load local remove all events in local

chrome.storage.local.get(["events_tobe_removed"], function (result) {
  const res = result["events_tobe_removed"];

  if (res == undefined) {
    setStorage(all_events);
  } else {
    console.log(res, typeof res);
    for (const k in res) {
      if (res[k]) {
        const doc_event = getEventListeners(document)[k];
        if (doc_event) {
          for (var i = 0; i < doc_event.length; i++) {
            document.removeEventListener(k, doc_event[i].listener);
          }
        }

        const wid_event = getEventListeners(window)[k];
        if (wid_event) {
          for (var i = 0; i < wid_event.length; i++) {
            window.removeEventListener(k, wid_event[i].listener);
          }
        }

        // remove for simple events;
        window.addEventListener(
          k,
          function (event) {
            event.stopPropagation();
          },
          true
        );
      }
    }
  }
});
