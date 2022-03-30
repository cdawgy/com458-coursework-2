import {
  CLICKED_LISTING_KEY,
  storeLocalValue,
} from "../utils/LocalStorageUtils.js";

export function redirectToItemListingPage(event) {
  const searchListingWrapper = getParentSearchListingWrapper(event);
  const itemListingId =
    getItemListingIdFromWrapperElement(searchListingWrapper);
  const listedItem = getItemListingFromApiCall(itemListingId);
  storeLocalValue(CLICKED_LISTING_KEY, listedItem);
  window.location.href = "itemListing.html";
}

function getParentSearchListingWrapper(event) {
  return event.path.filter(
    (htmlElementInPath) =>
      htmlElementInPath.className === "search-listing-wrapper"
  )[0];
}

function getItemListingIdFromWrapperElement(searchListingWrapper) {
  return searchListingWrapper.getAttribute("listingid");
}

function getItemListingFromApiCall(itemListingId) {
  return API_CAR_LIST_RESPONSE.filter(
    (listing) => listing.itemListingId === parseInt(itemListingId)
  )[0];
}
