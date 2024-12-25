const productContent = document.querySelector('#productContent');
const topPicks = document.querySelector('#topPicks');

document.addEventListener('DOMContentLoaded', async () => {
    const products = await window.getProducts();
    if (window.location.pathname.includes('shop')) {
        // displayProducts(products)
    } else {
        displayTopPicks(products)
    }
});
export async function displayProducts(products) {
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

async function displayTopPicks(products) {
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

