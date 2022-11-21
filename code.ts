import { textToDisplay } from "./helpers/helper";
import { setCharacters } from "./helpers/helper";

figma.showUI(__html__, { themeColors: true, width: 340, height: 300 });

let node: any = figma.currentPage.selection[0];
let allNodes: any = figma.currentPage.selection;
let newSelection: any = [];

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
      if (
        allNodes[i].characters.includes("...") &&
        !allNodes[i].characters.endsWith("...") &&
        !allNodes[i].characters.startsWith("...")
      ) {
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
    } else {
      selectedOtherObjects.push(allNodes[i].type);
    }
    console.log(
      "text objects selected:",
      selectedTextObjects.length,
      ", other objects selected:",
      selectedOtherObjects.length
    );
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
      if (
        allNodes[i].characters.includes("...") &&
        !allNodes[i].characters.endsWith("...") &&
        !allNodes[i].characters.startsWith("...")
      ) {
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
    } else {
      selectedOtherObjects.push(allNodes[i].type);
    }
    console.log(
      "text objects selected:",
      selectedTextObjects.length,
      ", other objects selected:",
      selectedOtherObjects.length
    );
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
    const nodes: TextNode[] = [];
    const textNode: TextNode = figma.createText();
    nodes.push(textNode);

    let text = textToDisplay(msg);

    console.log("create-message:", msg);

    textNode.characters = setCharacters(msg, textNode, text);

    textNode.fontSize = 24;
    textNode.fontName = { family: "Inter", style: "Regular" };

    textNode.x = figma.viewport.center.x;
    textNode.y = figma.viewport.center.y;

    figma.currentPage.selection = nodes;
  }

  if (msg.type === "regenerate") {
    console.log("regenerating now");
    for (let i = 0; i < allNodes.length; i++) {
      figma.loadFontAsync(allNodes[i].fontName);
      let text = textToDisplay(msg);
      let chars = setCharacters(msg, allNodes[i], text);
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
