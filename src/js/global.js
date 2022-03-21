// This is required to toggle on popovers on every page.
var popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});

// FAKE API RESPONSE - LIST OF CARS
const API_CAR_LIST_RESPONSE = [
  {
    itemListingTitle: "Mazda for sale",
    itemListingInfo: {
      price: "3,500",
      make: "mazda",
      model: "mx5",
      year: "2004",
      mileage: "45000",
      location: "belfast",
      colour: "silver",
      engineSize: "1.6",
      fuelType: "petrol",
      transmission: "manual",
      doors: "3",
      bodyStyle: "convertible",
      owners: "5",
      motExpireDate: "20/11/2022",
      sellerType: "private",
    },
    description:
      "This is a description of the car listing. This will need to be updated.",
    listOfItemImages: [
      "../../assets/carListings/mx5-1.png",
      "../../assets/carListings/mx5-2.png",
      "../../assets/carListings/mx5-3.png",
    ],
  },
  {
    itemListingTitle: "Mazda for sale",
    itemListingInfo: {
      price: "3,500",
      make: "mazda",
      model: "2",
      year: "2009",
      mileage: "45000",
      location: "belfast",
      colour: "red",
      engineSize: "1.4",
      fuelType: "petrol",
      transmission: "manual",
      doors: "3",
      bodyStyle: "hatchback",
      owners: "5",
      motExpireDate: "23/06/2022",
      sellerType: "private",
    },
    description:
      "This is a description of the car listing. This will need to be updated.",
    listOfItemImages: [
      "../../assets/carListings/2-1.png",
      "../../assets/carListings/2-2.png",
      "../../assets/carListings/2-3.png",
      "../../assets/carListings/2-4.png",
    ],
  },
  {
    itemListingTitle: "Mazda for sale",
    itemListingInfo: {
      price: "3,500",
      make: "mazda",
      model: "cx5",
      year: "2014",
      mileage: "65000",
      location: "belfast",
      colour: "black",
      engineSize: "2.0",
      fuelType: "diesel",
      transmission: "manual",
      doors: "5",
      bodyStyle: "SUV",
      owners: "2",
      motExpireDate: "10/06/2022",
      sellerType: "private",
    },
    description:
      "This is a description of the car listing. This will need to be updated.",
    listOfItemImages: [
      "../../assets/carListings/cx5-1.png",
      "../../assets/carListings/cx5-2.png",
      "../../assets/carListings/cx5-3.png",
      "../../assets/carListings/cx5-4.png",
    ],
  },
  {
    itemListingTitle: "Audi for sale",
    itemListingInfo: {
      price: "3,500",
      make: "audi",
      model: "a3",
      year: "2011",
      mileage: "89000",
      location: "belfast",
      colour: "black",
      engineSize: "1.6",
      fuelType: "petrol",
      transmission: "manual",
      doors: "5",
      bodyStyle: "hatchback",
      owners: "2",
      motExpireDate: "20/11/2022",
      sellerType: "private",
    },
    description:
      "This is a description of the car listing. This will need to be updated.",
    listOfItemImages: [
      "../../assets/carListings/a3-1.png",
      "../../assets/carListings/a3-2.png",
      "../../assets/carListings/a3-3.png",
    ],
  },
];

const NEW_CAR_ESSENTIALS_LIST = [
  {
    title: "Insurance",
    img: "../../assets/homePage/insurance-icon.svg",
  },
  {
    title: "Car Value",
    img: "../../assets/homePage/car-icon.svg",
  },
  {
    title: "Finance",
    img: "../../assets/homePage/finance-icon.svg",
  },
  {
    title: "Car History",
    img: "../../assets/homePage/history-icon.svg",
  },
];

// Button for scrolling to the top of the webpage
const FOOTER_BUTTON = document.getElementById("footer-button");
FOOTER_BUTTON.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

// Dynamic model selection depending on car Make
// Lives in global so that home page and search
// page can make use of the below code.
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
