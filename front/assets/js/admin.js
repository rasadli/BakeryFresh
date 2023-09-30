function deleteActive() {
    document.querySelectorAll(".nav-link").forEach(element => {
        element.classList.remove("activeA")
    })
}
var user_data
function getAdminData() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_id');
    fetch(`https://localhost:44341/api/home/GetAdmin/${userId}`).then(response => response.json()).then(data => {
        home_p.innerHTML = `Hello ,${data.username} ,It is your data`
        thead.innerHTML = ""
        addButtonDiv.innerHTML = ""
        thead.innerHTML = `
            <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Second Name</th>
                <th scope="col">Username</th>
                <th scope="col">E-mail</th>
                <th scope="col">Password</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Adress</th>

            </tr>
        `
        tbody.innerHTML = ""
        tbody.innerHTML += `
            <tr>
                <th scope="row">1</th>
                <td>${data.firstName}</td>
                <td>${data.secondName}</td>
                <td>${data.username}</td>
                <td>${data.email}</td>
                <td>${data.password}</td>
                <td>${data.phoneNumber}</td>
                <td>${data.address}</td>  
            </tr>            
        `
        deleteActive()
        Home_a.classList.add("activeA")
    })
}
getAdminData()

function adminDelete() {
    delete_modal_content.innerHTML = ""
    delete_modal_content.innerHTML = `
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">System Message</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="deleteModal_body">
            <p>Admins can not delete themselves!</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>  
    `

}
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('input', function (event) {
    const searchTerm = searchBar.value.trim(" ");

    const tableRows = document.querySelectorAll('#tbody tr');

    tableRows.forEach(row => {
        const productNameCell = row.querySelector('td:nth-child(2)');
        if (productNameCell.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    });
});

// ********************************************************************************************************************************/
function getUsers() {
    deleteActive()
    Users_a.classList.add("activeA")
    home_p.innerHTML = ""
    addButtonDiv.innerHTML = ""
    addButtonDiv.innerHTML = `
        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modal" onclick="showUserAdd()">Add</button>
    `
    thead.innerHTML = ""
    thead.innerHTML = `
        <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Second Name</th>
            <th scope="col">Username</th>
            <th scope="col">E-mail</th>
            <th scope="col">Password</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Adress</th>
            <th scope="col">Status</th>
            <th scope="col">Delete</th>
            <th scope="col">Update</th>
        </tr>
    `
    fetch("https://localhost:44341/api/home/GetUsers").then(response => response.json()).then(data => {
        let i = 0
        tbody.innerHTML = ""
        data.forEach(user => {
            i++
            tbody.innerHTML += `
                <tr>
                    <th scope="row">${i}</th>
                    <td>${user.firstName}</td>
                    <td>${user.secondName}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.password}</td>
                    <td>${user.phoneNumber}</td>
                    <td>${user.address}</td>
                    <td>${user.statusName}</td>
                    <td><i class="fa-solid fa-trash" user_id=${user.userId} data-bs-toggle="modal" data-bs-target="#modal" style="color: #ff0000;" onclick="showUserDelete(this)"></i></td>   
                    <td><i class="fa-solid fa-pen" user_id=${user.userId} data-bs-toggle="modal" data-bs-target="#modal" style="color: #44ff00;" onclick="showUserUpdate(this)"></i></td>   
                </tr>            
            `
        });
        user_data = data
    })
}

function showUserAdd() {
    modal_content.innerHTML = ""
    modal_content.innerHTML = `
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="modal_heading">New User</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="">
            <form class="info_sctn_form" id="" action="" method="" novalidate="">
                <div class="row">
                    <div class="col-md-6 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="name" id="nFirstName"
                                autocomplete="off" placeholder="Name">
                            <label for="floatingInput">Name</label>
                        </div>
                    </div>
                    <div class="col-md-6 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="surname" id="nSecondName"
                                autocomplete="off" placeholder="Surname">
                            <label for="floatingInput">Surname</label>
                        </div>
                    </div>
                    <div class="col-md-12 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="username" id="nUsername"
                                autocomplete="off" placeholder="Username">
                            <label for="floatingInput">Username</label>
                        </div>
                    </div>
                    <div class="col-md-12 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="email" name="mail" id="nEmail"
                                autocomplete="off" placeholder="E-mail">
                            <label for="floatingInput">E-mail</label>
                        </div>
                    </div>
                    <div class="col-md-12 form-p">
                        <div class="form_group form-floating position-relative d-flex">
                            <input class="form_field inp_focus form-control pas_inp" type="text" id="nPassword"
                                name="password" autocomplete="off" placeholder="Password">
                            <label for="floatingPassword">Password</label>
                        </div>
                    </div>
                    <div class="col-md-12 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="adress" id="nAdress"
                                autocomplete="off" placeholder="Addres">
                            <label for="floatingInput">Addres</label>
                        </div>
                    </div>
                    <div class="col-md-6 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="number" id="nPhoneNumber"
                                autocomplete="off" placeholder="Number">
                            <label for="floatingInput">Number</label>
                        </div>
                    </div>
                    <div class="col-md-6 form-p">
                        <div class="form-floating">
                            <select class="form-select" id="nUserStatus">
                                <option selected disabled></option>

                            </select>
                            <label for="floatingSelect">Status</label>
                        </div>
                    </div>
                </div>
            </form> 
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="addUser()">Add User</button>
        </div>     
    `
    // nUserStatus.innerHTML = ""

    fetch("https://localhost:44341/api/home/GetStatuses").then(response => response.json()).then(data => {
        data.forEach(status => {
            nUserStatus.innerHTML += `
                <option value="${status.statusId}">${status.statusName}</option>
            `
        })

    })
}

function addUser() {
    let n_FirstName = nFirstName.value
    let n_SecondName = nSecondName.value
    let n_Username = nUsername.value
    let n_Email = nEmail.value
    let n_Password = nPassword.value
    let n_Adress = nAdress.value
    let n_PhoneNumber = nPhoneNumber.value
    let n_UserStatus = nUserStatus.value

    var n_User = {
        firstName: n_FirstName,
        secondName: n_SecondName,
        username: n_Username,
        email: n_Email,
        password: n_Password,
        address: n_Adress,
        phoneNumber: n_PhoneNumber,
        userStatus: n_UserStatus
    }

    fetch("https://localhost:44341/api/home/AddUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(n_User)
    }
    ).then(response => response.json()).then(data => {
        if (data) {
            // window.location.href = "sign_in.html"
            alert("comp")
        } else {
            alert("Username or email has already taken")
        }
        getUsers();
    });

}

