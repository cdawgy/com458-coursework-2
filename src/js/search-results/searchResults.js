import { QUERY_PARAMS_KEY } from "../utils/constants.js";
import {
  getModelsRelativeToMake,
  MAKE_SELECT,
} from "../utils/DynamicFormUtils.js";
import {
  doesKeyHaveValues,
  storeLocalValue,
} from "../utils/LocalStorageUtils.js";
import { setRefineSearchModalDisplayState } from "./RefineSearchModalManager.js";
import { refineSearchResults } from "./RefineSearchUtils.js";
import { renderTiles } from "./RenderTilesUtils.js";
import { sortCarListings } from "./SortByUtils.js";

let carListingsToRender = API_CAR_LIST_RESPONSE;

// Bind initial render of tiles to body loading
document.body.onload = () => {
  if (doesKeyHaveValues(QUERY_PARAMS_KEY)) {
    refineSearchResults();
    storeLocalValue(QUERY_PARAMS_KEY, undefined);
  } else {
    renderTiles(carListingsToRender);
  }
};

// Bind re-render of queried list to search button
const REFINE_SEARCH_BUTTON = document.getElementById("refine-search-button");
REFINE_SEARCH_BUTTON.onclick = () => {
  refineSearchResults();
};

// Bind refresh of 'Refine Search' to refresh button
const RESET_SEARCH_BUTTON = document.getElementById("reset-search-button");
RESET_SEARCH_BUTTON.onclick = () => {
  location.reload();
};

// Bind selection of 'Sort By' to re-render of tiles in selected order
const SORT_BY_OPTION = document.getElementById("sort-by");
SORT_BY_OPTION.onchange = (event) => {
  sortCarListings(event, carListingsToRender);
};

// Set listener to Select tag within HTML. This kicks off generation of dynamic
// models for a user to chose from based on what make they have selected and
// what models are currently available from the list.
MAKE_SELECT.addEventListener("change", getModelsRelativeToMake);

// Bind showing of refine modal to button on mobile view
const MODAL_DISPLAY_BUTTON = document.getElementById("refineSearchModalButton");
MODAL_DISPLAY_BUTTON.onclick = () => {
  setRefineSearchModalDisplayState("block");
};

// Bind hiding of refine modal to modal close button on mobile view
const MODAL_CLOSE_BUTTON = document.getElementById("refineModalCloseIcon");
MODAL_CLOSE_BUTTON.onclick = () => {
  setRefineSearchModalDisplayState("none");
};
