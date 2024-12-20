const hamburger = document.querySelector('#hamburger');
const navBar = document.querySelector('#navBar');
const searchBtn = document.querySelector('#searchBtn');
const searchBox = document.querySelector('.searchBox');
const closeIcon = document.querySelector('#closeIcon');
const searchIcon = document.querySelector('#searchIcon');
const layout = document.querySelector('.layout');
const shortBy = document.querySelector('#shortBy');
const shortByDropdown = document.querySelector('.shortByDropdown');
const dropdownItem = document.querySelectorAll('.dropdownList .dropdownItem');
const { pathname } = window.location;

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

if (pathname.includes('shop')) {
    shortBy.addEventListener('click', (e) => {
        shortByDropdown.classList.toggle('open')
    })

    dropdownItem.forEach(item => {
        item.addEventListener('click', () => {
            shortByDropdown.classList.remove('open')
            shortBy.textContent = item.textContent
        })
    });
}