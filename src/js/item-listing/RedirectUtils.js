import { CLICKED_LISTING_KEY } from "../utils/constants.js";
import { ITEM_LISTING_PAGE } from "../constants/pageNameConstants.js";
import { storeLocalValue } from "../utils/LocalStorageUtils.js";

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
  var currentTarget = event.currentTarget;
  var currentTargetParent = currentTarget.parentNode;
  while (checkElementClassName(currentTarget)) {
    currentTarget = currentTargetParent;
    currentTargetParent = currentTarget.parentNode;
  }
  return currentTarget;
}

function checkElementClassName(currentTarget) {
  return (
    currentTarget.className !== "search-listing-wrapper" &&
    currentTarget.className !== "car-listing-tile"
  );
}

function getItemListingIdFromWrapperElement(searchListingWrapper) {
  return searchListingWrapper.getAttribute(LISTING_ATTR_ID);
}

export function getItemListingFromApiCall(itemListingId) {
  return API_CAR_LIST_RESPONSE.filter(
    (listing) => listing.itemListingId === parseInt(itemListingId)
  )[0];
}
