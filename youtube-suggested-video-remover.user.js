// ==UserScript==
// @name         Remove Youtube End Screen Suggested Videos
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  The suggested videos at the end of Youtube videos block the screen before the current video is even over. I find this annoying, so I wrote this script to remove them.
// @author       CodeMe1fYouCan
// @match        https://www.youtube.com/watch*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('load', function() {
        const removeElements = (elms) => elms.forEach(el => el.remove());
        removeElements(document.querySelectorAll(".ytp-ce-element"));
    }, false);
})();
