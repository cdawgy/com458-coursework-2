export function storeLocalValue(key, value) {
  const valueToBeStored = validateValue(value);
  window.localStorage.setItem(key, valueToBeStored);
}

function validateValue(value) {
  return value instanceof String ? value : JSON.stringify(value);
}

export function getLocalStorageValue(key) {
  const value = window.localStorage.getItem(key);
  const localStorageValue = parseValue(value);
  return localStorageValue;
}

function parseValue(value) {
  return value != "undefined" ? JSON.parse(value) : value;
}

export function doesKeyHaveValues(key) {
  const value = window.localStorage.getItem(key);
  return value != "undefined" && value != null;
}
