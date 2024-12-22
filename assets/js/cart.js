let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartList = document.querySelector('.cartList');
const total = document.querySelector('.total');
function displayCartPage() {
    cartList.innerHTML = '';
    cart.map(product => {
        cartList.innerHTML +=
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
} else {
    displayCheckout()
}

function removeItem(id, color, size) {
    cart = cart.filter(item =>
        !(item.id === id && item.color === color && item.size === size)
    )
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartPage()
}

function calculateTotalCart() {
    let totalSum = 0;
    cart.forEach(item => {
        totalSum += item.price * item.quantity;
    });
    total.textContent = `${totalSum.toFixed(2)}$`;
}

function displayCheckout() {
    cartList.innerHTML = '';
    cart.map(product => {
        cartList.innerHTML +=
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