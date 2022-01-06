figma.showUI(__html__, { width: 340, height: 300 });
let node = figma.currentPage.selection[0];
function makeid(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
figma.loadFontAsync({ family: "Roboto", style: "Regular" });
figma.on("selectionchange", () => {
    node = figma.currentPage.selection[0];
    if (node && figma.currentPage.selection[0].type === "TEXT") {
        figma.loadFontAsync(node.fontName);
    }
    figma.ui.postMessage(node ? 1 : 0);
});
figma.on("run", () => {
    figma.ui.postMessage(node ? 1 : 0);
});
figma.ui.onmessage = (msg) => {
    if (msg.type === "create") {
        const nodes = [];
        const letterNode = figma.createText();
        nodes.push(letterNode);
        const textToDisplay = makeid(msg.count);
        const textToDisplayBegin = makeid(msg.count / 2);
        const textToDisplayEnd = makeid(msg.count / 2);
        if (msg.ellipsis === "none") {
            letterNode.characters = textToDisplay;
        }
        if (msg.ellipsis === "center") {
            letterNode.characters = textToDisplayBegin + "..." + textToDisplayEnd;
        }
        if (msg.ellipsis === "start") {
            letterNode.characters = "..." + textToDisplay;
        }
        if (msg.ellipsis === "end") {
            letterNode.characters = textToDisplay + "...";
        }
        letterNode.fontSize = 24;
        letterNode.fontName = { family: "Roboto", style: "Regular" };
        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);
    }
    if (msg.type === "replace" && figma.currentPage.selection.length == 1) {
        const textToDisplay = makeid(msg.count);
        const textToDisplayBegin = makeid(msg.count / 2);
        const textToDisplayEnd = makeid(msg.count / 2);
        if (msg.ellipsis === "none") {
            node.characters = textToDisplay;
        }
        if (msg.ellipsis === "center") {
            node.characters = textToDisplayBegin + "..." + textToDisplayEnd;
        }
        if (msg.ellipsis === "start") {
            node.characters = "..." + textToDisplay;
        }
        if (msg.ellipsis === "end") {
            node.characters = textToDisplay + "...";
        }
    }
    // figma.closePlugin();
};
