const hamburger = document.querySelector('#hamburger');
const navBar = document.querySelector('#navBar');
const searchBtn = document.querySelector('#searchBtn');
const searchBox = document.querySelector('.searchBox');
const closeIcon = document.querySelector('#closeIcon');
const searchIcon = document.querySelector('#searchIcon');
const closeCartBoxBtn = document.querySelector('#closeCartBoxBtn');
const layout = document.querySelector('.layout');
const navItems = document.querySelectorAll('.navItem a');
const newsletterForm = document.querySelector('.newsletterForm');
const { pathname } = window.location;

hamburger.addEventListener('click', () => {
    navBar.classList.toggle('open');
    hamburger.classList.toggle('opened');
})

searchBtn.addEventListener('click', (e) => {
    searchBox.classList.add('activeFlex');
    if (searchBox.className.includes('activeFlex')) {
        layout.classList.add('active');
    }
})

closeIcon.addEventListener('click', () => {
    searchBox.classList.remove('activeFlex');
    layout.classList.remove('active');

})


layout.addEventListener('click', () => {
    searchBox.classList.remove('activeFlex')
    closeIcon.style.display = 'none';
    searchIcon.style.display = 'block';
    dropdownCart.classList.remove('activeFlex');
    layout.style.display = 'none';
})

navItems.forEach(navItem => {
    if (window.location.href.includes(navItem.href)) {
        navItem.classList.add('isCurrent');
    }
})

cartBtn.addEventListener('click', () => {
    dropdownCart.classList.add('activeFlex')
})
closeCartBoxBtn.addEventListener('click', () => {
    dropdownCart.classList.remove('activeFlex')
})

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.email.value;
    const newsletterMsg = document.createElement('span')
    newsletterMsg.classList.add('newsletterMsg');
    if (!validateEmail(email)) {
        newsletterMsg.innerText = 'Please enter a valid email address';
    } else {
        newsletterMsg.innerText = 'Thank you for subscribing!';
        newsletterMsg.classList.add('succesMsg');
        newsletterForm.reset();
    }
    newsletterForm.parentElement.appendChild(newsletterMsg);
    setTimeout(() => {
        newsletterMsg.remove();
    }, 3000);
})