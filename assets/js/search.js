let searchedData = [];
const searchResult = document.querySelector('#searchResult');
const searchResultList = document.querySelector('#searchResultList');
async function searchProducts(value) {
    const products = await window.getProducts();
    value.split(' ').filter(searchValue => {
        if (searchValue.length > 0) {
            searchedData = products.filter(product => product.title.toLowerCase().includes(searchValue.toLowerCase()))
            console.log(searchedData)
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
                    <a href="./single-product.html?id=${product.id}">
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

