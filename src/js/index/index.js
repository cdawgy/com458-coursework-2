import { getModelsRelativeToMake, MAKE_SELECT } from "../utils/DynamicFormUtils.js";
import { renderUsedCarTiles } from "./RenderCarTiles.js";
import { renderEssentialsTiles } from "./RenderEssentialTiles.js";

// Functions to fire on load of page
const LATEST_CARS_ROOT = document.getElementById("latestUsedCars");
LATEST_CARS_ROOT.onload = renderUsedCarTiles(4);

const NEW_ESSENTIALS_ROOT = document.getElementById("newCarEssentialsRoot");
NEW_ESSENTIALS_ROOT.onload = renderEssentialsTiles();

// Set listener to Select tag within HTML. This kicks off generation of dynamic
// models for a user to chose from based on what make they have selected and
// what models are currently available from the list.
MAKE_SELECT.addEventListener("change", getModelsRelativeToMake);
