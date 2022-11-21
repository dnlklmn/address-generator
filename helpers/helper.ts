export function makeid(length: Number, msg: any) {
  var result = "";
  var characters =
    msg.chainValue === "ethereum"
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
  if (msg.chainValue === "ethereum") {
    prefix = "0x";
  }
  if (msg.chainValue === "polkadot") {
    prefix = "1";
  }
  if (msg.chainValue === "kusama") {
    prefix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(
      Math.floor(Math.random() * 26)
    );
  }
  const textToDisplay =
    prefix === "0x" || ""
      ? prefix + makeid(msg.countValue, msg)
      : prefix + makeid(msg.countValue - 1, msg);

  const textToDisplayBegin =
    prefix === "0x" || ""
      ? prefix + makeid(msg.countValue / 2, msg)
      : prefix + makeid(msg.countValue / 2 - 1, msg);

  const textToDisplayEnd = makeid(msg.countValue / 2, msg);

  return [textToDisplay, textToDisplayBegin, textToDisplayEnd];
}

export function setCharacters(msg: any, node: any, address: any) {
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
    node.characters = "..." + address[0].substring(3);
    console.log("substring:", address[0].substring(3));
  }

  if (msg.ellipsisValue === "end") {
    node.characters = address[0] + "...";
  }

  return node.characters;
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
