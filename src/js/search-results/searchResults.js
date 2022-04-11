import { getModelsRelativeToMake, MAKE_SELECT } from "../utils/DynamicFormUtils.js";
import { refineSearchResults } from "./RefineSearchUtils.js";
import { renderTiles } from "./RenderTilesUtils.js";
import { sortCarListings } from "./SortByUtils.js";

let carListingsToRender = API_CAR_LIST_RESPONSE;

// Bind initial render of tiles to body loading
document.body.onload = () => {
  renderTiles(carListingsToRender);
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
