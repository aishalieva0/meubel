import { addToCart, displayCartBox } from "./cart.js";
import { addToWishlist } from "./wishlist.js";
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
const singleProduct = document.querySelector('#singleProduct');
const relatedProducts = document.querySelector('#relatedProducts');

export async function getProductById(productId) {
    const products = await window.getProducts();
    return products.find(p => p.id == productId);
}

async function displaySingleProduct() {
    const product = await getProductById(productId);
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isWishlist = wishlist.some(item => item.id == productId)
    if (product) {
        singleProduct.innerHTML =
            `<div class="breadcrumb">
    <a href="../index.html">Home</a>
    <i class="fa-solid fa-angle-right"></i>
    <a href="./shop.html">Shop</a>
    <i class="fa-solid fa-angle-right"></i>
    <p>${product.title}</p>
    </div>
    <div class="content">
    <div class="productImg">
        <img src="${product.image}" alt="${product.title}">
    </div>
    <div class="productDetails">
        <h2>${product.title}</h2>
        <p class="price"><span>${product.price}</span>$</p>
        <div class="feedback">
            <div class="rating">
            ${renderStars(product.rating)}
            </div>
            <div class="review">
                <p>${product.reviews} Customer review</p>
            </div>
        </div>

        <p class="desc">${product.description}</p>

        <p class="titleSelect">Size</p>
        <div class="sizeSelect">
            ${renderSize(product.sizes)}
            </div >
            <span class="msgSize"></span>
        <p class="titleSelect">Color</p>
        <div class="colorSelect">
            ${renderColors(product.colors)}
            </div>
            <span class="msgColor"></span>
        <div class="row">
            <div class="quantitySelect">
                <span id="minus">-</span>
                <span id="quantity">1</span>
                <span id="plus">+</span>
            </div>
            <button class="addToCartBtn" data-id="${product.id}">Add to Cart</button>
            </div>
            </div >
        </div > 
                <div class="info">
            <ul class="detailList">
                <li class="detailItem">
                    <span class="title">SKU</span>
                    <span>${product.sku}</span>
                </li>
                <li class="detailItem">
                    <span class="title">Category</span>
                    <span>${product.category}</span>
                </li>
                <li class="detailItem">
                    <span class="title">Tags</span>
                    <span>${product.tags}</span>
                </li>
                <li class="detailItem">
                    <span class="title">Share</span>
                    <div class="socialMedia">
                        <a href="https://www.facebook.com" target="_blank">
                            <img src="../assets/img/icons/akar-icons_facebook-fill.png"
                                alt="facebook">
                        </a>
                        <a href="https://www.linkedin.com" target="_blank">
                            <img src="../assets/img/icons/akar-icons_linkedin-box-fill.png"
                                alt="linkedin">
                        </a>
                        <a href="https://www.twitter.com" target="_blank">
                            <img src="../assets/img/icons/ant-design_twitter-circle-filled.png"
                                alt="twitter">
                        </a>
                    </div>
                </li>
            </ul>
            <div class="wishlist" id="addWishlistBtn">
            ${isWishlist ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>'}
            </div>
            </div>
            <div class="detailedInfo">
                        <ul class="titleList">
                            <li class="titleItem openedTab">Description</li>
                            <li class="titleItem">Additional Information</li>
                            <li class="titleItem">Reviews [${product.reviews}]</li>
                        </ul>
                        <p class="desc">${product.about}</p>
                        <p class="desc">${product.longDescription}</p>
                        <div class="imgGroup">
                            <div class="detailImg">
                                <img src="${product.image}" alt="sofa">
                            </div>
                            <div class="detailImg">
                                <img src="${product.image}" alt="sofa">
                            </div>
                        </div>
                    </div>
        `;
        singleProduct.querySelector('#addWishlistBtn').addEventListener('click', () => {
            addToWishlist(product.id)
        })
        selectColorAndSize();
        document.querySelector('#minus').addEventListener('click', () => quantitySelect('minus'));
        document.querySelector('#plus').addEventListener('click', () => quantitySelect('plus'));
    } else {
        singleProduct.innerHTML = 'Product not found!';
    }

    document.querySelectorAll('.addToCartBtn').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            addToCart(productId);
        });
    });
}

function renderSize(sizes) {
    return sizes
        .map(size => `<button class="sizeOption">${size}</button>`)
        .join('')
}

function renderColors(colors) {
    return colors
        .map(color => `<button class="colorOption" style="background:${color}"></button>`)
        .join('')
}

export function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    let starRating = '';

    for (let i = 0; i < fullStars; i++) {
        starRating += `<i class="fa fa-star"></i>`;
    }

    if (halfStar) {
        starRating += `<i class="fa fa-star-half-o"></i>`;
    }

    for (let i = 0; i < emptyStars; i++) {
        starRating += `<i class="fa fa-star-o"></i>`;
    }
    return starRating;
}

function quantitySelect(type) {
    const quantity = document.getElementById('quantity');
    const currentQuantity = parseInt(quantity.innerText);

    if (type === 'plus') {
        quantity.innerText = currentQuantity + 1;
    } else if (type === 'minus' && currentQuantity > 1) {
        quantity.innerText = currentQuantity - 1;
    }
}

function selectColorAndSize() {
    document.querySelectorAll('.sizeOption').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.sizeOption')
                .forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });
    document.querySelectorAll('.colorOption').forEach(button => {
        button.addEventListener('click', () => {
            document
                .querySelectorAll('.colorOption')
                .forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });
}

async function displayRelatedProducts() {
    const findedProduct = await getProductById(productId);
    const products = await window.getProducts();
    const relatedProductsData = products.filter(item =>
        findedProduct.category === item.category &&
        findedProduct.id != item.id
    )
    relatedProducts.innerHTML = '';
    relatedProductsData.slice(0, 4).map(product => {
        relatedProducts.innerHTML +=
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

if (window.location.pathname.includes('single-product')) {
    displaySingleProduct();
    displayRelatedProducts();
}