import { renderUsedCarTiles } from "./RenderCarTiles.js";
import { renderEssentialsTiles } from "./RenderEssentialTiles.js";

// Functions to fire on load of page
const LATEST_CARS_ROOT = document.getElementById("latestUsedCars");
LATEST_CARS_ROOT.onload = renderUsedCarTiles(4);

const NEW_ESSENTIALS_ROOT = document.getElementById("newCarEssentialsRoot");
NEW_ESSENTIALS_ROOT.onload = renderEssentialsTiles();