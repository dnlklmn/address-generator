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
        figma.ui.postMessage([
            ellipsis,
            numberOfCharacters,
            node ? 1 : 0,
            chain,
            node ? node.type : 0,
            selectedTextObjects.length,
            selectedOtherObjects.length,
        ]);
    }
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
        figma.ui.postMessage([
            ellipsis,
            numberOfCharacters,
            node ? 1 : 0,
            chain,
            node ? node.type : 0,
            selectedTextObjects.length,
            selectedOtherObjects.length,
        ]);
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
    if (msg.type === "renumerate") {
        for (let i = 0; i < allNodes.length; i++) {
            figma.loadFontAsync(allNodes[i].fontName);
            let currentChars = allNodes[i].characters;
            if (msg.ellipsis === "center") {
                allNodes[i].characters = currentChars.substring(currentChars.length - msg.countValue);
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0Esd0JBQXdCLHFCQUFxQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHFCQUFxQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FkZHJlc3MtZ2VuZXJhdG9yLy4vaGVscGVycy9oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vYWRkcmVzcy1nZW5lcmF0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYWRkcmVzcy1nZW5lcmF0b3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2FkZHJlc3MtZ2VuZXJhdG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYWRkcmVzcy1nZW5lcmF0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9hZGRyZXNzLWdlbmVyYXRvci8uL2NvZGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIG1ha2VpZChsZW5ndGgsIG1zZykge1xuICAgIHZhciByZXN1bHQgPSBcIlwiO1xuICAgIHZhciBjaGFyYWN0ZXJzID0gbXNnLmNoYWluVmFsdWUgPT09IFwiZXRoZXJldW1cIlxuICAgICAgICA/IFwiQUJDREVGYWJjZGVmMDEyMzQ1NlwiXG4gICAgICAgIDogXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xuICAgIHZhciBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQgKz0gY2hhcmFjdGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHRleHRUb0Rpc3BsYXkobXNnKSB7XG4gICAgbGV0IHByZWZpeCA9IFwiXCI7XG4gICAgaWYgKG1zZy5jaGFpblZhbHVlID09PSBcImV0aGVyZXVtXCIpIHtcbiAgICAgICAgcHJlZml4ID0gXCIweFwiO1xuICAgIH1cbiAgICBpZiAobXNnLmNoYWluVmFsdWUgPT09IFwicG9sa2Fkb3RcIikge1xuICAgICAgICBwcmVmaXggPSBcIjFcIjtcbiAgICB9XG4gICAgaWYgKG1zZy5jaGFpblZhbHVlID09PSBcImt1c2FtYVwiKSB7XG4gICAgICAgIHByZWZpeCA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpcIi5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjYpKTtcbiAgICB9XG4gICAgY29uc3QgdGV4dFRvRGlzcGxheSA9IHByZWZpeCA9PT0gXCIweFwiIHx8IFwiXCJcbiAgICAgICAgPyBwcmVmaXggKyBtYWtlaWQobXNnLmNvdW50VmFsdWUsIG1zZylcbiAgICAgICAgOiBwcmVmaXggKyBtYWtlaWQobXNnLmNvdW50VmFsdWUgLSAxLCBtc2cpO1xuICAgIGNvbnN0IHRleHRUb0Rpc3BsYXlCZWdpbiA9IHByZWZpeCA9PT0gXCIweFwiIHx8IFwiXCJcbiAgICAgICAgPyBwcmVmaXggKyBtYWtlaWQobXNnLmNvdW50VmFsdWUgLyAyLCBtc2cpXG4gICAgICAgIDogcHJlZml4ICsgbWFrZWlkKG1zZy5jb3VudFZhbHVlIC8gMiAtIDEsIG1zZyk7XG4gICAgY29uc3QgdGV4dFRvRGlzcGxheUVuZCA9IG1ha2VpZChtc2cuY291bnRWYWx1ZSAvIDIsIG1zZyk7XG4gICAgcmV0dXJuIFt0ZXh0VG9EaXNwbGF5LCB0ZXh0VG9EaXNwbGF5QmVnaW4sIHRleHRUb0Rpc3BsYXlFbmRdO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNldENoYXJhY3RlcnMobXNnLCBub2RlLCBhZGRyZXNzKSB7XG4gICAgaWYgKG1zZy5lbGxpcHNpc1ZhbHVlID09PSBcIm5vbmVcIikge1xuICAgICAgICBub2RlLmNoYXJhY3RlcnMgPSBhZGRyZXNzWzBdO1xuICAgIH1cbiAgICBpZiAobXNnLmVsbGlwc2lzVmFsdWUgPT09IFwiYW55XCIpIHtcbiAgICAgICAgbm9kZS5jaGFyYWN0ZXJzID0gYWRkcmVzc1swXTtcbiAgICB9XG4gICAgaWYgKG1zZy5lbGxpcHNpc1ZhbHVlID09PSBcImNlbnRlclwiKSB7XG4gICAgICAgIG5vZGUuY2hhcmFjdGVycyA9IGFkZHJlc3NbMV0gKyBcIi4uLlwiICsgYWRkcmVzc1syXTtcbiAgICB9XG4gICAgaWYgKG1zZy5lbGxpcHNpc1ZhbHVlID09PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgbm9kZS5jaGFyYWN0ZXJzID0gXCIuLi5cIiArIGFkZHJlc3NbMF0uc3Vic3RyaW5nKDMpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInN1YnN0cmluZzpcIiwgYWRkcmVzc1swXS5zdWJzdHJpbmcoMykpO1xuICAgIH1cbiAgICBpZiAobXNnLmVsbGlwc2lzVmFsdWUgPT09IFwiZW5kXCIpIHtcbiAgICAgICAgbm9kZS5jaGFyYWN0ZXJzID0gYWRkcmVzc1swXSArIFwiLi4uXCI7XG4gICAgfVxuICAgIHJldHVybiBub2RlLmNoYXJhY3RlcnM7XG59XG5leHBvcnQgZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHRleHRUb0Rpc3BsYXkgfSBmcm9tIFwiLi9oZWxwZXJzL2hlbHBlclwiO1xuaW1wb3J0IHsgc2V0Q2hhcmFjdGVycyB9IGZyb20gXCIuL2hlbHBlcnMvaGVscGVyXCI7XG5maWdtYS5zaG93VUkoX19odG1sX18sIHsgdGhlbWVDb2xvcnM6IHRydWUsIHdpZHRoOiAzNDAsIGhlaWdodDogMzAwIH0pO1xubGV0IG5vZGUgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF07XG5sZXQgYWxsTm9kZXMgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XG5sZXQgbmV3U2VsZWN0aW9uID0gW107XG5maWdtYS5sb2FkRm9udEFzeW5jKHsgZmFtaWx5OiBcIkludGVyXCIsIHN0eWxlOiBcIlJlZ3VsYXJcIiB9KTtcbmxldCBlbGxpcHNpcyA9IFwibm9uZVwiO1xubGV0IGNoYWluID0gXCJhbnlcIjtcbmxldCBudW1iZXJPZkNoYXJhY3RlcnMgPSAwO1xubGV0IGlzRmlyc3RMZXR0ZXJVcHBlcmNhc2UgPSBmYWxzZTtcbmxldCBzZWxlY3RlZFRleHRPYmplY3RzID0gW107XG5sZXQgc2VsZWN0ZWRPdGhlck9iamVjdHMgPSBbXTtcbmZpZ21hLm9uKFwic2VsZWN0aW9uY2hhbmdlXCIsICgpID0+IHtcbiAgICBhbGxOb2RlcyA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbjtcbiAgICBzZWxlY3RlZFRleHRPYmplY3RzID0gW107XG4gICAgc2VsZWN0ZWRPdGhlck9iamVjdHMgPSBbXTtcbiAgICBuZXdTZWxlY3Rpb24gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhbGxOb2Rlc1tpXSAmJiBhbGxOb2Rlc1tpXS50eXBlID09IFwiVEVYVFwiKSB7XG4gICAgICAgICAgICBmaWdtYS5sb2FkRm9udEFzeW5jKGFsbE5vZGVzW2ldLmZvbnROYW1lKTtcbiAgICAgICAgICAgIGlzRmlyc3RMZXR0ZXJVcHBlcmNhc2UgPSAvXltBLVpdLy50ZXN0KGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMpO1xuICAgICAgICAgICAgaWYgKCFhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmluY2x1ZGVzKFwiLi4uXCIpKSB7XG4gICAgICAgICAgICAgICAgZWxsaXBzaXMgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCIuLi5cIikpIHtcbiAgICAgICAgICAgICAgICBlbGxpcHNpcyA9IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICBjaGFpbiA9IFwiYW55XCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGggLSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgICAgICAgICAgY2hhaW4gPSBcImV0aGVyZXVtXCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGggLSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjFcIikpIHtcbiAgICAgICAgICAgICAgICBjaGFpbiA9IFwicG9sa2Fkb3RcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0ZpcnN0TGV0dGVyVXBwZXJjYXNlKSB7XG4gICAgICAgICAgICAgICAgY2hhaW4gPSBcImt1c2FtYVwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuZW5kc1dpdGgoXCIuLi5cIikpIHtcbiAgICAgICAgICAgICAgICBlbGxpcHNpcyA9IFwiZW5kXCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGggLSAzO1xuICAgICAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCIweFwiKSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFpbiA9IFwiZXRoZXJldW1cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjFcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaW4gPSBcInBvbGthZG90XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCJBXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWluID0gXCJrdXNhbWFcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5pbmNsdWRlcyhcIi4uLlwiKSAmJlxuICAgICAgICAgICAgICAgICFhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmVuZHNXaXRoKFwiLi4uXCIpICYmXG4gICAgICAgICAgICAgICAgIWFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIi4uLlwiKSkge1xuICAgICAgICAgICAgICAgIGVsbGlwc2lzID0gXCJjZW50ZXJcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aCAtIDM7XG4gICAgICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWluID0gXCJldGhlcmV1bVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5zdGFydHNXaXRoKFwiMVwiKSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFpbiA9IFwicG9sa2Fkb3RcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzRmlyc3RMZXR0ZXJVcHBlcmNhc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaW4gPSBcImt1c2FtYVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGVjdGVkVGV4dE9iamVjdHMucHVzaChhbGxOb2Rlc1tpXS50eXBlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlbGVjdGVkT3RoZXJPYmplY3RzLnB1c2goYWxsTm9kZXNbaV0udHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoW1xuICAgICAgICAgICAgZWxsaXBzaXMsXG4gICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMsXG4gICAgICAgICAgICBub2RlID8gMSA6IDAsXG4gICAgICAgICAgICBjaGFpbixcbiAgICAgICAgICAgIG5vZGUgPyBub2RlLnR5cGUgOiAwLFxuICAgICAgICAgICAgc2VsZWN0ZWRUZXh0T2JqZWN0cy5sZW5ndGgsXG4gICAgICAgICAgICBzZWxlY3RlZE90aGVyT2JqZWN0cy5sZW5ndGgsXG4gICAgICAgIF0pO1xuICAgIH1cbn0pO1xuZmlnbWEub24oXCJydW5cIiwgKCkgPT4ge1xuICAgIG5vZGUgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF07XG4gICAgYWxsTm9kZXMgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XG4gICAgaWYgKGFsbE5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBzZWxlY3RlZFRleHRPYmplY3RzID0gW107XG4gICAgICAgIHNlbGVjdGVkT3RoZXJPYmplY3RzID0gW107XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFsbE5vZGVzW2ldICYmIGFsbE5vZGVzW2ldLnR5cGUgPT0gXCJURVhUXCIpIHtcbiAgICAgICAgICAgIGZpZ21hLmxvYWRGb250QXN5bmMoYWxsTm9kZXNbaV0uZm9udE5hbWUpO1xuICAgICAgICAgICAgaXNGaXJzdExldHRlclVwcGVyY2FzZSA9IC9eW0EtWl0vLnRlc3QoYWxsTm9kZXNbaV0uY2hhcmFjdGVycyk7XG4gICAgICAgICAgICBpZiAoIWFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuaW5jbHVkZXMoXCIuLi5cIikpIHtcbiAgICAgICAgICAgICAgICBlbGxpcHNpcyA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIi4uLlwiKSkge1xuICAgICAgICAgICAgICAgIGVsbGlwc2lzID0gXCJzdGFydFwiO1xuICAgICAgICAgICAgICAgIGNoYWluID0gXCJhbnlcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aCAtIDM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5zdGFydHNXaXRoKFwiMHhcIikpIHtcbiAgICAgICAgICAgICAgICBjaGFpbiA9IFwiZXRoZXJldW1cIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aCAtIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5zdGFydHNXaXRoKFwiMVwiKSkge1xuICAgICAgICAgICAgICAgIGNoYWluID0gXCJwb2xrYWRvdFwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzRmlyc3RMZXR0ZXJVcHBlcmNhc2UpIHtcbiAgICAgICAgICAgICAgICBjaGFpbiA9IFwia3VzYW1hXCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5lbmRzV2l0aChcIi4uLlwiKSkge1xuICAgICAgICAgICAgICAgIGVsbGlwc2lzID0gXCJlbmRcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aCAtIDM7XG4gICAgICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWluID0gXCJldGhlcmV1bVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5zdGFydHNXaXRoKFwiMVwiKSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFpbiA9IFwicG9sa2Fkb3RcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIkFcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaW4gPSBcImt1c2FtYVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmluY2x1ZGVzKFwiLi4uXCIpICYmXG4gICAgICAgICAgICAgICAgIWFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuZW5kc1dpdGgoXCIuLi5cIikgJiZcbiAgICAgICAgICAgICAgICAhYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5zdGFydHNXaXRoKFwiLi4uXCIpKSB7XG4gICAgICAgICAgICAgICAgZWxsaXBzaXMgPSBcImNlbnRlclwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoIC0gMztcbiAgICAgICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5zdGFydHNXaXRoKFwiMHhcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaW4gPSBcImV0aGVyZXVtXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCIxXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWluID0gXCJwb2xrYWRvdFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNGaXJzdExldHRlclVwcGVyY2FzZSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFpbiA9IFwia3VzYW1hXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZWN0ZWRUZXh0T2JqZWN0cy5wdXNoKGFsbE5vZGVzW2ldLnR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VsZWN0ZWRPdGhlck9iamVjdHMucHVzaChhbGxOb2Rlc1tpXS50eXBlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcInRleHQgb2JqZWN0cyBzZWxlY3RlZDpcIiwgc2VsZWN0ZWRUZXh0T2JqZWN0cy5sZW5ndGgsIFwiLCBvdGhlciBvYmplY3RzIHNlbGVjdGVkOlwiLCBzZWxlY3RlZE90aGVyT2JqZWN0cy5sZW5ndGgpO1xuICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZShbXG4gICAgICAgICAgICBlbGxpcHNpcyxcbiAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyxcbiAgICAgICAgICAgIG5vZGUgPyAxIDogMCxcbiAgICAgICAgICAgIGNoYWluLFxuICAgICAgICAgICAgbm9kZSA/IG5vZGUudHlwZSA6IDAsXG4gICAgICAgICAgICBzZWxlY3RlZFRleHRPYmplY3RzLmxlbmd0aCxcbiAgICAgICAgICAgIHNlbGVjdGVkT3RoZXJPYmplY3RzLmxlbmd0aCxcbiAgICAgICAgXSk7XG4gICAgfVxuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKFtcbiAgICAgICAgZWxsaXBzaXMsXG4gICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyxcbiAgICAgICAgbm9kZSA/IDEgOiAwLFxuICAgICAgICBjaGFpbixcbiAgICAgICAgbm9kZSA/IG5vZGUudHlwZSA6IDAsXG4gICAgICAgIHNlbGVjdGVkVGV4dE9iamVjdHMubGVuZ3RoLFxuICAgICAgICBzZWxlY3RlZE90aGVyT2JqZWN0cy5sZW5ndGgsXG4gICAgXSk7XG59KTtcbi8vTWVzc2FnZSBmcm9tIFVJXG5sZXQgcHJlZml4ID0gXCJcIjtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IChtc2cpID0+IHtcbiAgICBpZiAobXNnLnR5cGUgPT09IFwiY3JlYXRlXCIpIHtcbiAgICAgICAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgICAgICAgY29uc3QgdGV4dE5vZGUgPSBmaWdtYS5jcmVhdGVUZXh0KCk7XG4gICAgICAgIG5vZGVzLnB1c2godGV4dE5vZGUpO1xuICAgICAgICBsZXQgdGV4dCA9IHRleHRUb0Rpc3BsYXkobXNnKTtcbiAgICAgICAgdGV4dE5vZGUuY2hhcmFjdGVycyA9IHNldENoYXJhY3RlcnMobXNnLCB0ZXh0Tm9kZSwgdGV4dCk7XG4gICAgICAgIHRleHROb2RlLmZvbnRTaXplID0gMjQ7XG4gICAgICAgIHRleHROb2RlLmZvbnROYW1lID0geyBmYW1pbHk6IFwiSW50ZXJcIiwgc3R5bGU6IFwiUmVndWxhclwiIH07XG4gICAgICAgIHRleHROb2RlLnggPSBmaWdtYS52aWV3cG9ydC5jZW50ZXIueDtcbiAgICAgICAgdGV4dE5vZGUueSA9IGZpZ21hLnZpZXdwb3J0LmNlbnRlci55O1xuICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBub2RlcztcbiAgICB9XG4gICAgaWYgKG1zZy50eXBlID09PSBcInJlZ2VuZXJhdGVcIikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmaWdtYS5sb2FkRm9udEFzeW5jKGFsbE5vZGVzW2ldLmZvbnROYW1lKTtcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gdGV4dFRvRGlzcGxheShtc2cpO1xuICAgICAgICAgICAgbGV0IGNoYXJzID0gc2V0Q2hhcmFjdGVycyhtc2csIGFsbE5vZGVzW2ldLCB0ZXh0KTtcbiAgICAgICAgICAgIGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMgPSBjaGFycztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwicmVnZW5lcmF0ZS1hbGxcIikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmaWdtYS5sb2FkRm9udEFzeW5jKGFsbE5vZGVzW2ldLmZvbnROYW1lKTtcbiAgICAgICAgICAgIGxldCBjaGFycyA9IHNldENoYXJhY3RlcnMobXNnLCBhbGxOb2Rlc1tpXSwgdGV4dFRvRGlzcGxheShtc2cpKTtcbiAgICAgICAgICAgIGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMgPSBjaGFycztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwicmVudW1lcmF0ZVwiKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZpZ21hLmxvYWRGb250QXN5bmMoYWxsTm9kZXNbaV0uZm9udE5hbWUpO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRDaGFycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnM7XG4gICAgICAgICAgICBpZiAobXNnLmVsbGlwc2lzID09PSBcImNlbnRlclwiKSB7XG4gICAgICAgICAgICAgICAgYWxsTm9kZXNbaV0uY2hhcmFjdGVycyA9IGN1cnJlbnRDaGFycy5zdWJzdHJpbmcoY3VycmVudENoYXJzLmxlbmd0aCAtIG1zZy5jb3VudFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwiZGVzZWxlY3Qtbm9uLXRleHRcIikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0udHlwZSA9PT0gXCJURVhUXCIpIHtcbiAgICAgICAgICAgICAgICBuZXdTZWxlY3Rpb24ucHVzaChhbGxOb2Rlc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdTZWxlY3Rpb24gPT09IDBcbiAgICAgICAgICAgICAgICA/IChmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBbXSlcbiAgICAgICAgICAgICAgICA6IChmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBuZXdTZWxlY3Rpb24pO1xuICAgICAgICB9XG4gICAgfVxufTtcbi8vIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=