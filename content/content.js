/**After running */

function script(eve_names) {
  for (let i of eve_names.split(",")) {
    window[i] = () => {
      console.log("your", i, "got replaced");
    };
  }
}

function inject(fn, input) {
  const script = document.createElement("script");
  script.text = `(${fn.toString()})("${input.toString()}");`;
  document.documentElement.appendChild(script);
}

chrome.storage.local.get(["events_tobe_removed"], function (result) {
  const res = result["events_tobe_removed"];

  if (res == undefined) {
    console.log("You havent selected the events to cancel");
  } else {
    const replace = [];
    for (const k in res) {
      if (res[k]) {
        replace.push("on" + k);

        // remove for simple events
        window.addEventListener(
          k,
          function (event) {
            event.stopPropagation();
          },
          true
        );
      }
    }
    // window.onclick = () => {}
    inject(script, replace);
  }
});

