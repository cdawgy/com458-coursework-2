const LISTINGS_ROOT = document.getElementById("listingsRoot");

function renderTiles() {
  const listOfSalesToDisplay = API_CAR_LIST_RESPONSE;
  listOfSalesToDisplay.forEach((listing) => {
    const containingDiv = createContainingTileDiv(listing);

    LISTINGS_ROOT.appendChild(containingDiv);
  });
}

function createContainingTileDiv(listing) {
  const outerDiv = document.createElement("div");
  outerDiv.className = "search-listing-wrapper";

  const innerDiv = document.createElement("div");
  innerDiv.className = "row";

  outerDiv.appendChild(innerDiv);

  const listingImage = createListingImage(listing.listOfItemImages[0]);
  const listingBody = createListingBody(listing);

  innerDiv.append(listingImage);
  innerDiv.append(listingBody);

  return outerDiv;
}

function createListingImage(imgUrl) {
  const outerDiv = document.createElement("div");
  outerDiv.className = "col-2";

  const imageDiv = document.createElement("div");
  imageDiv.className = "search-listing-img";
  imageDiv.style.backgroundImage = `url("${imgUrl}")`;

  outerDiv.appendChild(imageDiv);

  return outerDiv;
}

function createListingBody(listing) {
  const outerBodyDiv = document.createElement("div");
  outerBodyDiv.className = "col-10";

  const innerDiv = document.createElement("div");
  innerDiv.className = "search-listing-body";

  const listingTitleWrapper = createListingTitleWrapper(listing);
  const listingInfoIcons = createListingInfoIcons(listing);

  innerDiv.appendChild(listingTitleWrapper);
  innerDiv.appendChild(listingInfoIcons);
  outerBodyDiv.appendChild(innerDiv);
  return outerBodyDiv;
}

function createListingTitleWrapper(listing) {
  const wrapperDiv = document.createElement("div");
  wrapperDiv.className = "search-listing-title-wrapper";

  const header = document.createElement("h2");
  header.innerHTML = `${listing.itemListingInfo.make} ${listing.itemListingInfo.model} - ${listing.itemListingInfo.year}`;

  const priceTag = document.createElement("h2");
  const priceSpan = document.createElement("span");
  priceSpan.innerHTML = "Price:";
  priceTag.append(priceSpan);
  priceTag.innerHTML =
    priceTag.innerHTML + ` £${listing.itemListingInfo.price}`;

  wrapperDiv.appendChild(header);
  wrapperDiv.appendChild(priceTag);

  return wrapperDiv;
}

function createListingInfoIcons(listing) {
  const infoIconsList = createInfoIconList(listing);
  const infoIconsDiv = document.createElement("div");
  infoIconsDiv.className = "info-icons";

  infoIconsList.forEach((infoIcon) => {
    const containingDiv = document.createElement("div");
    const infoTitle = document.createElement("p");
    infoTitle.innerHTML = infoIcon.title;

    const icon = document.createElement("img");
    icon.src = infoIcon.iconUrl;
    icon.alt = infoIcon.imgAltAttr;

    const infoIconData = document.createElement("p");
    infoIconData.innerHTML = infoIcon.listingData;

    containingDiv.appendChild(infoTitle);
    containingDiv.appendChild(icon);
    containingDiv.appendChild(infoIconData);

    infoIconsDiv.appendChild(containingDiv);
  });

  return infoIconsDiv;
}

function createInfoIconList(listing) {
  return [
    {
      title: "Mileage",
      iconUrl: "../../assets/searchResults/speedo-icon.svg",
      imgAltAttr: "Icon of speedometer from car dashboard.",
      listingData: `${listing.itemListingInfo.mileage}K`,
    },
    {
      title: "Transmission",
      iconUrl: "../../assets/searchResults/transmission-icon.svg",
      imgAltAttr: "Icon of gear stick from a car.",
      listingData: `${listing.itemListingInfo.transmission}`,
    },
    {
      title: "Fuel Type",
      iconUrl: "../../assets/searchResults/fuel-icon.svg",
      imgAltAttr: "Icon of fuel pump..",
      listingData: `${listing.itemListingInfo.fuelType}`,
    },
    {
      title: "Engine Size",
      iconUrl: "../../assets/searchResults/engine-icon.svg",
      imgAltAttr: "Icon of engine from a car.",
      listingData: `${listing.itemListingInfo.engineSize}L`,
    },
  ];
}

// LISTINGS_ROOT.onload = renderTiles();
const body = document.getElementsByTagName("body")[0];
body.onload = renderTiles;

// Refine Search Functionality
const REFINE_SEARCH_BUTTON = document.getElementById("refine-search-button");
//// TODO: need to have a kick off function that uses a given format
//// to parse the required listings from the dummy API call
// REFINE_SEARCH_BUTTON.addEventListener(
//   "click",
//   renderTiles
// );
