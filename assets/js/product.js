const productContent = document.querySelector('#productContent');

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

displayProducts()
