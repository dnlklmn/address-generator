/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./helper.ts":
/*!*******************!*\
  !*** ./helper.ts ***!
  \*******************/
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
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./helper.ts");

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
        let text = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.createAddress)(msg);
        let textChopped = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.addressFormatted)(text, msg);
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
            let text = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.createAddress)(msg);
            let textChopped = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.addressFormatted)(text, msg);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7Ozs7Ozs7VUMzRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ04yRDtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxzQkFBc0IsbUNBQW1DO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsc0RBQWE7QUFDaEMsMEJBQTBCLHlEQUFnQjtBQUMxQztBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IscUJBQXFCO0FBQzdDO0FBQ0EsdUJBQXVCLHNEQUFhO0FBQ3BDLDhCQUE4Qix5REFBZ0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IscUJBQXFCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWRkcmVzcy1nZW5lcmF0b3IvLi9oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vYWRkcmVzcy1nZW5lcmF0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYWRkcmVzcy1nZW5lcmF0b3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2FkZHJlc3MtZ2VuZXJhdG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYWRkcmVzcy1nZW5lcmF0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9hZGRyZXNzLWdlbmVyYXRvci8uL2NvZGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIG1ha2VpZChsZW5ndGgsIG1zZykge1xuICAgIHZhciByZXN1bHQgPSBcIlwiO1xuICAgIHZhciBjaGFyYWN0ZXJzID0gbXNnLmN1cnJlbnRDaGFpbiA9PT0gXCJldGhlcmV1bVwiXG4gICAgICAgID8gXCJBQkNERUZhYmNkZWYwMTIzNDU2XCJcbiAgICAgICAgOiBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XG4gICAgdmFyIGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBjaGFyYWN0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzTGVuZ3RoKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnQgZnVuY3Rpb24gdGV4dFRvRGlzcGxheShtc2cpIHtcbiAgICBsZXQgcHJlZml4ID0gXCJcIjtcbiAgICBpZiAobXNnLmN1cnJlbnRDaGFpbiA9PT0gXCJldGhlcmV1bVwiKSB7XG4gICAgICAgIHByZWZpeCA9IFwiMHhcIjtcbiAgICB9XG4gICAgaWYgKG1zZy5jdXJyZW50Q2hhaW4gPT09IFwicG9sa2Fkb3RcIikge1xuICAgICAgICBwcmVmaXggPSBcIjFcIjtcbiAgICB9XG4gICAgaWYgKG1zZy5jdXJyZW50Q2hhaW4gPT09IFwia3VzYW1hXCIpIHtcbiAgICAgICAgcHJlZml4ID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlwiLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNikpO1xuICAgIH1cbiAgICBjb25zdCBhZGRyZXNzID0gcHJlZml4ID09PSBcIjB4XCIgfHwgXCJcIlxuICAgICAgICA/IHByZWZpeCArIG1ha2VpZChtc2cuY3VycmVudENvdW50IC0gMiwgbXNnKVxuICAgICAgICA6IHByZWZpeCArIG1ha2VpZChtc2cuY3VycmVudENvdW50LCBtc2cpO1xuICAgIGNvbnN0IGFkZHJlc3NCZWdpbiA9IHByZWZpeCA9PT0gXCIweFwiIHx8IFwiXCJcbiAgICAgICAgPyBwcmVmaXggKyBtYWtlaWQobXNnLmN1cnJlbnRDb3VudCAvIDIgLSAyLCBtc2cpXG4gICAgICAgIDogcHJlZml4ICsgbWFrZWlkKG1zZy5jdXJyZW50Q291bnQgLyAyLCBtc2cpO1xuICAgIGNvbnN0IGFkZHJlc3NFbmQgPSBtYWtlaWQobXNnLmN1cnJlbnRDb3VudCAvIDIsIG1zZyk7XG4gICAgcmV0dXJuIFthZGRyZXNzLCBhZGRyZXNzQmVnaW4sIGFkZHJlc3NFbmRdO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFkZHJlc3MobXNnKSB7XG4gICAgbGV0IHByZWZpeCA9IFwiXCI7XG4gICAgaWYgKG1zZy5jdXJyZW50Q2hhaW4gPT09IFwiZXRoZXJldW1cIikge1xuICAgICAgICBwcmVmaXggPSBcIjB4XCI7XG4gICAgfVxuICAgIGlmIChtc2cuY3VycmVudENoYWluID09PSBcInBvbGthZG90XCIpIHtcbiAgICAgICAgcHJlZml4ID0gXCIxXCI7XG4gICAgfVxuICAgIGlmIChtc2cuY3VycmVudENoYWluID09PSBcImt1c2FtYVwiKSB7XG4gICAgICAgIHByZWZpeCA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpcIi5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjYpKTtcbiAgICB9XG4gICAgbGV0IGFkZHJlc3M7XG4gICAgaWYgKG1zZy5jdXJyZW50Q2hhaW4gPT09IFwiZXRoZXJldW1cIikge1xuICAgICAgICBhZGRyZXNzID0gcHJlZml4ICsgbWFrZWlkKG1zZy5jdXJyZW50Q291bnQgLSAyLCBtc2cpO1xuICAgIH1cbiAgICBpZiAobXNnLmN1cnJlbnRDaGFpbiA9PT0gXCJwb2xrYWRvdFwiIHx8IG1zZy5jdXJyZW50Q2hhaW4gPT09IFwia3VzYW1hXCIpIHtcbiAgICAgICAgYWRkcmVzcyA9IHByZWZpeCArIG1ha2VpZChtc2cuY3VycmVudENvdW50IC0gMSwgbXNnKTtcbiAgICB9XG4gICAgaWYgKG1zZy5jdXJyZW50Q2hhaW4gPT09IFwiYW55XCIpIHtcbiAgICAgICAgYWRkcmVzcyA9IG1ha2VpZChtc2cuY3VycmVudENvdW50LCBtc2cpO1xuICAgIH1cbiAgICByZXR1cm4gYWRkcmVzcztcbn1cbmV4cG9ydCBmdW5jdGlvbiBhZGRyZXNzRm9ybWF0dGVkKGFkZHJlc3MsIG1zZykge1xuICAgIGxldCBjaGFyYWN0ZXJzO1xuICAgIGlmIChtc2cuY3VycmVudEVsbGlwc2lzID09PSBcIm5vbmVcIiB8fCBtc2cuY3VycmVudEVsbGlwc2lzID09PSBcIk5vbmVcIikge1xuICAgICAgICBjaGFyYWN0ZXJzID0gYWRkcmVzcztcbiAgICB9XG4gICAgaWYgKG1zZy5jdXJyZW50RWxsaXBzaXMgPT09IFwiY2VudGVyXCIgfHwgbXNnLmN1cnJlbnRFbGxpcHNpcyA9PT0gXCJDZW50ZXJcIikge1xuICAgICAgICBjaGFyYWN0ZXJzID1cbiAgICAgICAgICAgIGFkZHJlc3Muc3Vic3RyaW5nKDAsIG1zZy5jdXJyZW50Q291bnQgLyAyIC0gMikgK1xuICAgICAgICAgICAgICAgIFwiLi4uXCIgK1xuICAgICAgICAgICAgICAgIGFkZHJlc3Muc3Vic3RyaW5nKG1zZy5jdXJyZW50Q291bnQgLyAyLCBtc2cuY3VycmVudENvdW50IC0gMSk7XG4gICAgfVxuICAgIGlmIChtc2cuY3VycmVudEVsbGlwc2lzID09PSBcInN0YXJ0XCIgfHwgbXNnLmN1cnJlbnRFbGxpcHNpcyA9PT0gXCJTdGFydFwiKSB7XG4gICAgICAgIGNoYXJhY3RlcnMgPSBcIi4uLlwiICsgYWRkcmVzcy5zdWJzdHJpbmcoMyk7XG4gICAgfVxuICAgIGlmIChtc2cuY3VycmVudEVsbGlwc2lzID09PSBcImVuZFwiIHx8IG1zZy5jdXJyZW50RWxsaXBzaXMgPT09IFwiRW5kXCIpIHtcbiAgICAgICAgY2hhcmFjdGVycyA9IGFkZHJlc3Muc3Vic3RyaW5nKDAsIG1zZy5jdXJyZW50Q291bnQgLSAzKSArIFwiLi4uXCI7XG4gICAgfVxuICAgIHJldHVybiBjaGFyYWN0ZXJzO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlcihzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVBZGRyZXNzLCBhZGRyZXNzRm9ybWF0dGVkIH0gZnJvbSBcIi4vaGVscGVyXCI7XG5maWdtYS5zaG93VUkoX19odG1sX18sIHtcbiAgICB0aGVtZUNvbG9yczogdHJ1ZSxcbiAgICB3aWR0aDogMzQwLFxuICAgIGhlaWdodDogMzAwLFxuICAgIHRpdGxlOiBcIlJhbmRvbSBXZWIzIEFkZHJlc3MgR2VuZXJhdG9yXCIsXG59KTtcbmxldCBhbGxOb2RlcyA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbjtcbmxldCBuZXdTZWxlY3Rpb24gPSBbXTtcbmZpZ21hLmxvYWRGb250QXN5bmMoeyBmYW1pbHk6IFwiSW50ZXJcIiwgc3R5bGU6IFwiUmVndWxhclwiIH0pO1xubGV0IGVsbGlwc2lzID0gXCJub25lXCI7XG5sZXQgY2hhaW4gPSBcImFueVwiO1xubGV0IG51bWJlck9mQ2hhcmFjdGVycyA9IDI0O1xubGV0IHNlbGVjdGVkVGV4dE9iamVjdHMgPSBbXTtcbmxldCBzZWxlY3RlZE90aGVyT2JqZWN0cyA9IFtdO1xuZnVuY3Rpb24gdHJhY2tTZWxlY3Rpb24oKSB7XG4gICAgYWxsTm9kZXMgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XG4gICAgc2VsZWN0ZWRUZXh0T2JqZWN0cyA9IFtdO1xuICAgIHNlbGVjdGVkT3RoZXJPYmplY3RzID0gW107XG4gICAgbmV3U2VsZWN0aW9uID0gW107XG4gICAgbGV0IGZpcnN0TGV0dGVycyA9IFwiXCI7XG4gICAgbGV0IG51bWJlck9mT2JqZWN0c1NlbGVjdGVkID0gYWxsTm9kZXMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgICAgIGlmIChhbGxOb2Rlcy5sZW5ndGggPT09IDEgJiYgYWxsTm9kZXNbaV0udHlwZSA9PSBcIlRFWFRcIikge1xuICAgICAgICAgICAgZmlyc3RMZXR0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5zdWJzdHJpbmcoMCwgMik7XG4gICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWxsTm9kZXNbaV0gJiYgYWxsTm9kZXNbaV0udHlwZSA9PSBcIlRFWFRcIikge1xuICAgICAgICAgICAgZmlnbWEubG9hZEZvbnRBc3luYyhhbGxOb2Rlc1tpXS5mb250TmFtZSk7XG4gICAgICAgICAgICBpZiAoIWFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuaW5jbHVkZXMoXCIuLi5cIikpIHtcbiAgICAgICAgICAgICAgICBlbGxpcHNpcyA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIi4uLlwiKSkge1xuICAgICAgICAgICAgICAgIGVsbGlwc2lzID0gXCJzdGFydFwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuZW5kc1dpdGgoXCIuLi5cIikpIHtcbiAgICAgICAgICAgICAgICBlbGxpcHNpcyA9IFwiZW5kXCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5pbmNsdWRlcyhcIi4uLlwiKSAmJlxuICAgICAgICAgICAgICAgICFhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmVuZHNXaXRoKFwiLi4uXCIpICYmXG4gICAgICAgICAgICAgICAgIWFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIi4uLlwiKSkge1xuICAgICAgICAgICAgICAgIGVsbGlwc2lzID0gXCJjZW50ZXJcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaXJzdExldHRlcnMuY2hhckF0KDApLm1hdGNoKC9bYS16XS9pKSAmJlxuICAgICAgICAgICAgICAgIGZpcnN0TGV0dGVycy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSA9PT0gZmlyc3RMZXR0ZXJzLmNoYXJBdCgwKSkge1xuICAgICAgICAgICAgICAgIGNoYWluID0gXCJrdXNhbWFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaXJzdExldHRlcnMuY2hhckF0KDApID09PSBcIjFcIikge1xuICAgICAgICAgICAgICAgIGNoYWluID0gXCJwb2xrYWRvdFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpcnN0TGV0dGVycyA9PT0gXCIweFwiKSB7XG4gICAgICAgICAgICAgICAgY2hhaW4gPSBcImV0aGVyZXVtXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlyc3RMZXR0ZXJzID09PSBcIi4uXCIpIHtcbiAgICAgICAgICAgICAgICBjaGFpbiA9IFwiYW55XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlyc3RMZXR0ZXJzICE9PSBcIjB4XCIgJiZcbiAgICAgICAgICAgICAgICBmaXJzdExldHRlcnMuY2hhckF0KDApICE9IFwiMVwiICYmXG4gICAgICAgICAgICAgICAgZmlyc3RMZXR0ZXJzLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICE9IGZpcnN0TGV0dGVycy5jaGFyQXQoMCkpIHtcbiAgICAgICAgICAgICAgICBjaGFpbiA9IFwiYW55XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxlY3RlZFRleHRPYmplY3RzLnB1c2goYWxsTm9kZXNbaV0udHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZWxlY3RlZE90aGVyT2JqZWN0cy5wdXNoKGFsbE5vZGVzW2ldLnR5cGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgZmlyc3RMZXR0ZXJzLFxuICAgICAgICBudW1iZXJPZk9iamVjdHNTZWxlY3RlZCxcbiAgICAgICAgc2VsZWN0ZWRUZXh0T2JqZWN0cyxcbiAgICAgICAgc2VsZWN0ZWRPdGhlck9iamVjdHMsXG4gICAgICAgIGVsbGlwc2lzLFxuICAgICAgICBjaGFpbixcbiAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzLFxuICAgIH0pO1xufVxuZmlnbWEub24oXCJzZWxlY3Rpb25jaGFuZ2VcIiwgKCkgPT4ge1xuICAgIHRyYWNrU2VsZWN0aW9uKCk7XG59KTtcbmZpZ21hLm9uKFwicnVuXCIsICgpID0+IHtcbiAgICB0cmFja1NlbGVjdGlvbigpO1xufSk7XG4vL01lc3NhZ2UgZnJvbSBVSVxubGV0IHByZWZpeCA9IFwiXCI7XG5maWdtYS51aS5vbm1lc3NhZ2UgPSAobXNnKSA9PiB7XG4gICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gbXNnLmN1cnJlbnRDb3VudDtcbiAgICBpZiAobXNnLnR5cGUgPT09IFwiY3JlYXRlXCIpIHtcbiAgICAgICAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgICAgICAgY29uc3QgdGV4dE5vZGUgPSBmaWdtYS5jcmVhdGVUZXh0KCk7XG4gICAgICAgIG5vZGVzLnB1c2godGV4dE5vZGUpO1xuICAgICAgICBsZXQgdGV4dCA9IGNyZWF0ZUFkZHJlc3MobXNnKTtcbiAgICAgICAgbGV0IHRleHRDaG9wcGVkID0gYWRkcmVzc0Zvcm1hdHRlZCh0ZXh0LCBtc2cpO1xuICAgICAgICB0ZXh0Tm9kZS5jaGFyYWN0ZXJzID0gdGV4dENob3BwZWQ7XG4gICAgICAgIHRleHROb2RlLmZvbnRTaXplID0gMjQ7XG4gICAgICAgIHRleHROb2RlLmZvbnROYW1lID0geyBmYW1pbHk6IFwiSW50ZXJcIiwgc3R5bGU6IFwiUmVndWxhclwiIH07XG4gICAgICAgIHRleHROb2RlLnggPSBmaWdtYS52aWV3cG9ydC5jZW50ZXIueDtcbiAgICAgICAgdGV4dE5vZGUueSA9IGZpZ21hLnZpZXdwb3J0LmNlbnRlci55O1xuICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBub2RlcztcbiAgICB9XG4gICAgaWYgKG1zZy50eXBlID09PSBcInJlZ2VuZXJhdGVcIikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmaWdtYS5sb2FkRm9udEFzeW5jKGFsbE5vZGVzW2ldLmZvbnROYW1lKTtcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gY3JlYXRlQWRkcmVzcyhtc2cpO1xuICAgICAgICAgICAgbGV0IHRleHRDaG9wcGVkID0gYWRkcmVzc0Zvcm1hdHRlZCh0ZXh0LCBtc2cpO1xuICAgICAgICAgICAgYWxsTm9kZXNbaV0uY2hhcmFjdGVycyA9IHRleHRDaG9wcGVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJkZXNlbGVjdC1ub24tdGV4dFwiKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS50eXBlID09PSBcIlRFWFRcIikge1xuICAgICAgICAgICAgICAgIG5ld1NlbGVjdGlvbi5wdXNoKGFsbE5vZGVzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld1NlbGVjdGlvbiA9PT0gMFxuICAgICAgICAgICAgICAgID8gKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IFtdKVxuICAgICAgICAgICAgICAgIDogKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IG5ld1NlbGVjdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG59O1xuLy8gZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==