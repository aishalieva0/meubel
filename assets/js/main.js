const hamburger = document.querySelector('#hamburger');
const navBar = document.querySelector('#navBar');
const searchBtn = document.querySelector('#searchBtn');
const searchBox = document.querySelector('.searchBox');
const closeIcon = document.querySelector('#closeIcon');
const searchIcon = document.querySelector('#searchIcon');
const layout = document.querySelector('.layout');
const navItems = document.querySelectorAll('.navItem a');
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
const closeCartBoxBtn = document.querySelector('#closeCartBoxBtn');
closeCartBoxBtn.addEventListener('click', () => {
    dropdownCart.classList.remove('activeFlex')
})

