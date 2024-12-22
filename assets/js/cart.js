let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCheckout = document.querySelector('#cartCheckout');
const cartPage = document.querySelector('#cartPage');
const total = document.querySelector('.total');
const cartBox = document.querySelector('#cartBox');
const cartContent = document.querySelector('#cartContent');
const dropdownCart = document.querySelector('#dropdownCart');
const cartBtn = document.querySelector('#cartBtn');
const bottom = document.querySelector('.bottom');
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
                <img class="delete" src="../assets/img/icons/ant-design_delete-filled.png"
                    alt="delete" onclick="removeItem(${product.id}, '${product.color}', '${product.size}')">
        </li> `
    })
    calculateTotalCart();
}
if (window.location.pathname.includes('cart')) {
    displayCartPage()
} else if (window.location.pathname.includes('checkout')) {
    displayCheckout()
}

function removeItem(id, color, size) {
    cart = cart.filter(item =>
        !(item.id === id && item.color === color && item.size === size)
    )
    localStorage.setItem('cart', JSON.stringify(cart));
    if (window.location.pathname.includes('cart')) {
        displayCartPage()
    }
    displayCartBox()
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

function displayCartBox() {
    cartBox.innerHTML = '';
    if (cart.length > 0) {
        cart.map(product => {
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
            <div class="removeBtn" onclick="removeItem(${product.id}, '${product.color}', '${product.size}')">
                <img src="/assets/img/icons/delete.png" alt="delete">
            </div>
        </li>`
        })
        calculateTotalCart()
    } else {
        cartContent.innerHTML = `
        <div class="empty"><p>Cart is empty</p></div>`;
        bottom.style.display = 'none'
    }
}

displayCartBox()

cartBtn.addEventListener('click', () => {
    dropdownCart.classList.add('activeFlex')
})
const closeCartBoxBtn = document.querySelector('#closeCartBoxBtn');
closeCartBoxBtn.addEventListener('click', () => {
    dropdownCart.classList.remove('activeFlex')
})

