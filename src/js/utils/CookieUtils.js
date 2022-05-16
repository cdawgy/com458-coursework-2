import { ITEM_LISTING_PAGE } from "../constants/pageNameConstants.js";
import { getItemListingFromApiCall } from "../item-listing/RedirectUtils.js";
import { CLICKED_LISTING_KEY } from "./constants.js";
import { storeLocalValue } from "./LocalStorageUtils.js";
import { redirectToPage } from "../item-listing/RedirectUtils.js";
import { capitalize } from "../utils/TextFormatUtils.js";

export function storeKeyValueInCookies(key, value, expireTimeSeonds) {
  const CURRENT_DATE = new Date();
  let expireTime = expireTimeSeonds * 1000;
  CURRENT_DATE.setTime(CURRENT_DATE.getTime() + expireTime);
  let expireDate = CURRENT_DATE.toUTCString();
  document.cookie = `${key}=${value}; expires=${expireDate}; path=/;`;
}

export function isCookieDefined() {
  return document.cookie != "";
}

export function getValueFromCookies() {
  const COOKIE = document.cookie;
  return isCookieDefined() ? document.cookie.split("=")[1] : undefined;
}

export function updateCookieUI() {
  const recentlyViewedId = getValueFromCookies();
  const recentlyViewedCarPopup = document.getElementById(
    "recentlyViewedCarPopup"
  );
  recentlyViewedCarPopup.setAttribute("carid", recentlyViewedId);
  const itemListing = getItemListingFromApiCall(recentlyViewedId);
  const cookieTextElement = document.getElementById(
    "recentlyViewedCarPopupText"
  );
  const listingMake = capitalize(itemListing.itemListingInfo.make);
  const listingModel = capitalize(itemListing.itemListingInfo.model);
  cookieTextElement.innerHTML = `The last item you viewed was the ${listingMake} ${listingModel}. Click this popup to view the listing again.`;
}

export function cookieRedirect(event) {
  if (event.currentTarget.className != "recentlyViewedCloseButton") {
    const recentlyViewedCarPopup = getParentSearchListingWrapper(event);
    const id = recentlyViewedCarPopup.getAttribute("carid");
    const listedItem = getItemListingFromApiCall(id);
    storeLocalValue(CLICKED_LISTING_KEY, listedItem);
    redirectToPage(ITEM_LISTING_PAGE);
  } else {
    document.getElementById("recentlyViewedCarPopup").style.display = "none";
  }
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
  return currentTarget.className !== "recentlyViewedCarPopup";
}
