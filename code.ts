import { textToDisplay } from "./helpers/helper";
// import { setCharacters } from "./helpers/helper";
import { createAddress } from "./helpers/helper";
import { addressFormatted } from "./helpers/helper";

figma.showUI(__html__, { themeColors: true, width: 340, height: 300 });

let node: any = figma.currentPage.selection[0];
let allNodes: any = figma.currentPage.selection;
let newSelection: any = [];

figma.loadFontAsync({ family: "Inter", style: "Regular" });

let ellipsis = "none";
let chain = "any";
let numberOfCharacters = 24;

let selectedTextObjects = [];
let selectedOtherObjects = [];

function trackSelection() {}

figma.on("selectionchange", () => {
  allNodes = figma.currentPage.selection;

  selectedTextObjects = [];
  selectedOtherObjects = [];
  newSelection = [];

  let firstLetters: string = "";
  let numberOfObjectsSelected: number = allNodes.length;

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

      if (
        allNodes[i].characters.includes("...") &&
        !allNodes[i].characters.endsWith("...") &&
        !allNodes[i].characters.startsWith("...")
      ) {
        ellipsis = "center";
        numberOfCharacters = allNodes[i].characters.length - 3;
      }

      if (
        firstLetters.charAt(0).match(/[a-z]/i) &&
        firstLetters.charAt(0).toUpperCase() === firstLetters.charAt(0)
      ) {
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
      if (
        firstLetters !== "0x" &&
        firstLetters.charAt(0) != "1" &&
        firstLetters.charAt(0).toUpperCase() != firstLetters.charAt(0)
      ) {
        chain = "any";
      }

      selectedTextObjects.push(allNodes[i].type);
    } else {
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

  let firstLetters: string = "";
  let numberOfObjectsSelected: number = allNodes.length;

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

      if (
        allNodes[i].characters.includes("...") &&
        !allNodes[i].characters.endsWith("...") &&
        !allNodes[i].characters.startsWith("...")
      ) {
        ellipsis = "center";
        numberOfCharacters = allNodes[i].characters.length - 3;
      }

      selectedTextObjects.push(allNodes[i].type);
    } else {
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
    const nodes: TextNode[] = [];
    const textNode: TextNode = figma.createText();
    nodes.push(textNode);
    let text = createAddress(msg);
    let textChopped = addressFormatted(text, msg);

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

      let text = createAddress(msg);
      let textChopped = addressFormatted(text, msg);
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
