import {
  CLICKED_LISTING_KEY,
  getLocalStorageValue,
} from "./utils/LocalStorageUtils.js";
import { capitalize } from "./utils/TextFormatUtils.js";

document.body.onload = () => {
  const clickedListingString = getLocalStorageValue(CLICKED_LISTING_KEY);
  const itemListingInfo = clickedListingString.itemListingInfo;
  for (let [key, value] of Object.entries(itemListingInfo)) {
    const root = document.getElementById("listing-info-root");

    const div = document.createElement("div");
    div.className = "listing-info";

    const title = document.createElement("p");
    title.innerHTML = capitalize(key);
    const htmlValue = document.createElement("p");
    htmlValue.innerHTML = value;

    div.appendChild(title);
    div.appendChild(htmlValue);

    root.appendChild(div);
  }
};
