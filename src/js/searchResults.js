let carListingsToRender = API_CAR_LIST_RESPONSE;

const LISTINGS_ROOT = document.getElementById("listingsRoot");

function renderTiles(refinedList) {
  emptyRootTiles();
  carListingsToRender =
    refinedList instanceof Array ? refinedList : carListingsToRender;

  if (carListingsToRender.length > 0) {
    renderEachTile();
  } else {
    displayEmptyListMessage();
  }
}

function emptyRootTiles() {
  LISTINGS_ROOT.innerHTML = "";
}

function renderEachTile() {
  carListingsToRender.forEach((listing) => {
    const containingDiv = createContainingTileDiv(listing);
    LISTINGS_ROOT.appendChild(containingDiv);
  });
}

function displayEmptyListMessage() {
  const emptyListMessage = document.createElement("h1");
  emptyListMessage.innerHTML = "There are no listings for that search.";
  LISTINGS_ROOT.appendChild(emptyListMessage);
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
REFINE_SEARCH_BUTTON.addEventListener("click", refineSearchResults);
const MAKE = 0;
const MODEL = 1;
const TRANSMISSION = 2;
const FUEL_TYPE = 3;

function refineSearchResults() {
  const params = getQueryParams();
  const refinedResults = filterResults(params);
  renderTiles(refinedResults);
}

function getQueryParams() {
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

function filterResults(queryParams) {
  return API_CAR_LIST_RESPONSE.filter((carListing) =>
    doesParamsMatchObject(carListing, queryParams)
  );
}

function doesParamsMatchObject(carListing, queryParams) {
  return (
    carListing.itemListingInfo.make === queryParams[MAKE] &&
    carListing.itemListingInfo.model === queryParams[MODEL] &&
    carListing.itemListingInfo.transmission === queryParams[TRANSMISSION] &&
    carListing.itemListingInfo.fuelType === queryParams[FUEL_TYPE]
  );
}

// Reset refine search functionality
// This will simply refresh the page
const RESET_SEARCH_BUTTON = document.getElementById("reset-search-button");
RESET_SEARCH_BUTTON.addEventListener("click", () => location.reload());

// Sort list by option
const SORT_BY_OPTION = document.getElementById("sort-by");
SORT_BY_OPTION.addEventListener("change", sortCarListings);

function sortCarListings(e) {
  const sortBy = e.target.value;
  switch (sortBy) {
    case "priceAsc":
      carListingsToRender = carListingsToRender.sort((a, b) => {
        return b.itemListingInfo.price - a.itemListingInfo.price;
      });
      break;
    case "priceDesc":
      carListingsToRender = carListingsToRender.sort((a, b) => {
        return a.itemListingInfo.price - b.itemListingInfo.price;
      });
      break;
    case "newlyListed":
      carListingsToRender = carListingsToRender.sort((a, b) => {
        return Date.parse(a.itemListingInfo.dateListed) - Date.parse(b.itemListingInfo.dateListed);
      });
      break;
    default:
      break;
  }
  renderTiles(carListingsToRender);
}
