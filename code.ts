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

figma.on("selectionchange", () => {
  node = figma.currentPage.selection[0];

  let chain = "any";

  if (node && figma.currentPage.selection[0].type === "TEXT") {
    figma.loadFontAsync(node.fontName);
    const numberOfCharacters = node.characters.length;

    if (node.characters.includes("...")) {
      if (node.characters.startsWith("...")) {
        figma.ui.postMessage(["start", numberOfCharacters - 3, node ? 1 : 0]);
      }
      if (node.characters.endsWith("...")) {
        if (node.characters.startsWith("0x")) {
          figma.ui.postMessage([
            "end",
            numberOfCharacters - 3,
            node ? 1 : 0,
            "ethereum",
          ]);
        }
        if (node.characters.startsWith("1")) {
          figma.ui.postMessage([
            "end",
            numberOfCharacters - 3,
            node ? 1 : 0,
            "polkadot",
          ]);
        }
        if (node.characters.startsWith("5")) {
          figma.ui.postMessage([
            "end",
            numberOfCharacters - 3,
            node ? 1 : 0,
            "kusama",
          ]);
        } else {
          figma.ui.postMessage([
            "end",
            numberOfCharacters - 3,
            node ? 1 : 0,
            "any",
          ]);
        }
      }
      if (
        !node.characters.startsWith("...") &&
        !node.characters.endsWith("...")
      ) {
        figma.ui.postMessage(["center", numberOfCharacters - 3, node ? 1 : 0]);
      }
    } else {
      figma.ui.postMessage(["none", numberOfCharacters, node ? 1 : 0]);
    }

    if (node.characters.startsWith("...")) {
      figma.ui.postMessage(["start", numberOfCharacters - 3, node ? 1 : 0]);
    }
  }

  if (!node) {
    figma.ui.postMessage(["none", 0, node ? 1 : 0]);
  }
});

figma.on("run", () => {
  let ellipsis = "none";

  let numberOfCharacters = 0;

  let chain = "any";

  if (node && !node.characters.includes("...")) {
    ellipsis = "none";
    numberOfCharacters = node.characters.length;
  }
  if (node && node.characters.startsWith("...")) {
    ellipsis = "start";
    numberOfCharacters = node.characters.length - 3;
  }
  if (node && node.characters.endsWith("...")) {
    ellipsis = "end";
    numberOfCharacters = node.characters.length - 3;
  }
  if (
    node &&
    node.characters.includes("...") &&
    !node.characters.endsWith("...") &&
    !node.characters.startsWith("...")
  ) {
    ellipsis = "center";
    numberOfCharacters = node.characters.length - 3;
  }

  if (node && node.characters.startsWith("0x")) {
    chain = "ethereum";
  }

  figma.ui.postMessage([ellipsis, numberOfCharacters, node ? 1 : 0, chain]);
});

figma.ui.onmessage = (msg) => {
  if (msg.type === "create") {
    const nodes: TextNode[] = [];

    const letterNode: TextNode = figma.createText();
    nodes.push(letterNode);

    const textToDisplay =
      msg.chain === "ethereum" ? makeid(msg.count) : makeid(msg.count - 1);
    const textToDisplayBegin = "ethereum"
      ? makeid(msg.count / 2)
      : makeid(msg.count / 2 - 1);
    const textToDisplayEnd = makeid(msg.count / 2);

    let currentChain = "";

    if (msg.chain === "ethereum") {
      currentChain = "0x";
    }

    if (msg.chain === "polkadot") {
      currentChain = "1";
    }

    if (msg.chain === "kusama") {
      currentChain = "A";
    }

    if (msg.ellipsis === "none") {
      letterNode.characters = currentChain + textToDisplay;
    }

    if (msg.ellipsis === "center") {
      letterNode.characters =
        currentChain + textToDisplayBegin + "..." + textToDisplayEnd;
    }

    if (msg.ellipsis === "start") {
      letterNode.characters = "..." + textToDisplay;
    }

    if (msg.ellipsis === "end") {
      letterNode.characters = currentChain + textToDisplay + "...";
    }

    letterNode.fontSize = 24;
    letterNode.fontName = { family: "Roboto", style: "Regular" };

    letterNode.x = figma.viewport.center.x;
    letterNode.y = figma.viewport.center.y;

    figma.currentPage.selection = nodes;
  }

  if (msg.type === "replace" && figma.currentPage.selection.length == 1) {
    const textToDisplay = makeid(msg.count);
    const textToDisplayBegin = makeid(msg.count / 2);
    const textToDisplayEnd = makeid(msg.count / 2);

    figma.loadFontAsync(node.fontName);

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
