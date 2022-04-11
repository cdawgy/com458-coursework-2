export function capitalize(tagName) {
  if (typeof tagName === "string") {
    const firstLetter = tagName[0].toUpperCase();
    const tagLength = tagName.length;
    return firstLetter + tagName.slice(1, tagLength);
  } else {
    return tagName;
  }
}

export function seperateWithWhiteSpace(stringValue) {
  return stringValue.replace(/([a-z])([A-Z])/g, "$1 $2");
}
