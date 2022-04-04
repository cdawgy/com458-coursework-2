import {
  CLICKED_LISTING_KEY,
  getLocalStorageValue,
} from "../utils/LocalStorageUtils.js";
import {
  capitalize,
  seperateWithWhiteSpace,
} from "../utils/TextFormatUtils.js";

export function renderListing() {
  const clickedListingString = getLocalStorageValue(CLICKED_LISTING_KEY);
  const itemListingInfo = clickedListingString.itemListingInfo;
  const itemListingImages = clickedListingString.listOfItemImages;
  console.log(itemListingImages);

  renderListingTitleInfo(itemListingInfo);
  renderListingBody(itemListingInfo);
  renderInitialImages(itemListingImages);
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
  setMainImage(itemListingImages[0]);
  createImageTiles(itemListingImages);
}

function setMainImage(image) {
  const imageDiv = document.getElementById("main-image");
  imageDiv.style.backgroundImage = `url("${image}")`;
}

function createImageTiles(itemListingImages) {
  const leftArrow = createCarouselArrow("left");
  const rightArrow = createCarouselArrow("right");

  const miniImgWrapper = document.getElementById("mini-img-wrapper");
  miniImgWrapper.appendChild(leftArrow);
  createSmallerImages(miniImgWrapper, itemListingImages);
  miniImgWrapper.appendChild(rightArrow);
}

function createCarouselArrow(direction) {
  direction = direction.toLowerCase();
  const arrow = document.createElement("div");
  arrow.className = `carousel-button carousel-button-${direction}`;

  const img = document.createElement("img");
  img.src = `../../assets/itemListing/green-chevron-${direction}.svg`;
  img.alt = `${direction} pointing arrow`;

  arrow.appendChild(img);
  return arrow;
}

function createSmallerImages(parentElement, itemListingImages) {
  for (const imgUrl of itemListingImages) {
    parentElement.appendChild(createSmallerImage(imgUrl));
  }
}

function createSmallerImage(imgUrl) {
  const imgDiv = document.createElement("div");
  imgDiv.className = "carousel-image";
  imgDiv.style.backgroundImage = `url("${imgUrl}")`;
  imgDiv.onclick = () => {
    setMainImage(imgUrl);
  };
  return imgDiv;
}
