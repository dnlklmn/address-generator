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
        ? prefix + makeid(msg.currentCount, msg)
        : prefix + makeid(msg.currentCount - 1, msg);
    const addressBegin = prefix === "0x" || ""
        ? prefix + makeid(msg.currentCount / 2, msg)
        : prefix + makeid(msg.currentCount / 2 - 1, msg);
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
    const address = prefix === "0x"
        ? prefix + makeid(msg.currentCount - 2, msg)
        : prefix + makeid(msg.currentCount, msg);
    return address;
}
function addressFormatted(address, msg) {
    let characters;
    console.log("ellipsis:", msg.currentEllipsis, "chain:", msg.currentChain);
    if (msg.currentEllipsis === "none" || msg.currentEllipsis === "None") {
        characters = address;
    }
    if (msg.currentEllipsis === "center" || msg.currentEllipsis === "Center") {
        characters =
            address.substring(0, msg.currentCount / 2) +
                "..." +
                address.substring(msg.currentCount / 2, msg.currentCount);
    }
    if (msg.currentEllipsis === "start" || msg.currentEllipsis === "Start") {
        characters = "..." + address.substring(3);
    }
    if (msg.currentEllipsis === "end" || msg.currentEllipsis === "End") {
        characters = address + "...";
    }
    console.log(characters);
    return characters;
}
// export function setCharacters(msg: any, node: any, address: any) {
//   if (msg.currentEllipsis === "none") {
//     node.characters = address[0];
//   }
//   if (msg.currentEllipsis === "any") {
//     node.characters = address[0];
//   }
//   if (msg.currentEllipsis === "center") {
//     node.characters = address[1] + "..." + address[2];
//   }
//   if (msg.currentEllipsis === "start") {
//     node.characters = "..." + address[0].substring(3);
//     console.log("substring:", address[0].substring(3));
//   }
//   if (msg.currentEllipsis === "end") {
//     node.characters = address[0] + "...";
//   }
//   return node.characters;
// }
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
// import { setCharacters } from "./helpers/helper";


