const hamburger = document.querySelector('#hamburger');
const navBar = document.querySelector('#navBar');
const searchBtn = document.querySelector('#searchBtn');
const searchBox = document.querySelector('.searchBox');
const closeIcon = document.querySelector('#closeIcon');
const searchIcon = document.querySelector('#searchIcon');
const layout = document.querySelector('.layout');

hamburger.addEventListener('click', () => {
    navBar.classList.toggle('open');
    hamburger.classList.toggle('opened');
})

searchBtn.addEventListener('click', () => {
    searchBox.classList.toggle('activeFlex');
    if (searchBox.className.includes('activeFlex')) {
        closeIcon.style.display = 'block'
        searchIcon.style.display = 'none'
    } else {
        closeIcon.style.display = 'none'
        searchIcon.style.display = 'block'
    }
})

layout.addEventListener('click', () => {
    searchBox.classList.remove('activeFlex')
    closeIcon.style.display = 'none'
    searchIcon.style.display = 'block'
})