const SUBMIT_BUTTON = document.getElementById("contactUsButton");

SUBMIT_BUTTON.onclick = (mouseEvent) => {
  let fieldsHaveValues = doAllFieldsHaveValues();
  let userMessageInput = readMessageValue();
  let userEmailInput = readEmailValue();
  let userPhoneInput = readPhoneNumberValue();
  let isNumberValid = isPhoneNumberCorrectFormat(userPhoneInput);
  let isEmailValid = isEmailCorrectFormat(userEmailInput);

  if (userEmailInput.length >= 1) {
    sendEmail(userEmailInput, userMessageInput);
  }
  else if (!isNumberValid || !fieldsHaveValues || !isEmailValid) {
    mouseEvent.preventDefault();
  }

};

function sendEmail(userEmail, userMessage) {

  var contactParams = {
    from_email: userEmail,
    message: userMessage
  };

  emailjs.send('service_j3figjs', 'template_2dkofp8', contactParams, "PXh54lXAn6EwvjkN0").then(function (res) {
      console.log('EMAIL SENT', res.status, res.text);
      alert("Email Sent Successfully");
      window.location.reload();
  }, function(error){
      console.log('FAILED', error);
      alert("There was an Error, please try again");
      window.location.reload();
  });
}

function readPhoneNumberValue() {
  const PHONE_NO = document.getElementById("userPhoneNo");
  return PHONE_NO.value;
}

function readEmailValue() {
  const USER_EMAIL = document.getElementById("userEmail");
  return USER_EMAIL.value;
}

function readMessageValue() {
    const USER_MESSAGE = document.getElementById("userMessage");
    return USER_MESSAGE.value;
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

const isEmailCorrectFormat = (userEmailInput) => {
   const emailRegexMatcher = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   const didMatch = emailRegexMatcher.test(userEmailInput)
   if (!didMatch) {
      const element = document.getElementById("userEmail");
      element.style.border = "1px solid red";
   }
   return didMatch;
}

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