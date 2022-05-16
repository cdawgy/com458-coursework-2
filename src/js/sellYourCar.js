const SUBMIT_BUTTON = document.getElementById("submitButton")

SUBMIT_BUTTON.onclick = (mouse_Click) => {
    mouse_Click.preventDefault();
    console.log("Clicked");
}
