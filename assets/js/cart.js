import { getProductById } from "/assets/js/single-product.js";
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCheckout = document.querySelector('#cartCheckout');
const cartPage = document.querySelector('#cartPage');
const cartBox = document.querySelector('#cartBox');
const cartContent = document.querySelector('#cartContent');
const dropdownCart = document.querySelector('#dropdownCart');
const cartBtn = document.querySelector('#cartBtn');
const bottom = document.querySelector('.bottom');
let total = document.querySelector('.total');
let cartCount = document.querySelector('#cartCount');


function displayCartPage() {
    cartPage.innerHTML = '';
    cart.map(product => {
        cartPage.innerHTML +=
            `<li class="cartItem">
            <div class="productImg">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <h4>${product.title}</h4>
            <span class="price">${product.price}$</span>
            <span class="color" style="background:${product.color}"></span>
            <span class="size">${product.size}</span>
            <input class="quantity" type="number" value="${product.quantity}">
            <span class="subTotal">${(product.price * product.quantity).toFixed(2)}$</span>
            <img class="delete" src="../assets/img/icons/ant-design_delete-filled.png" alt="delete">
        </li> `
        cartPage.querySelector('.delete').addEventListener('click', () => {
            removeItem(product.id, product.color, product.size);
        });
    })
    calculateTotalCart();
}
if (window.location.pathname.includes('cart')) {
    displayCartPage();
    total = document.querySelector('#cartTotal');
} else if (window.location.pathname.includes('checkout')) {
    displayCheckout()
    total = document.querySelector('#checkoutTotal');
}

export async function addToCart(id) {
    const product = await getProductById(id);
    if (!product) {
        console.error('Product not found for adding to cart!');
        return;
    }
    const selectedSize = document.querySelector('.sizeOption.selected')?.innerText;
    const selectedColor = document.querySelector('.colorOption.selected')?.style.background;

    const sizeMsg = document.querySelector('.productDetails .msgSize');
    if (sizeMsg) sizeMsg.innerText = !selectedSize ? 'Choose a size' : '';

    const colorMsg = document.querySelector('.productDetails .msgColor');
    if (colorMsg) colorMsg.innerText = !selectedColor ? 'Choose a color' : '';

    if (!selectedSize || !selectedColor) {
        return;
    }

    const quantityElement = document.getElementById('quantity');
    const selectedQuantity = parseInt(quantityElement.innerText);

    const cartItem = cart.find(item =>
        item.id === product.id &&
        item.size === selectedSize &&
        item.color === selectedColor
    );

    if (cartItem) {
        cartItem.quantity += selectedQuantity;
    } else {
        cart.push({
            ...product,
            size: selectedSize,
            color: selectedColor,
            quantity: selectedQuantity,
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartBox();
}

function removeItem(id, color, size) {
    cart = cart.filter(item =>
        !(item.id === id && item.color === color && item.size === size)
    )
    localStorage.setItem('cart', JSON.stringify(cart));
    if (window.location.pathname.includes('cart')) {
        displayCartPage()
    }
    displayCartBox();
    totalCount();
}

function calculateTotalCart() {
    let totalSum = 0;
    cart.forEach(item => {
        totalSum += item.price * item.quantity;
    });
    total.textContent = `${totalSum.toFixed(2)}$`;
}

function displayCheckout() {
    cartCheckout.innerHTML = '';
    cart.map(product => {
        cartCheckout.innerHTML +=
            `<li class="cartItem">
                <div class="cartDetail">
                    <h4>${product.title}</h4>
                    <span>x</span>
                    <span class="quantity">${product.quantity}</span>
                </div>
                <span class="price">${(product.price * product.quantity).toFixed(2)}$</span>
            </li>`
    })
    calculateTotalCart();
}

export function displayCartBox() {
    cartBox.innerHTML = '';
    if (cart.length > 0) {
        cart.map(async product => {
            cartBox.innerHTML +=
                `<li class="cartItem">
            <div class="productImg">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="info">
                <h4>${product.title}</h4>
                <div class="details">
                    <span class="quantity">${product.quantity}</span>
                    <span>x</span>
                    <span class="price">${(product.price * product.quantity).toFixed(2)}$</span>
                </div>
            </div>
            <div class="removeBtn">
                <img src="/assets/img/icons/delete.png" alt="delete">
            </div>
                </li>`
            cartBox.querySelector('.removeBtn').addEventListener('click', () => {
                removeItem(product.id, product.color, product.size);
            });
        });
        calculateTotalCart()
    } else {
        cartContent.innerHTML = `
        <div class="empty"><p>Cart is empty</p></div>`;
        bottom.style.display = 'none'
    }
    totalCount()
}

displayCartBox()
cartBtn.addEventListener('click', () => {
    dropdownCart.classList.add('activeFlex')
})
const closeCartBoxBtn = document.querySelector('#closeCartBoxBtn');
closeCartBoxBtn.addEventListener('click', () => {
    dropdownCart.classList.remove('activeFlex')
})

function totalCount() {
    let totalCount = 0;
    cart.forEach(item => {
        totalCount += item.quantity;
    });
    if (totalCount == 0) {
        cartCount.style.display = 'none';
    } else {
        cartCount.textContent = totalCount;
        cartCount.style.display = 'flex';
    }
}