let user_id
var user
function showUserUpdate(x) {
    user_id = x.getAttribute("user_id");
    user = user_data.find(item => item.userId == user_id);
    modal_content.innerHTML = "";
    modal_content.innerHTML = `
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="modal_heading">User Information</h1>
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
                    
                    <div class=${user.statusId === 1 ? 'col-md-12 form-p' : 'col-md-6 form-p'}">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="number" id="uPhoneNumber"
                                autocomplete="off" placeholder="Number" value="${user.phoneNumber}">
                            <label for="floatingInput">Number</label>
                        </div>
                    </div>
                    ${user.statusId == 1 ? '' : `
                        <div class="col-md-6 form-p">
                            <div class="form-floating">
                                <select class="form-select" id="uUserStatus">
                                    <!-- Status options here -->
                                </select>
                                <label for="floatingSelect">Status</label>
                            </div>
                        </div>
                    `}
                </div>
            </form> 
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="updateUser()">Save Changes</button>
        </div>   
    `;

    if (user.statusId != 1) {
        const uUserStatus = document.getElementById('uUserStatus');
        fetch("https://localhost:44341/api/home/GetStatuses").then(response => response.json()).then(data => {
            data.forEach(status => {
                if (status.statusId === user.statusId) {
                    uUserStatus.innerHTML += `
                        <option value="${status.statusId}" selected>${status.statusName}</option>
                    `;
                } else {
                    uUserStatus.innerHTML += `
                        <option value="${status.statusId}">${status.statusName}</option>
                    `;
                }
            });
        });
    }
}

