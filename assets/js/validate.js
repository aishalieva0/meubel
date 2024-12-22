document.querySelector('.formCheckout').addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;

    const firstName = document.getElementById('fname').value.trim();
    const lastName = document.getElementById('lname').value.trim();
    const country = document.getElementById('country').value.trim();
    const street = document.getElementById('street').value.trim();
    const city = document.getElementById('city').value.trim();
    const province = document.getElementById('province').value.trim();
    const zipCode = document.getElementById('zipcode').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');

    document.querySelectorAll('.errorMsg').forEach(error => error.remove());
    document.querySelectorAll('input, select').forEach(field => field.style.border = '');


    if (!firstName) addErrorMsg('fname', 'First name is required');
    if (!lastName) addErrorMsg('lname', 'Last name is required');
    if (!country) addErrorMsg('country', 'Please select a country');
    if (!street) addErrorMsg('street', 'Street address is required');
    if (!city) addErrorMsg('city', 'City is required');
    if (!province) addErrorMsg('province', 'Please select a province');
    if (!zipCode || isNaN(zipCode)) addErrorMsg('zipcode', 'Valid ZIP code is required');
    if (!phone || isNaN(phone)) addErrorMsg('phone', 'Valid phone number is required');
    if (!validateEmail(email)) addErrorMsg('email', 'Valid email is required');
    if (!paymentMethod) addErrorMsgToPayment('Payment method is required');

    isValid = document.querySelectorAll('.errorMsg').length === 0;

    if (isValid) {
        alert('Your order has been placed successfully');
    }
});

function addErrorMsg(fieldId, msg) {
    const inputField = document.getElementById(fieldId);
    const errorMsg = document.createElement('span');
    errorMsg.className = 'errorMsg';
    errorMsg.textContent = msg;
    inputField.style.border = '1px solid red';
    inputField.parentElement.appendChild(errorMsg);
}

function addErrorMsgToPayment(msg) {
    const paymentList = document.querySelector('.paymentList');
    const error = document.createElement('span');
    error.className = 'errorMsg';
    error.textContent = msg;
    paymentList.appendChild(error);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}