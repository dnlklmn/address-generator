/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./helpers/helper.ts":
/*!***************************!*\
  !*** ./helpers/helper.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addressFormatted": () => (/* binding */ addressFormatted),
/* harmony export */   "capitalizeFirstLetter": () => (/* binding */ capitalizeFirstLetter),
/* harmony export */   "createAddress": () => (/* binding */ createAddress),
/* harmony export */   "makeid": () => (/* binding */ makeid),
/* harmony export */   "textToDisplay": () => (/* binding */ textToDisplay)
/* harmony export */ });
function makeid(length, msg) {
    var result = "";
    var characters = msg.currentChain === "ethereum"
        ? "ABCDEFabcdef0123456"
        : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function textToDisplay(msg) {
    let prefix = "";
    if (msg.currentChain === "ethereum") {
        prefix = "0x";
    }
    if (msg.currentChain === "polkadot") {
        prefix = "1";
    }
    if (msg.currentChain === "kusama") {
        prefix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random() * 26));
    }
    const address = prefix === "0x" || ""
        ? prefix + makeid(msg.currentCount - 2, msg)
        : prefix + makeid(msg.currentCount, msg);
    const addressBegin = prefix === "0x" || ""
        ? prefix + makeid(msg.currentCount / 2 - 2, msg)
        : prefix + makeid(msg.currentCount / 2, msg);
    const addressEnd = makeid(msg.currentCount / 2, msg);
    return [address, addressBegin, addressEnd];
}
function createAddress(msg) {
    let prefix = "";
    if (msg.currentChain === "ethereum") {
        prefix = "0x";
    }
    if (msg.currentChain === "polkadot") {
        prefix = "1";
    }
    if (msg.currentChain === "kusama") {
        prefix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random() * 26));
    }
    let address;
    if (msg.currentChain === "ethereum") {
        address = prefix + makeid(msg.currentCount - 2, msg);
    }
    if (msg.currentChain === "polkadot" || msg.currentChain === "kusama") {
        address = prefix + makeid(msg.currentCount - 1, msg);
    }
    if (msg.currentChain === "any") {
        address = makeid(msg.currentCount, msg);
    }
    return address;
}
function addressFormatted(address, msg) {
    let characters;
    if (msg.currentEllipsis === "none" || msg.currentEllipsis === "None") {
        characters = address;
    }
    if (msg.currentEllipsis === "center" || msg.currentEllipsis === "Center") {
        characters =
            address.substring(0, msg.currentCount / 2 - 2) +
                "..." +
                address.substring(msg.currentCount / 2, msg.currentCount - 1);
    }
    if (msg.currentEllipsis === "start" || msg.currentEllipsis === "Start") {
        characters = "..." + address.substring(3);
    }
    if (msg.currentEllipsis === "end" || msg.currentEllipsis === "End") {
        characters = address.substring(0, msg.currentCount - 3) + "...";
    }
    return characters;
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************!*\
  !*** ./code.ts ***!
  \*****************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/helper */ "./helpers/helper.ts");