function updateUser() {
    let u_FirstName = uFirstName.value
    let u_SecondName = uSecondName.value
    let u_Username = uUsername.value
    let u_Email = uEmail.value
    let u_Password = uPassword.value
    let u_Adress = uAdress.value
    let u_PhoneNumber = uPhoneNumber.value
    let u_UserStatus = uUserStatus.value

    var u_User = {
        firstName: u_FirstName,
        secondName: u_SecondName,
        username: u_Username,
        email: u_Email,
        password: u_Password,
        address: u_Adress,
        phoneNumber: u_PhoneNumber,
        userStatus: u_UserStatus
    }

    fetch(`https://localhost:44341/api/home/UpdateUser/${user_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(u_User)
    }
    ).then(data => {
        getUsers();
    });
}

function showUserDelete(x) {
    user_id = x.getAttribute("user_id")
    user = user_data.find(item => item.userId == user_id)
    modal_content.innerHTML = ""
    modal_content.innerHTML = `
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">System Message</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="deleteModal_body">
            ${user.statusId == 1 ? "<p>Admins cannot be deleted !</p>" : `<p>Are you sure to delete, ${user.username}?</p>`}
        </div>
        <div class="modal-footer">
            ${user.statusId == 1 ?
            `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>` :
            `<button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deleteUser()">Delete</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>`}
        </div>
    `;
}

function deleteUser() {
    fetch(`https://localhost:44341/api/home/DeleteUser/${user_id}`,
        {
            method: "DELETE"
        }
    ).then(data => {
        getUsers();
    });
}

//**********************************************************************************************************************************/
var product_data
function getProducts() {
    deleteActive()
    Products_a.classList.add("activeA")
    home_p.innerHTML = ""
    thead.innerHTML = ""
    addButtonDiv.innerHTML = ""
    addButtonDiv.innerHTML = `
        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modal" onclick="showProductAdd()">Add</button>
    `
    thead.innerHTML = `
        <tr>
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Category Name</th>
            <th scope="col">Flavor Name</th>
            <th scope="col">Price</th>
            <th scope="col">Weight</th>
            <th scope="col">Count</th>
            <th scope="col">Ingredients</th>
            <th scope="col">Description</th>
            <th scope="col">Photoes</th>
            <th scope="col">Delete</th>
            <th scope="col">Update</th>
        </tr>
    `

    fetch("https://localhost:44341/api/home/GetProductsBasic").then(response => response.json()).then(data => {
        let i = 0
        tbody.innerHTML = ""
        data.forEach(product => {
            i++
            tbody.innerHTML += `
                <tr>
                    <th scope="row">${i}</th>
                    <td>${product.productName}</td>
                    <td>${product.categoryName}</td>
                    <td>${product.flavorName}</td>
                    <td>$${product.price}</td>
                    <td>${product.weight}q</td>
                    <td>${product.count}</td>
                    <td>${product.ingredients}</td>
                    <td><i class="fa-solid fa-file" product_id=${product.productId} data-bs-toggle="modal" data-bs-target="#modal" onclick="getProductDescription(this)" style="color: #BC8157;"></i></td>
                    <td><i class="fa-solid fa-eye" product_id=${product.productId} data-bs-toggle="modal" data-bs-target="#modal" onclick="getProductPhoto(this)" style="color: #001eff;"></i></td>
                    <td><i class="fa-solid fa-trash" product_id=${product.productId} data-bs-toggle="modal" data-bs-target="#modal" style="color: #ff0000;" onclick="showProductDelete(this)"></i></td>   
                    <td><i class="fa-solid fa-pen" product_id=${product.productId} data-bs-toggle="modal" data-bs-target="#modal" style="color: #44ff00;" onclick="showProductUpdate(this)"></i></td>   
                </tr>            
            `
        });
        product_data = data
    })
}

