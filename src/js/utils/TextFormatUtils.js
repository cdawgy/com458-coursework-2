export function capitalize(tagName) {
  const firstLetter = tagName[0].toUpperCase();
  const tagLength = tagName.length;
  return firstLetter + tagName.slice(1, tagLength);
}
