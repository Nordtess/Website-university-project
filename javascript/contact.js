const $form = document.getElementById("form-field");


const $nameInput = document.getElementById("name");
const $numberInput = document.getElementById("number");
const $emailInput = document.getElementById("mail");
const $textAreaInput = document.getElementById("text-area");


const $nameError = document.getElementById("name-error");
const $numberError = document.getElementById("number-error");
const $emailError = document.getElementById("email-error");
const $textError = document.getElementById("message-error");


function validateName() {

    const name = $nameInput.value.trim();
    const nameRegex = /^[a-zA-ZÅÄÖåäö\s'-]+$/;
    
    if (name === "") {
        $nameError.textContent = "Please enter your name";
        return false;
    } else if (!nameRegex.test(name)) {
        $nameError.textContent = "Name can only contain letters, no symbols or numbers";
        return false;
    } else {
        $nameError.textContent = "";
        return true;
    }
}

function validateNumber() {
    const number = $numberInput.value.trim();
    const numberRegex = /^[\+]?[\d][\d\s\-\(\)]*$/;
    const digitsOnly = number.replace(/[\D]/g, '');
    
    if (number === "") {
        $numberError.textContent = "Please enter your phone number";
        return false;
    } else if (!numberRegex.test(number)) {
        $numberError.textContent = "Please enter a valid phone number format";
        return false;
    } else if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        $numberError.textContent = "Please enter between 7-15 digits";
        return false;
    } else {
        $numberError.textContent = "";
        return true;
    }
}

function validateEmail() {
    const email = $emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === "") {
        $emailError.textContent = "Please enter your email";
        return false;
    } else if (!emailRegex.test(email)) {
        $emailError.textContent = "Your email address needs to have an @ and your .com address";
        return false;
    } else {
        $emailError.textContent = "";
        return true;
    }
}

function validateMessage() {
    const textArea = $textAreaInput.value.trim();
    
    if (textArea === "") {
        $textError.textContent = "Please enter a message";
        return false;
    } else if (textArea.length < 5) {
        $textError.textContent = "Please enter at least 5 characters";
        return false;
    } else {
        $textError.textContent = "";
        return true;
    }
}



function isMobile() {
    return window.innerWidth <= 800;
}


function areAllFieldsValid() {
    const name = $nameInput.value.trim();
    const number = $numberInput.value.trim();
    const email = $emailInput.value.trim();
    const message = $textAreaInput.value.trim();
    
    
    if (!name || !number || !email || !message) {
        return false;
    }
    
    return validateName() && validateNumber() && validateEmail() && validateMessage();
}


function updateMobileButtonStyle() {
    if (!isMobile() || !$submitButton) return;
    
    const hasAnyContent = $nameInput.value.trim() || $numberInput.value.trim() || 
                          $emailInput.value.trim() || $textAreaInput.value.trim();
    
    if (!hasAnyContent) {
        $submitButton.style.borderColor = "#e0e0e0";
        $submitButton.style.borderWidth = "2px";
        $submitButton.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.1)";
    } else if (areAllFieldsValid()) {
        $submitButton.style.borderColor = "#00ff00";
        $submitButton.style.borderWidth = "4px";
        $submitButton.style.boxShadow = "0 0 15px rgba(0, 255, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)";
    } else {
        $submitButton.style.borderColor = "#ff0000";
        $submitButton.style.borderWidth = "4px";
        $submitButton.style.boxShadow = "0 0 15px rgba(255, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)";
    }
}

const $submitButton = document.querySelector("#form-field button");

if ($submitButton) {
    $submitButton.addEventListener("mouseenter", () => {
        if (isMobile()) {
            return;
        }
        
        if (areAllFieldsValid()) {
            $submitButton.style.borderColor = "#00ff00";
            $submitButton.style.borderWidth = "5px";
            $submitButton.style.borderStyle = "solid";
            $submitButton.style.boxShadow = "0 0 20px rgba(0, 255, 0, 0.6), 0 0 40px rgba(0, 255, 0, 0.4), 0 12px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)";
            $submitButton.style.transform = "translateY(-2px) scale(1.02)";
        } else {  
            $submitButton.style.borderColor = "#ff0000";
            $submitButton.style.borderWidth = "5px";
            $submitButton.style.borderStyle = "solid";
            $submitButton.style.boxShadow = "0 0 20px rgba(255, 0, 0, 0.6), 0 0 40px rgba(255, 0, 0, 0.4), 0 12px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)";
            $submitButton.style.transform = "translateY(-2px) scale(1.02)";
        }
    });

    $submitButton.addEventListener("mouseleave", () => {
        if (isMobile()) {
            return;
        }
        
        $submitButton.style.borderColor = "#e0e0e0";
        $submitButton.style.borderWidth = "2px";
        $submitButton.style.borderStyle = "solid";
        $submitButton.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.1)";
        $submitButton.style.transform = "translateY(-2px)";
    });
    
    updateMobileButtonStyle();
}

$nameInput.addEventListener("blur", validateName);
$numberInput.addEventListener("blur", validateNumber);
$emailInput.addEventListener("blur", validateEmail);
$textAreaInput.addEventListener("blur", validateMessage);

function clearThankYouMessage() {
    const $formSent = document.getElementById("form-sent");
    if ($formSent && $formSent.textContent) {
        $formSent.textContent = "";
    }
}

$nameInput.addEventListener("input", () => {
    clearThankYouMessage();
    updateMobileButtonStyle();
});
$numberInput.addEventListener("input", () => {
    clearThankYouMessage();
    updateMobileButtonStyle();
});
$emailInput.addEventListener("input", () => {
    clearThankYouMessage();
    updateMobileButtonStyle();
});
$textAreaInput.addEventListener("input", () => {
    clearThankYouMessage();
    updateMobileButtonStyle();
});

window.addEventListener("resize", () => {
    if (isMobile()) {
        updateMobileButtonStyle();
    }
});


$form.addEventListener("submit", (event) => {
    event.preventDefault();

    
    const isNameValid = validateName();
    const isNumberValid = validateNumber();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    
    if (isNameValid && isNumberValid && isEmailValid && isMessageValid) {
        const $formSent = document.getElementById("form-sent");
        $formSent.textContent = "Thank you for your message!";
        $form.reset();
    } else {
        const $formSent = document.getElementById("form-sent");
        $formSent.textContent = "";
    }
});