let product_id
var product
function getProductPhoto(x) {
    product_id = x.getAttribute("product_id")
    product = product_data.find(item => item.productId == product_id)
    modal_content.innerHTML = ""
    modal_content.innerHTML = `
        <div class="modal-header" >
            <h1 class="modal-title fs-5" id="exampleModalLabel">Product Photoes</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row row-cols-1 row-cols-md-2 g-4">
                <div class="col">
                    <div class="card">
                        <img src="${product.mainImg}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Main Img</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <img src="${product.sideImg1}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Side Img 1</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <img src="${product.sideImg2}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Side Img 2</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <img src="${product.sideImg3}" class="card-img-top" alt="...">
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
    `
}

function getProductDescription(x) {
    product_id = x.getAttribute("product_id")
    product = product_data.find(item => item.productId == product_id)
    modal_content.innerHTML = ""
    modal_content.innerHTML = `
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Product Description</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="descriptionModal_body">
            ${product.description}
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>                      
    `
}

function showProductAdd() {
    modal_content.innerHTML = ""
    modal_content.innerHTML = `
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="modal_heading">New Product</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="">
            <form class="info_sctn_form" id="" action="" method="" novalidate="">
                <div class="row">
                    <div class="col-md-12 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="" id="nProductName"
                                autocomplete="off" placeholder="Product Name">
                            <label for="floatingInput">Product Name</label>
                        </div>
                    </div>
                    <div class="col-md-6 form-p">
                        <div class="form-floating">
                            <select class="form-select" id="nProductCat">
                                <option disabled selected></option>
                                
                            </select>
                            <label for="floatingSelect">Categories</label>
                        </div>
                    </div>
                    <div class="col-md-6 form-p">
                        <div class="form-floating">
                            <select class="form-select"id="nProductFlav">
                                <option disabled selected></option>
                                        
                            </select>
                            <label for="floatingSelect">Flavors</label>
                        </div>
                    </div>
                    <div class="col-md-4 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="" name="mail" id="nPrice"
                                autocomplete="off" placeholder="Price">
                            <label for="floatingInput">Price</label>
                        </div>
                    </div>
                    <div class="col-md-4 form-p">
                        <div class="form_group form-floating position-relative d-flex">
                            <input class="form_field inp_focus form-control pas_inp" type="text" id="nWeight"
                                name="password" autocomplete="off" placeholder="Weight">
                            <label for="floatingPassword">Weight</label>
                        </div>
                    </div>
                    <div class="col-md-4 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="adress" id="nCount"
                                autocomplete="off" placeholder="Count">
                            <label for="floatingInput">Count</label>
                        </div>
                    </div>

                    <div class="col-md-12 form-p">
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Description" style="height: 100px" id="nDescription"></textarea>
                            <label for="floatingTextarea2">Description</label>
                        </div>
                    </div>
                    <div class="col-md-12 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="" id="nMainImg"
                                autocomplete="off" placeholder="Main İmg">
                            <label for="floatingInput">Main İmg</label>
                        </div>
                    </div>
                    <div class="col-md-12 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="" id="nSideImg1"
                                autocomplete="off" placeholder="Side İmg 1">
                            <label for="floatingInput">Side İmg 1</label>
                        </div>
                    </div>
                    <div class="col-md-12 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="" id="nSideImg2"
                                autocomplete="off" placeholder="Side İmg 2">
                            <label for="floatingInput">Side İmg 2</label>
                        </div>
                    </div>
                    <div class="col-md-12 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="" id="nSideImg3"
                                autocomplete="off" placeholder="Side İmg 3">
                            <label for="floatingInput">Side İmg 3</label>
                        </div>
                    </div>                    
                </div>
            </form> 
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="addProduct()">Add Product</button>
        </div>     
    `


    fetch("https://localhost:44341/api/home/GetCategories").then(response => response.json()).then(data => {
        data.forEach(category => {
            nProductCat.innerHTML += `
                <option value="${category.categoryId}">${category.categoryName}</option>
            `
        })
    })


    fetch("https://localhost:44341/api/home/GetFlavors").then(response => response.json()).then(data => {
        data.forEach(flavor => {
            nProductFlav.innerHTML += `
                <option value="${flavor.flavorId}">${flavor.flavorName}</option>
            `
        })
    })
}

