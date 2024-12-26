import { displayProducts } from '/assets/js/product.js';
let categories = [];
let sizes = [];
let colors = [];
let filteredProducts = [];
let products = [];
let pagination = {
    currentPage: 1,
    itemsPerPage: 12,
};

const categoryList = document.querySelector('#categoryList');
const sizeList = document.querySelector('#sizeList');
const colorList = document.querySelector('#colorList');
const minPriceInput = document.querySelector('#minPrice');
const maxPriceInput = document.querySelector('#maxPrice');
const filterCloseBtn = document.querySelector('.filterCloseBtn');
const filterBox = document.querySelector('.filterBox');
const product = document.querySelector('#product');
const clearAll = document.querySelector('.clearAll');
const filterOpenBtn = document.querySelector('.filterOpenBtn');
const productContent = document.querySelector('#productContent');
const gridStyle = document.querySelector('#gridStyle');
const listStyle = document.querySelector('#listStyle');
const paginationContainer = document.querySelector('.pagination');
const totalProducts = document.querySelector('.totalProducts');
const showStart = document.querySelector('.showStart');
const showEnd = document.querySelector('.showEnd');
const itemsPerPageCount = document.querySelector('.itemsPerPageCount');
const sortByOptions = document.querySelectorAll('.shortByDropdown .dropdownItem');
const shortBy = document.querySelector('#shortBy');
const shortByDropdown = document.querySelector('.shortByDropdown');
const dropdownItem = document.querySelectorAll('.dropdownList .dropdownItem');

if (window.location.pathname.includes('shop')) {
    document.addEventListener('DOMContentLoaded', async () => {
        products = await window.getProducts();
        filteredProducts = products;
        pagination.currentPage = 1;
        itemsPerPageCount.value = pagination.itemsPerPage;
        const paginatedProducts = applyPagination(filteredProducts);
        displayProducts(paginatedProducts);
        updatePagination(filteredProducts.length);
        displayColors();
        displaySizes();
        displayCategories();
        triggerFilters();
        shortByOptions();
    });
    clearAll.addEventListener('click', () => {
        document.querySelectorAll('#categoryList input').forEach(input => (input.checked = false));
        document.querySelectorAll('#sizeList input').forEach(input => (input.checked = false));
        document.querySelectorAll('#colorList .colorItem').forEach(item => item.classList.remove('selected'));
        minPriceInput.value = '';
        maxPriceInput.value = '';

        filteredProducts = products;
        pagination.currentPage = 1;
        const paginatedProducts = applyPagination(filteredProducts);
        displayProducts(paginatedProducts);
        updatePagination(filteredProducts.length);
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

    itemsPerPageCount.addEventListener('input', () => {
        const count = itemsPerPageCount.value;
        if (count > 0) {
            pagination.itemsPerPage = count;
            pagination.currentPage = 1;
            const paginatedProducts = applyPagination(filteredProducts);
            displayProducts(paginatedProducts);
            updatePagination(filteredProducts.length);
        }
    });

    shortBy.addEventListener('click', (e) => {
        shortByDropdown.classList.toggle('open')
    })

    dropdownItem.forEach(item => {
        item.addEventListener('click', () => {
            shortByDropdown.classList.remove('open')
            shortBy.textContent = item.textContent
        })
    });
}
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

    pagination.currentPage = 1;
    const paginatedProducts = applyPagination(filteredProducts);
    displayProducts(paginatedProducts);
    updatePagination(filteredProducts.length);
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



function applyPagination(products) {
    const { currentPage, itemsPerPage } = pagination;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    showStart.innerText = startIndex + 1;
    showEnd.innerText = Math.min(endIndex, products.length);
    return products.slice(startIndex, endIndex);
}

export function updatePagination(totalItems) {
    const { itemsPerPage, currentPage } = pagination;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage ? 'activePage' : '';
        paginationContainer.innerHTML += `<span class="page ${isActive}" data-page="${i}">${i}</span>`;
    }

    if (currentPage < totalPages) {
        paginationContainer.innerHTML += `<span class="next">Next</span>`;
    }

    if (currentPage > 1) {
        paginationContainer.innerHTML = `<span class="prev">Previous</span>` + paginationContainer.innerHTML;
    }

    paginationContainer.querySelectorAll('.page').forEach(page => {
        page.addEventListener('click', () => {
            pagination.currentPage = parseInt(page.dataset.page);
            const paginatedProducts = applyPagination(filteredProducts);
            displayProducts(paginatedProducts);
            updatePagination(filteredProducts.length);
        });
    });

    paginationContainer.querySelector('.next')?.addEventListener('click', () => {
        pagination.currentPage++;
        const paginatedProducts = applyPagination(filteredProducts);
        displayProducts(paginatedProducts);
        updatePagination(filteredProducts.length);
    });

    paginationContainer.querySelector('.prev')?.addEventListener('click', () => {
        pagination.currentPage--;
        const paginatedProducts = applyPagination(filteredProducts);
        displayProducts(paginatedProducts);
        updatePagination(filteredProducts.length);
    });

    totalProducts.textContent = totalItems;
}
function shortByOptions() {
    sortByOptions.forEach(option => {
        option.addEventListener('click', () => {
            const chosen = option.id;
            switch (chosen) {
                case 'priceLowToHigh':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'priceHighToLow':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'a-z':
                    filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case 'z-a':
                    filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
                    break;
                case 'default':
                default:
                    filteredProducts.sort((a, b) => a.id - b.id);
                    break;
            }
            pagination.currentPage = 1;
            const paginatedProducts = applyPagination(filteredProducts);
            displayProducts(paginatedProducts);
            updatePagination(filteredProducts.length);
        });
    });
}