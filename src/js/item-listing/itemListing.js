import { renderListing } from "./ListingRenderUtils.js";

// Inject content into base listing page components for dyanmic rendering.
document.body.onload = () => {
  renderListing();
};
