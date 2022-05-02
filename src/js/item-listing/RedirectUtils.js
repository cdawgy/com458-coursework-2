
import { CLICKED_LISTING_KEY } from "../utils/constants.js";
import { ITEM_LISTING_PAGE } from "../constants/pageNameConstants.js";
import {
  storeLocalValue,
} from "../utils/LocalStorageUtils.js";

export const LISTING_ATTR_ID = "listingid";

export function redirectToItemListingPage(event) {
  const searchListingWrapper = getParentSearchListingWrapper(event);
  const itemListingId =
    getItemListingIdFromWrapperElement(searchListingWrapper);
  const listedItem = getItemListingFromApiCall(itemListingId);
  storeLocalValue(CLICKED_LISTING_KEY, listedItem);
  redirectToPage(ITEM_LISTING_PAGE);
}

export function redirectToPage(redirectPage) {
  window.location.href = redirectPage;
}

function getParentSearchListingWrapper(event) {
  return event.path.filter(
    (htmlElementInPath) =>
      htmlElementInPath.className === "search-listing-wrapper" ||
      htmlElementInPath.className === "car-listing-tile"
  )[0];
}

function getItemListingIdFromWrapperElement(searchListingWrapper) {
  return searchListingWrapper.getAttribute(LISTING_ATTR_ID);
}

function getItemListingFromApiCall(itemListingId) {
  return API_CAR_LIST_RESPONSE.filter(
    (listing) => listing.itemListingId === parseInt(itemListingId)
  )[0];
}
