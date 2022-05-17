import { CLICKED_LISTING_KEY } from "../utils/constants.js";
import { storeKeyValueInCookies } from "../utils/CookieUtils.js";
import { getLocalStorageValue } from "../utils/LocalStorageUtils.js";
import { renderListing } from "./ListingRenderUtils.js";

// Inject content into base listing page components for dyanmic rendering.
document.body.onload = () => {
  renderListing();
  const clickedListingString = getLocalStorageValue(CLICKED_LISTING_KEY);
  const id = clickedListingString.itemListingId;
  storeKeyValueInCookies("recentlyViewedCar", id, 180);
};
