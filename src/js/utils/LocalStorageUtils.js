export const SEARCH_PARAMS_KEY = "searchParamsKey";

export function storeLocalValue(key, value) {
  window.localStorage.setItem(key, value);
}

export function getLocalStorageValue(key) {
  return window.localStorage.getItem(key);
}
