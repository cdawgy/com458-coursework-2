const LATEST_CARS_ROOT = document.getElementById("latestUsedCars");

export function renderUsedCarTiles(tileRenderCount) {
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
