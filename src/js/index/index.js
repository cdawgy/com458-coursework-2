import { QUERY_PARAMS_KEY } from "../utils/constants.js";
import { SEARCH_RESULTS_PAGE } from "../constants/pageNameConstants.js";
import { redirectToPage } from "../item-listing/RedirectUtils.js";
import { readQueryParamsFromDOM } from "../search-results/RefineSearchUtils.js";
import {
  getModelsRelativeToMake,
  MAKE_SELECT,
} from "../utils/DynamicFormUtils.js";
import { storeLocalValue } from "../utils/LocalStorageUtils.js";
import { renderUsedCarTiles } from "./RenderCarTiles.js";
import { renderEssentialsTiles } from "./RenderEssentialTiles.js";
import { cookieRedirect, isCookieDefined, updateCookieUI } from "../utils/CookieUtils.js";

// Create on click function for recently viewed pop up
// This pop up should only display if a relative cookie exists.
const RECENTLY_VIEWED_CAR = document.getElementById("recentlyViewedCarPopup");
RECENTLY_VIEWED_CAR.onclick = (mouseClickEvent) => {
  cookieRedirect(mouseClickEvent);
};

// Functions to fire on load of page
document.body.onload = () => {
  if(isCookieDefined()){
    updateCookieUI();
    RECENTLY_VIEWED_CAR.style.display = "block"
  }
}

const LATEST_CARS_ROOT = document.getElementById("latestUsedCars");
LATEST_CARS_ROOT.onload = renderUsedCarTiles(4);

const NEW_ESSENTIALS_ROOT = document.getElementById("newCarEssentialsRoot");
NEW_ESSENTIALS_ROOT.onload = renderEssentialsTiles();

// Set listener to Select tag within HTML. This kicks off generation of dynamic
// models for a user to chose from based on what make they have selected and
// what models are currently available from the list.
MAKE_SELECT.addEventListener("change", getModelsRelativeToMake);

// Set listener to redirect user to search results page with pre selected params
// Here we read which params the user has selected, then store them in local storage
// for later use, finally redirecting the user to the search results page.
const REFINE_SEARCH_BUTTON = document.getElementById("refine-search-button");
REFINE_SEARCH_BUTTON.onclick = (mouseClickEvent) => {
  mouseClickEvent.preventDefault();
  const queryParams = readQueryParamsFromDOM();
  storeLocalValue(QUERY_PARAMS_KEY, queryParams);
  redirectToPage(SEARCH_RESULTS_PAGE);
};
