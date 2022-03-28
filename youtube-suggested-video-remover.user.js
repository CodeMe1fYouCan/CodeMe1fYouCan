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
    // For initial/new page loads
    waitForAndRemoveSuggestedVideos();

    // YT appends to the URL, forgoing page loads, when clicking down the YT rabbit hole.
    // This means we need to continuously detect these events as userscripts are only run once on page load.
    // The below creates an observer on URL changes and attempts to remove the elements on the new video.
    let lastUrl = location.href;
    new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        waitForAndRemoveSuggestedVideos();
      }
    }).observe(document, {subtree: true, childList: true});
})();

async function waitForAndRemoveSuggestedVideos() {
  await waitForYTVideoElementsToLoad();
  removeYTVideoElements();
}

// Wait for the ytb-ce elements we want to remove to load
async function waitForYTVideoElementsToLoad() {
  var numWaits = 0;
  var suggestedVideoElements = document.querySelectorAll(".ytp-ce-element");
  while(suggestedVideoElements == null || !suggestedVideoElements.length) {
    // Only wait 3 seconds. There may not be any elements to remove in the first place.
    if (numWaits >= 3) {
      break;
    }

    await new Promise(r => setTimeout(r, 1000));
    suggestedVideoElements = document.querySelectorAll(".ytp-ce-element");
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
