const urlParams = new URLSearchParams(window.location.search);
const userID = urlParams.get('user_id');
var user
function getUserData() {
    dashboad.innerHTML = ""
    fetch(`https://localhost:44341/api/home/GetUserData/${userID}`).then(response => response.json()).then(data => {
        dashboad.innerHTML += `
            <div class="myaccount-content dashboad">
                <div class="alert alert-light"> <p> Hello user, ${data.username} .From your account you can view your <u> orders</u>, <u>edit your personal data</u>.</p></div>
                
            </div>
            <table class="table">
                <thead id="thead_p">
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Second Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Password</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Adress</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody id="tbody_p">
                    <tr>
                        <td>${data.firstName}</td>
                        <td>${data.secondName}</td>
                        <td>${data.username}</td>
                        <td>${data.email}</td>
                        <td>${data.password}</td>
                        <td>${data.phoneNumber}</td>
                        <td>${data.address}</td>
                        <td><i class="fa-solid fa-pen" user_id=${data.userId} data-bs-toggle="modal" data-bs-target="#modal" style="color: #44ff00;" onclick="showUserUpdate(this)"></i></td>   
                    </tr>  
                </tbody>
            </table>
        `

        user = data
    })
    basketNumber()

}
getUserData()

function showUserUpdate(x) {
    user_id = x.getAttribute("user_id");

    modal_content.innerHTML = "";
    modal_content.innerHTML = `
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="modal_heading">Persoanl Information</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="updateModal_body">
            <form class="info_sctn_form" id="" action="" method="" novalidate="">
                <div class="row">
                    <div class="col-md-6 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="name" id="uFirstName"
                                autocomplete="off" placeholder="Name" value="${user.firstName}">
                            <label for="floatingInput">Name</label>
                        </div>
                    </div>
                    <div class="col-md-6 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="surname" id="uSecondName"
                                autocomplete="off" placeholder="Surname" value="${user.secondName}">
                            <label for="floatingInput">Surname</label>
                        </div>
                    </div>
                    <div class="col-md-12 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="username" id="uUsername"
                                autocomplete="off" placeholder="Username" value="${user.username}">
                            <label for="floatingInput">Username</label>
                        </div>
                    </div>
                    <div class="col-md-12 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="email" name="mail" id="uEmail"
                                autocomplete="off" placeholder="E-mail" value="${user.email}">
                            <label for="floatingInput">E-mail</label>
                        </div>
                    </div>
                    <div class="col-md-12 form-p">
                        <div class="form_group form-floating position-relative d-flex">
                            <input class="form_field inp_focus form-control pas_inp" type="text" id="uPassword"
                                name="password" autocomplete="off" placeholder="Password" value="${user.password}">
                            <label for="floatingPassword">Password</label>
                        </div>
                    </div>
                    <div class="col-md-12 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="adress" id="uAdress"
                                autocomplete="off" placeholder="Addres" value="${user.address}">
                            <label for="floatingInput">Addres</label>
                        </div>
                    </div>
                    
                    <div class="col-md-12 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="number" id="uPhoneNumber"
                                autocomplete="off" placeholder="Number" value="${user.phoneNumber}">
                            <label for="floatingInput">Number</label>
                        </div>
                    </div>
                </div>
            </form> 
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="updateUser()">Save Changes</button>
        </div>   
    `;


}

function updateUser() {
    let u_FirstName = uFirstName.value
    let u_SecondName = uSecondName.value
    let u_Username = uUsername.value
    let u_Email = uEmail.value
    let u_Password = uPassword.value
    let u_Adress = uAdress.value
    let u_PhoneNumber = uPhoneNumber.value

    var u_User = {
        firstName: u_FirstName,
        secondName: u_SecondName,
        username: u_Username,
        email: u_Email,
        password: u_Password,
        address: u_Adress,
        phoneNumber: u_PhoneNumber
    }

    fetch(`https://localhost:44341/api/home/UpdateUser/${user_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(u_User)
    }
    ).then(data => {
        getUserData();
    });
}


var order_data
function getOrders() {
    thead.innerHTML = ""
    thead.innerHTML = `
        <tr>
            <th scope="col">#</th>
            <th scope="col">Product Details</th>
            <th scope="col">Total Price</th>
            <th scope="col">Total Weight</th>
            <th scope="col">Quantity</th>
            <th scope="col">Order Date</th>
            <th scope="col">Cancel Order</th>
        </tr>
    `

    fetch(`https://localhost:44341/api/home/GetOrderDetail/${userID}`).then(response => response.json()).then(data => {
        let i = 0
        tbody.innerHTML = ""
        data.forEach(order => {
            i++
            tbody.innerHTML += `
                <tr>
                    <th scope="row">${i}</th>
                    <td onclick="showOrderedProduct(this)" data-bs-toggle="modal" data-bs-target="#modal" order_id=${order.orderId}>
                        <a href="#">${order.productName}</a>
                    </td>
                    <td>$${order.totalAmount}</td>
                    <td>${order.totalWeight}q</td>
                    <td>${order.quantity}</td>
                    <td>${order.orderDate.split("T")}</td>
                    <td><i class="fa-solid fa-trash" data-bs-toggle="modal" data-bs-target="#modal" style="color: #ff0000;" onclick="showOrderDelete(this)" order_id=${order.orderId}></i></td>   
                </tr>            
            `
        });
        order_data = data
    })
}

let order_id
function showOrderedProduct(x) {
    order_id = x.getAttribute("order_id")
    order = order_data.find(item => item.orderId == order_id)
    modal.innerHTML = ""
    modal.innerHTML = `
        <div class="modal-dialog modal-lg" >
            <div class="modal-content" >
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal_heading">Product Information</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body table-responsive" id="" >
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Product Name</th>
                                <th scope="col">Category Name</th>
                                <th scope="col">Flavor Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Weight</th>
                                <th scope="col">Ingredients</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${order.productName}</td>
                                <td>${order.categoryName}</td>
                                <td>${order.flavorName}</td>
                                <td>$${order.price}</td>            
                                <td>${order.weight}q</td>            
                                <td>${order.ingredients}</td>            
                            </tr>
                        </tbody>
                    </table> 
                    <div class="p-2">
                        <h3>Description:</h3>
                        <p>${order.description}</p>
                    </div>
                    <div class="row row-cols-1 row-cols-md-2 g-4">
                        <div class="col-md-3">
                            <div class="card">
                                <img src="${order.mainImg}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Main Img</h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <img src="${order.sideImg1}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Side Img 1</h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <img src="${order.sideImg2}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Side Img 2</h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <img src="${order.sideImg3}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Side Img 3</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div> 
            </div>
        </div>
          
    `
}

function showOrderDelete(x) {
    order_id = x.getAttribute("order_id")
    order = order_data.find(item => item.orderId == order_id)
    modal_content.innerHTML = ""
    modal_content.innerHTML = `
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">System Message</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="deleteModal_body">
            <p>Are you sure to delete, ${order.productName} ?</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deleteOrder()">Delete</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>                
    `
}

function deleteOrder() {
    fetch(`https://localhost:44341/api/home/DeleteOrder/${order_id}`,
        {
            method: "DELETE"
        }
    ).then(data => {
        getOrders();
    });
}


function logOut(x) {
    localStorage.removeItem("User_ID");
    x.href = "http://127.0.0.1:5500/index.html"
}

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