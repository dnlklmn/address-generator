export function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export function textToDisplay(msg) {
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
  return [textToDisplay, textToDisplayBegin, textToDisplayEnd];
}
export function setCharacters(msg, node, address) {
  if (msg.ellipsis === "none") {
    node.characters = address[0];
  }
  if (msg.ellipsis === "center") {
    node.characters = address[1] + "..." + address[2];
  }
  if (msg.ellipsis === "start") {
    node.characters = "..." + makeid(msg.count);
  }
  if (msg.ellipsis === "end") {
    node.characters = address[0] + "...";
  }
  return node.characters;
}
export default makeid;
