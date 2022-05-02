import { SEARCH_PARAMS_KEY } from "../utils/constants.js";
import {
  getLocalStorageValue,
  storeLocalValue,
} from "../utils/LocalStorageUtils.js";
import { capitalize } from "../utils/TextFormatUtils.js";
import { filterResults } from "./RefineSearchUtils.js";
import { renderTiles } from "./RenderTilesUtils.js";

const SEARCH_TAGS_ROOT = document.getElementById("search-tags-root");

export function renderSearchTags() {
  resetRootTags();
  const params = getLocalStorageValue(SEARCH_PARAMS_KEY);
  params.forEach((tagName) => {
    if (isTagNameNull(tagName)) {
      const tag = createSearchTagElement(tagName);
      SEARCH_TAGS_ROOT.append(tag);
    }
  });
}

function isTagNameNull(tagName) {
  return tagName != "null" && tagName != "";
}

function resetRootTags() {
  SEARCH_TAGS_ROOT.innerHTML = "";
}

function createSearchTagElement(tagName) {
  const formattedTagName = capitalize(tagName);
  const tag = document.createElement("div");
  tag.onclick = (event) => {
    removeTagFromSearch(event);
  };
  tag.setAttribute("tagname", tagName);
  tag.innerHTML = formattedTagName;
  return tag;
}

function removeTagFromSearch(event) {
  const tagname = event.target.attributes.tagname.value;
  const queryParams = removeParamFromQueryInLocalStorage(tagname);
  const refinedResults = filterResults(queryParams);
  event.target.remove();
  renderTiles(refinedResults);
}

function removeParamFromQueryInLocalStorage(tagName) {
  const searchParams = getLocalStorageValue(SEARCH_PARAMS_KEY);
  searchParams.forEach((param, index) => {
    if (param === tagName) {
      searchParams[index] = "null";
    }
  });
  storeLocalValue(SEARCH_PARAMS_KEY, searchParams);
  return searchParams;
}
