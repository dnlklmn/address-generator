/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*****************!*\
  !*** ./code.ts ***!
  \*****************/
figma.showUI(__html__, { themeColors: true, width: 340, height: 300 });
let node = figma.currentPage.selection[0];
let allNodes = figma.currentPage.selection;
let newSelection = [];
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
    if (msg.ellipsisValue === "center") {
        node.characters = address[1] + "..." + address[2];
    }
    if (msg.ellipsisValue === "start") {
        node.characters = "..." + makeid(msg.countValue, msg);
    }
    if (msg.ellipsisValue === "end") {
        node.characters = address[0] + "...";
    }
    return node.characters;
}
figma.loadFontAsync({ family: "Inter", style: "Regular" });
let ellipsis = "none";
let chain = "any";
let numberOfCharacters = 0;
let isFirstLetterUppercase = false;
let countTextObjects = 0;
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
let prefix = "";
figma.ui.onmessage = (msg) => {
    if (msg.type === "create") {
        const nodes = [];
        const letterNode = figma.createText();
        nodes.push(letterNode);
        letterNode.characters = setCharacters(msg, letterNode, textToDisplay(msg));
        letterNode.fontSize = 24;
        letterNode.fontName = { family: "Inter", style: "Regular" };
        letterNode.x = figma.viewport.center.x;
        letterNode.y = figma.viewport.center.y;
        figma.currentPage.selection = nodes;
    }
    if (msg.type === "regenerate") {
        for (let i = 0; i < allNodes.length; i++) {
            figma.loadFontAsync(allNodes[i].fontName);
            let chars = setCharacters(msg, allNodes[i], textToDisplay(msg));
            allNodes[i].characters = chars;
        }
    }
    if (msg.type === "regenerate-all") {
        for (let i = 0; i < allNodes.length; i++) {
            figma.loadFontAsync(allNodes[i].fontName);
            let chars = setCharacters(msg, allNodes[i], textToDisplay(msg));
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlCQUF5Qiw0Q0FBNEM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLG1DQUFtQztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IscUJBQXFCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHFCQUFxQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FkZHJlc3MtZ2VuZXJhdG9yLy4vY29kZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJmaWdtYS5zaG93VUkoX19odG1sX18sIHsgdGhlbWVDb2xvcnM6IHRydWUsIHdpZHRoOiAzNDAsIGhlaWdodDogMzAwIH0pO1xubGV0IG5vZGUgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF07XG5sZXQgYWxsTm9kZXMgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XG5sZXQgbmV3U2VsZWN0aW9uID0gW107XG5mdW5jdGlvbiBtYWtlaWQobGVuZ3RoLCBtc2cpIHtcbiAgICB2YXIgcmVzdWx0ID0gXCJcIjtcbiAgICB2YXIgY2hhcmFjdGVycyA9IG1zZy5jaGFpblZhbHVlID09PSBcImV0aGVyZXVtXCJcbiAgICAgICAgPyBcIkFCQ0RFRmFiY2RlZjAxMjM0NTZcIlxuICAgICAgICA6IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcbiAgICB2YXIgY2hhcmFjdGVyc0xlbmd0aCA9IGNoYXJhY3RlcnMubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIHRleHRUb0Rpc3BsYXkobXNnKSB7XG4gICAgbGV0IHByZWZpeCA9IFwiXCI7XG4gICAgaWYgKG1zZy5jaGFpblZhbHVlID09PSBcImV0aGVyZXVtXCIpIHtcbiAgICAgICAgcHJlZml4ID0gXCIweFwiO1xuICAgIH1cbiAgICBpZiAobXNnLmNoYWluVmFsdWUgPT09IFwicG9sa2Fkb3RcIikge1xuICAgICAgICBwcmVmaXggPSBcIjFcIjtcbiAgICB9XG4gICAgaWYgKG1zZy5jaGFpblZhbHVlID09PSBcImt1c2FtYVwiKSB7XG4gICAgICAgIHByZWZpeCA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpcIi5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjYpKTtcbiAgICB9XG4gICAgY29uc3QgdGV4dFRvRGlzcGxheSA9IHByZWZpeCA9PT0gXCIweFwiIHx8IFwiXCJcbiAgICAgICAgPyBwcmVmaXggKyBtYWtlaWQobXNnLmNvdW50VmFsdWUsIG1zZylcbiAgICAgICAgOiBwcmVmaXggKyBtYWtlaWQobXNnLmNvdW50VmFsdWUgLSAxLCBtc2cpO1xuICAgIGNvbnN0IHRleHRUb0Rpc3BsYXlCZWdpbiA9IHByZWZpeCA9PT0gXCIweFwiIHx8IFwiXCJcbiAgICAgICAgPyBwcmVmaXggKyBtYWtlaWQobXNnLmNvdW50VmFsdWUgLyAyLCBtc2cpXG4gICAgICAgIDogcHJlZml4ICsgbWFrZWlkKG1zZy5jb3VudFZhbHVlIC8gMiAtIDEsIG1zZyk7XG4gICAgY29uc3QgdGV4dFRvRGlzcGxheUVuZCA9IG1ha2VpZChtc2cuY291bnRWYWx1ZSAvIDIsIG1zZyk7XG4gICAgcmV0dXJuIFt0ZXh0VG9EaXNwbGF5LCB0ZXh0VG9EaXNwbGF5QmVnaW4sIHRleHRUb0Rpc3BsYXlFbmRdO1xufVxuZnVuY3Rpb24gc2V0Q2hhcmFjdGVycyhtc2csIG5vZGUsIGFkZHJlc3MpIHtcbiAgICBpZiAobXNnLmVsbGlwc2lzVmFsdWUgPT09IFwibm9uZVwiKSB7XG4gICAgICAgIG5vZGUuY2hhcmFjdGVycyA9IGFkZHJlc3NbMF07XG4gICAgfVxuICAgIGlmIChtc2cuZWxsaXBzaXNWYWx1ZSA9PT0gXCJjZW50ZXJcIikge1xuICAgICAgICBub2RlLmNoYXJhY3RlcnMgPSBhZGRyZXNzWzFdICsgXCIuLi5cIiArIGFkZHJlc3NbMl07XG4gICAgfVxuICAgIGlmIChtc2cuZWxsaXBzaXNWYWx1ZSA9PT0gXCJzdGFydFwiKSB7XG4gICAgICAgIG5vZGUuY2hhcmFjdGVycyA9IFwiLi4uXCIgKyBtYWtlaWQobXNnLmNvdW50VmFsdWUsIG1zZyk7XG4gICAgfVxuICAgIGlmIChtc2cuZWxsaXBzaXNWYWx1ZSA9PT0gXCJlbmRcIikge1xuICAgICAgICBub2RlLmNoYXJhY3RlcnMgPSBhZGRyZXNzWzBdICsgXCIuLi5cIjtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGUuY2hhcmFjdGVycztcbn1cbmZpZ21hLmxvYWRGb250QXN5bmMoeyBmYW1pbHk6IFwiSW50ZXJcIiwgc3R5bGU6IFwiUmVndWxhclwiIH0pO1xubGV0IGVsbGlwc2lzID0gXCJub25lXCI7XG5sZXQgY2hhaW4gPSBcImFueVwiO1xubGV0IG51bWJlck9mQ2hhcmFjdGVycyA9IDA7XG5sZXQgaXNGaXJzdExldHRlclVwcGVyY2FzZSA9IGZhbHNlO1xubGV0IGNvdW50VGV4dE9iamVjdHMgPSAwO1xubGV0IHNlbGVjdGVkVGV4dE9iamVjdHMgPSBbXTtcbmxldCBzZWxlY3RlZE90aGVyT2JqZWN0cyA9IFtdO1xuZmlnbWEub24oXCJzZWxlY3Rpb25jaGFuZ2VcIiwgKCkgPT4ge1xuICAgIGFsbE5vZGVzID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xuICAgIG5vZGUgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF07XG4gICAgc2VsZWN0ZWRUZXh0T2JqZWN0cyA9IFtdO1xuICAgIHNlbGVjdGVkT3RoZXJPYmplY3RzID0gW107XG4gICAgbmV3U2VsZWN0aW9uID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxOb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYWxsTm9kZXNbaV0gJiYgYWxsTm9kZXNbaV0udHlwZSA9PSBcIlRFWFRcIikge1xuICAgICAgICAgICAgZmlnbWEubG9hZEZvbnRBc3luYyhhbGxOb2Rlc1tpXS5mb250TmFtZSk7XG4gICAgICAgICAgICBpc0ZpcnN0TGV0dGVyVXBwZXJjYXNlID0gL15bQS1aXS8udGVzdChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzKTtcbiAgICAgICAgICAgIGlmICghYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5pbmNsdWRlcyhcIi4uLlwiKSkge1xuICAgICAgICAgICAgICAgIGVsbGlwc2lzID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5zdGFydHNXaXRoKFwiLi4uXCIpKSB7XG4gICAgICAgICAgICAgICAgZWxsaXBzaXMgPSBcInN0YXJ0XCI7XG4gICAgICAgICAgICAgICAgY2hhaW4gPSBcImFueVwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoIC0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCIweFwiKSkge1xuICAgICAgICAgICAgICAgIGNoYWluID0gXCJldGhlcmV1bVwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoIC0gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCIxXCIpKSB7XG4gICAgICAgICAgICAgICAgY2hhaW4gPSBcInBvbGthZG90XCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNGaXJzdExldHRlclVwcGVyY2FzZSkge1xuICAgICAgICAgICAgICAgIGNoYWluID0gXCJrdXNhbWFcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmVuZHNXaXRoKFwiLi4uXCIpKSB7XG4gICAgICAgICAgICAgICAgZWxsaXBzaXMgPSBcImVuZFwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoIC0gMztcbiAgICAgICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5zdGFydHNXaXRoKFwiMHhcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaW4gPSBcImV0aGVyZXVtXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCIxXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWluID0gXCJwb2xrYWRvdFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5zdGFydHNXaXRoKFwiQVwiKSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFpbiA9IFwia3VzYW1hXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuaW5jbHVkZXMoXCIuLi5cIikgJiZcbiAgICAgICAgICAgICAgICAhYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5lbmRzV2l0aChcIi4uLlwiKSAmJlxuICAgICAgICAgICAgICAgICFhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCIuLi5cIikpIHtcbiAgICAgICAgICAgICAgICBlbGxpcHNpcyA9IFwiY2VudGVyXCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGggLSAzO1xuICAgICAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCIweFwiKSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFpbiA9IFwiZXRoZXJldW1cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjFcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaW4gPSBcInBvbGthZG90XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc0ZpcnN0TGV0dGVyVXBwZXJjYXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWluID0gXCJrdXNhbWFcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxlY3RlZFRleHRPYmplY3RzLnB1c2goYWxsTm9kZXNbaV0udHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZWxlY3RlZE90aGVyT2JqZWN0cy5wdXNoKGFsbE5vZGVzW2ldLnR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGV4dCBvYmplY3RzIHNlbGVjdGVkOlwiLCBzZWxlY3RlZFRleHRPYmplY3RzLmxlbmd0aCwgXCIsIG90aGVyIG9iamVjdHMgc2VsZWN0ZWQ6XCIsIHNlbGVjdGVkT3RoZXJPYmplY3RzLmxlbmd0aCk7XG4gICAgfVxuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKFtcbiAgICAgICAgZWxsaXBzaXMsXG4gICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyxcbiAgICAgICAgbm9kZSA/IDEgOiAwLFxuICAgICAgICBjaGFpbixcbiAgICAgICAgbm9kZSA/IG5vZGUudHlwZSA6IDAsXG4gICAgICAgIHNlbGVjdGVkVGV4dE9iamVjdHMubGVuZ3RoLFxuICAgICAgICBzZWxlY3RlZE90aGVyT2JqZWN0cy5sZW5ndGgsXG4gICAgXSk7XG59KTtcbmZpZ21hLm9uKFwicnVuXCIsICgpID0+IHtcbiAgICBub2RlID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uWzBdO1xuICAgIGFsbE5vZGVzID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xuICAgIGlmIChhbGxOb2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgc2VsZWN0ZWRUZXh0T2JqZWN0cyA9IFtdO1xuICAgICAgICBzZWxlY3RlZE90aGVyT2JqZWN0cyA9IFtdO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhbGxOb2Rlc1tpXSAmJiBhbGxOb2Rlc1tpXS50eXBlID09IFwiVEVYVFwiKSB7XG4gICAgICAgICAgICBmaWdtYS5sb2FkRm9udEFzeW5jKGFsbE5vZGVzW2ldLmZvbnROYW1lKTtcbiAgICAgICAgICAgIGlzRmlyc3RMZXR0ZXJVcHBlcmNhc2UgPSAvXltBLVpdLy50ZXN0KGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMpO1xuICAgICAgICAgICAgaWYgKCFhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmluY2x1ZGVzKFwiLi4uXCIpKSB7XG4gICAgICAgICAgICAgICAgZWxsaXBzaXMgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCIuLi5cIikpIHtcbiAgICAgICAgICAgICAgICBlbGxpcHNpcyA9IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICBjaGFpbiA9IFwiYW55XCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGggLSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgICAgICAgICAgY2hhaW4gPSBcImV0aGVyZXVtXCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGggLSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjFcIikpIHtcbiAgICAgICAgICAgICAgICBjaGFpbiA9IFwicG9sa2Fkb3RcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0ZpcnN0TGV0dGVyVXBwZXJjYXNlKSB7XG4gICAgICAgICAgICAgICAgY2hhaW4gPSBcImt1c2FtYVwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuZW5kc1dpdGgoXCIuLi5cIikpIHtcbiAgICAgICAgICAgICAgICBlbGxpcHNpcyA9IFwiZW5kXCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGggLSAzO1xuICAgICAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCIweFwiKSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFpbiA9IFwiZXRoZXJldW1cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjFcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaW4gPSBcInBvbGthZG90XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCJBXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWluID0gXCJrdXNhbWFcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5pbmNsdWRlcyhcIi4uLlwiKSAmJlxuICAgICAgICAgICAgICAgICFhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmVuZHNXaXRoKFwiLi4uXCIpICYmXG4gICAgICAgICAgICAgICAgIWFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIi4uLlwiKSkge1xuICAgICAgICAgICAgICAgIGVsbGlwc2lzID0gXCJjZW50ZXJcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aCAtIDM7XG4gICAgICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWluID0gXCJldGhlcmV1bVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5zdGFydHNXaXRoKFwiMVwiKSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFpbiA9IFwicG9sa2Fkb3RcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzRmlyc3RMZXR0ZXJVcHBlcmNhc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaW4gPSBcImt1c2FtYVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGVjdGVkVGV4dE9iamVjdHMucHVzaChhbGxOb2Rlc1tpXS50eXBlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlbGVjdGVkT3RoZXJPYmplY3RzLnB1c2goYWxsTm9kZXNbaV0udHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJ0ZXh0IG9iamVjdHMgc2VsZWN0ZWQ6XCIsIHNlbGVjdGVkVGV4dE9iamVjdHMubGVuZ3RoLCBcIiwgb3RoZXIgb2JqZWN0cyBzZWxlY3RlZDpcIiwgc2VsZWN0ZWRPdGhlck9iamVjdHMubGVuZ3RoKTtcbiAgICB9XG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoW1xuICAgICAgICBlbGxpcHNpcyxcbiAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzLFxuICAgICAgICBub2RlID8gMSA6IDAsXG4gICAgICAgIGNoYWluLFxuICAgICAgICBub2RlID8gbm9kZS50eXBlIDogMCxcbiAgICAgICAgc2VsZWN0ZWRUZXh0T2JqZWN0cy5sZW5ndGgsXG4gICAgICAgIHNlbGVjdGVkT3RoZXJPYmplY3RzLmxlbmd0aCxcbiAgICBdKTtcbn0pO1xubGV0IHByZWZpeCA9IFwiXCI7XG5maWdtYS51aS5vbm1lc3NhZ2UgPSAobXNnKSA9PiB7XG4gICAgaWYgKG1zZy50eXBlID09PSBcImNyZWF0ZVwiKSB7XG4gICAgICAgIGNvbnN0IG5vZGVzID0gW107XG4gICAgICAgIGNvbnN0IGxldHRlck5vZGUgPSBmaWdtYS5jcmVhdGVUZXh0KCk7XG4gICAgICAgIG5vZGVzLnB1c2gobGV0dGVyTm9kZSk7XG4gICAgICAgIGxldHRlck5vZGUuY2hhcmFjdGVycyA9IHNldENoYXJhY3RlcnMobXNnLCBsZXR0ZXJOb2RlLCB0ZXh0VG9EaXNwbGF5KG1zZykpO1xuICAgICAgICBsZXR0ZXJOb2RlLmZvbnRTaXplID0gMjQ7XG4gICAgICAgIGxldHRlck5vZGUuZm9udE5hbWUgPSB7IGZhbWlseTogXCJJbnRlclwiLCBzdHlsZTogXCJSZWd1bGFyXCIgfTtcbiAgICAgICAgbGV0dGVyTm9kZS54ID0gZmlnbWEudmlld3BvcnQuY2VudGVyLng7XG4gICAgICAgIGxldHRlck5vZGUueSA9IGZpZ21hLnZpZXdwb3J0LmNlbnRlci55O1xuICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBub2RlcztcbiAgICB9XG4gICAgaWYgKG1zZy50eXBlID09PSBcInJlZ2VuZXJhdGVcIikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmaWdtYS5sb2FkRm9udEFzeW5jKGFsbE5vZGVzW2ldLmZvbnROYW1lKTtcbiAgICAgICAgICAgIGxldCBjaGFycyA9IHNldENoYXJhY3RlcnMobXNnLCBhbGxOb2Rlc1tpXSwgdGV4dFRvRGlzcGxheShtc2cpKTtcbiAgICAgICAgICAgIGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMgPSBjaGFycztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwicmVnZW5lcmF0ZS1hbGxcIikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmaWdtYS5sb2FkRm9udEFzeW5jKGFsbE5vZGVzW2ldLmZvbnROYW1lKTtcbiAgICAgICAgICAgIGxldCBjaGFycyA9IHNldENoYXJhY3RlcnMobXNnLCBhbGxOb2Rlc1tpXSwgdGV4dFRvRGlzcGxheShtc2cpKTtcbiAgICAgICAgICAgIGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMgPSBjaGFycztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwiZGVzZWxlY3Qtbm9uLXRleHRcIikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0udHlwZSA9PT0gXCJURVhUXCIpIHtcbiAgICAgICAgICAgICAgICBuZXdTZWxlY3Rpb24ucHVzaChhbGxOb2Rlc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdTZWxlY3Rpb24gPT09IDBcbiAgICAgICAgICAgICAgICA/IChmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBbXSlcbiAgICAgICAgICAgICAgICA6IChmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBuZXdTZWxlY3Rpb24pO1xuICAgICAgICB9XG4gICAgfVxufTtcbi8vIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=