export function makeid(length: Number, msg: any) {
  var result = "";
  var characters =
    msg.currentChain === "ethereum"
      ? "ABCDEFabcdef0123456"
      : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function textToDisplay(msg: any) {
  let prefix = "";
  if (msg.currentChain === "ethereum") {
    prefix = "0x";
  }
  if (msg.currentChain === "polkadot") {
    prefix = "1";
  }
  if (msg.currentChain === "kusama") {
    prefix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(
      Math.floor(Math.random() * 26)
    );
  }
  const address =
    prefix === "0x" || ""
      ? prefix + makeid(msg.currentCount, msg)
      : prefix + makeid(msg.currentCount - 1, msg);

  const addressBegin =
    prefix === "0x" || ""
      ? prefix + makeid(msg.currentCount / 2, msg)
      : prefix + makeid(msg.currentCount / 2 - 1, msg);

  const addressEnd = makeid(msg.currentCount / 2, msg);

  return [address, addressBegin, addressEnd];
}

export function createAddress(msg: any) {
  let prefix = "";
  if (msg.currentChain === "ethereum") {
    prefix = "0x";
  }
  if (msg.currentChain === "polkadot") {
    prefix = "1";
  }
  if (msg.currentChain === "kusama") {
    prefix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(
      Math.floor(Math.random() * 26)
    );
  }
  const address =
    prefix === "0x"
      ? prefix + makeid(msg.currentCount - 2, msg)
      : prefix + makeid(msg.currentCount, msg);

  return address;
}

export function addressFormatted(address: any, msg: any) {
  let characters: any;
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

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
