
const eventsUL = document.getElementById("eventsUL");

var text_inner = "";
for (let i in all_events) {
  text_inner +=
    '<li><input type="checkbox" class="events" name="event" id="' +
    i +
    '" value="' +
    i +
    '"> ' +
    i +
    " </li>";
}
eventsUL.innerHTML = text_inner;


function setStorage(events_values) {
  chrome.storage.local.set({ events_tobe_removed: events_values }, function () {
    console.log("Values are updated", events_values);
  });
}

chrome.storage.local.get(["events_tobe_removed"], function (result) {
  if (result["events_tobe_removed"] == undefined) {
    setStorage(all_events);
  } else {
    display_events(result["events_tobe_removed"]);
  }
});

for (const ele of eventsUL.childNodes) {
  console.log("adding click to ", ele);
  ele.addEventListener("click", () => {
    const inputElement = ele.childNodes[0];
    all_events[inputElement.value] = inputElement.checked;
    setStorage(all_events);
  });
}

function display_events(events) {
  all_events = events;
  for (const ele of eventsUL.childNodes) {
    const inputElement = ele.childNodes[0];
    inputElement.checked = all_events[inputElement.value];
  }
}
