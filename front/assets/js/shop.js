function getCategories() {
    fetch("https://localhost:44341/api/home/GetCategories").then(response => response.json()).then(data => {
        data.forEach(category => {
            nProductCat.innerHTML += `
                <option value="${category.categoryId}">${category.categoryName}</option>
            `
        })
    })
}
getCategories()

fetch("https://localhost:44341/api/home/GetFlavors").then(response => response.json()).then(data => {
    data.forEach(flavor => {
        nProductFlav.innerHTML += `
            <option value="${flavor.flavorId}">${flavor.flavorName}</option>
        `
    })
})

let currentPage = 1;
let totalPages = 1;
let minPriceFilter = null;
let maxPriceFilter = null;
let categoryFilter = null;
let flavorFilter = null;

const productList = document.getElementById('products_row');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const pageNumbers = document.getElementById('pageNumbers');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const categorySelect = document.getElementById('nProductCat');
const flavorSelect = document.getElementById('nProductFlav');

function applyFilters() {
    minPriceFilter = parseFloat(minPriceInput.value);
    maxPriceFilter = parseFloat(maxPriceInput.value);
    categoryFilter = categorySelect.value;
    flavorFilter = flavorSelect.value;

    currentPage = 1;
    fetchProducts();
}

function resetFilters() {
    minPriceInput.value = '';
    maxPriceInput.value = '';
    categorySelect.value = '';
    flavorSelect.value = '';

    minPriceFilter = null;
    maxPriceFilter = null;
    categoryFilter = null;
    flavorFilter = null;

    currentPage = 1;
    fetchProducts();
}

function fetchProducts() {
    const searchParams = new URLSearchParams(window.location.search);
    const searchTerm = searchParams.get('search') || '';

    const url = `https://localhost:44341/api/home/GetProducts?page=${currentPage}&pageSize=12&minPrice=${minPriceFilter || ''}&maxPrice=${maxPriceFilter || ''}&category=${categoryFilter || ''}&flavor=${flavorFilter || ''}&keyword=${searchTerm}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            productList.innerHTML = '';

            data.products.forEach(product => {
                productList.innerHTML += `
                    <div class="product_item text-center mb-5">
                        <div class="product_item_img">
                            <a href="http://127.0.0.1:5500/pages/shop_detail.html?product_id=${product.productId}">
                                <img width="350" src="${product.mainImg}" alt="Product">
                            </a>
                            
                            <ul class="product-meta mt-3">
                            <li class="product-meta-wrapper mt-4">
                                <span class="product-meta-name">Category:</span>
                                <span class="product-meta-detail">Muffin</span>
                            </li>
                            <li class="product-meta-wrapper">
                                <span class="product-meta-name">Flavor:</span>
                                <span class="product-meta-detail">Chocolate</span>
                            </li>
                            <li class="product-meta-wrapper">
                                <span class="product-meta-name">Weight:</span>
                                <span class="product-meta-detail" id="weight">250 q</span>
                            </li>
                            <li class="product-meta-wrapper">
                                <span class="product-meta-name">Ingredients:</span>
                                <span class="product-meta-detail">Flour, Sugar, Eggs, Butter</span>
                            </li>
                        </ul>
                        </div>
                        <div class="product_item_content pt-3">
                            <h5 class="fs-4 pb-1">
                                <a href="http://127.0.0.1:/pages/shop_detail.html?product_id=${product.productId}">
                                    ${product.productName}
                                </a>
                            </h5>
                            <span class="fs-4">$ ${product.price}</span>
                        </div>
                    </div>
                `;
            });

            updatePaginationButtons(data.totalPages);
        })
        .catch(error => console.error('Error fetching products:', error));
}


function updatePaginationButtons(totalPages) {
    pageNumbers.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === currentPage ? 'activeA' : ''; 

        pageNumbers.innerHTML += `
            <li>
                <a href="#" class="pageNumber ${activeClass}" data-page="${i}" onclick="gotoPage(${i})">
                    ${i}
                </a>
            </li>
        `;
    }

    if (currentPage === 1) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }

    if (currentPage === totalPages) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}

function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();

    const urlSearchParams = new URLSearchParams(window.location.search);

    if (searchTerm !== '') {
        urlSearchParams.set('search', searchTerm);
    } else {
        urlSearchParams.delete('search');
    }

    history.pushState(null, '', '?' + urlSearchParams.toString());

    currentPage = 1;
    fetchProducts();
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', searchProducts);


function gotoPage(page) {
    currentPage = page;
    fetchProducts();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchProducts();
    }
}

function nextPage() {
    if (currentPage <= totalPages) {
        currentPage++;
        fetchProducts();
    }
}

categorySelect.addEventListener('change', applyFilters);

flavorSelect.addEventListener('change', applyFilters);

fetchProducts();