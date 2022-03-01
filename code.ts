figma.showUI(__html__, { width: 340, height: 300 });

let node: any = figma.currentPage.selection[0];

function makeid(length: Number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

figma.loadFontAsync({ family: "Roboto", style: "Regular" });

let ellipsis = "none";
let chain = "any";
let numberOfCharacters = 0;

figma.on("selectionchange", () => {
  node = figma.currentPage.selection[0];
  let isFirstLetterUppercase = false;
  if (node) {
    isFirstLetterUppercase = /^[A-Z]/.test(node.characters);
  }
  console.log("starts with capital:" + isFirstLetterUppercase);

  if (node && !node.characters.includes("...")) {
    ellipsis = "none";
    numberOfCharacters = node.characters.length;
  }
  if (node && node.characters.startsWith("...")) {
    ellipsis = "start";
    chain = "any";
    numberOfCharacters = node.characters.length - 3;
  }
  if (node && node.characters.startsWith("0x")) {
    chain = "ethereum";
    numberOfCharacters = node.characters.length - 2;
  }
  if (node && node.characters.startsWith("1")) {
    chain = "polkadot";
    numberOfCharacters = node.characters.length;

    if (node && isFirstLetterUppercase) {
      chain = "kusama";
      numberOfCharacters = node.characters.length;
    }
    if (node && node.characters.endsWith("...")) {
      ellipsis = "end";
      numberOfCharacters = node.characters.length - 3;

      if (node.characters.startsWith("0x")) {
        chain = "ethereum";
      }
      if (node.characters.startsWith("1")) {
        chain = "polkadot";
      }
      if (node.characters.startsWith("A")) {
        chain = "kusama";
      }
    }
    if (
      node &&
      node.characters.includes("...") &&
      !node.characters.endsWith("...") &&
      !node.characters.startsWith("...")
    ) {
      ellipsis = "center";
      numberOfCharacters = node.characters.length - 3;

      if (node.characters.startsWith("0x")) {
        chain = "ethereum";
      }
      if (node.characters.startsWith("1")) {
        chain = "polkadot";
      }
      if (isFirstLetterUppercase) {
        chain = "kusama";
      }
    }
  } else {
    chain = "any";
  }
  figma.ui.postMessage([ellipsis, numberOfCharacters, node ? 1 : 0, chain]);
});

figma.on("run", () => {
  let isFirstLetterUppercase = false;
  if (node) {
    isFirstLetterUppercase = /^[A-Z]/.test(node.characters);
  }
  if (node && !node.characters.includes("...")) {
    ellipsis = "none";
    numberOfCharacters = node.characters.length;
  }
  if (node && node.characters.startsWith("...")) {
    ellipsis = "start";
    numberOfCharacters = node.characters.length - 3;
  }
  if (node && node.characters.startsWith("0x")) {
    chain = "ethereum";
    numberOfCharacters = node.characters.length - 2;
  }
  if (node && node.characters.endsWith("...")) {
    ellipsis = "end";
    numberOfCharacters = node.characters.length - 3;

    if (node.characters.startsWith("0x")) {
      chain = "ethereum";
    }
    if (node.characters.startsWith("1")) {
      chain = "polkadot";
    }
    if (isFirstLetterUppercase) {
      chain = "kusama";
    }
  }
  if (
    node &&
    node.characters.includes("...") &&
    !node.characters.endsWith("...") &&
    !node.characters.startsWith("...")
  ) {
    ellipsis = "center";
    numberOfCharacters = node.characters.length - 3;

    if (node.characters.startsWith("0x")) {
      chain = "ethereum";
    }
    if (node.characters.startsWith("1")) {
      chain = "polkadot";
    }
    if (node.characters.startsWith("A")) {
      chain = "kusama";
    }
  }
  figma.ui.postMessage([ellipsis, numberOfCharacters, node ? 1 : 0, chain]);
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
    prefix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(
      Math.floor(Math.random() * 26)
    );
  }

  const textToDisplay =
    prefix === "0x" || ""
      ? prefix + makeid(msg.count)
      : prefix + makeid(msg.count - 1);
  const textToDisplayBegin =
    prefix === "0x" || ""
      ? prefix + makeid(msg.count / 2)
      : prefix + makeid(msg.count / 2 - 1);
  const textToDisplayEnd = makeid(msg.count / 2);

  if (msg.type === "create") {
    const nodes: TextNode[] = [];

    const letterNode: TextNode = figma.createText();
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

  // figma.closePlugin();
};
