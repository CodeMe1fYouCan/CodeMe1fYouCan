// ==UserScript==
// @name         Remove Youtube End Screen Suggested Videos
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  The suggested videos at the end of Youtube videos block the screen before the current video is even over. I find this annoying, so I wrote this script to remove them.
// @author       CodeMeIfYouCan
// @match        https://www.youtube.com/watch*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
  main();
})();

async function main() {
  await waitForYTVideoElementsToLoad();
  removeYTVideoElements();
}

// Wait for the ytb-ce elements we want to delete to load
async function waitForYTVideoElementsToLoad() {
  var numWaits = 0;
  var elements = document.querySelectorAll(".ytp-ce-element");
  while(elements == null || !elements.length) {
    // Only wait 3 seconds. There may not be any elements to delete in the first place.
    if (numWaits >= 3) {
      break;
    }

    await new Promise(r => setTimeout(r, 1000));
    elements = document.querySelectorAll(".ytp-ce-element");
    numWaits++;
  }
}

function removeYTVideoElements() {
  const removeElements = (elms) => elms.forEach(el => el.remove());
  let elements = document.querySelectorAll(".ytp-ce-element");
  // Uncomment if you want to see what elements are being removed in the developer console
  /*console.log(elements.length);
  for (var i = 0, element; (element = elements[i]); i++) {
    console.log(element);
  }*/
  removeElements(elements);
}
