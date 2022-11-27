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
      ? prefix + makeid(msg.currentCount - 2, msg)
      : prefix + makeid(msg.currentCount, msg);

  const addressBegin =
    prefix === "0x" || ""
      ? prefix + makeid(msg.currentCount / 2 - 2, msg)
      : prefix + makeid(msg.currentCount / 2, msg);

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

  let address: string;

  if (msg.currentChain === "ethereum") {
    address = prefix + makeid(msg.currentCount - 2, msg);
  }

  if (msg.currentChain === "polkadot" || msg.currentChain === "kusama") {
    address = prefix + makeid(msg.currentCount - 1, msg);
  }

  if (msg.currentChain === "any") {
    address = makeid(msg.currentCount, msg);
  }

  return address;
}

export function addressFormatted(address: any, msg: any) {
  let characters: any;

  if (msg.currentEllipsis === "none" || msg.currentEllipsis === "None") {
    characters = address;
  }

  if (msg.currentEllipsis === "center" || msg.currentEllipsis === "Center") {
    characters =
      address.substring(0, msg.currentCount / 2 - 2) +
      "..." +
      address.substring(msg.currentCount / 2, msg.currentCount - 1);
  }

  if (msg.currentEllipsis === "start" || msg.currentEllipsis === "Start") {
    characters = "..." + address.substring(3);
  }

  if (msg.currentEllipsis === "end" || msg.currentEllipsis === "End") {
    characters = address.substring(0, msg.currentCount - 3) + "...";
  }

  return characters;
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