let n_product_id
function addProduct() {
    let n_ProductName = nProductName.value
    let n_ProductCat = nProductCat.value
    let n_ProductFlav = nProductFlav.value
    let n_Price = nPrice.value
    let n_Weight = nWeight.value
    let n_Count = nCount.value
    let n_Description = nDescription.value
    let n_MainImg = nMainImg.value
    let n_SideImg1 = nSideImg1.value
    let n_SideImg2 = nSideImg2.value
    let n_SideImg3 = nSideImg3.value

    var n_Product = {
        productName: n_ProductName,
        productCategory: n_ProductCat,
        productFlavor: n_ProductFlav,
        price: n_Price,
        weight: n_Weight,
        count: n_Count,
        description: n_Description,
        mainImg: n_MainImg,
        sideImg1: n_SideImg1,
        sideImg2: n_SideImg2,
        sideImg3: n_SideImg3
    }

    fetch("https://localhost:44341/api/home/AddProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(n_Product)
    }
    ).then(response => response.json()).then(data => {
        n_product_id = data.productId
        showIngredientAdd()
    })


}

function showIngredientAdd() {
    modal_content.innerHTML = ""
    modal_content.innerHTML = `
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="modal_heading">New Product Ingridient</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="ingridient_sctn">

        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="addProductIngridient()">Add Product Ingridient</button>
        </div>  
    `

    fetch("https://localhost:44341/api/home/GetIngredients").then(response => response.json()).then(data => {
        ingridient_sctn.innerHTML = ""
        data.forEach(ingridient => {
            ingridient_sctn.innerHTML += `
                <div class="form-check" >
                    <input class="form-check-input" type="checkbox" value="${ingridient.ingredientId}" id="flexCheckDefault" onclick="getIngId(this)">
                    <label class="form-check-label" for="flexCheckDefault">
                            ${ingridient.ingredientName}
                    </label>
                </div>
            `
        });
    })

}

let ingridients = []
let ingredient
function getIngId(x) {
    console.log(ingridients +"f");

    ingredient = Number(x.value)
    if (ingridients.length == 0) {
        ingridients.push(ingredient)

    } else {
        if (!ingridients.includes(ingredient)) {
            ingridients.push(ingredient)
        }
    }
    console.log(ingridients);
}

