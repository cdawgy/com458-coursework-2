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
