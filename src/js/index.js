// Functions to fire on load of page
const LATEST_CARS_ROOT = document.getElementById("latestUsedCars");
LATEST_CARS_ROOT.onload = renderUsedCarTiles(4);

// Dynamic model selection depending on car Make
const MAKE_SELECT = document.getElementById("make");
const MODEL_SELECT = document.getElementById("model");
const DEFAULT_MODEL_OPTIONS = createDefaultModelOptions();

function createDefaultModelOptions() {
  const defaultOption = document.createElement("option");
  defaultOption.setAttribute("value", null);
  defaultOption.setAttribute("disabled", null);
  defaultOption.setAttribute("selected", null);
  defaultOption.innerHTML = "Model";
  return defaultOption;
}

function getModelsRelativeToMake() {
  const selectedMakeValue = getMakeValue();
  const listOfModels = getListOfAvailableModels(selectedMakeValue);
  const optionElementsToBeInjectedToHtml =
    createOptionHtmlElements(listOfModels);
  injectCreatedOptionElementsToHtml(optionElementsToBeInjectedToHtml);
}

function getMakeValue() {
  const makeElement = document.getElementById("make");
  return makeElement.value === "" ? "noMakeSelected" : makeElement.value;
}

function getListOfAvailableModels(carMake) {
  const listOfModels = API_CAR_LIST_RESPONSE.map((carListing) => {
    if (carListing.itemListingInfo.make === carMake) {
      return carListing.itemListingInfo.model;
    }
  });
  return removeDuplicatesFromArray(listOfModels);
}

function removeDuplicatesFromArray(array) {
  const set = new Set(array);
  set.delete(undefined);
  return [...set].sort();
}

function createOptionHtmlElements(listOfModelNames) {
  return listOfModelNames.map((modelName) =>
    createOptionHtmlElement(modelName)
  );
}

function createOptionHtmlElement(modelName) {
  const optionElement = document.createElement("option");
  optionElement.setAttribute("value", modelName);
  optionElement.innerHTML = modelName;
  return optionElement;
}

function injectCreatedOptionElementsToHtml(optionElements) {
  MODEL_SELECT.innerHTML = "";
  MODEL_SELECT.appendChild(DEFAULT_MODEL_OPTIONS);
  optionElements.forEach((option) => {
    MODEL_SELECT.appendChild(option);
  });
}
// Set listener to Select tag within HTML. This kicks off generation of dynamic
// models for a user to chose from based on what make they have selected and
// what models are currently available from the list.
MAKE_SELECT.addEventListener("change", getModelsRelativeToMake);

// Functionality for dynamically generating HTML components

function renderUsedCarTiles(tileRenderCount) {
  const recentCarListings = API_CAR_LIST_RESPONSE.slice(0, tileRenderCount);
  const listOfCreatedCarListingTiles = createCarTiles(recentCarListings);
  
  listOfCreatedCarListingTiles.forEach((carListing) => {
    LATEST_CARS_ROOT.appendChild(carListing);
  });
}

function createCarTiles(listOfCarSales) {
  return listOfCarSales.map((carListing) => {
    return createCarTile(carListing);
  });
}

function createCarTile(carListing) {
  const carListingTile = document.createElement("div");
  carListingTile.className = "car-listing-tile";

  // Create image 
  const carTileImg = createCarTileImage(carListing.listOfItemImages[0]);

  // Create tile body
  const carTileBody = createCarTileBody(carListing);

  // Add image and body components to tile
  carListingTile.appendChild(carTileImg);
  carListingTile.appendChild(carTileBody);

  return carListingTile;
}

function createCarTileImage(imgUrl) {
  const carTileImg = document.createElement("div");
  carTileImg.className = "tile-img";
  carTileImg.style.backgroundImage = `url('${imgUrl}')`;
  return carTileImg;
}

function createCarTileBody(carListing) {
  const carListingBody = document.createElement("div");
  carListingBody.className = "tile-body";

  const carListingTitle = document.createElement("p");
  carListingTitle.className = "tile-title";
  carListingTitle.innerHTML = `${carListing.itemListingInfo.make} - ${carListing.itemListingInfo.model}`;

  const carListingSubtitle = document.createElement("p");
  carListingSubtitle.className = "tile-subtitle";
  carListingSubtitle.innerHTML = `${carListing.itemListingInfo.year} | ${carListing.itemListingInfo.fuelType} ${carListing.itemListingInfo.mileage} miles`;

  const carTileButtonPrice = createCarTileButton(carListing);

  carListingBody.appendChild(carListingTitle);
  carListingBody.appendChild(carListingSubtitle);
  carListingBody.appendChild(carTileButtonPrice);

  return carListingBody;
}

function createCarTileButton(carListing) {
  const tileButtonPriceContainer = document.createElement("div");
  tileButtonPriceContainer.className = "tile-button-price";

  const tileButton = document.createElement("button");
  tileButton.innerHTML = "More Info";

  const tilePrice = document.createElement("p");
  const currencySymbol = document.createElement("span");
  currencySymbol.innerHTML = "£";

  tilePrice.appendChild(currencySymbol);
  tilePrice.innerHTML = tilePrice.innerHTML + carListing.itemListingInfo.price;

  tileButtonPriceContainer.appendChild(tileButton);
  tileButtonPriceContainer.appendChild(tilePrice);

  return tileButtonPriceContainer;
}
