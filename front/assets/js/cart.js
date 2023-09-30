var cart_product_data
var cart_data

function getUserCart() {
    const urlParams = new URLSearchParams(window.location.search);
    const userID = urlParams.get('user_id');

    fetch(`https://localhost:44341/api/home/GetBasketDetails/${userID}`)
        .then(response => response.json())
        .then(data => {
            cart_tbody.innerHTML = "";
            let total = 0;
            cart_data = data
            data.forEach(cart_product => {
                total += cart_product.totalAmount;
                cart_product_data = cart_product

                cart_tbody.innerHTML += `
                        <tr>
                            <th class="cart-remove">
                                <button class="remove-btn">
                                    <i class="fa-solid fa-xmark" style="color: #000000;" basket_id="${cart_product.basketId}" onclick="deleteOrderShow(this)" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></i>
                                </button>
                            </th>
                            <th class="cart-thumb col-md-1">
                                <a href="http://127.0.0.1:5500/pages/shop_detail.html?product_id=${cart_product.productId}">
                                <img src="${cart_product.mainImg}" alt="${cart_product.productName}">
                                </a>
                            </th>
                            <th>
                                <a href="http://127.0.0.1:5500/pages/shop_detail.html?product_id=${cart_product.productId}">${cart_product.productName}</a>
                            </th>
                            <td>$${cart_product.price}</td>
                            <td class="text-center cart-quantity">
                                <div class="quantity">
                                <div class="cart-plus-minus border-0 mx-auto">
                                    <div class="dec qtybutton" basket_id="${cart_product.basketId}" onclick="changeQuantity(this)">-</div>
                                    <input class="cart-plus-minus-box" value="${cart_product.quantity}" type="text" >
                                    <div class="inc qtybutton" basket_id="${cart_product.basketId}" onclick="changeQuantity(this)">+</div>
                                </div>
                                </div>
                            </td>
                            <td>$${cart_product.totalAmount}</td>
                            <td><i class="fa-solid fa-check" style="color: #26f234;" data-bs-toggle="modal" data-bs-target="#exampleModal" basket_id="${cart_product.basketId}" onclick="addOrderShow(this)"></i></td>
                        </tr>
                    `;
            });

            cart_total.innerHTML = "Total: $" + total;
        });

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

getUserCart();

let basket_id
var cart_element
function addOrderShow(x) {
    basket_id = Number(x.getAttribute("basket_id"));
    cart_element = cart_data.find(item => item.basketId == basket_id)
    modal_content.innerHTML = ""
    modal_content.innerHTML = `
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">System Message</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            Are you sure to order ${cart_element.productName} ?
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="addOrder()">Order</button>
        </div>
    `


}

function addOrder() {
    fetch("https://localhost:44341/api/home/AddOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart_element)
    }).then(data => {
        getUserCart();
        alert(`You successfuly ordered ${cart_element.productName}.`)
    });

    fetch(`https://localhost:44341/api/home/DeleteBasket/${basket_id}`, {
        method: "DELETE"
    }
    ).then(data => {
        getUserCart();

    });
}

var modal = new bootstrap.Modal(document.getElementById("exampleModal"));
function changeQuantity(x) {
    basket_id = Number(x.getAttribute("basket_id"));
    cart_element = cart_data.find(item => item.basketId == basket_id)

    let quantity = Number(x.parentElement.children[1].value)
    var u_Basket
    let u_quantity


    if (x.classList.contains("inc")) {
        if (cart_element.count >= 0) {
            console.log(cart_element.count);
            if (cart_element.count == 0) {
                alert(`There is no more ${cart_element.productName}`)
            } else {
                quantity++
                u_quantity = quantity
                x.parentElement.children[1].value = u_quantity
                changeFetch()
            }
        }
    }

    if (x.classList.contains("dec")) {
        if (quantity >= 1) {
            if (quantity == 1) {
                modal.show();
                deleteOrderShow(x)
            } else {
                quantity--
                u_quantity = quantity
                x.parentElement.children[1].value = u_quantity
                changeFetch()
            }
        }
    }


    function changeFetch() {
        u_Basket = {
            quantity: u_quantity
        }

        fetch(`https://localhost:44341/api/home/UpdateQuantity/${basket_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(u_Basket)
        }
        ).then(data => {
            getUserCart();
        });
    }

}

function deleteOrderShow(x) {
    basket_id = Number(x.getAttribute("basket_id"));
    cart_element = cart_data.find(item => item.basketId == basket_id)
    modal_content.innerHTML = ""
    modal_content.innerHTML = `
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">System Message</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            Are you sure to delete ${cart_element.productName} ?
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="deleteOrder()">Cancel</button>
        </div>
    `
}

function deleteOrder() {
    fetch(`https://localhost:44341/api/home/DeleteBasket/${basket_id}`,
        {
            method: "DELETE"
        }
    ).then(data => {
        getUserCart();

    });
}