figma.showUI(__html__, { themeColors: true, width: 340, height: 300 });
let node = figma.currentPage.selection[0];
let allNodes = figma.currentPage.selection;
let newSelection = [];
figma.loadFontAsync({ family: "Inter", style: "Regular" });
let ellipsis = "none";
let chain = "any";
let numberOfCharacters = 24;
let selectedTextObjects = [];
let selectedOtherObjects = [];
function trackSelection() { }
figma.on("selectionchange", () => {
    allNodes = figma.currentPage.selection;
    selectedTextObjects = [];
    selectedOtherObjects = [];
    newSelection = [];
    let firstLetters = "";
    let numberOfObjectsSelected = allNodes.length;
    for (let i = 0; i < allNodes.length; i++) {
        if (allNodes.length === 1 && allNodes[i].type == "TEXT") {
            firstLetters = allNodes[i].characters.substring(0, 2);
            numberOfCharacters = allNodes[i].characters.length;
        }
        if (allNodes[i] && allNodes[i].type == "TEXT") {
            figma.loadFontAsync(allNodes[i].fontName);
            if (!allNodes[i].characters.includes("...")) {
                ellipsis = "none";
                numberOfCharacters = allNodes[i].characters.length - 3;
            }
            if (allNodes[i].characters.startsWith("...")) {
                ellipsis = "start";
                numberOfCharacters = allNodes[i].characters.length - 3;
            }
            if (allNodes[i].characters.endsWith("...")) {
                ellipsis = "end";
                numberOfCharacters = allNodes[i].characters.length - 3;
            }
            if (allNodes[i].characters.includes("...") &&
                !allNodes[i].characters.endsWith("...") &&
                !allNodes[i].characters.startsWith("...")) {
                ellipsis = "center";
                numberOfCharacters = allNodes[i].characters.length - 3;
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
});
figma.on("run", () => {
    allNodes = figma.currentPage.selection;
    selectedTextObjects = [];
    selectedOtherObjects = [];
    newSelection = [];
    let firstLetters = "";
    let numberOfObjectsSelected = allNodes.length;
    for (let i = 0; i < allNodes.length; i++) {
        if (allNodes.length === 1 && allNodes[i].type == "TEXT") {
            firstLetters = allNodes[i].characters.substring(0, 2);
            numberOfCharacters = allNodes[i].characters.length;
        }
        if (allNodes[i] && allNodes[i].type == "TEXT") {
            figma.loadFontAsync(allNodes[i].fontName);
            if (!allNodes[i].characters.includes("...")) {
                ellipsis = "none";
                numberOfCharacters = allNodes[i].characters.length - 3;
            }
            if (allNodes[i].characters.startsWith("...")) {
                ellipsis = "start";
                numberOfCharacters = allNodes[i].characters.length - 3;
            }
            if (allNodes[i].characters.endsWith("...")) {
                ellipsis = "end";
                numberOfCharacters = allNodes[i].characters.length - 3;
            }
            if (allNodes[i].characters.includes("...") &&
                !allNodes[i].characters.endsWith("...") &&
                !allNodes[i].characters.startsWith("...")) {
                ellipsis = "center";
                numberOfCharacters = allNodes[i].characters.length - 3;
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
        numberOfCharacters,
    });
});
//Message from UI
let prefix = "";
figma.ui.onmessage = (msg) => {
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
    // if (msg.type === "regenerate-all") {
    //   for (let i = 0; i < allNodes.length; i++) {
    //     figma.loadFontAsync(allNodes[i].fontName);
    //     let chars = setCharacters(msg, allNodes[i], textToDisplay(msg));
    //     allNodes[i].characters = chars;
    //   }
    // }
    // if (msg.type === "renumerate") {
    //   for (let i = 0; i < allNodes.length; i++) {
    //     figma.loadFontAsync(allNodes[i].fontName);
    //     let currentChars = allNodes[i].characters;
    //     if (msg.ellipsis === "center") {
    //       allNodes[i].characters = currentChars.substring(
    //         currentChars.length - msg.countValue
    //       );
    //     }
    //   }
    // }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZGRyZXNzLWdlbmVyYXRvci8uL2hlbHBlcnMvaGVscGVyLnRzIiwid2VicGFjazovL2FkZHJlc3MtZ2VuZXJhdG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2FkZHJlc3MtZ2VuZXJhdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9hZGRyZXNzLWdlbmVyYXRvci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2FkZHJlc3MtZ2VuZXJhdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYWRkcmVzcy1nZW5lcmF0b3IvLi9jb2RlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBtYWtlaWQobGVuZ3RoLCBtc2cpIHtcbiAgICB2YXIgcmVzdWx0ID0gXCJcIjtcbiAgICB2YXIgY2hhcmFjdGVycyA9IG1zZy5jdXJyZW50Q2hhaW4gPT09IFwiZXRoZXJldW1cIlxuICAgICAgICA/IFwiQUJDREVGYWJjZGVmMDEyMzQ1NlwiXG4gICAgICAgIDogXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xuICAgIHZhciBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQgKz0gY2hhcmFjdGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHRleHRUb0Rpc3BsYXkobXNnKSB7XG4gICAgbGV0IHByZWZpeCA9IFwiXCI7XG4gICAgaWYgKG1zZy5jdXJyZW50Q2hhaW4gPT09IFwiZXRoZXJldW1cIikge1xuICAgICAgICBwcmVmaXggPSBcIjB4XCI7XG4gICAgfVxuICAgIGlmIChtc2cuY3VycmVudENoYWluID09PSBcInBvbGthZG90XCIpIHtcbiAgICAgICAgcHJlZml4ID0gXCIxXCI7XG4gICAgfVxuICAgIGlmIChtc2cuY3VycmVudENoYWluID09PSBcImt1c2FtYVwiKSB7XG4gICAgICAgIHByZWZpeCA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpcIi5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjYpKTtcbiAgICB9XG4gICAgY29uc3QgYWRkcmVzcyA9IHByZWZpeCA9PT0gXCIweFwiIHx8IFwiXCJcbiAgICAgICAgPyBwcmVmaXggKyBtYWtlaWQobXNnLmN1cnJlbnRDb3VudCwgbXNnKVxuICAgICAgICA6IHByZWZpeCArIG1ha2VpZChtc2cuY3VycmVudENvdW50IC0gMSwgbXNnKTtcbiAgICBjb25zdCBhZGRyZXNzQmVnaW4gPSBwcmVmaXggPT09IFwiMHhcIiB8fCBcIlwiXG4gICAgICAgID8gcHJlZml4ICsgbWFrZWlkKG1zZy5jdXJyZW50Q291bnQgLyAyLCBtc2cpXG4gICAgICAgIDogcHJlZml4ICsgbWFrZWlkKG1zZy5jdXJyZW50Q291bnQgLyAyIC0gMSwgbXNnKTtcbiAgICBjb25zdCBhZGRyZXNzRW5kID0gbWFrZWlkKG1zZy5jdXJyZW50Q291bnQgLyAyLCBtc2cpO1xuICAgIHJldHVybiBbYWRkcmVzcywgYWRkcmVzc0JlZ2luLCBhZGRyZXNzRW5kXTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBZGRyZXNzKG1zZykge1xuICAgIGxldCBwcmVmaXggPSBcIlwiO1xuICAgIGlmIChtc2cuY3VycmVudENoYWluID09PSBcImV0aGVyZXVtXCIpIHtcbiAgICAgICAgcHJlZml4ID0gXCIweFwiO1xuICAgIH1cbiAgICBpZiAobXNnLmN1cnJlbnRDaGFpbiA9PT0gXCJwb2xrYWRvdFwiKSB7XG4gICAgICAgIHByZWZpeCA9IFwiMVwiO1xuICAgIH1cbiAgICBpZiAobXNnLmN1cnJlbnRDaGFpbiA9PT0gXCJrdXNhbWFcIikge1xuICAgICAgICBwcmVmaXggPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCIuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI2KSk7XG4gICAgfVxuICAgIGNvbnN0IGFkZHJlc3MgPSBwcmVmaXggPT09IFwiMHhcIlxuICAgICAgICA/IHByZWZpeCArIG1ha2VpZChtc2cuY3VycmVudENvdW50IC0gMiwgbXNnKVxuICAgICAgICA6IHByZWZpeCArIG1ha2VpZChtc2cuY3VycmVudENvdW50LCBtc2cpO1xuICAgIHJldHVybiBhZGRyZXNzO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFkZHJlc3NGb3JtYXR0ZWQoYWRkcmVzcywgbXNnKSB7XG4gICAgbGV0IGNoYXJhY3RlcnM7XG4gICAgY29uc29sZS5sb2coXCJlbGxpcHNpczpcIiwgbXNnLmN1cnJlbnRFbGxpcHNpcywgXCJjaGFpbjpcIiwgbXNnLmN1cnJlbnRDaGFpbik7XG4gICAgaWYgKG1zZy5jdXJyZW50RWxsaXBzaXMgPT09IFwibm9uZVwiIHx8IG1zZy5jdXJyZW50RWxsaXBzaXMgPT09IFwiTm9uZVwiKSB7XG4gICAgICAgIGNoYXJhY3RlcnMgPSBhZGRyZXNzO1xuICAgIH1cbiAgICBpZiAobXNnLmN1cnJlbnRFbGxpcHNpcyA9PT0gXCJjZW50ZXJcIiB8fCBtc2cuY3VycmVudEVsbGlwc2lzID09PSBcIkNlbnRlclwiKSB7XG4gICAgICAgIGNoYXJhY3RlcnMgPVxuICAgICAgICAgICAgYWRkcmVzcy5zdWJzdHJpbmcoMCwgbXNnLmN1cnJlbnRDb3VudCAvIDIpICtcbiAgICAgICAgICAgICAgICBcIi4uLlwiICtcbiAgICAgICAgICAgICAgICBhZGRyZXNzLnN1YnN0cmluZyhtc2cuY3VycmVudENvdW50IC8gMiwgbXNnLmN1cnJlbnRDb3VudCk7XG4gICAgfVxuICAgIGlmIChtc2cuY3VycmVudEVsbGlwc2lzID09PSBcInN0YXJ0XCIgfHwgbXNnLmN1cnJlbnRFbGxpcHNpcyA9PT0gXCJTdGFydFwiKSB7XG4gICAgICAgIGNoYXJhY3RlcnMgPSBcIi4uLlwiICsgYWRkcmVzcy5zdWJzdHJpbmcoMyk7XG4gICAgfVxuICAgIGlmIChtc2cuY3VycmVudEVsbGlwc2lzID09PSBcImVuZFwiIHx8IG1zZy5jdXJyZW50RWxsaXBzaXMgPT09IFwiRW5kXCIpIHtcbiAgICAgICAgY2hhcmFjdGVycyA9IGFkZHJlc3MgKyBcIi4uLlwiO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhjaGFyYWN0ZXJzKTtcbiAgICByZXR1cm4gY2hhcmFjdGVycztcbn1cbi8vIGV4cG9ydCBmdW5jdGlvbiBzZXRDaGFyYWN0ZXJzKG1zZzogYW55LCBub2RlOiBhbnksIGFkZHJlc3M6IGFueSkge1xuLy8gICBpZiAobXNnLmN1cnJlbnRFbGxpcHNpcyA9PT0gXCJub25lXCIpIHtcbi8vICAgICBub2RlLmNoYXJhY3RlcnMgPSBhZGRyZXNzWzBdO1xuLy8gICB9XG4vLyAgIGlmIChtc2cuY3VycmVudEVsbGlwc2lzID09PSBcImFueVwiKSB7XG4vLyAgICAgbm9kZS5jaGFyYWN0ZXJzID0gYWRkcmVzc1swXTtcbi8vICAgfVxuLy8gICBpZiAobXNnLmN1cnJlbnRFbGxpcHNpcyA9PT0gXCJjZW50ZXJcIikge1xuLy8gICAgIG5vZGUuY2hhcmFjdGVycyA9IGFkZHJlc3NbMV0gKyBcIi4uLlwiICsgYWRkcmVzc1syXTtcbi8vICAgfVxuLy8gICBpZiAobXNnLmN1cnJlbnRFbGxpcHNpcyA9PT0gXCJzdGFydFwiKSB7XG4vLyAgICAgbm9kZS5jaGFyYWN0ZXJzID0gXCIuLi5cIiArIGFkZHJlc3NbMF0uc3Vic3RyaW5nKDMpO1xuLy8gICAgIGNvbnNvbGUubG9nKFwic3Vic3RyaW5nOlwiLCBhZGRyZXNzWzBdLnN1YnN0cmluZygzKSk7XG4vLyAgIH1cbi8vICAgaWYgKG1zZy5jdXJyZW50RWxsaXBzaXMgPT09IFwiZW5kXCIpIHtcbi8vICAgICBub2RlLmNoYXJhY3RlcnMgPSBhZGRyZXNzWzBdICsgXCIuLi5cIjtcbi8vICAgfVxuLy8gICByZXR1cm4gbm9kZS5jaGFyYWN0ZXJzO1xuLy8gfVxuZXhwb3J0IGZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlcihzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBpbXBvcnQgeyBzZXRDaGFyYWN0ZXJzIH0gZnJvbSBcIi4vaGVscGVycy9oZWxwZXJcIjtcbmltcG9ydCB7IGNyZWF0ZUFkZHJlc3MgfSBmcm9tIFwiLi9oZWxwZXJzL2hlbHBlclwiO1xuaW1wb3J0IHsgYWRkcmVzc0Zvcm1hdHRlZCB9IGZyb20gXCIuL2hlbHBlcnMvaGVscGVyXCI7XG5maWdtYS5zaG93VUkoX19odG1sX18sIHsgdGhlbWVDb2xvcnM6IHRydWUsIHdpZHRoOiAzNDAsIGhlaWdodDogMzAwIH0pO1xubGV0IG5vZGUgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF07XG5sZXQgYWxsTm9kZXMgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XG5sZXQgbmV3U2VsZWN0aW9uID0gW107XG5maWdtYS5sb2FkRm9udEFzeW5jKHsgZmFtaWx5OiBcIkludGVyXCIsIHN0eWxlOiBcIlJlZ3VsYXJcIiB9KTtcbmxldCBlbGxpcHNpcyA9IFwibm9uZVwiO1xubGV0IGNoYWluID0gXCJhbnlcIjtcbmxldCBudW1iZXJPZkNoYXJhY3RlcnMgPSAyNDtcbmxldCBzZWxlY3RlZFRleHRPYmplY3RzID0gW107XG5sZXQgc2VsZWN0ZWRPdGhlck9iamVjdHMgPSBbXTtcbmZ1bmN0aW9uIHRyYWNrU2VsZWN0aW9uKCkgeyB9XG5maWdtYS5vbihcInNlbGVjdGlvbmNoYW5nZVwiLCAoKSA9PiB7XG4gICAgYWxsTm9kZXMgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XG4gICAgc2VsZWN0ZWRUZXh0T2JqZWN0cyA9IFtdO1xuICAgIHNlbGVjdGVkT3RoZXJPYmplY3RzID0gW107XG4gICAgbmV3U2VsZWN0aW9uID0gW107XG4gICAgbGV0IGZpcnN0TGV0dGVycyA9IFwiXCI7XG4gICAgbGV0IG51bWJlck9mT2JqZWN0c1NlbGVjdGVkID0gYWxsTm9kZXMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFsbE5vZGVzLmxlbmd0aCA9PT0gMSAmJiBhbGxOb2Rlc1tpXS50eXBlID09IFwiVEVYVFwiKSB7XG4gICAgICAgICAgICBmaXJzdExldHRlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN1YnN0cmluZygwLCAyKTtcbiAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbGxOb2Rlc1tpXSAmJiBhbGxOb2Rlc1tpXS50eXBlID09IFwiVEVYVFwiKSB7XG4gICAgICAgICAgICBmaWdtYS5sb2FkRm9udEFzeW5jKGFsbE5vZGVzW2ldLmZvbnROYW1lKTtcbiAgICAgICAgICAgIGlmICghYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5pbmNsdWRlcyhcIi4uLlwiKSkge1xuICAgICAgICAgICAgICAgIGVsbGlwc2lzID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGggLSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIi4uLlwiKSkge1xuICAgICAgICAgICAgICAgIGVsbGlwc2lzID0gXCJzdGFydFwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoIC0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmVuZHNXaXRoKFwiLi4uXCIpKSB7XG4gICAgICAgICAgICAgICAgZWxsaXBzaXMgPSBcImVuZFwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoIC0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmluY2x1ZGVzKFwiLi4uXCIpICYmXG4gICAgICAgICAgICAgICAgIWFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuZW5kc1dpdGgoXCIuLi5cIikgJiZcbiAgICAgICAgICAgICAgICAhYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5zdGFydHNXaXRoKFwiLi4uXCIpKSB7XG4gICAgICAgICAgICAgICAgZWxsaXBzaXMgPSBcImNlbnRlclwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoIC0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaXJzdExldHRlcnMuY2hhckF0KDApLm1hdGNoKC9bYS16XS9pKSAmJlxuICAgICAgICAgICAgICAgIGZpcnN0TGV0dGVycy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSA9PT0gZmlyc3RMZXR0ZXJzLmNoYXJBdCgwKSkge1xuICAgICAgICAgICAgICAgIGNoYWluID0gXCJrdXNhbWFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaXJzdExldHRlcnMuY2hhckF0KDApID09PSBcIjFcIikge1xuICAgICAgICAgICAgICAgIGNoYWluID0gXCJwb2xrYWRvdFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpcnN0TGV0dGVycyA9PT0gXCIweFwiKSB7XG4gICAgICAgICAgICAgICAgY2hhaW4gPSBcImV0aGVyZXVtXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlyc3RMZXR0ZXJzID09PSBcIi4uXCIpIHtcbiAgICAgICAgICAgICAgICBjaGFpbiA9IFwiYW55XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlyc3RMZXR0ZXJzICE9PSBcIjB4XCIgJiZcbiAgICAgICAgICAgICAgICBmaXJzdExldHRlcnMuY2hhckF0KDApICE9IFwiMVwiICYmXG4gICAgICAgICAgICAgICAgZmlyc3RMZXR0ZXJzLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICE9IGZpcnN0TGV0dGVycy5jaGFyQXQoMCkpIHtcbiAgICAgICAgICAgICAgICBjaGFpbiA9IFwiYW55XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxlY3RlZFRleHRPYmplY3RzLnB1c2goYWxsTm9kZXNbaV0udHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZWxlY3RlZE90aGVyT2JqZWN0cy5wdXNoKGFsbE5vZGVzW2ldLnR5cGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgZmlyc3RMZXR0ZXJzLFxuICAgICAgICBudW1iZXJPZk9iamVjdHNTZWxlY3RlZCxcbiAgICAgICAgc2VsZWN0ZWRUZXh0T2JqZWN0cyxcbiAgICAgICAgc2VsZWN0ZWRPdGhlck9iamVjdHMsXG4gICAgICAgIGVsbGlwc2lzLFxuICAgICAgICBjaGFpbixcbiAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzLFxuICAgIH0pO1xufSk7XG5maWdtYS5vbihcInJ1blwiLCAoKSA9PiB7XG4gICAgYWxsTm9kZXMgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XG4gICAgc2VsZWN0ZWRUZXh0T2JqZWN0cyA9IFtdO1xuICAgIHNlbGVjdGVkT3RoZXJPYmplY3RzID0gW107XG4gICAgbmV3U2VsZWN0aW9uID0gW107XG4gICAgbGV0IGZpcnN0TGV0dGVycyA9IFwiXCI7XG4gICAgbGV0IG51bWJlck9mT2JqZWN0c1NlbGVjdGVkID0gYWxsTm9kZXMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFsbE5vZGVzLmxlbmd0aCA9PT0gMSAmJiBhbGxOb2Rlc1tpXS50eXBlID09IFwiVEVYVFwiKSB7XG4gICAgICAgICAgICBmaXJzdExldHRlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN1YnN0cmluZygwLCAyKTtcbiAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbGxOb2Rlc1tpXSAmJiBhbGxOb2Rlc1tpXS50eXBlID09IFwiVEVYVFwiKSB7XG4gICAgICAgICAgICBmaWdtYS5sb2FkRm9udEFzeW5jKGFsbE5vZGVzW2ldLmZvbnROYW1lKTtcbiAgICAgICAgICAgIGlmICghYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5pbmNsdWRlcyhcIi4uLlwiKSkge1xuICAgICAgICAgICAgICAgIGVsbGlwc2lzID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGggLSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIi4uLlwiKSkge1xuICAgICAgICAgICAgICAgIGVsbGlwc2lzID0gXCJzdGFydFwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoIC0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmVuZHNXaXRoKFwiLi4uXCIpKSB7XG4gICAgICAgICAgICAgICAgZWxsaXBzaXMgPSBcImVuZFwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoIC0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmluY2x1ZGVzKFwiLi4uXCIpICYmXG4gICAgICAgICAgICAgICAgIWFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuZW5kc1dpdGgoXCIuLi5cIikgJiZcbiAgICAgICAgICAgICAgICAhYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5zdGFydHNXaXRoKFwiLi4uXCIpKSB7XG4gICAgICAgICAgICAgICAgZWxsaXBzaXMgPSBcImNlbnRlclwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoIC0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGVjdGVkVGV4dE9iamVjdHMucHVzaChhbGxOb2Rlc1tpXS50eXBlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlbGVjdGVkT3RoZXJPYmplY3RzLnB1c2goYWxsTm9kZXNbaV0udHlwZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBmaXJzdExldHRlcnMsXG4gICAgICAgIG51bWJlck9mT2JqZWN0c1NlbGVjdGVkLFxuICAgICAgICBzZWxlY3RlZFRleHRPYmplY3RzLFxuICAgICAgICBzZWxlY3RlZE90aGVyT2JqZWN0cyxcbiAgICAgICAgZWxsaXBzaXMsXG4gICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyxcbiAgICB9KTtcbn0pO1xuLy9NZXNzYWdlIGZyb20gVUlcbmxldCBwcmVmaXggPSBcIlwiO1xuZmlnbWEudWkub25tZXNzYWdlID0gKG1zZykgPT4ge1xuICAgIGlmIChtc2cudHlwZSA9PT0gXCJjcmVhdGVcIikge1xuICAgICAgICBjb25zdCBub2RlcyA9IFtdO1xuICAgICAgICBjb25zdCB0ZXh0Tm9kZSA9IGZpZ21hLmNyZWF0ZVRleHQoKTtcbiAgICAgICAgbm9kZXMucHVzaCh0ZXh0Tm9kZSk7XG4gICAgICAgIGxldCB0ZXh0ID0gY3JlYXRlQWRkcmVzcyhtc2cpO1xuICAgICAgICBsZXQgdGV4dENob3BwZWQgPSBhZGRyZXNzRm9ybWF0dGVkKHRleHQsIG1zZyk7XG4gICAgICAgIHRleHROb2RlLmNoYXJhY3RlcnMgPSB0ZXh0Q2hvcHBlZDtcbiAgICAgICAgdGV4dE5vZGUuZm9udFNpemUgPSAyNDtcbiAgICAgICAgdGV4dE5vZGUuZm9udE5hbWUgPSB7IGZhbWlseTogXCJJbnRlclwiLCBzdHlsZTogXCJSZWd1bGFyXCIgfTtcbiAgICAgICAgdGV4dE5vZGUueCA9IGZpZ21hLnZpZXdwb3J0LmNlbnRlci54O1xuICAgICAgICB0ZXh0Tm9kZS55ID0gZmlnbWEudmlld3BvcnQuY2VudGVyLnk7XG4gICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IG5vZGVzO1xuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwicmVnZW5lcmF0ZVwiKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZpZ21hLmxvYWRGb250QXN5bmMoYWxsTm9kZXNbaV0uZm9udE5hbWUpO1xuICAgICAgICAgICAgbGV0IHRleHQgPSBjcmVhdGVBZGRyZXNzKG1zZyk7XG4gICAgICAgICAgICBsZXQgdGV4dENob3BwZWQgPSBhZGRyZXNzRm9ybWF0dGVkKHRleHQsIG1zZyk7XG4gICAgICAgICAgICBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzID0gdGV4dENob3BwZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gaWYgKG1zZy50eXBlID09PSBcInJlZ2VuZXJhdGUtYWxsXCIpIHtcbiAgICAvLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyAgICAgZmlnbWEubG9hZEZvbnRBc3luYyhhbGxOb2Rlc1tpXS5mb250TmFtZSk7XG4gICAgLy8gICAgIGxldCBjaGFycyA9IHNldENoYXJhY3RlcnMobXNnLCBhbGxOb2Rlc1tpXSwgdGV4dFRvRGlzcGxheShtc2cpKTtcbiAgICAvLyAgICAgYWxsTm9kZXNbaV0uY2hhcmFjdGVycyA9IGNoYXJzO1xuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICAvLyBpZiAobXNnLnR5cGUgPT09IFwicmVudW1lcmF0ZVwiKSB7XG4gICAgLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gICAgIGZpZ21hLmxvYWRGb250QXN5bmMoYWxsTm9kZXNbaV0uZm9udE5hbWUpO1xuICAgIC8vICAgICBsZXQgY3VycmVudENoYXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycztcbiAgICAvLyAgICAgaWYgKG1zZy5lbGxpcHNpcyA9PT0gXCJjZW50ZXJcIikge1xuICAgIC8vICAgICAgIGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMgPSBjdXJyZW50Q2hhcnMuc3Vic3RyaW5nKFxuICAgIC8vICAgICAgICAgY3VycmVudENoYXJzLmxlbmd0aCAtIG1zZy5jb3VudFZhbHVlXG4gICAgLy8gICAgICAgKTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwiZGVzZWxlY3Qtbm9uLXRleHRcIikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0udHlwZSA9PT0gXCJURVhUXCIpIHtcbiAgICAgICAgICAgICAgICBuZXdTZWxlY3Rpb24ucHVzaChhbGxOb2Rlc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdTZWxlY3Rpb24gPT09IDBcbiAgICAgICAgICAgICAgICA/IChmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBbXSlcbiAgICAgICAgICAgICAgICA6IChmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBuZXdTZWxlY3Rpb24pO1xuICAgICAgICB9XG4gICAgfVxufTtcbi8vIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=