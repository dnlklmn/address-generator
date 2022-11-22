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
/* harmony export */   "capitalizeFirstLetter": () => (/* binding */ capitalizeFirstLetter),
/* harmony export */   "makeid": () => (/* binding */ makeid),
/* harmony export */   "setCharacters": () => (/* binding */ setCharacters),
/* harmony export */   "textToDisplay": () => (/* binding */ textToDisplay)
/* harmony export */ });
function makeid(length, msg) {
    var result = "";
    var characters = msg.chainValue === "ethereum"
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
    if (msg.chainValue === "ethereum") {
        prefix = "0x";
    }
    if (msg.chainValue === "polkadot") {
        prefix = "1";
    }
    if (msg.chainValue === "kusama") {
        prefix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random() * 26));
    }
    const textToDisplay = prefix === "0x" || ""
        ? prefix + makeid(msg.countValue, msg)
        : prefix + makeid(msg.countValue - 1, msg);
    const textToDisplayBegin = prefix === "0x" || ""
        ? prefix + makeid(msg.countValue / 2, msg)
        : prefix + makeid(msg.countValue / 2 - 1, msg);
    const textToDisplayEnd = makeid(msg.countValue / 2, msg);
    return [textToDisplay, textToDisplayBegin, textToDisplayEnd];
}
function setCharacters(msg, node, address) {
    if (msg.ellipsisValue === "none") {
        node.characters = address[0];
    }
    if (msg.ellipsisValue === "any") {
        node.characters = address[0];
    }
    if (msg.ellipsisValue === "center") {
        node.characters = address[1] + "..." + address[2];
    }
    if (msg.ellipsisValue === "start") {
        node.characters = "..." + address[0].substring(3);
        console.log("substring:", address[0].substring(3));
    }
    if (msg.ellipsisValue === "end") {
        node.characters = address[0] + "...";
    }
    return node.characters;
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


figma.showUI(__html__, { themeColors: true, width: 340, height: 300 });
let node = figma.currentPage.selection[0];
let allNodes = figma.currentPage.selection;
let newSelection = [];
figma.loadFontAsync({ family: "Inter", style: "Regular" });
let ellipsis = "none";
let chain = "any";
let numberOfCharacters = 0;
let isFirstLetterUppercase = false;
let selectedTextObjects = [];
let selectedOtherObjects = [];
figma.on("selectionchange", () => {
    allNodes = figma.currentPage.selection;
    node = figma.currentPage.selection[0];
    selectedTextObjects = [];
    selectedOtherObjects = [];
    newSelection = [];
    for (let i = 0; i < allNodes.length; i++) {
        if (allNodes[i] && allNodes[i].type == "TEXT") {
            figma.loadFontAsync(allNodes[i].fontName);
            isFirstLetterUppercase = /^[A-Z]/.test(allNodes[i].characters);
            if (!allNodes[i].characters.includes("...")) {
                ellipsis = "none";
                numberOfCharacters = allNodes[i].characters.length;
            }
            if (allNodes[i].characters.startsWith("...")) {
                ellipsis = "start";
                chain = "any";
                numberOfCharacters = allNodes[i].characters.length - 3;
            }
            if (allNodes[i].characters.startsWith("0x")) {
                chain = "ethereum";
                numberOfCharacters = allNodes[i].characters.length - 2;
            }
            if (allNodes[i].characters.startsWith("1")) {
                chain = "polkadot";
                numberOfCharacters = allNodes[i].characters.length;
            }
            if (isFirstLetterUppercase) {
                chain = "kusama";
                numberOfCharacters = allNodes[i].characters.length;
            }
            if (allNodes[i].characters.endsWith("...")) {
                ellipsis = "end";
                numberOfCharacters = allNodes[i].characters.length - 3;
                if (allNodes[i].characters.startsWith("0x")) {
                    chain = "ethereum";
                }
                if (allNodes[i].characters.startsWith("1")) {
                    chain = "polkadot";
                }
                if (allNodes[i].characters.startsWith("A")) {
                    chain = "kusama";
                }
            }
            if (allNodes[i].characters.includes("...") &&
                !allNodes[i].characters.endsWith("...") &&
                !allNodes[i].characters.startsWith("...")) {
                ellipsis = "center";
                numberOfCharacters = allNodes[i].characters.length - 3;
                if (allNodes[i].characters.startsWith("0x")) {
                    chain = "ethereum";
                }
                if (allNodes[i].characters.startsWith("1")) {
                    chain = "polkadot";
                }
                if (isFirstLetterUppercase) {
                    chain = "kusama";
                }
            }
            selectedTextObjects.push(allNodes[i].type);
        }
        else {
            selectedOtherObjects.push(allNodes[i].type);
        }
        // console.log(
        //   "text objects selected:",
        //   selectedTextObjects.length,
        //   ", other objects selected:",
        //   selectedOtherObjects.length
        // );
    }
    figma.ui.postMessage([
        ellipsis,
        numberOfCharacters,
        node ? 1 : 0,
        chain,
        node ? node.type : 0,
        selectedTextObjects.length,
        selectedOtherObjects.length,
    ]);
});
figma.on("run", () => {
    node = figma.currentPage.selection[0];
    allNodes = figma.currentPage.selection;
    if (allNodes.length === 0) {
        selectedTextObjects = [];
        selectedOtherObjects = [];
    }
    for (let i = 0; i < allNodes.length; i++) {
        if (allNodes[i] && allNodes[i].type == "TEXT") {
            figma.loadFontAsync(allNodes[i].fontName);
            isFirstLetterUppercase = /^[A-Z]/.test(allNodes[i].characters);
            if (!allNodes[i].characters.includes("...")) {
                ellipsis = "none";
                numberOfCharacters = allNodes[i].characters.length;
            }
            if (allNodes[i].characters.startsWith("...")) {
                ellipsis = "start";
                chain = "any";
                numberOfCharacters = allNodes[i].characters.length - 3;
            }
            if (allNodes[i].characters.startsWith("0x")) {
                chain = "ethereum";
                numberOfCharacters = allNodes[i].characters.length - 2;
            }
            if (allNodes[i].characters.startsWith("1")) {
                chain = "polkadot";
                numberOfCharacters = allNodes[i].characters.length;
            }
            if (isFirstLetterUppercase) {
                chain = "kusama";
                numberOfCharacters = allNodes[i].characters.length;
            }
            if (allNodes[i].characters.endsWith("...")) {
                ellipsis = "end";
                numberOfCharacters = allNodes[i].characters.length - 3;
                if (allNodes[i].characters.startsWith("0x")) {
                    chain = "ethereum";
                }
                if (allNodes[i].characters.startsWith("1")) {
                    chain = "polkadot";
                }
                if (allNodes[i].characters.startsWith("A")) {
                    chain = "kusama";
                }
            }
            if (allNodes[i].characters.includes("...") &&
                !allNodes[i].characters.endsWith("...") &&
                !allNodes[i].characters.startsWith("...")) {
                ellipsis = "center";
                numberOfCharacters = allNodes[i].characters.length - 3;
                if (allNodes[i].characters.startsWith("0x")) {
                    chain = "ethereum";
                }
                if (allNodes[i].characters.startsWith("1")) {
                    chain = "polkadot";
                }
                if (isFirstLetterUppercase) {
                    chain = "kusama";
                }
            }
            selectedTextObjects.push(allNodes[i].type);
        }
        else {
            selectedOtherObjects.push(allNodes[i].type);
        }
        console.log("text objects selected:", selectedTextObjects.length, ", other objects selected:", selectedOtherObjects.length);
    }
    figma.ui.postMessage([
        ellipsis,
        numberOfCharacters,
        node ? 1 : 0,
        chain,
        node ? node.type : 0,
        selectedTextObjects.length,
        selectedOtherObjects.length,
    ]);
});
//Message from UI
let prefix = "";
figma.ui.onmessage = (msg) => {
    if (msg.type === "create") {
        const nodes = [];
        const textNode = figma.createText();
        nodes.push(textNode);
        let text = (0,_helpers_helper__WEBPACK_IMPORTED_MODULE_0__.textToDisplay)(msg);
        console.log("create-message:", msg);
        textNode.characters = (0,_helpers_helper__WEBPACK_IMPORTED_MODULE_0__.setCharacters)(msg, textNode, text);
        textNode.fontSize = 24;
        textNode.fontName = { family: "Inter", style: "Regular" };
        textNode.x = figma.viewport.center.x;
        textNode.y = figma.viewport.center.y;
        figma.currentPage.selection = nodes;
    }
    if (msg.type === "regenerate") {
        for (let i = 0; i < allNodes.length; i++) {
            figma.loadFontAsync(allNodes[i].fontName);
            let text = (0,_helpers_helper__WEBPACK_IMPORTED_MODULE_0__.textToDisplay)(msg);
            let chars = (0,_helpers_helper__WEBPACK_IMPORTED_MODULE_0__.setCharacters)(msg, allNodes[i], text);
            allNodes[i].characters = chars;
        }
    }
    if (msg.type === "regenerate-all") {
        for (let i = 0; i < allNodes.length; i++) {
            figma.loadFontAsync(allNodes[i].fontName);
            let chars = (0,_helpers_helper__WEBPACK_IMPORTED_MODULE_0__.setCharacters)(msg, allNodes[i], (0,_helpers_helper__WEBPACK_IMPORTED_MODULE_0__.textToDisplay)(msg));
            allNodes[i].characters = chars;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZGRyZXNzLWdlbmVyYXRvci8uL2hlbHBlcnMvaGVscGVyLnRzIiwid2VicGFjazovL2FkZHJlc3MtZ2VuZXJhdG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2FkZHJlc3MtZ2VuZXJhdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9hZGRyZXNzLWdlbmVyYXRvci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2FkZHJlc3MtZ2VuZXJhdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYWRkcmVzcy1nZW5lcmF0b3IvLi9jb2RlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBtYWtlaWQobGVuZ3RoLCBtc2cpIHtcbiAgICB2YXIgcmVzdWx0ID0gXCJcIjtcbiAgICB2YXIgY2hhcmFjdGVycyA9IG1zZy5jaGFpblZhbHVlID09PSBcImV0aGVyZXVtXCJcbiAgICAgICAgPyBcIkFCQ0RFRmFiY2RlZjAxMjM0NTZcIlxuICAgICAgICA6IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcbiAgICB2YXIgY2hhcmFjdGVyc0xlbmd0aCA9IGNoYXJhY3RlcnMubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0ZXh0VG9EaXNwbGF5KG1zZykge1xuICAgIGxldCBwcmVmaXggPSBcIlwiO1xuICAgIGlmIChtc2cuY2hhaW5WYWx1ZSA9PT0gXCJldGhlcmV1bVwiKSB7XG4gICAgICAgIHByZWZpeCA9IFwiMHhcIjtcbiAgICB9XG4gICAgaWYgKG1zZy5jaGFpblZhbHVlID09PSBcInBvbGthZG90XCIpIHtcbiAgICAgICAgcHJlZml4ID0gXCIxXCI7XG4gICAgfVxuICAgIGlmIChtc2cuY2hhaW5WYWx1ZSA9PT0gXCJrdXNhbWFcIikge1xuICAgICAgICBwcmVmaXggPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCIuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI2KSk7XG4gICAgfVxuICAgIGNvbnN0IHRleHRUb0Rpc3BsYXkgPSBwcmVmaXggPT09IFwiMHhcIiB8fCBcIlwiXG4gICAgICAgID8gcHJlZml4ICsgbWFrZWlkKG1zZy5jb3VudFZhbHVlLCBtc2cpXG4gICAgICAgIDogcHJlZml4ICsgbWFrZWlkKG1zZy5jb3VudFZhbHVlIC0gMSwgbXNnKTtcbiAgICBjb25zdCB0ZXh0VG9EaXNwbGF5QmVnaW4gPSBwcmVmaXggPT09IFwiMHhcIiB8fCBcIlwiXG4gICAgICAgID8gcHJlZml4ICsgbWFrZWlkKG1zZy5jb3VudFZhbHVlIC8gMiwgbXNnKVxuICAgICAgICA6IHByZWZpeCArIG1ha2VpZChtc2cuY291bnRWYWx1ZSAvIDIgLSAxLCBtc2cpO1xuICAgIGNvbnN0IHRleHRUb0Rpc3BsYXlFbmQgPSBtYWtlaWQobXNnLmNvdW50VmFsdWUgLyAyLCBtc2cpO1xuICAgIHJldHVybiBbdGV4dFRvRGlzcGxheSwgdGV4dFRvRGlzcGxheUJlZ2luLCB0ZXh0VG9EaXNwbGF5RW5kXTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXRDaGFyYWN0ZXJzKG1zZywgbm9kZSwgYWRkcmVzcykge1xuICAgIGlmIChtc2cuZWxsaXBzaXNWYWx1ZSA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgbm9kZS5jaGFyYWN0ZXJzID0gYWRkcmVzc1swXTtcbiAgICB9XG4gICAgaWYgKG1zZy5lbGxpcHNpc1ZhbHVlID09PSBcImFueVwiKSB7XG4gICAgICAgIG5vZGUuY2hhcmFjdGVycyA9IGFkZHJlc3NbMF07XG4gICAgfVxuICAgIGlmIChtc2cuZWxsaXBzaXNWYWx1ZSA9PT0gXCJjZW50ZXJcIikge1xuICAgICAgICBub2RlLmNoYXJhY3RlcnMgPSBhZGRyZXNzWzFdICsgXCIuLi5cIiArIGFkZHJlc3NbMl07XG4gICAgfVxuICAgIGlmIChtc2cuZWxsaXBzaXNWYWx1ZSA9PT0gXCJzdGFydFwiKSB7XG4gICAgICAgIG5vZGUuY2hhcmFjdGVycyA9IFwiLi4uXCIgKyBhZGRyZXNzWzBdLnN1YnN0cmluZygzKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJzdWJzdHJpbmc6XCIsIGFkZHJlc3NbMF0uc3Vic3RyaW5nKDMpKTtcbiAgICB9XG4gICAgaWYgKG1zZy5lbGxpcHNpc1ZhbHVlID09PSBcImVuZFwiKSB7XG4gICAgICAgIG5vZGUuY2hhcmFjdGVycyA9IGFkZHJlc3NbMF0gKyBcIi4uLlwiO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZS5jaGFyYWN0ZXJzO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlcihzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyB0ZXh0VG9EaXNwbGF5IH0gZnJvbSBcIi4vaGVscGVycy9oZWxwZXJcIjtcbmltcG9ydCB7IHNldENoYXJhY3RlcnMgfSBmcm9tIFwiLi9oZWxwZXJzL2hlbHBlclwiO1xuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IHRoZW1lQ29sb3JzOiB0cnVlLCB3aWR0aDogMzQwLCBoZWlnaHQ6IDMwMCB9KTtcbmxldCBub2RlID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uWzBdO1xubGV0IGFsbE5vZGVzID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xubGV0IG5ld1NlbGVjdGlvbiA9IFtdO1xuZmlnbWEubG9hZEZvbnRBc3luYyh7IGZhbWlseTogXCJJbnRlclwiLCBzdHlsZTogXCJSZWd1bGFyXCIgfSk7XG5sZXQgZWxsaXBzaXMgPSBcIm5vbmVcIjtcbmxldCBjaGFpbiA9IFwiYW55XCI7XG5sZXQgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gMDtcbmxldCBpc0ZpcnN0TGV0dGVyVXBwZXJjYXNlID0gZmFsc2U7XG5sZXQgc2VsZWN0ZWRUZXh0T2JqZWN0cyA9IFtdO1xubGV0IHNlbGVjdGVkT3RoZXJPYmplY3RzID0gW107XG5maWdtYS5vbihcInNlbGVjdGlvbmNoYW5nZVwiLCAoKSA9PiB7XG4gICAgYWxsTm9kZXMgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XG4gICAgbm9kZSA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXTtcbiAgICBzZWxlY3RlZFRleHRPYmplY3RzID0gW107XG4gICAgc2VsZWN0ZWRPdGhlck9iamVjdHMgPSBbXTtcbiAgICBuZXdTZWxlY3Rpb24gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhbGxOb2Rlc1tpXSAmJiBhbGxOb2Rlc1tpXS50eXBlID09IFwiVEVYVFwiKSB7XG4gICAgICAgICAgICBmaWdtYS5sb2FkRm9udEFzeW5jKGFsbE5vZGVzW2ldLmZvbnROYW1lKTtcbiAgICAgICAgICAgIGlzRmlyc3RMZXR0ZXJVcHBlcmNhc2UgPSAvXltBLVpdLy50ZXN0KGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMpO1xuICAgICAgICAgICAgaWYgKCFhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmluY2x1ZGVzKFwiLi4uXCIpKSB7XG4gICAgICAgICAgICAgICAgZWxsaXBzaXMgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCIuLi5cIikpIHtcbiAgICAgICAgICAgICAgICBlbGxpcHNpcyA9IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICBjaGFpbiA9IFwiYW55XCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGggLSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgICAgICAgICAgY2hhaW4gPSBcImV0aGVyZXVtXCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGggLSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjFcIikpIHtcbiAgICAgICAgICAgICAgICBjaGFpbiA9IFwicG9sa2Fkb3RcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0ZpcnN0TGV0dGVyVXBwZXJjYXNlKSB7XG4gICAgICAgICAgICAgICAgY2hhaW4gPSBcImt1c2FtYVwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuZW5kc1dpdGgoXCIuLi5cIikpIHtcbiAgICAgICAgICAgICAgICBlbGxpcHNpcyA9IFwiZW5kXCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGggLSAzO1xuICAgICAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCIweFwiKSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFpbiA9IFwiZXRoZXJldW1cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjFcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaW4gPSBcInBvbGthZG90XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCJBXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWluID0gXCJrdXNhbWFcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5pbmNsdWRlcyhcIi4uLlwiKSAmJlxuICAgICAgICAgICAgICAgICFhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmVuZHNXaXRoKFwiLi4uXCIpICYmXG4gICAgICAgICAgICAgICAgIWFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIi4uLlwiKSkge1xuICAgICAgICAgICAgICAgIGVsbGlwc2lzID0gXCJjZW50ZXJcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aCAtIDM7XG4gICAgICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWluID0gXCJldGhlcmV1bVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5zdGFydHNXaXRoKFwiMVwiKSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFpbiA9IFwicG9sa2Fkb3RcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzRmlyc3RMZXR0ZXJVcHBlcmNhc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaW4gPSBcImt1c2FtYVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGVjdGVkVGV4dE9iamVjdHMucHVzaChhbGxOb2Rlc1tpXS50eXBlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlbGVjdGVkT3RoZXJPYmplY3RzLnB1c2goYWxsTm9kZXNbaV0udHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coXG4gICAgICAgIC8vICAgXCJ0ZXh0IG9iamVjdHMgc2VsZWN0ZWQ6XCIsXG4gICAgICAgIC8vICAgc2VsZWN0ZWRUZXh0T2JqZWN0cy5sZW5ndGgsXG4gICAgICAgIC8vICAgXCIsIG90aGVyIG9iamVjdHMgc2VsZWN0ZWQ6XCIsXG4gICAgICAgIC8vICAgc2VsZWN0ZWRPdGhlck9iamVjdHMubGVuZ3RoXG4gICAgICAgIC8vICk7XG4gICAgfVxuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKFtcbiAgICAgICAgZWxsaXBzaXMsXG4gICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyxcbiAgICAgICAgbm9kZSA/IDEgOiAwLFxuICAgICAgICBjaGFpbixcbiAgICAgICAgbm9kZSA/IG5vZGUudHlwZSA6IDAsXG4gICAgICAgIHNlbGVjdGVkVGV4dE9iamVjdHMubGVuZ3RoLFxuICAgICAgICBzZWxlY3RlZE90aGVyT2JqZWN0cy5sZW5ndGgsXG4gICAgXSk7XG59KTtcbmZpZ21hLm9uKFwicnVuXCIsICgpID0+IHtcbiAgICBub2RlID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uWzBdO1xuICAgIGFsbE5vZGVzID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xuICAgIGlmIChhbGxOb2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgc2VsZWN0ZWRUZXh0T2JqZWN0cyA9IFtdO1xuICAgICAgICBzZWxlY3RlZE90aGVyT2JqZWN0cyA9IFtdO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhbGxOb2Rlc1tpXSAmJiBhbGxOb2Rlc1tpXS50eXBlID09IFwiVEVYVFwiKSB7XG4gICAgICAgICAgICBmaWdtYS5sb2FkRm9udEFzeW5jKGFsbE5vZGVzW2ldLmZvbnROYW1lKTtcbiAgICAgICAgICAgIGlzRmlyc3RMZXR0ZXJVcHBlcmNhc2UgPSAvXltBLVpdLy50ZXN0KGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMpO1xuICAgICAgICAgICAgaWYgKCFhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmluY2x1ZGVzKFwiLi4uXCIpKSB7XG4gICAgICAgICAgICAgICAgZWxsaXBzaXMgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCIuLi5cIikpIHtcbiAgICAgICAgICAgICAgICBlbGxpcHNpcyA9IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICBjaGFpbiA9IFwiYW55XCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGggLSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgICAgICAgICAgY2hhaW4gPSBcImV0aGVyZXVtXCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGggLSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjFcIikpIHtcbiAgICAgICAgICAgICAgICBjaGFpbiA9IFwicG9sa2Fkb3RcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0ZpcnN0TGV0dGVyVXBwZXJjYXNlKSB7XG4gICAgICAgICAgICAgICAgY2hhaW4gPSBcImt1c2FtYVwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuZW5kc1dpdGgoXCIuLi5cIikpIHtcbiAgICAgICAgICAgICAgICBlbGxpcHNpcyA9IFwiZW5kXCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGggLSAzO1xuICAgICAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCIweFwiKSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFpbiA9IFwiZXRoZXJldW1cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjFcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaW4gPSBcInBvbGthZG90XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCJBXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWluID0gXCJrdXNhbWFcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5pbmNsdWRlcyhcIi4uLlwiKSAmJlxuICAgICAgICAgICAgICAgICFhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmVuZHNXaXRoKFwiLi4uXCIpICYmXG4gICAgICAgICAgICAgICAgIWFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIi4uLlwiKSkge1xuICAgICAgICAgICAgICAgIGVsbGlwc2lzID0gXCJjZW50ZXJcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aCAtIDM7XG4gICAgICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWluID0gXCJldGhlcmV1bVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5zdGFydHNXaXRoKFwiMVwiKSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFpbiA9IFwicG9sa2Fkb3RcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzRmlyc3RMZXR0ZXJVcHBlcmNhc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaW4gPSBcImt1c2FtYVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGVjdGVkVGV4dE9iamVjdHMucHVzaChhbGxOb2Rlc1tpXS50eXBlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlbGVjdGVkT3RoZXJPYmplY3RzLnB1c2goYWxsTm9kZXNbaV0udHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJ0ZXh0IG9iamVjdHMgc2VsZWN0ZWQ6XCIsIHNlbGVjdGVkVGV4dE9iamVjdHMubGVuZ3RoLCBcIiwgb3RoZXIgb2JqZWN0cyBzZWxlY3RlZDpcIiwgc2VsZWN0ZWRPdGhlck9iamVjdHMubGVuZ3RoKTtcbiAgICB9XG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoW1xuICAgICAgICBlbGxpcHNpcyxcbiAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzLFxuICAgICAgICBub2RlID8gMSA6IDAsXG4gICAgICAgIGNoYWluLFxuICAgICAgICBub2RlID8gbm9kZS50eXBlIDogMCxcbiAgICAgICAgc2VsZWN0ZWRUZXh0T2JqZWN0cy5sZW5ndGgsXG4gICAgICAgIHNlbGVjdGVkT3RoZXJPYmplY3RzLmxlbmd0aCxcbiAgICBdKTtcbn0pO1xuLy9NZXNzYWdlIGZyb20gVUlcbmxldCBwcmVmaXggPSBcIlwiO1xuZmlnbWEudWkub25tZXNzYWdlID0gKG1zZykgPT4ge1xuICAgIGlmIChtc2cudHlwZSA9PT0gXCJjcmVhdGVcIikge1xuICAgICAgICBjb25zdCBub2RlcyA9IFtdO1xuICAgICAgICBjb25zdCB0ZXh0Tm9kZSA9IGZpZ21hLmNyZWF0ZVRleHQoKTtcbiAgICAgICAgbm9kZXMucHVzaCh0ZXh0Tm9kZSk7XG4gICAgICAgIGxldCB0ZXh0ID0gdGV4dFRvRGlzcGxheShtc2cpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZS1tZXNzYWdlOlwiLCBtc2cpO1xuICAgICAgICB0ZXh0Tm9kZS5jaGFyYWN0ZXJzID0gc2V0Q2hhcmFjdGVycyhtc2csIHRleHROb2RlLCB0ZXh0KTtcbiAgICAgICAgdGV4dE5vZGUuZm9udFNpemUgPSAyNDtcbiAgICAgICAgdGV4dE5vZGUuZm9udE5hbWUgPSB7IGZhbWlseTogXCJJbnRlclwiLCBzdHlsZTogXCJSZWd1bGFyXCIgfTtcbiAgICAgICAgdGV4dE5vZGUueCA9IGZpZ21hLnZpZXdwb3J0LmNlbnRlci54O1xuICAgICAgICB0ZXh0Tm9kZS55ID0gZmlnbWEudmlld3BvcnQuY2VudGVyLnk7XG4gICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IG5vZGVzO1xuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwicmVnZW5lcmF0ZVwiKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZpZ21hLmxvYWRGb250QXN5bmMoYWxsTm9kZXNbaV0uZm9udE5hbWUpO1xuICAgICAgICAgICAgbGV0IHRleHQgPSB0ZXh0VG9EaXNwbGF5KG1zZyk7XG4gICAgICAgICAgICBsZXQgY2hhcnMgPSBzZXRDaGFyYWN0ZXJzKG1zZywgYWxsTm9kZXNbaV0sIHRleHQpO1xuICAgICAgICAgICAgYWxsTm9kZXNbaV0uY2hhcmFjdGVycyA9IGNoYXJzO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJyZWdlbmVyYXRlLWFsbFwiKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZpZ21hLmxvYWRGb250QXN5bmMoYWxsTm9kZXNbaV0uZm9udE5hbWUpO1xuICAgICAgICAgICAgbGV0IGNoYXJzID0gc2V0Q2hhcmFjdGVycyhtc2csIGFsbE5vZGVzW2ldLCB0ZXh0VG9EaXNwbGF5KG1zZykpO1xuICAgICAgICAgICAgYWxsTm9kZXNbaV0uY2hhcmFjdGVycyA9IGNoYXJzO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJkZXNlbGVjdC1ub24tdGV4dFwiKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS50eXBlID09PSBcIlRFWFRcIikge1xuICAgICAgICAgICAgICAgIG5ld1NlbGVjdGlvbi5wdXNoKGFsbE5vZGVzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld1NlbGVjdGlvbiA9PT0gMFxuICAgICAgICAgICAgICAgID8gKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IFtdKVxuICAgICAgICAgICAgICAgIDogKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IG5ld1NlbGVjdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG59O1xuLy8gZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==