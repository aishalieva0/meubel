let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartList = document.querySelector('.cartList');
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
            <input class="quantity" type="number" value="${product.quantity}">
                <span class="subTotal">${product.price * product.quantity}$</span>
                <img class="delete" src="../assets/img/icons/ant-design_delete-filled.png"
                    alt="delete">
        </li> `
    })
}

displayCartPage()