figma.showUI(__html__, {
    themeColors: true,
    width: 340,
    height: 300,
    title: "Random Web3 Address Generator",
});
let allNodes = figma.currentPage.selection;
let newSelection = [];
figma.loadFontAsync({ family: "Inter", style: "Regular" });
let ellipsis = "none";
let chain = "any";
let numberOfCharacters = 24;
let selectedTextObjects = [];
let selectedOtherObjects = [];
function trackSelection() {
    allNodes = figma.currentPage.selection;
    selectedTextObjects = [];
    selectedOtherObjects = [];
    newSelection = [];
    let firstLetters = "";
    let numberOfObjectsSelected = allNodes.length;
    for (let i = 0; i < allNodes.length; i++) {
        numberOfCharacters = allNodes[i].characters.length;
        if (allNodes.length === 1 && allNodes[i].type == "TEXT") {
            firstLetters = allNodes[i].characters.substring(0, 2);
            numberOfCharacters = allNodes[i].characters.length;
        }
        if (allNodes[i] && allNodes[i].type == "TEXT") {
            figma.loadFontAsync(allNodes[i].fontName);
            if (!allNodes[i].characters.includes("...")) {
                ellipsis = "none";
                numberOfCharacters = allNodes[i].characters.length;
            }
            if (allNodes[i].characters.startsWith("...")) {
                ellipsis = "start";
                numberOfCharacters = allNodes[i].characters.length;
            }
            if (allNodes[i].characters.endsWith("...")) {
                ellipsis = "end";
                numberOfCharacters = allNodes[i].characters.length;
            }
            if (allNodes[i].characters.includes("...") &&
                !allNodes[i].characters.endsWith("...") &&
                !allNodes[i].characters.startsWith("...")) {
                ellipsis = "center";
                numberOfCharacters = allNodes[i].characters.length;
            }
            if (firstLetters.charAt(0).match(/[a-z]/i) &&
                firstLetters.charAt(0).toUpperCase() === firstLetters.charAt(0)) {
                chain = "kusama";
            }
            if (firstLetters.charAt(0) === "1") {
                chain = "polkadot";
            }
            if (firstLetters === "0x") {
                chain = "ethereum";
            }
            if (firstLetters === "..") {
                chain = "any";
            }
            if (firstLetters !== "0x" &&
                firstLetters.charAt(0) != "1" &&
                firstLetters.charAt(0).toUpperCase() != firstLetters.charAt(0)) {
                chain = "any";
            }
            selectedTextObjects.push(allNodes[i].type);
        }
        else {
            selectedOtherObjects.push(allNodes[i].type);
        }
    }
    figma.ui.postMessage({
        firstLetters,
        numberOfObjectsSelected,
        selectedTextObjects,
        selectedOtherObjects,
        ellipsis,
        chain,
        numberOfCharacters,
    });
}
figma.on("selectionchange", () => {
    trackSelection();
});
figma.on("run", () => {
    trackSelection();
});
//Message from UI
let prefix = "";
figma.ui.onmessage = (msg) => {
    numberOfCharacters = msg.currentCount;
    if (msg.type === "create") {
        const nodes = [];
        const textNode = figma.createText();
        nodes.push(textNode);
        let text = (0,_helpers_helper__WEBPACK_IMPORTED_MODULE_0__.createAddress)(msg);
        let textChopped = (0,_helpers_helper__WEBPACK_IMPORTED_MODULE_0__.addressFormatted)(text, msg);
        textNode.characters = textChopped;
        textNode.fontSize = 24;
        textNode.fontName = { family: "Inter", style: "Regular" };
        textNode.x = figma.viewport.center.x;
        textNode.y = figma.viewport.center.y;
        figma.currentPage.selection = nodes;
    }
    if (msg.type === "regenerate") {
        for (let i = 0; i < allNodes.length; i++) {
            figma.loadFontAsync(allNodes[i].fontName);
            let text = (0,_helpers_helper__WEBPACK_IMPORTED_MODULE_0__.createAddress)(msg);
            let textChopped = (0,_helpers_helper__WEBPACK_IMPORTED_MODULE_0__.addressFormatted)(text, msg);
            allNodes[i].characters = textChopped;
        }
    }
    if (msg.type === "deselect-non-text") {
        for (let i = 0; i < allNodes.length; i++) {
            if (allNodes[i].type === "TEXT") {
                newSelection.push(allNodes[i]);
            }
            newSelection === 0
                ? (figma.currentPage.selection = [])
                : (figma.currentPage.selection = newSelection);
        }
    }
};
// figma.closePlugin();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7Ozs7Ozs7VUMzRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05tRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxzQkFBc0IsbUNBQW1DO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsOERBQWE7QUFDaEMsMEJBQTBCLGlFQUFnQjtBQUMxQztBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IscUJBQXFCO0FBQzdDO0FBQ0EsdUJBQXVCLDhEQUFhO0FBQ3BDLDhCQUE4QixpRUFBZ0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IscUJBQXFCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWRkcmVzcy1nZW5lcmF0b3IvLi9oZWxwZXJzL2hlbHBlci50cyIsIndlYnBhY2s6Ly9hZGRyZXNzLWdlbmVyYXRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hZGRyZXNzLWdlbmVyYXRvci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYWRkcmVzcy1nZW5lcmF0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hZGRyZXNzLWdlbmVyYXRvci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2FkZHJlc3MtZ2VuZXJhdG9yLy4vY29kZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gbWFrZWlkKGxlbmd0aCwgbXNnKSB7XG4gICAgdmFyIHJlc3VsdCA9IFwiXCI7XG4gICAgdmFyIGNoYXJhY3RlcnMgPSBtc2cuY3VycmVudENoYWluID09PSBcImV0aGVyZXVtXCJcbiAgICAgICAgPyBcIkFCQ0RFRmFiY2RlZjAxMjM0NTZcIlxuICAgICAgICA6IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcbiAgICB2YXIgY2hhcmFjdGVyc0xlbmd0aCA9IGNoYXJhY3RlcnMubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0ZXh0VG9EaXNwbGF5KG1zZykge1xuICAgIGxldCBwcmVmaXggPSBcIlwiO1xuICAgIGlmIChtc2cuY3VycmVudENoYWluID09PSBcImV0aGVyZXVtXCIpIHtcbiAgICAgICAgcHJlZml4ID0gXCIweFwiO1xuICAgIH1cbiAgICBpZiAobXNnLmN1cnJlbnRDaGFpbiA9PT0gXCJwb2xrYWRvdFwiKSB7XG4gICAgICAgIHByZWZpeCA9IFwiMVwiO1xuICAgIH1cbiAgICBpZiAobXNnLmN1cnJlbnRDaGFpbiA9PT0gXCJrdXNhbWFcIikge1xuICAgICAgICBwcmVmaXggPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCIuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI2KSk7XG4gICAgfVxuICAgIGNvbnN0IGFkZHJlc3MgPSBwcmVmaXggPT09IFwiMHhcIiB8fCBcIlwiXG4gICAgICAgID8gcHJlZml4ICsgbWFrZWlkKG1zZy5jdXJyZW50Q291bnQgLSAyLCBtc2cpXG4gICAgICAgIDogcHJlZml4ICsgbWFrZWlkKG1zZy5jdXJyZW50Q291bnQsIG1zZyk7XG4gICAgY29uc3QgYWRkcmVzc0JlZ2luID0gcHJlZml4ID09PSBcIjB4XCIgfHwgXCJcIlxuICAgICAgICA/IHByZWZpeCArIG1ha2VpZChtc2cuY3VycmVudENvdW50IC8gMiAtIDIsIG1zZylcbiAgICAgICAgOiBwcmVmaXggKyBtYWtlaWQobXNnLmN1cnJlbnRDb3VudCAvIDIsIG1zZyk7XG4gICAgY29uc3QgYWRkcmVzc0VuZCA9IG1ha2VpZChtc2cuY3VycmVudENvdW50IC8gMiwgbXNnKTtcbiAgICByZXR1cm4gW2FkZHJlc3MsIGFkZHJlc3NCZWdpbiwgYWRkcmVzc0VuZF07XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWRkcmVzcyhtc2cpIHtcbiAgICBsZXQgcHJlZml4ID0gXCJcIjtcbiAgICBpZiAobXNnLmN1cnJlbnRDaGFpbiA9PT0gXCJldGhlcmV1bVwiKSB7XG4gICAgICAgIHByZWZpeCA9IFwiMHhcIjtcbiAgICB9XG4gICAgaWYgKG1zZy5jdXJyZW50Q2hhaW4gPT09IFwicG9sa2Fkb3RcIikge1xuICAgICAgICBwcmVmaXggPSBcIjFcIjtcbiAgICB9XG4gICAgaWYgKG1zZy5jdXJyZW50Q2hhaW4gPT09IFwia3VzYW1hXCIpIHtcbiAgICAgICAgcHJlZml4ID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlwiLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNikpO1xuICAgIH1cbiAgICBsZXQgYWRkcmVzcztcbiAgICBpZiAobXNnLmN1cnJlbnRDaGFpbiA9PT0gXCJldGhlcmV1bVwiKSB7XG4gICAgICAgIGFkZHJlc3MgPSBwcmVmaXggKyBtYWtlaWQobXNnLmN1cnJlbnRDb3VudCAtIDIsIG1zZyk7XG4gICAgfVxuICAgIGlmIChtc2cuY3VycmVudENoYWluID09PSBcInBvbGthZG90XCIgfHwgbXNnLmN1cnJlbnRDaGFpbiA9PT0gXCJrdXNhbWFcIikge1xuICAgICAgICBhZGRyZXNzID0gcHJlZml4ICsgbWFrZWlkKG1zZy5jdXJyZW50Q291bnQgLSAxLCBtc2cpO1xuICAgIH1cbiAgICBpZiAobXNnLmN1cnJlbnRDaGFpbiA9PT0gXCJhbnlcIikge1xuICAgICAgICBhZGRyZXNzID0gbWFrZWlkKG1zZy5jdXJyZW50Q291bnQsIG1zZyk7XG4gICAgfVxuICAgIHJldHVybiBhZGRyZXNzO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFkZHJlc3NGb3JtYXR0ZWQoYWRkcmVzcywgbXNnKSB7XG4gICAgbGV0IGNoYXJhY3RlcnM7XG4gICAgaWYgKG1zZy5jdXJyZW50RWxsaXBzaXMgPT09IFwibm9uZVwiIHx8IG1zZy5jdXJyZW50RWxsaXBzaXMgPT09IFwiTm9uZVwiKSB7XG4gICAgICAgIGNoYXJhY3RlcnMgPSBhZGRyZXNzO1xuICAgIH1cbiAgICBpZiAobXNnLmN1cnJlbnRFbGxpcHNpcyA9PT0gXCJjZW50ZXJcIiB8fCBtc2cuY3VycmVudEVsbGlwc2lzID09PSBcIkNlbnRlclwiKSB7XG4gICAgICAgIGNoYXJhY3RlcnMgPVxuICAgICAgICAgICAgYWRkcmVzcy5zdWJzdHJpbmcoMCwgbXNnLmN1cnJlbnRDb3VudCAvIDIgLSAyKSArXG4gICAgICAgICAgICAgICAgXCIuLi5cIiArXG4gICAgICAgICAgICAgICAgYWRkcmVzcy5zdWJzdHJpbmcobXNnLmN1cnJlbnRDb3VudCAvIDIsIG1zZy5jdXJyZW50Q291bnQgLSAxKTtcbiAgICB9XG4gICAgaWYgKG1zZy5jdXJyZW50RWxsaXBzaXMgPT09IFwic3RhcnRcIiB8fCBtc2cuY3VycmVudEVsbGlwc2lzID09PSBcIlN0YXJ0XCIpIHtcbiAgICAgICAgY2hhcmFjdGVycyA9IFwiLi4uXCIgKyBhZGRyZXNzLnN1YnN0cmluZygzKTtcbiAgICB9XG4gICAgaWYgKG1zZy5jdXJyZW50RWxsaXBzaXMgPT09IFwiZW5kXCIgfHwgbXNnLmN1cnJlbnRFbGxpcHNpcyA9PT0gXCJFbmRcIikge1xuICAgICAgICBjaGFyYWN0ZXJzID0gYWRkcmVzcy5zdWJzdHJpbmcoMCwgbXNnLmN1cnJlbnRDb3VudCAtIDMpICsgXCIuLi5cIjtcbiAgICB9XG4gICAgcmV0dXJuIGNoYXJhY3RlcnM7XG59XG5leHBvcnQgZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNyZWF0ZUFkZHJlc3MsIGFkZHJlc3NGb3JtYXR0ZWQgfSBmcm9tIFwiLi9oZWxwZXJzL2hlbHBlclwiO1xuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7XG4gICAgdGhlbWVDb2xvcnM6IHRydWUsXG4gICAgd2lkdGg6IDM0MCxcbiAgICBoZWlnaHQ6IDMwMCxcbiAgICB0aXRsZTogXCJSYW5kb20gV2ViMyBBZGRyZXNzIEdlbmVyYXRvclwiLFxufSk7XG5sZXQgYWxsTm9kZXMgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XG5sZXQgbmV3U2VsZWN0aW9uID0gW107XG5maWdtYS5sb2FkRm9udEFzeW5jKHsgZmFtaWx5OiBcIkludGVyXCIsIHN0eWxlOiBcIlJlZ3VsYXJcIiB9KTtcbmxldCBlbGxpcHNpcyA9IFwibm9uZVwiO1xubGV0IGNoYWluID0gXCJhbnlcIjtcbmxldCBudW1iZXJPZkNoYXJhY3RlcnMgPSAyNDtcbmxldCBzZWxlY3RlZFRleHRPYmplY3RzID0gW107XG5sZXQgc2VsZWN0ZWRPdGhlck9iamVjdHMgPSBbXTtcbmZ1bmN0aW9uIHRyYWNrU2VsZWN0aW9uKCkge1xuICAgIGFsbE5vZGVzID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xuICAgIHNlbGVjdGVkVGV4dE9iamVjdHMgPSBbXTtcbiAgICBzZWxlY3RlZE90aGVyT2JqZWN0cyA9IFtdO1xuICAgIG5ld1NlbGVjdGlvbiA9IFtdO1xuICAgIGxldCBmaXJzdExldHRlcnMgPSBcIlwiO1xuICAgIGxldCBudW1iZXJPZk9iamVjdHNTZWxlY3RlZCA9IGFsbE5vZGVzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoO1xuICAgICAgICBpZiAoYWxsTm9kZXMubGVuZ3RoID09PSAxICYmIGFsbE5vZGVzW2ldLnR5cGUgPT0gXCJURVhUXCIpIHtcbiAgICAgICAgICAgIGZpcnN0TGV0dGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3Vic3RyaW5nKDAsIDIpO1xuICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFsbE5vZGVzW2ldICYmIGFsbE5vZGVzW2ldLnR5cGUgPT0gXCJURVhUXCIpIHtcbiAgICAgICAgICAgIGZpZ21hLmxvYWRGb250QXN5bmMoYWxsTm9kZXNbaV0uZm9udE5hbWUpO1xuICAgICAgICAgICAgaWYgKCFhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmluY2x1ZGVzKFwiLi4uXCIpKSB7XG4gICAgICAgICAgICAgICAgZWxsaXBzaXMgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCIuLi5cIikpIHtcbiAgICAgICAgICAgICAgICBlbGxpcHNpcyA9IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmVuZHNXaXRoKFwiLi4uXCIpKSB7XG4gICAgICAgICAgICAgICAgZWxsaXBzaXMgPSBcImVuZFwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuaW5jbHVkZXMoXCIuLi5cIikgJiZcbiAgICAgICAgICAgICAgICAhYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5lbmRzV2l0aChcIi4uLlwiKSAmJlxuICAgICAgICAgICAgICAgICFhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCIuLi5cIikpIHtcbiAgICAgICAgICAgICAgICBlbGxpcHNpcyA9IFwiY2VudGVyXCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlyc3RMZXR0ZXJzLmNoYXJBdCgwKS5tYXRjaCgvW2Etel0vaSkgJiZcbiAgICAgICAgICAgICAgICBmaXJzdExldHRlcnMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgPT09IGZpcnN0TGV0dGVycy5jaGFyQXQoMCkpIHtcbiAgICAgICAgICAgICAgICBjaGFpbiA9IFwia3VzYW1hXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlyc3RMZXR0ZXJzLmNoYXJBdCgwKSA9PT0gXCIxXCIpIHtcbiAgICAgICAgICAgICAgICBjaGFpbiA9IFwicG9sa2Fkb3RcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaXJzdExldHRlcnMgPT09IFwiMHhcIikge1xuICAgICAgICAgICAgICAgIGNoYWluID0gXCJldGhlcmV1bVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpcnN0TGV0dGVycyA9PT0gXCIuLlwiKSB7XG4gICAgICAgICAgICAgICAgY2hhaW4gPSBcImFueVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpcnN0TGV0dGVycyAhPT0gXCIweFwiICYmXG4gICAgICAgICAgICAgICAgZmlyc3RMZXR0ZXJzLmNoYXJBdCgwKSAhPSBcIjFcIiAmJlxuICAgICAgICAgICAgICAgIGZpcnN0TGV0dGVycy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSAhPSBmaXJzdExldHRlcnMuY2hhckF0KDApKSB7XG4gICAgICAgICAgICAgICAgY2hhaW4gPSBcImFueVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZWN0ZWRUZXh0T2JqZWN0cy5wdXNoKGFsbE5vZGVzW2ldLnR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VsZWN0ZWRPdGhlck9iamVjdHMucHVzaChhbGxOb2Rlc1tpXS50eXBlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGZpcnN0TGV0dGVycyxcbiAgICAgICAgbnVtYmVyT2ZPYmplY3RzU2VsZWN0ZWQsXG4gICAgICAgIHNlbGVjdGVkVGV4dE9iamVjdHMsXG4gICAgICAgIHNlbGVjdGVkT3RoZXJPYmplY3RzLFxuICAgICAgICBlbGxpcHNpcyxcbiAgICAgICAgY2hhaW4sXG4gICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyxcbiAgICB9KTtcbn1cbmZpZ21hLm9uKFwic2VsZWN0aW9uY2hhbmdlXCIsICgpID0+IHtcbiAgICB0cmFja1NlbGVjdGlvbigpO1xufSk7XG5maWdtYS5vbihcInJ1blwiLCAoKSA9PiB7XG4gICAgdHJhY2tTZWxlY3Rpb24oKTtcbn0pO1xuLy9NZXNzYWdlIGZyb20gVUlcbmxldCBwcmVmaXggPSBcIlwiO1xuZmlnbWEudWkub25tZXNzYWdlID0gKG1zZykgPT4ge1xuICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IG1zZy5jdXJyZW50Q291bnQ7XG4gICAgaWYgKG1zZy50eXBlID09PSBcImNyZWF0ZVwiKSB7XG4gICAgICAgIGNvbnN0IG5vZGVzID0gW107XG4gICAgICAgIGNvbnN0IHRleHROb2RlID0gZmlnbWEuY3JlYXRlVGV4dCgpO1xuICAgICAgICBub2Rlcy5wdXNoKHRleHROb2RlKTtcbiAgICAgICAgbGV0IHRleHQgPSBjcmVhdGVBZGRyZXNzKG1zZyk7XG4gICAgICAgIGxldCB0ZXh0Q2hvcHBlZCA9IGFkZHJlc3NGb3JtYXR0ZWQodGV4dCwgbXNnKTtcbiAgICAgICAgdGV4dE5vZGUuY2hhcmFjdGVycyA9IHRleHRDaG9wcGVkO1xuICAgICAgICB0ZXh0Tm9kZS5mb250U2l6ZSA9IDI0O1xuICAgICAgICB0ZXh0Tm9kZS5mb250TmFtZSA9IHsgZmFtaWx5OiBcIkludGVyXCIsIHN0eWxlOiBcIlJlZ3VsYXJcIiB9O1xuICAgICAgICB0ZXh0Tm9kZS54ID0gZmlnbWEudmlld3BvcnQuY2VudGVyLng7XG4gICAgICAgIHRleHROb2RlLnkgPSBmaWdtYS52aWV3cG9ydC5jZW50ZXIueTtcbiAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gbm9kZXM7XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJyZWdlbmVyYXRlXCIpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxOb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZmlnbWEubG9hZEZvbnRBc3luYyhhbGxOb2Rlc1tpXS5mb250TmFtZSk7XG4gICAgICAgICAgICBsZXQgdGV4dCA9IGNyZWF0ZUFkZHJlc3MobXNnKTtcbiAgICAgICAgICAgIGxldCB0ZXh0Q2hvcHBlZCA9IGFkZHJlc3NGb3JtYXR0ZWQodGV4dCwgbXNnKTtcbiAgICAgICAgICAgIGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMgPSB0ZXh0Q2hvcHBlZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwiZGVzZWxlY3Qtbm9uLXRleHRcIikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0udHlwZSA9PT0gXCJURVhUXCIpIHtcbiAgICAgICAgICAgICAgICBuZXdTZWxlY3Rpb24ucHVzaChhbGxOb2Rlc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdTZWxlY3Rpb24gPT09IDBcbiAgICAgICAgICAgICAgICA/IChmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBbXSlcbiAgICAgICAgICAgICAgICA6IChmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBuZXdTZWxlY3Rpb24pO1xuICAgICAgICB9XG4gICAgfVxufTtcbi8vIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=