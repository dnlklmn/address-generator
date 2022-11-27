/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/*!***************************!*\
  !*** ./helpers/helper.ts ***!
  \***************************/
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZGRyZXNzLWdlbmVyYXRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hZGRyZXNzLWdlbmVyYXRvci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYWRkcmVzcy1nZW5lcmF0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hZGRyZXNzLWdlbmVyYXRvci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2FkZHJlc3MtZ2VuZXJhdG9yLy4vaGVscGVycy9oZWxwZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQgZnVuY3Rpb24gbWFrZWlkKGxlbmd0aCwgbXNnKSB7XG4gICAgdmFyIHJlc3VsdCA9IFwiXCI7XG4gICAgdmFyIGNoYXJhY3RlcnMgPSBtc2cuY2hhaW5WYWx1ZSA9PT0gXCJldGhlcmV1bVwiXG4gICAgICAgID8gXCJBQkNERUZhYmNkZWYwMTIzNDU2XCJcbiAgICAgICAgOiBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XG4gICAgdmFyIGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBjaGFyYWN0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzTGVuZ3RoKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnQgZnVuY3Rpb24gdGV4dFRvRGlzcGxheShtc2cpIHtcbiAgICBsZXQgcHJlZml4ID0gXCJcIjtcbiAgICBpZiAobXNnLmNoYWluVmFsdWUgPT09IFwiZXRoZXJldW1cIikge1xuICAgICAgICBwcmVmaXggPSBcIjB4XCI7XG4gICAgfVxuICAgIGlmIChtc2cuY2hhaW5WYWx1ZSA9PT0gXCJwb2xrYWRvdFwiKSB7XG4gICAgICAgIHByZWZpeCA9IFwiMVwiO1xuICAgIH1cbiAgICBpZiAobXNnLmNoYWluVmFsdWUgPT09IFwia3VzYW1hXCIpIHtcbiAgICAgICAgcHJlZml4ID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlwiLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNikpO1xuICAgIH1cbiAgICBjb25zdCB0ZXh0VG9EaXNwbGF5ID0gcHJlZml4ID09PSBcIjB4XCIgfHwgXCJcIlxuICAgICAgICA/IHByZWZpeCArIG1ha2VpZChtc2cuY291bnRWYWx1ZSwgbXNnKVxuICAgICAgICA6IHByZWZpeCArIG1ha2VpZChtc2cuY291bnRWYWx1ZSAtIDEsIG1zZyk7XG4gICAgY29uc3QgdGV4dFRvRGlzcGxheUJlZ2luID0gcHJlZml4ID09PSBcIjB4XCIgfHwgXCJcIlxuICAgICAgICA/IHByZWZpeCArIG1ha2VpZChtc2cuY291bnRWYWx1ZSAvIDIsIG1zZylcbiAgICAgICAgOiBwcmVmaXggKyBtYWtlaWQobXNnLmNvdW50VmFsdWUgLyAyIC0gMSwgbXNnKTtcbiAgICBjb25zdCB0ZXh0VG9EaXNwbGF5RW5kID0gbWFrZWlkKG1zZy5jb3VudFZhbHVlIC8gMiwgbXNnKTtcbiAgICByZXR1cm4gW3RleHRUb0Rpc3BsYXksIHRleHRUb0Rpc3BsYXlCZWdpbiwgdGV4dFRvRGlzcGxheUVuZF07XG59XG5leHBvcnQgZnVuY3Rpb24gc2V0Q2hhcmFjdGVycyhtc2csIG5vZGUsIGFkZHJlc3MpIHtcbiAgICBpZiAobXNnLmVsbGlwc2lzVmFsdWUgPT09IFwibm9uZVwiKSB7XG4gICAgICAgIG5vZGUuY2hhcmFjdGVycyA9IGFkZHJlc3NbMF07XG4gICAgfVxuICAgIGlmIChtc2cuZWxsaXBzaXNWYWx1ZSA9PT0gXCJhbnlcIikge1xuICAgICAgICBub2RlLmNoYXJhY3RlcnMgPSBhZGRyZXNzWzBdO1xuICAgIH1cbiAgICBpZiAobXNnLmVsbGlwc2lzVmFsdWUgPT09IFwiY2VudGVyXCIpIHtcbiAgICAgICAgbm9kZS5jaGFyYWN0ZXJzID0gYWRkcmVzc1sxXSArIFwiLi4uXCIgKyBhZGRyZXNzWzJdO1xuICAgIH1cbiAgICBpZiAobXNnLmVsbGlwc2lzVmFsdWUgPT09IFwic3RhcnRcIikge1xuICAgICAgICBub2RlLmNoYXJhY3RlcnMgPSBcIi4uLlwiICsgYWRkcmVzc1swXS5zdWJzdHJpbmcoMyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3Vic3RyaW5nOlwiLCBhZGRyZXNzWzBdLnN1YnN0cmluZygzKSk7XG4gICAgfVxuICAgIGlmIChtc2cuZWxsaXBzaXNWYWx1ZSA9PT0gXCJlbmRcIikge1xuICAgICAgICBub2RlLmNoYXJhY3RlcnMgPSBhZGRyZXNzWzBdICsgXCIuLi5cIjtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGUuY2hhcmFjdGVycztcbn1cbmV4cG9ydCBmdW5jdGlvbiBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==