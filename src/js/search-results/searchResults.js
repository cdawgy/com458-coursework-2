import {
  DARK_BG_ID,
  QUERY_PARAMS_KEY,
  REFINE_SEARCH_MODAL_ID,
} from "../utils/constants.js";
import {
  getModelsRelativeToMake,
  MAKE_SELECT,
} from "../utils/DynamicFormUtils.js";
import {
  doesKeyHaveValues,
  storeLocalValue,
} from "../utils/LocalStorageUtils.js";
import { setDisplayStateOf } from "../utils/DomManipulationUtils.js";
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
  if (window.innerWidth < 991) {
    setDisplayStateOf(REFINE_SEARCH_MODAL_ID, "none");
    setDisplayStateOf(DARK_BG_ID, "none");
  }
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
  setDisplayStateOf(REFINE_SEARCH_MODAL_ID, "block");
  setDisplayStateOf(DARK_BG_ID, "block");
};

// Bind hiding of refine modal to modal close button on mobile view
const MODAL_CLOSE_BUTTON = document.getElementById("refineModalCloseIcon");
MODAL_CLOSE_BUTTON.onclick = () => {
  setDisplayStateOf(REFINE_SEARCH_MODAL_ID, "none");
  setDisplayStateOf(DARK_BG_ID, "none");
};

// Bind hiding of modal and background on click of background
const DARK_BG = document.getElementById(DARK_BG_ID);
DARK_BG.onclick = () => {
  setDisplayStateOf(REFINE_SEARCH_MODAL_ID, "none");
  setDisplayStateOf(DARK_BG_ID, "none");
};
