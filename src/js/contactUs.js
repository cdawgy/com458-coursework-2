const SUBMIT_BUTTON = document.getElementById("contactUsButton");

SUBMIT_BUTTON.onclick = (mouseEvent) => {
  let fieldsHaveValues = doAllFieldsHaveValues();
  let userEmailInput = readEmailValue();
  let userPhoneInput = readPhoneNumberValue();
  let isNumberValid = isPhoneNumberCorrectFormat(userPhoneInput);
  let isEmailValid = isEmailCorrectFormat(userEmailInput);
  if (!isNumberValid || !fieldsHaveValues || !isEmailValid) {
    mouseEvent.preventDefault();
  }
};

function sendEmail(){
    //TODO https://smtpjs.com/ and https://mailtrap.io/
}

function readPhoneNumberValue() {
  const PHONE_NO = document.getElementById("userPhoneNo");
  return PHONE_NO.value;
}

function readEmailValue() {
    const USER_EMAIL = document.getElementById("userEmail");
    return USER_EMAIL.value;
  }

function isPhoneNumberCorrectFormat(userPhoneInput) {
  const phoneRegexMatcher = /[0-9]{11}/;
  const didMatch = phoneRegexMatcher.test(userPhoneInput) && userPhoneInput.length == 11;
  if (!didMatch) {
    const element = document.getElementById("userPhoneNo");
    element.style.border = "1px solid red";
  }
  return didMatch;
}

const isEmailCorrectFormat = (email) => {
   const emailRegexMatcher = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   const didMatch = emailRegexMatcher.test(email)
   if (!didMatch) {
      const element = document.getElementById("userPhoneNo");
      element.style.border = "1px solid red";
   }
   return didMatch;
};

function doAllFieldsHaveValues() {
  const listOfFieldIds = [
    "userTitle",
    "userForename",
    "userSurname",
    "userEmail",
    "userPhoneNo"
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