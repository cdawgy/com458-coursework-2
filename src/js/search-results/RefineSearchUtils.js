import {
  QUERY_PARAMS_KEY,
  SEARCH_PARAMS_KEY,
} from "../utils/constants.js";
import {
  doesKeyHaveValues,
  getLocalStorageValue,
  storeLocalValue,
} from "../utils/LocalStorageUtils.js";
import { renderTiles } from "./RenderTilesUtils.js";
import { renderSearchTags } from "./SearchTagsUtils.js";

const MAKE = 0;
const MODEL = 1;
const TRANSMISSION = 2;
const FUEL_TYPE = 3;

export function refineSearchResults() {
  const params = getQueryParams();
  const refinedResults = filterResults(params);

  storeLocalValue(SEARCH_PARAMS_KEY, params);

  // Render search tags within DOM
  renderSearchTags();

  // Render listing tiles within DOM
  renderTiles(refinedResults);
}

function getQueryParams() {
  if (doesKeyHaveValues(QUERY_PARAMS_KEY)) {
    return getLocalStorageValue(QUERY_PARAMS_KEY);
  } else {
    return readQueryParamsFromDOM();
  }
}

export function readQueryParamsFromDOM() {
  const selections = [
    document.getElementById("make"),
    document.getElementById("model"),
    document.getElementById("transmission"),
    document.getElementById("fuelType"),
  ];

  return selections.map((element) => {
    return element.value;
  });
}

export function filterResults(queryParams) {
  return API_CAR_LIST_RESPONSE.filter((carListing) =>
    doesParamsMatchObject(carListing, queryParams)
  );
}

function doesParamsMatchObject(carListing, queryParams) {
  let flag = true;

  if (queryParams[MAKE] != "null") {
    flag = carListing.itemListingInfo.make === queryParams[MAKE];
  }

  if (queryParams[MODEL] != "null" && flag) {
    flag = carListing.itemListingInfo.model === queryParams[MODEL];
  }

  if (queryParams[TRANSMISSION] != "null" && flag) {
    flag =
      carListing.itemListingInfo.transmission === queryParams[TRANSMISSION];
  }
  if (queryParams[FUEL_TYPE] != "null" && flag) {
    flag = carListing.itemListingInfo.fuelType === queryParams[FUEL_TYPE];
  }
  return flag;
}