function addProductIngridient() {
    console.log(ingridients+"a");
    fetch(`https://localhost:44341/api/home/AddProductIngredient/${n_product_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ingridients)
    }
    ).then(data => {
        getProducts()
        ingridients = []
    })

}

function showProductUpdate(x) {
    product_id = x.getAttribute("product_id")
    product = product_data.find(item => item.productId == product_id)
    modal_content.innerHTML = ""
    modal_content.innerHTML = `
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="modal_heading">Product Information</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="">
            <form class="info_sctn_form" id="" action="" method="" novalidate="">
                <div class="row">
                    <div class="col-md-12 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="" id="uProductName" value="${product.productName}"
                                autocomplete="off" placeholder="Product Name">
                            <label for="floatingInput">Product Name</label>
                        </div>
                    </div>
                    <div class="col-md-6 form-p">
                        <div class="form-floating">
                            <select class="form-select" id="uProductCat">
                                <option disabled selected></option>
                                
                            </select>
                            <label for="floatingSelect">Categories</label>
                        </div>
                    </div>
                    <div class="col-md-6 form-p">
                        <div class="form-floating">
                            <select class="form-select"id="uProductFlav">
                                <option disabled selected></option>
                                        
                            </select>
                            <label for="floatingSelect">Flavors</label>
                        </div>
                    </div>
                    <div class="col-md-4 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="" name="mail" id="uPrice" value="${product.price}"
                                autocomplete="off" placeholder="Price">
                            <label for="floatingInput">Price</label>
                        </div>
                    </div>
                    <div class="col-md-4 form-p">
                        <div class="form_group form-floating position-relative d-flex">
                            <input class="form_field inp_focus form-control pas_inp" type="text" id="uWeight" value="${product.weight}"
                                name="password" autocomplete="off" placeholder="Weight">
                            <label for="floatingPassword">Weight</label>
                        </div>
                    </div>
                    <div class="col-md-4 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="adress" id="uCount" value="${product.count}"
                                autocomplete="off" placeholder="Count">
                            <label for="floatingInput">Count</label>
                        </div>
                    </div>

                    <div class="col-md-12 form-p">
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Description" style="height: 100px" id="uDescription" value="">${product.description}</textarea>
                            <label for="floatingTextarea2">Description</label>
                        </div>
                    </div>
                    <div class="col-md-12 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="" id="uMainImg" value="${product.mainImg}"
                                autocomplete="off" placeholder="Main İmg">
                            <label for="floatingInput">Main İmg</label>
                        </div>
                    </div>
                    <div class="col-md-12 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="" id="uSideImg1" value="${product.sideImg1}"
                                autocomplete="off" placeholder="Side İmg 1">
                            <label for="floatingInput">Side İmg 1</label>
                        </div>
                    </div>
                    <div class="col-md-12 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="" id="uSideImg2" value="${product.sideImg2}"
                                autocomplete="off" placeholder="Side İmg 2">
                            <label for="floatingInput">Side İmg 2</label>
                        </div>
                    </div>
                    <div class="col-md-12 form-p">
                        <div class="form_group form-floating">
                            <input class="form_field inp_focus form-control" type="text" name="" id="uSideImg3" value="${product.sideImg3}"
                                autocomplete="off" placeholder="Side İmg 3">
                            <label for="floatingInput">Side İmg 3</label>
                        </div>
                    </div>                    
                </div>
            </form> 
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="updateProduct()">Update Product</button>
        </div>   
    `


    fetch("https://localhost:44341/api/home/GetCategories").then(response => response.json()).then(data => {
        data.forEach(category => {
            if (category.categoryId === product.categoryId) {
                uProductCat.innerHTML += `
                  <option value="${category.categoryId}" selected>${category.categoryName}</option>
                `
            } else {
                uProductCat.innerHTML += `
                <option value="${category.categoryId}">${category.categoryName}</option>
            `
            }
        })
    })

    fetch("https://localhost:44341/api/home/GetFlavors").then(response => response.json()).then(data => {
        data.forEach(flavor => {
            if (flavor.flavorId === product.flavorId) {
                uProductFlav.innerHTML += `
                    <option value="${flavor.flavorId}" selected>${flavor.flavorName}</option>
                `
            } else {
                uProductFlav.innerHTML += `
                    <option value="${flavor.flavorId}">${flavor.flavorName}</option>
                `
            }
        })
    })
}

function updateProduct() {

    let u_ProductName = uProductName.value
    let u_ProductCat = uProductCat.value
    let u_ProductFlav = uProductFlav.value
    let u_Price = uPrice.value
    let u_Weight = uWeight.value
    let u_Count = uCount.value
    let u_Description = uDescription.value
    let u_MainImg = uMainImg.value
    let u_SideImg1 = uSideImg1.value
    let u_SideImg2 = uSideImg2.value
    let u_SideImg3 = uSideImg3.value

    var u_Product = {
        productName: u_ProductName,
        productCategory: u_ProductCat,
        productFlavor: u_ProductFlav,
        price: u_Price,
        weight: u_Weight,
        count: u_Count,
        description: u_Description,
        mainImg: u_MainImg,
        sideImg1: u_SideImg1,
        sideImg2: u_SideImg2,
        sideImg3: u_SideImg3
    }

    fetch(`https://localhost:44341/api/home/UpdateProduct/${product_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(u_Product)
    }
    ).then(data => {
        n_product_id = data.productId
        showIngridientUpdate()
    });
}

