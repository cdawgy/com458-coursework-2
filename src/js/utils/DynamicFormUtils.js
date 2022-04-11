// Dynamic model selection depending on car Make
// Lives in global so that home page and search
// page can make use of the below code.
export const MAKE_SELECT = document.getElementById("make");
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

export function getModelsRelativeToMake() {
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