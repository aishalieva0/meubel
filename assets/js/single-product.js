const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
const singleProduct = document.querySelector('#singleProduct');
let cartData = JSON.parse(localStorage.getItem('cart')) || [];

async function getProductById(productId) {
    const products = await window.getProducts();
    return products.find(p => p.id == productId);
}

async function displaySingleProduct() {
    const product = await getProductById(productId);
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
                <p>${product.reviews}Customer review</p>
            </div>
        </div>

        <p class="desc">${product.description}</p>

        <p>Size</p>
        <div class="sizeSelect">
            ${renderSize(product.sizes)}
            <p class="msg"></p>
        </div >
        <p>Color</p>
        <div class="colorSelect">
            ${renderColors(product.colors)}
            <p class="msg"></p>
        </div>
        <div class="row">
            <div class="quantitySelect">
                <span id="minus" onclick="quantitySelect('minus')">-</span>
                <span id="quantity">1</span>
                <span id="plus" onclick="quantitySelect('plus')">+</span>
            </div>
            <button class="addToCartBtn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>

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
            <div class="wishlist">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-heart"></i>
            </div>
            </div>
            </div >
        </div > `
        selectColorAndSize();
    } else {
        singleProduct.innerHTML = 'Product not found!';
    }
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

function renderStars(rating) {
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

async function addToCart(id) {
    const product = await getProductById(id);
    if (!product) {
        console.error('Product not found for adding to cart!');
        return;
    }
    const selectedSize = document.querySelector('.sizeOption.selected')?.innerText;
    const selectedColor = document.querySelector('.colorOption.selected')?.style.background;

    const sizeMsg = document.querySelector('.sizeSelect .msg');
    if (sizeMsg) sizeMsg.innerText = !selectedSize ? 'Choose a size' : '';

    const colorMsg = document.querySelector('.colorSelect .msg');
    if (colorMsg) colorMsg.innerText = !selectedColor ? 'Choose a color' : '';

    if (!selectedSize || !selectedColor) {
        return;
    }

    const quantityElement = document.getElementById('quantity');
    const selectedQuantity = parseInt(quantityElement.innerText);

    const cartItem = cartData.find(item =>
        item.id === product.id &&
        item.size === selectedSize &&
        item.color === selectedColor
    );

    if (cartItem) {
        cartItem.quantity += selectedQuantity;
    } else {
        cartData.push({
            ...product,
            size: selectedSize,
            color: selectedColor,
            quantity: selectedQuantity,
        });
    }
    localStorage.setItem('cart', JSON.stringify(cartData));

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

displaySingleProduct()