function showIngridientUpdate() {
    modal_content.innerHTML = ""
    modal_content.innerHTML = `
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="modal_heading">New Product Ingridient</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="ingridient_sctn">

        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="updateProductIngridient()">Add Product Ingridient</button>
        </div>  
    `

    fetch(`https://localhost:44341/api/home/GetProductIngredients/${product_id}`)
        .then(response => response.json())
        .then(data => {
            const ingredientIdsFromFirstFetch = data.map(item => item.ingredientId);

            fetch("https://localhost:44341/api/home/GetIngredients")
                .then(response => response.json())
                .then(data => {
                    ingridient_sctn.innerHTML = "";
                    data.forEach(ingredient => {
                        const isChecked = ingredientIdsFromFirstFetch.includes(ingredient.ingredientId) ? 'checked' : '';

                        ingridient_sctn.innerHTML += `
                            <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="${ingredient.ingredientId}" id="flexCheckDefault" onclick="getIngId(this)" ${isChecked}>
                            <label class="form-check-label" for="flexCheckDefault">
                                ${ingredient.ingredientName}
                            </label>
                            </div>
                        `;
                    });
                });
        });
}

function updateProductIngridient() {
    const checkboxes = document.querySelectorAll('.form-check-input');
    const checkedInputs = Array.from(checkboxes).filter(input => input.checked).map(input => input.value);

    fetch(`https://localhost:44341/api/home/UpdateProductIngredients/${product_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkedInputs)
    }).then(data => {
        getProducts();
    })
}

function showProductDelete(x) {
    product_id = x.getAttribute("product_id")
    product = product_data.find(item => item.productId == product_id)
    modal_content.innerHTML = ""
    modal_content.innerHTML = `
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">System Message</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="deleteModal_body">
            <p>Are you sure to delete, ${product.productName} ?</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deleteProduct()">Delete</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>                
    `
}

function deleteProduct() {
    fetch(`https://localhost:44341/api/home/DeleteProduct/${product_id}`,
        {
            method: "DELETE"
        }
    ).then(data => {
        getProducts();
    });
}

//******************************************************************************************************************************************** */
var order_data
function getOrders() {
    deleteActive()
    Orders_a.classList.add("activeA")
    home_p.innerHTML = ""
    thead.innerHTML = ""
    addButtonDiv.innerHTML = ""
    thead.innerHTML = `
        <tr>
            <th scope="col">#</th>
            <th scope="col">Product Details</th>
            <th scope="col">Price</th>
            <th scope="col">Weight</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total Price</th>
            <th scope="col">Total Weight</th>
            <th scope="col">Order Date</th>
            <th scope="col">User Details</th>
            <th scope="col">Delete</th>
        </tr>
    `

    fetch("https://localhost:44341/api/home/GetOrderDetail").then(response => response.json()).then(data => {
        let i = 0
        tbody.innerHTML = ""
        data.forEach(order => {
            i++
            tbody.innerHTML += `
                <tr>
                    <th scope="row">${i}</th>
                    <td onclick="showOrderedProduct(this)" data-bs-toggle="modal" data-bs-target="#modal">
                        <a href="#">${order.productName}</a>
                    </td>
                    <td>$${order.price}</td>
                    <td>${order.weight}q</td>
                    <td>${order.quantity}</td>
                    <td>$${order.totalAmount}</td>
                    <td>${order.totalWeight}q</td>
                    <td>${order.orderDate}</td>
                    <td>${order.username}</td>
                    <td><i class="fa-solid fa-trash" data-bs-toggle="modal" data-bs-target="#modal" style="color: #ff0000;" onclick="showOrderDelete(this)" order_id=${order.orderId}></i></td>   
                </tr>            
            `
        });
        order_data = data
    })
}

