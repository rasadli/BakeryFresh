function getShopDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product_id');

    product_detail_row.innerHTML = ""
    fetch(`https://localhost:44341/api/home/GetProductDetail/${productId}`).then(response => response.json()).then(data => {
        product_detail_row.innerHTML = `
        <div class="row col-lg-6 col-md-12 col-sm-12 offset-lg-0 offset-md-0 justify-content-between mx-auto">
            <div class="row col-lg-3 col-md-3 col-sm-3 col-3 flex-column">
                <div class="col-12 mb-4 border cursor-pointer sideImgs">
                    <img src="${data.mainImg}" onclick="changeImg(this)" alt="">
                </div>
                <div class="col-12 mb-4 border cursor-pointer sideImgs opacity-75">
                    <img src="${data.sideImg1}" onclick="changeImg(this)" alt="">
                </div>
                <div class="col-12 mb-4 border cursor-pointer sideImgs opacity-75">
                    <img src="${data.sideImg2}" onclick="changeImg(this)" alt="">
                </div>
                <div class="col-12 border cursor-pointer sideImgs opacity-75">
                    <img src="${data.sideImg3}" onclick="changeImg(this)" alt="">
                </div>
            </div>
            <div class="col-lg-9 col-md-9 col-sm-9 col-9 border">
                <img src="${data.mainImg}" id="activePhoto" alt="" class="w-100 object-fit-cover">
            </div>
        </div>
        <div class="row flex-column col-lg-6 col-md-12 col-sm-12 ms-2 pt-3">
            <div class="col-lg-5 product_item_content">
                <span class="fs-3" >${data.productName}</span>
            </div>
            <div class="col-lg-3 product_item_content">
                <span class="fs-3" id="price">$${data.price}</span>
            </div>
            <div class="col-lg-12 pt-4 pe-0">
                <p class="about_middle_text w-100">${data.description}</p>
            </div>
            <div class="row col-lg-12 mt-3">
                <div class="quantity col-lg-5 col-md-5 col-sm-5 col-5">
                    <div class="cart-plus-minus">
                        <div class="dec qtybutton">-</div>
                        <input class="cart-plus-minus-box" value="${data.count == 0 ? '0' : '1'}" type="text" id="quantity">
                        <div class="inc qtybutton">+</div>
                    </div>
                </div>
                <div class="col-lg-5 col-md-5 col-sm-5 col-7">
                    <a class="info_send_btn btn-dark mt-0 w-100 text-center" ${localStorage.getItem("User_ID") == null ? 'href="http://127.0.0.1:5500/pages/sign_in.html"' : `href="#" onclick="addBasket(${data.productId})"`} id="add_cart_bttn">Add to cart</a>
                </div>
            </div>
            <ul class="product-meta mt-3">
                <li class="product-meta-wrapper mt-4">
                    <span class="product-meta-name">Category:</span>
                    <span class="product-meta-detail">${data.categoryName}</span>
                </li>
                <li class="product-meta-wrapper">
                    <span class="product-meta-name">Flavor:</span>
                    <span class="product-meta-detail">${data.flavorName}</span>
                </li>
                <li class="product-meta-wrapper">
                    <span class="product-meta-name">Weight:</span>
                    <span class="product-meta-detail" id="weight">${data.weight} q</span>
                </li>
                <li class="product-meta-wrapper">
                    <span class="product-meta-name">Ingredients:</span>
                    <span class="product-meta-detail">${data.ingredients}</span>
                </li>
            </ul>
        </div>
    `;
        document.querySelector(".inc").addEventListener("click", function () {
            if (quantity.value <= data.count) {
                if (quantity.value == data.count) {
                    alert(`There is no more ${data.productName}`)
                } else {
                    quantity.value++
                }
            }
        })
        document.querySelector(".dec").addEventListener("click", function () {
            if (quantity.value > 1) {
                quantity.value--
            }
        })
    })
    function basketNumber() {
        const BasketNumbers = document.querySelectorAll(".shop_cart_quantity")
        BasketNumbers.forEach(number => {
            let id = localStorage.getItem("User_ID")
            fetch(`https://localhost:44341/api/home/GetBasketDetails/${id}`).then(response => response.json()).then(data => {
                if (data.length != undefined) {
                    number.innerHTML = data.length
                }
            })
        })
    }
    basketNumber()

}
getShopDetail()

function changeImg(element) {
    var selectedPhoto = element.getAttribute('src')
    activePhoto.setAttribute('src', selectedPhoto);
    document.querySelectorAll(".sideImgs").forEach(element => {
        element.classList.add("opacity-75")
    })
    element.parentElement.classList.remove("opacity-75")
}

function addBasket(x) {
    let product_id = x
    let user_id = localStorage.getItem("User_ID")
    let quantity = Number(document.getElementById("quantity").value)
    let totalprice = quantity * Number(price.innerText.split("$")[1])
    let totalweight = quantity * Number(weight.innerText.split(" ")[0])

    if (quantity != 0) {
        var n_basket = {
            productId: product_id,
            customerId: user_id,
            quantity: quantity,
            totalAmount: totalprice,
            totalWeight: totalweight
        }

        fetch("https://localhost:44341/api/home/AddBasket", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(n_basket)
        }
        ).then(data => {
            getShopDetail()
        })
    }
}

