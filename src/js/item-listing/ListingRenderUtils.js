import { CLICKED_LISTING_KEY } from "../utils/constants.js";
import {
  getLocalStorageValue,
} from "../utils/LocalStorageUtils.js";
import {
  capitalize,
  seperateWithWhiteSpace,
} from "../utils/TextFormatUtils.js";
import {
  createCarouselArrow,
  createSmallerImages,
  setMainImage,
} from "./CarouselUtils.js";

export function renderListing() {
  const clickedListingString = getLocalStorageValue(CLICKED_LISTING_KEY);
  const itemListingInfo = clickedListingString.itemListingInfo;
  const itemListingImages = clickedListingString.listOfItemImages;
  const listingTitle = clickedListingString.itemListingTitle

  renderListingTitleInfo(itemListingInfo);
  renderListingBody(itemListingInfo);
  renderInitialImages(itemListingImages);
  updateWebPageTitleInnerHTML(listingTitle);
}

function updateWebPageTitleInnerHTML(listingTitle) {
  const title = document.getElementsByTagName("title");
  if (title.length === 1) {
    title[0].innerHTML = `${listingTitle} | Connolly Group`;
  }
}

function renderListingBody(itemListingInfo) {
  for (let [key, value] of Object.entries(itemListingInfo)) {
    const root = document.getElementById("listing-info-root");

    const div = document.createElement("div");
    div.className = "listing-info";

    const title = document.createElement("p");
    const seperatedTitleText = seperateWithWhiteSpace(key);
    title.innerHTML = capitalize(seperatedTitleText);

    const htmlValue = document.createElement("p");
    htmlValue.innerHTML = capitalize(value);

    div.appendChild(title);
    div.appendChild(htmlValue);

    root.appendChild(div);
  }
}

function renderListingTitleInfo(itemListingInfo) {
  insertTitle(itemListingInfo);
  insertListingPrice(itemListingInfo);
  insertMakeModelAndYear(itemListingInfo);
  insertListingDescription();
}

function insertTitle(itemListingInfo) {
  const listingTitle = document.getElementById("listing-title");
  listingTitle.innerHTML = capitalize(itemListingInfo.make);
}

function insertListingPrice(itemListingInfo) {
  const listingPrice = document.getElementById("listing-price");
  const priceSpan = document.createElement("span");
  priceSpan.className = "font-red";
  priceSpan.innerHTML = "Price: ";
  listingPrice.appendChild(priceSpan);
  listingPrice.innerHTML = listingPrice.innerHTML + "£" + itemListingInfo.price;
}

function insertMakeModelAndYear(itemListingInfo) {
  const subtitle = document.getElementById("listing-subtitle");
  subtitle.innerHTML = capitalize(itemListingInfo.model);
  const year = document.getElementById("listing-year");
  year.innerHTML = itemListingInfo.year;
}

function insertListingDescription() {
  const listingDescription =
    getLocalStorageValue(CLICKED_LISTING_KEY).description;
  const desc = document.getElementById("description");
  desc.innerHTML = listingDescription;
}

function renderInitialImages(itemListingImages) {
  setMainImage(itemListingImages[0], 0);
  createImageTiles(itemListingImages);
}

function createImageTiles(itemListingImages) {
  const leftArrow = createCarouselArrow("left", itemListingImages);
  const rightArrow = createCarouselArrow("right", itemListingImages);

  const miniImgWrapper = document.getElementById("mini-img-wrapper");
  miniImgWrapper.appendChild(leftArrow);
  createSmallerImages(miniImgWrapper, itemListingImages);
  miniImgWrapper.appendChild(rightArrow);
}
