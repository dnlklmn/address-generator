figma.showUI(__html__, { themeColors: true, width: 340, height: 300 });
let node = figma.currentPage.selection[0];
let allNodes = figma.currentPage.selection;
let newSelection = [];
function makeid(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
figma.ui.onmessage = (msg) => {
    let prefix = "";
    if (msg.chain === "ethereum") {
        prefix = "0x";
    }
    if (msg.chain === "polkadot") {
        prefix = "1";
    }
    if (msg.chain === "kusama") {
        prefix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random() * 26));
    }
    const textToDisplay = prefix === "0x" || ""
        ? prefix + makeid(msg.count)
        : prefix + makeid(msg.count - 1);
    const textToDisplayBegin = prefix === "0x" || ""
        ? prefix + makeid(msg.count / 2)
        : prefix + makeid(msg.count / 2 - 1);
    const textToDisplayEnd = makeid(msg.count / 2);
    if (msg.type === "create") {
        const nodes = [];
        const letterNode = figma.createText();
        nodes.push(letterNode);
        if (msg.ellipsis === "none") {
            letterNode.characters = textToDisplay;
        }
        if (msg.ellipsis === "center") {
            letterNode.characters = textToDisplayBegin + "..." + textToDisplayEnd;
        }
        if (msg.ellipsis === "start") {
            letterNode.characters = "..." + makeid(msg.count);
        }
        if (msg.ellipsis === "end") {
            letterNode.characters = textToDisplay + "...";
        }
        letterNode.fontSize = 24;
        letterNode.fontName = { family: "Roboto", style: "Regular" };
        letterNode.x = figma.viewport.center.x;
        letterNode.y = figma.viewport.center.y;
        figma.currentPage.selection = nodes;
    }
    if (msg.type === "replace" && figma.currentPage.selection.length == 1) {
        figma.loadFontAsync(node.fontName);
        if (msg.ellipsis === "none") {
            node.characters = textToDisplay;
        }
        if (msg.ellipsis === "center") {
            node.characters = textToDisplayBegin + "..." + textToDisplayEnd;
        }
        if (msg.ellipsis === "start") {
            node.characters = "..." + makeid(msg.count);
        }
        if (msg.ellipsis === "end") {
            node.characters = textToDisplay + "...";
        }
    }
    if (msg.type === "deselect-non-text") {
        for (let i = 0; i < allNodes.length; i++) {
            if (allNodes[i].type === "TEXT") {
                newSelection.push(allNodes[i]);
            }
            newSelection === 0 ? figma.currentPage.selection = [] : figma.currentPage.selection = newSelection;
        }
    }
};
;
