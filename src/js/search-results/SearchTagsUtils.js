import {
  getLocalStorageValue,
  SEARCH_PARAMS_KEY,
  storeLocalValue,
} from "../utils/LocalStorageUtils.js";
import { capitalize } from "../utils/TextFormatUtils.js";
import { filterResults } from "./RefineSearchUtils.js";
import { renderTiles } from "./RenderTilesUtils.js";

const SEARCH_TAGS_ROOT = document.getElementById("search-tags-root");

export function renderSearchTags() {
  resetRootTags();
  const params = getSearchParamsFromLocalStorage();
  params.forEach((tagName) => {
    if (isTagNameNull(tagName)) {
      const tag = createSearchTagElement(tagName);
      SEARCH_TAGS_ROOT.append(tag);
    }
  });
}

function getSearchParamsFromLocalStorage() {
  const params = getLocalStorageValue(SEARCH_PARAMS_KEY);
  return params.split(",");
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

  let searchParams = getLocalStorageValue(SEARCH_PARAMS_KEY);
  searchParams = searchParams.replace(tagname, "null");
  storeLocalValue(SEARCH_PARAMS_KEY, searchParams);

  event.target.remove();

  const queryParamsArray = searchParams.split(",");
  const refinedResults = filterResults(queryParamsArray);
  renderTiles(refinedResults);
}
