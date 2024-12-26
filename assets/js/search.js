let searchedData = [];
const searchResult = document.querySelector('#searchResult');
const searchResultList = document.querySelector('#searchResultList');
const searchBtn = document.querySelector('#searchBtn');
const searchBox = document.querySelector('.searchBox');
const closeIcon = document.querySelector('#closeIcon');
const searchIcon = document.querySelector('#searchIcon');
const searchInput = document.querySelector('#search')
async function searchProducts(value) {
    const products = await window.getProducts();
    value.split(' ').filter(searchValue => {
        if (searchValue.length > 0) {
            searchedData = products.filter(product => product.title.toLowerCase().includes(searchValue.toLowerCase()))
        }
    });
    if (value.length > 0) {
        searchResult.classList.add('active');
    } else {
        searchResult.classList.remove('active');
    }
    displaySearchResult(searchedData);
}

function displaySearchResult(data) {
    searchResultList.innerHTML = '';
    if (data.length === 0) {
        searchResultList.innerHTML = '<p class="noResult">No results found</p>';
    } else {
        data.map(product => {
            searchResultList.innerHTML +=
                `<li class="resultItem">
                    <a href="../pages/single-product.html?id=${product.id}">
                        <div class="productImg">
                            <img src="${product.image}" alt="${product.title}">
                        </div>
                        <div class="details">
                            <h4>${product.title}</h4>
                            <span>${product.price}$</span>
                        </div>
                    </a>
                </li>`
        });
    }
}

searchBtn.addEventListener('click', (e) => {
    searchBox.classList.add('activeFlex');
    if (searchBox.className.includes('activeFlex')) {
        layout.classList.add('active');
    }
})

closeIcon.addEventListener('click', () => {
    searchBox.classList.remove('activeFlex');
    layout.classList.remove('active');
    searchResult.classList.remove('active');
    searchInput.value = '';
})


layout.addEventListener('click', () => {
    searchBox.classList.remove('activeFlex')
    dropdownCart.classList.remove('activeFlex');
    layout.classList.remove('active');
    searchResult.classList.remove('active');
    searchInput.value = '';
})