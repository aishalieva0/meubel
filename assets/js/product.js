import { updatePagination } from './filter.js';
const productContent = document.querySelector('#productContent');
const topPicks = document.querySelector('#topPicks');

document.addEventListener('DOMContentLoaded', async () => {
    const products = await window.getProducts();
    if (window.location.pathname.includes('index') || window.location.pathname === '/') {
        displayTopPicks(products, 4)
    }
});
export async function displayProducts(products) {
    productContent.innerHTML = '';
    if (products.length > 0) {
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
        });
    } else {
        productContent.innerHTML =
            `<div class="notFound">
                <p>No products found  :(</p>
            </div>`
    }
    updatePagination(products.length);
}

async function displayTopPicks(products, limit) {
    const topPicksProducts = products.filter(product => product.rating >= 4.5).slice(0, limit);
    topPicks.innerHTML = '';
    topPicksProducts.map(product => {
        topPicks.innerHTML +=
            `<div class="card">
                <a href="../pages/single-product.html?id=${product.id}"">
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

