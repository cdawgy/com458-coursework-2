export const SEARCH_PARAMS_KEY = "searchParamsKey";
export const CLICKED_LISTING_KEY = "clickedListingKey";

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
  return JSON.parse(value);
}