let order_id
function showOrderedProduct(x) {
    order_id = x.parentElement.getAttribute("order_id")
    order = order_data.find(item => item.orderId == order_id)
    modal.innerHTML = ""
    modal.innerHTML = `
        <div class="modal-dialog" >
            <div class="modal-content" >
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal_heading">Product Information</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Product Name</th>
                                <th scope="col">Category Name</th>
                                <th scope="col">Flavor Name</th>
                                <th scope="col">Ingredients</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${order.productName}</td>
                                <td>${order.categoryName}</td>
                                <td>${order.flavorName}</td>
                                <td>${order.ingredients}</td>            
                            </tr>
                        </tbody>
                    </table> 
                    <div class="p-2">
                        <p>${order.description}</p>
                    </div>
                    <div class="row row-cols-1 row-cols-md-2 g-4">
                        <div class="col">
                            <div class="card">
                                <img src="${order.mainImg}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Main Img</h5>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card">
                                <img src="${order.sideImg1}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Side Img 1</h5>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card">
                                <img src="${order.sideImg2}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Side Img 2</h5>
                                </div>
                            </div>
                        </div>
                        <div class="col">
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

//*********************************************************************************************************************************** */
var message_data
function getMessages(){
    deleteActive()
    Messagess_a.classList.add("activeA")
    home_p.innerHTML = ""
    thead.innerHTML = ""
    addButtonDiv.innerHTML = ""
    thead.innerHTML = `
        <tr>
            <th scope="col">#</th>
            <th scope="col">Commentor Name</th>
            <th scope="col">Commentor Surname</th>
            <th scope="col">Commentor Emai;</th>
            <th scope="col">Commentor Message</th>
            <th scope="col">Delete</th>
        </tr>
    `

    fetch("https://localhost:44341/api/home/GetMessages").then(response => response.json()).then(data => {
        let i = 0
        tbody.innerHTML = ""
        data.forEach(message => {
            i++
            tbody.innerHTML += `
                <tr>
                    <th scope="row">${i}</th>
                    <td>${message.name}</td>
                    <td>${message.surname}</td>
                    <td>${message.email}q</td>
                    <td><i class="fa-solid fa-file" message_id=${message.id} data-bs-toggle="modal" data-bs-target="#modal" onclick="getMessage(this)" style="color: #BC8157;"></i></td>
                    <td><i class="fa-solid fa-trash" data-bs-toggle="modal" data-bs-target="#modal" style="color: #ff0000;" onclick="showMessageDelete(this)" message_id=${message.id}></i></td>   
                </tr>            
            `
        });
        message_data = data
    })
}
let message_id

function getMessage(x) {
    message_id = x.getAttribute("message_id")
    message = message_data.find(item => item.id == message_id)
    modal_content.innerHTML = ""
    modal_content.innerHTML = `
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Message</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="descriptionModal_body">
            ${message.message1}
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>                      
    `
}

function showMessageDelete(x) {
    message_id = x.getAttribute("message_id")
    message = message_data.find(item => item.id == message_id)
    modal_content.innerHTML = ""
    modal_content.innerHTML = `
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">System Message</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="deleteModal_body">
            <p>Are you sure to delete, ${message.name}'s message ?</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deleteMessage()">Delete</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>                
    `
}

function deleteMessage() {
    fetch(`https://localhost:44341/api/home/DeleteMessage/${message_id}`,
        {
            method: "DELETE"
        }
    ).then(data => {
        getOrders();
    });
}