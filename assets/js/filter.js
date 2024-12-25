import { displayProducts } from '/assets/js/product.js';
let categories = [];
let sizes = [];
let colors = [];
let filteredProducts = [];
let products = [];

const categoryList = document.querySelector('#categoryList');
const sizeList = document.querySelector('#sizeList');
const colorList = document.querySelector('#colorList');
const minPriceInput = document.querySelector('#minPrice');
const maxPriceInput = document.querySelector('#maxPrice');
const filterCloseBtn = document.querySelector('.filterCloseBtn');
const filterBox = document.querySelector('.filterBox');
const product = document.querySelector('#product');
const filterOpenBtn = document.querySelector('.filterOpenBtn');
const productContent = document.querySelector('#productContent');
const gridStyle = document.querySelector('#gridStyle');
const listStyle = document.querySelector('#listStyle');

document.addEventListener('DOMContentLoaded', async () => {
    products = await window.getProducts();
    displayProducts(products);
    displayColors();
    displaySizes();
    displayCategories();
    triggerFilters();
});

function applyFilters() {
    const selectedCategories = Array.from(document.querySelectorAll('#categoryList input:checked')).map(input => input.name);
    const selectedSizes = Array.from(document.querySelectorAll('#sizeList input:checked')).map(input => input.name);
    const selectedColors = Array.from(document.querySelectorAll('#colorList .colorItem.selected')).map(item => item.style.background);
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

    filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesSize = selectedSizes.length === 0 || product.sizes.some(size => selectedSizes.includes(size));
        const matchesColor = selectedColors.length === 0 || product.colors.some(color => selectedColors.includes(color));
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

        return matchesCategory && matchesSize && matchesColor && matchesPrice;
    });

    displayProducts(filteredProducts);
}

function displayOptions(optionList, options) {
    optionList.innerHTML = '';
    options.map(option => {
        optionList.innerHTML += `
            <li>
                <input type="checkbox" name="${option}" id="${option}">
                <label for="${option}">${option}</label>
            </li>`;
    });
}

function displayCategories() {
    products.filter(product => {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
        }
    });

    displayOptions(categoryList, categories);
}


async function displaySizes() {
    products.filter(product => {
        product.sizes.forEach(size => {
            if (!sizes.includes(size)) {
                sizes.push(size);
            }
        });
    });
    displayOptions(sizeList, sizes);
}

async function displayColors() {
    products.forEach(product => {
        product.colors.forEach(color => {
            if (!colors.includes(color)) {
                colors.push(color);
            }
        });
    });

    colorList.innerHTML = '';
    colors.forEach(color => {
        colorList.innerHTML += `
            <li class="colorItem" style="background:${color}" data-color="${color}"></li>`;
    });
}

function triggerFilters() {
    document.querySelectorAll('#categoryList input').forEach(input => {
        input.addEventListener('change', applyFilters);
    });

    document.querySelectorAll('#sizeList input').forEach(input => {
        input.addEventListener('change', applyFilters);
    });

    document.querySelectorAll('#colorList .colorItem').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('selected');
            applyFilters();
        });
    });

    [minPriceInput, maxPriceInput].forEach(input => {
        input.addEventListener('input', applyFilters);
    });
}

document.querySelector('.clearAll').addEventListener('click', () => {
    document.querySelectorAll('#categoryList input').forEach(input => (input.checked = false));
    document.querySelectorAll('#sizeList input').forEach(input => (input.checked = false));
    document.querySelectorAll('#colorList .colorItem').forEach(item => item.classList.remove('selected'));
    minPriceInput.value = '';
    maxPriceInput.value = '';
    displayProducts(products);
});

filterCloseBtn.addEventListener('click', () => {
    filterBox.classList.remove('active');
    console.log(product)
    product.style.width = '100%';
});

filterOpenBtn.addEventListener('click', () => {
    filterBox.classList.toggle('active');
    if (filterBox.className.includes('active')) {
        product.style.width = '80%';
    } else {
        product.style.width = '100%';
    }
})

gridStyle.addEventListener('click', () => {
    productContent.classList.remove('cardListStyle');
});

listStyle.addEventListener('click', () => {
    productContent.classList.add('cardListStyle');
});