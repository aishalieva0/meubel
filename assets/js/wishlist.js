import { renderStars } from "./single-product.js";
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
const wishlistPage = document.querySelector('#wishlistPage');
const wishlistDetails = document.querySelector('.wishlistDetails');

export async function addToWishlist(id) {
    if (!id) {
        console.error('Invalid product ID!');
        return;
    }
    const addWishlistBtn = document.querySelector('#addWishlistBtn');

    const isWishlist = wishlist.some(item => item.id === id)
    const products = await window.getProducts();
    const FindedProduct = products.find(product => product.id === id);

    if (!isWishlist) {
        wishlist.push(FindedProduct);
        addWishlistBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    } else {
        wishlist = wishlist.filter(item => item.id !== id);
        addWishlistBtn.innerHTML = '<i class="fa-regular fa-heart"></i>'
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function displayWishlistPage() {
    wishlistPage.innerHTML = '';
    if (wishlist.length>0) {
        wishlist.map(item => {
            wishlistPage.innerHTML +=
                `<li class="wishlistItem">
                    <div class="productImg">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <h4>${item.title}</h4>
                    <div class="rating">
                    ${renderStars(item.rating)}
                    </div>
                    <span class="price">${item.price}$</span>
                    <img class="delete" src="../assets/img/icons/ant-design_delete-filled.png"
                        alt="delete">
                </li>`
            wishlistPage.querySelector('.delete').addEventListener('click', () => {
                removeFromWishlist(item.id)
            });
        })
    } else {
        wishlistDetails.innerHTML =
            `<div class="emptyBox">
                <p >Wishlist is empty</p>
            </div>`
    }
}

function removeFromWishlist(id) {
    wishlist = wishlist.filter(item => item.id !== id);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    displayWishlistPage();
}
if (window.location.pathname.includes('wishlist')) {
    displayWishlistPage();
}