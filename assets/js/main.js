const hamburger = document.querySelector('#hamburger');
const navBar = document.querySelector('#navBar');

hamburger.addEventListener('click', () => {
    navBar.classList.toggle('open');
    hamburger.classList.toggle('active');
})