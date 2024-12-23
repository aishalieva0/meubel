const productContent = document.querySelector('#productContent');
const topPicks = document.querySelector('#topPicks');

async function displayProducts() {
    const products = await window.getProducts();
    productContent.innerHTML = '';
    products.map(product => {
        productContent.innerHTML +=
            `<div class="card">
                <a href="./single-product.html?id=${product.id}"">
                    <div class="cardImg">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="details">
                        <p class="title">${product.title}</p>
                        <p class="price"><span>${product.price}$</span></p>
                    </div>
                </a>
            </div>`
    })
}

async function displayTopPicks() {
    const products = await window.getProducts();
    const topPicksProducts = products.filter(product => product.rating >= 4);
    topPicks.innerHTML = '';
    topPicksProducts.map(product => {
        topPicks.innerHTML +=
            `<div class="card">
                <a href="/pages/single-product.html?id=${product.id}"">
                    <div class="cardImg">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="details">
                        <p class="title">${product.title}</p>
                        <p class="price"><span>${product.price}$</span></p>
                    </div>
                </a>
            </div>`
    })
}
if (window.location.pathname.includes('shop')) {
    displayProducts()
} else {
    displayTopPicks()
}
