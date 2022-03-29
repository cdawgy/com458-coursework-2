import { renderTiles } from "./RenderTilesUtils.js";

export function sortCarListings(event, carListingsToRender) {
  const sortBy = event.target.value;
  switch (sortBy) {
    case "priceLowToHigh":
      carListingsToRender = carListingsToRender.sort((a, b) => {
        return a.itemListingInfo.price - b.itemListingInfo.price;
      });
      break;
    case "priceHighToLow":
      carListingsToRender = carListingsToRender.sort((a, b) => {
        return b.itemListingInfo.price - a.itemListingInfo.price;
      });
      break;
    case "newlyListed":
      carListingsToRender = carListingsToRender.sort((a, b) => {
        return (
          Date.parse(a.itemListingInfo.dateListed) -
          Date.parse(b.itemListingInfo.dateListed)
        );
      });
      break;
    default:
      break;
  }
  renderTiles(carListingsToRender);
}
