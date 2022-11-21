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
    if (msg.ellipsisValue === "any") {
        node.characters = address[0];
    }
    if (msg.ellipsisValue === "center") {
        node.characters = address[1] + "..." + address[2];
    }
    if (msg.ellipsisValue === "start") {
        node.characters = "..." + address[0];
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
        let text = textToDisplay(msg);
        letterNode.characters = setCharacters(msg, letterNode, text);
        letterNode.fontSize = 24;
        letterNode.fontName = { family: "Inter", style: "Regular" };
        letterNode.x = figma.viewport.center.x;
        letterNode.y = figma.viewport.center.y;
        figma.currentPage.selection = nodes;
    }
    if (msg.type === "regenerate") {
        console.log("regenerating now");
        for (let i = 0; i < allNodes.length; i++) {
            figma.loadFontAsync(allNodes[i].fontName);
            let text = textToDisplay(msg);
            let chars = setCharacters(msg, allNodes[i], text[0]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlCQUF5Qiw0Q0FBNEM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLG1DQUFtQztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHFCQUFxQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHFCQUFxQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FkZHJlc3MtZ2VuZXJhdG9yLy4vY29kZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJmaWdtYS5zaG93VUkoX19odG1sX18sIHsgdGhlbWVDb2xvcnM6IHRydWUsIHdpZHRoOiAzNDAsIGhlaWdodDogMzAwIH0pO1xubGV0IG5vZGUgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF07XG5sZXQgYWxsTm9kZXMgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XG5sZXQgbmV3U2VsZWN0aW9uID0gW107XG5mdW5jdGlvbiBtYWtlaWQobGVuZ3RoLCBtc2cpIHtcbiAgICB2YXIgcmVzdWx0ID0gXCJcIjtcbiAgICB2YXIgY2hhcmFjdGVycyA9IG1zZy5jaGFpblZhbHVlID09PSBcImV0aGVyZXVtXCJcbiAgICAgICAgPyBcIkFCQ0RFRmFiY2RlZjAxMjM0NTZcIlxuICAgICAgICA6IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcbiAgICB2YXIgY2hhcmFjdGVyc0xlbmd0aCA9IGNoYXJhY3RlcnMubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIHRleHRUb0Rpc3BsYXkobXNnKSB7XG4gICAgbGV0IHByZWZpeCA9IFwiXCI7XG4gICAgaWYgKG1zZy5jaGFpblZhbHVlID09PSBcImV0aGVyZXVtXCIpIHtcbiAgICAgICAgcHJlZml4ID0gXCIweFwiO1xuICAgIH1cbiAgICBpZiAobXNnLmNoYWluVmFsdWUgPT09IFwicG9sa2Fkb3RcIikge1xuICAgICAgICBwcmVmaXggPSBcIjFcIjtcbiAgICB9XG4gICAgaWYgKG1zZy5jaGFpblZhbHVlID09PSBcImt1c2FtYVwiKSB7XG4gICAgICAgIHByZWZpeCA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpcIi5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjYpKTtcbiAgICB9XG4gICAgY29uc3QgdGV4dFRvRGlzcGxheSA9IHByZWZpeCA9PT0gXCIweFwiIHx8IFwiXCJcbiAgICAgICAgPyBwcmVmaXggKyBtYWtlaWQobXNnLmNvdW50VmFsdWUsIG1zZylcbiAgICAgICAgOiBwcmVmaXggKyBtYWtlaWQobXNnLmNvdW50VmFsdWUgLSAxLCBtc2cpO1xuICAgIGNvbnN0IHRleHRUb0Rpc3BsYXlCZWdpbiA9IHByZWZpeCA9PT0gXCIweFwiIHx8IFwiXCJcbiAgICAgICAgPyBwcmVmaXggKyBtYWtlaWQobXNnLmNvdW50VmFsdWUgLyAyLCBtc2cpXG4gICAgICAgIDogcHJlZml4ICsgbWFrZWlkKG1zZy5jb3VudFZhbHVlIC8gMiAtIDEsIG1zZyk7XG4gICAgY29uc3QgdGV4dFRvRGlzcGxheUVuZCA9IG1ha2VpZChtc2cuY291bnRWYWx1ZSAvIDIsIG1zZyk7XG4gICAgcmV0dXJuIFt0ZXh0VG9EaXNwbGF5LCB0ZXh0VG9EaXNwbGF5QmVnaW4sIHRleHRUb0Rpc3BsYXlFbmRdO1xufVxuZnVuY3Rpb24gc2V0Q2hhcmFjdGVycyhtc2csIG5vZGUsIGFkZHJlc3MpIHtcbiAgICBpZiAobXNnLmVsbGlwc2lzVmFsdWUgPT09IFwibm9uZVwiKSB7XG4gICAgICAgIG5vZGUuY2hhcmFjdGVycyA9IGFkZHJlc3NbMF07XG4gICAgfVxuICAgIGlmIChtc2cuZWxsaXBzaXNWYWx1ZSA9PT0gXCJhbnlcIikge1xuICAgICAgICBub2RlLmNoYXJhY3RlcnMgPSBhZGRyZXNzWzBdO1xuICAgIH1cbiAgICBpZiAobXNnLmVsbGlwc2lzVmFsdWUgPT09IFwiY2VudGVyXCIpIHtcbiAgICAgICAgbm9kZS5jaGFyYWN0ZXJzID0gYWRkcmVzc1sxXSArIFwiLi4uXCIgKyBhZGRyZXNzWzJdO1xuICAgIH1cbiAgICBpZiAobXNnLmVsbGlwc2lzVmFsdWUgPT09IFwic3RhcnRcIikge1xuICAgICAgICBub2RlLmNoYXJhY3RlcnMgPSBcIi4uLlwiICsgYWRkcmVzc1swXTtcbiAgICB9XG4gICAgaWYgKG1zZy5lbGxpcHNpc1ZhbHVlID09PSBcImVuZFwiKSB7XG4gICAgICAgIG5vZGUuY2hhcmFjdGVycyA9IGFkZHJlc3NbMF0gKyBcIi4uLlwiO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZS5jaGFyYWN0ZXJzO1xufVxuZmlnbWEubG9hZEZvbnRBc3luYyh7IGZhbWlseTogXCJJbnRlclwiLCBzdHlsZTogXCJSZWd1bGFyXCIgfSk7XG5sZXQgZWxsaXBzaXMgPSBcIm5vbmVcIjtcbmxldCBjaGFpbiA9IFwiYW55XCI7XG5sZXQgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gMDtcbmxldCBpc0ZpcnN0TGV0dGVyVXBwZXJjYXNlID0gZmFsc2U7XG5sZXQgY291bnRUZXh0T2JqZWN0cyA9IDA7XG5sZXQgc2VsZWN0ZWRUZXh0T2JqZWN0cyA9IFtdO1xubGV0IHNlbGVjdGVkT3RoZXJPYmplY3RzID0gW107XG5maWdtYS5vbihcInNlbGVjdGlvbmNoYW5nZVwiLCAoKSA9PiB7XG4gICAgYWxsTm9kZXMgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XG4gICAgbm9kZSA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXTtcbiAgICBzZWxlY3RlZFRleHRPYmplY3RzID0gW107XG4gICAgc2VsZWN0ZWRPdGhlck9iamVjdHMgPSBbXTtcbiAgICBuZXdTZWxlY3Rpb24gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhbGxOb2Rlc1tpXSAmJiBhbGxOb2Rlc1tpXS50eXBlID09IFwiVEVYVFwiKSB7XG4gICAgICAgICAgICBmaWdtYS5sb2FkRm9udEFzeW5jKGFsbE5vZGVzW2ldLmZvbnROYW1lKTtcbiAgICAgICAgICAgIGlzRmlyc3RMZXR0ZXJVcHBlcmNhc2UgPSAvXltBLVpdLy50ZXN0KGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMpO1xuICAgICAgICAgICAgaWYgKCFhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmluY2x1ZGVzKFwiLi4uXCIpKSB7XG4gICAgICAgICAgICAgICAgZWxsaXBzaXMgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCIuLi5cIikpIHtcbiAgICAgICAgICAgICAgICBlbGxpcHNpcyA9IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICBjaGFpbiA9IFwiYW55XCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGggLSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgICAgICAgICAgY2hhaW4gPSBcImV0aGVyZXVtXCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGggLSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjFcIikpIHtcbiAgICAgICAgICAgICAgICBjaGFpbiA9IFwicG9sa2Fkb3RcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0ZpcnN0TGV0dGVyVXBwZXJjYXNlKSB7XG4gICAgICAgICAgICAgICAgY2hhaW4gPSBcImt1c2FtYVwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuZW5kc1dpdGgoXCIuLi5cIikpIHtcbiAgICAgICAgICAgICAgICBlbGxpcHNpcyA9IFwiZW5kXCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGggLSAzO1xuICAgICAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCIweFwiKSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFpbiA9IFwiZXRoZXJldW1cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjFcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaW4gPSBcInBvbGthZG90XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCJBXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWluID0gXCJrdXNhbWFcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5pbmNsdWRlcyhcIi4uLlwiKSAmJlxuICAgICAgICAgICAgICAgICFhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmVuZHNXaXRoKFwiLi4uXCIpICYmXG4gICAgICAgICAgICAgICAgIWFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIi4uLlwiKSkge1xuICAgICAgICAgICAgICAgIGVsbGlwc2lzID0gXCJjZW50ZXJcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aCAtIDM7XG4gICAgICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWluID0gXCJldGhlcmV1bVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5zdGFydHNXaXRoKFwiMVwiKSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFpbiA9IFwicG9sa2Fkb3RcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzRmlyc3RMZXR0ZXJVcHBlcmNhc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaW4gPSBcImt1c2FtYVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGVjdGVkVGV4dE9iamVjdHMucHVzaChhbGxOb2Rlc1tpXS50eXBlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlbGVjdGVkT3RoZXJPYmplY3RzLnB1c2goYWxsTm9kZXNbaV0udHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJ0ZXh0IG9iamVjdHMgc2VsZWN0ZWQ6XCIsIHNlbGVjdGVkVGV4dE9iamVjdHMubGVuZ3RoLCBcIiwgb3RoZXIgb2JqZWN0cyBzZWxlY3RlZDpcIiwgc2VsZWN0ZWRPdGhlck9iamVjdHMubGVuZ3RoKTtcbiAgICB9XG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoW1xuICAgICAgICBlbGxpcHNpcyxcbiAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzLFxuICAgICAgICBub2RlID8gMSA6IDAsXG4gICAgICAgIGNoYWluLFxuICAgICAgICBub2RlID8gbm9kZS50eXBlIDogMCxcbiAgICAgICAgc2VsZWN0ZWRUZXh0T2JqZWN0cy5sZW5ndGgsXG4gICAgICAgIHNlbGVjdGVkT3RoZXJPYmplY3RzLmxlbmd0aCxcbiAgICBdKTtcbn0pO1xuZmlnbWEub24oXCJydW5cIiwgKCkgPT4ge1xuICAgIG5vZGUgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF07XG4gICAgYWxsTm9kZXMgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XG4gICAgaWYgKGFsbE5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBzZWxlY3RlZFRleHRPYmplY3RzID0gW107XG4gICAgICAgIHNlbGVjdGVkT3RoZXJPYmplY3RzID0gW107XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFsbE5vZGVzW2ldICYmIGFsbE5vZGVzW2ldLnR5cGUgPT0gXCJURVhUXCIpIHtcbiAgICAgICAgICAgIGZpZ21hLmxvYWRGb250QXN5bmMoYWxsTm9kZXNbaV0uZm9udE5hbWUpO1xuICAgICAgICAgICAgaXNGaXJzdExldHRlclVwcGVyY2FzZSA9IC9eW0EtWl0vLnRlc3QoYWxsTm9kZXNbaV0uY2hhcmFjdGVycyk7XG4gICAgICAgICAgICBpZiAoIWFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuaW5jbHVkZXMoXCIuLi5cIikpIHtcbiAgICAgICAgICAgICAgICBlbGxpcHNpcyA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIi4uLlwiKSkge1xuICAgICAgICAgICAgICAgIGVsbGlwc2lzID0gXCJzdGFydFwiO1xuICAgICAgICAgICAgICAgIGNoYWluID0gXCJhbnlcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aCAtIDM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5zdGFydHNXaXRoKFwiMHhcIikpIHtcbiAgICAgICAgICAgICAgICBjaGFpbiA9IFwiZXRoZXJldW1cIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aCAtIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5zdGFydHNXaXRoKFwiMVwiKSkge1xuICAgICAgICAgICAgICAgIGNoYWluID0gXCJwb2xrYWRvdFwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzRmlyc3RMZXR0ZXJVcHBlcmNhc2UpIHtcbiAgICAgICAgICAgICAgICBjaGFpbiA9IFwia3VzYW1hXCI7XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFyYWN0ZXJzID0gYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5lbmRzV2l0aChcIi4uLlwiKSkge1xuICAgICAgICAgICAgICAgIGVsbGlwc2lzID0gXCJlbmRcIjtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMgPSBhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmxlbmd0aCAtIDM7XG4gICAgICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWluID0gXCJldGhlcmV1bVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5zdGFydHNXaXRoKFwiMVwiKSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFpbiA9IFwicG9sa2Fkb3RcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuc3RhcnRzV2l0aChcIkFcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaW4gPSBcImt1c2FtYVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLmluY2x1ZGVzKFwiLi4uXCIpICYmXG4gICAgICAgICAgICAgICAgIWFsbE5vZGVzW2ldLmNoYXJhY3RlcnMuZW5kc1dpdGgoXCIuLi5cIikgJiZcbiAgICAgICAgICAgICAgICAhYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5zdGFydHNXaXRoKFwiLi4uXCIpKSB7XG4gICAgICAgICAgICAgICAgZWxsaXBzaXMgPSBcImNlbnRlclwiO1xuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhcmFjdGVycyA9IGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMubGVuZ3RoIC0gMztcbiAgICAgICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0uY2hhcmFjdGVycy5zdGFydHNXaXRoKFwiMHhcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaW4gPSBcImV0aGVyZXVtXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhbGxOb2Rlc1tpXS5jaGFyYWN0ZXJzLnN0YXJ0c1dpdGgoXCIxXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWluID0gXCJwb2xrYWRvdFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNGaXJzdExldHRlclVwcGVyY2FzZSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFpbiA9IFwia3VzYW1hXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZWN0ZWRUZXh0T2JqZWN0cy5wdXNoKGFsbE5vZGVzW2ldLnR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VsZWN0ZWRPdGhlck9iamVjdHMucHVzaChhbGxOb2Rlc1tpXS50eXBlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcInRleHQgb2JqZWN0cyBzZWxlY3RlZDpcIiwgc2VsZWN0ZWRUZXh0T2JqZWN0cy5sZW5ndGgsIFwiLCBvdGhlciBvYmplY3RzIHNlbGVjdGVkOlwiLCBzZWxlY3RlZE90aGVyT2JqZWN0cy5sZW5ndGgpO1xuICAgIH1cbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZShbXG4gICAgICAgIGVsbGlwc2lzLFxuICAgICAgICBudW1iZXJPZkNoYXJhY3RlcnMsXG4gICAgICAgIG5vZGUgPyAxIDogMCxcbiAgICAgICAgY2hhaW4sXG4gICAgICAgIG5vZGUgPyBub2RlLnR5cGUgOiAwLFxuICAgICAgICBzZWxlY3RlZFRleHRPYmplY3RzLmxlbmd0aCxcbiAgICAgICAgc2VsZWN0ZWRPdGhlck9iamVjdHMubGVuZ3RoLFxuICAgIF0pO1xufSk7XG5sZXQgcHJlZml4ID0gXCJcIjtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IChtc2cpID0+IHtcbiAgICBpZiAobXNnLnR5cGUgPT09IFwiY3JlYXRlXCIpIHtcbiAgICAgICAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgICAgICAgY29uc3QgbGV0dGVyTm9kZSA9IGZpZ21hLmNyZWF0ZVRleHQoKTtcbiAgICAgICAgbm9kZXMucHVzaChsZXR0ZXJOb2RlKTtcbiAgICAgICAgbGV0IHRleHQgPSB0ZXh0VG9EaXNwbGF5KG1zZyk7XG4gICAgICAgIGxldHRlck5vZGUuY2hhcmFjdGVycyA9IHNldENoYXJhY3RlcnMobXNnLCBsZXR0ZXJOb2RlLCB0ZXh0KTtcbiAgICAgICAgbGV0dGVyTm9kZS5mb250U2l6ZSA9IDI0O1xuICAgICAgICBsZXR0ZXJOb2RlLmZvbnROYW1lID0geyBmYW1pbHk6IFwiSW50ZXJcIiwgc3R5bGU6IFwiUmVndWxhclwiIH07XG4gICAgICAgIGxldHRlck5vZGUueCA9IGZpZ21hLnZpZXdwb3J0LmNlbnRlci54O1xuICAgICAgICBsZXR0ZXJOb2RlLnkgPSBmaWdtYS52aWV3cG9ydC5jZW50ZXIueTtcbiAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gbm9kZXM7XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJyZWdlbmVyYXRlXCIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJyZWdlbmVyYXRpbmcgbm93XCIpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmaWdtYS5sb2FkRm9udEFzeW5jKGFsbE5vZGVzW2ldLmZvbnROYW1lKTtcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gdGV4dFRvRGlzcGxheShtc2cpO1xuICAgICAgICAgICAgbGV0IGNoYXJzID0gc2V0Q2hhcmFjdGVycyhtc2csIGFsbE5vZGVzW2ldLCB0ZXh0WzBdKTtcbiAgICAgICAgICAgIGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMgPSBjaGFycztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwicmVnZW5lcmF0ZS1hbGxcIikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmaWdtYS5sb2FkRm9udEFzeW5jKGFsbE5vZGVzW2ldLmZvbnROYW1lKTtcbiAgICAgICAgICAgIGxldCBjaGFycyA9IHNldENoYXJhY3RlcnMobXNnLCBhbGxOb2Rlc1tpXSwgdGV4dFRvRGlzcGxheShtc2cpKTtcbiAgICAgICAgICAgIGFsbE5vZGVzW2ldLmNoYXJhY3RlcnMgPSBjaGFycztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwiZGVzZWxlY3Qtbm9uLXRleHRcIikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYWxsTm9kZXNbaV0udHlwZSA9PT0gXCJURVhUXCIpIHtcbiAgICAgICAgICAgICAgICBuZXdTZWxlY3Rpb24ucHVzaChhbGxOb2Rlc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdTZWxlY3Rpb24gPT09IDBcbiAgICAgICAgICAgICAgICA/IChmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBbXSlcbiAgICAgICAgICAgICAgICA6IChmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBuZXdTZWxlY3Rpb24pO1xuICAgICAgICB9XG4gICAgfVxufTtcbi8vIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=