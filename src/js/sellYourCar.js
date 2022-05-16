const SUBMIT_BUTTON = document.getElementById("submitButton");

SUBMIT_BUTTON.onclick = (mouseEvent) => {
  let fieldsHaveValues = doAllFieldsHaveValues();
  let userInput = readPhoneNumberValue();
  let isNumberValid = isPhoneNumberCorrectFormat(userInput);
  if (!isNumberValid || !fieldsHaveValues) {
    mouseEvent.preventDefault();
  }
};

function readPhoneNumberValue() {
  const PHONE_NO = document.getElementById("phoneNo");
  return PHONE_NO.value;
}

function isPhoneNumberCorrectFormat(userInput) {
  const regexMatcher = /[0-9]{11}/;
  const didMatch = regexMatcher.test(userInput) && userInput.length == 11;
  if (!didMatch) {
    const element = document.getElementById("phoneNo");
    element.style.border = "1px solid red";
  }
  return didMatch;
}

function doAllFieldsHaveValues() {
  const listOfFieldIds = [
    "make",
    "model",
    "year",
    "fuel",
    "transmission",
    "miles",
    "engine",
    "phoneNo",
  ];

  let listOfNullInputs = listOfFieldIds.filter((elementId) => {
    const element = document.getElementById(elementId);
    return element.value == "";
  });

  updateElementWithErrorUI(listOfNullInputs);

  return listOfNullInputs.length === 0;
}

function updateElementWithErrorUI(listOfNullInputs) {
  listOfNullInputs.forEach((elementId) => {
    const element = document.getElementById(elementId);
    element.style.border = "1px solid red";
  });
}
