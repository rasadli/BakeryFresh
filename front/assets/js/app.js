window.addEventListener("scroll", function () {
    var header = document.querySelector(".header");
    if (window.scrollY >= 50) {
        header.classList.add("sticky");
        changed_logo.src = "https://htmldemo.net/bakerfresh/bakerfresh/assets/images/logo.svg"
        document.querySelectorAll(".color_changers").forEach(item => {
            item.classList.add("changed_color")
        })
        document.querySelectorAll(".color_changers2").forEach(item => {
            item.classList.add("changed_color2")
        })
    } else {
        header.classList.remove("sticky");
        changed_logo.src = "https://htmldemo.net/bakerfresh/bakerfresh/assets/images/logo-white.svg"
        document.querySelectorAll(".color_changers").forEach(item => {
            item.classList.remove("changed_color")
        })
        document.querySelectorAll(".color_changers2").forEach(item => {
            item.classList.remove("changed_color2")
        })
    }
});

document.querySelectorAll(".fa-e1").forEach(element => {
    element.addEventListener("click", function () {
        element.classList.toggle("fa-eye");
        element.classList.toggle("fa-eye-slash");
        document.querySelectorAll(".pas_inp1").forEach(item => {
            if (item.getAttribute("type") == "password") {
                item.setAttribute("type", "text");
            }
            else {
                item.setAttribute("type", "password");
            }
        })
    })
})

document.querySelectorAll(".fa-e2").forEach(element => {
    element.addEventListener("click", function () {
        element.classList.toggle("fa-eye");
        element.classList.toggle("fa-eye-slash");
        document.querySelectorAll(".pas_inp2").forEach(item => {
            if (item.getAttribute("type") == "password") {
                item.setAttribute("type", "text");
            }
            else {
                item.setAttribute("type", "password");
            }
        })
    })
})

const Profiles = document.querySelectorAll(".my_profile")
Profiles.forEach(profile => {
    if (localStorage.getItem("User_ID") != null) {
        let id = localStorage.getItem("User_ID")
        profile.href = `http://127.0.0.1:5500/pages/profile.html?user_id=${id}`
    } else {
        profile.href = "http://127.0.0.1:5500/pages/sign_in.html"
    }
})

const Carts = document.querySelectorAll(".my_cart")
Carts.forEach(cart => {
    if (localStorage.getItem("User_ID") != null) {
        let id = localStorage.getItem("User_ID")
        cart.href = `http://127.0.0.1:5500/pages/cart.html?user_id=${id}`
    } else {
        cart.href = "http://127.0.0.1:5500/pages/sign_in.html"
    }
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

function sendComment() {
    let b = true
    document.querySelectorAll(".cmmnt").forEach(item => {
        item.value.trim()
        if (item.value == "") {
            b = false
        }
    })
    if (b) {
        let name = commentorName.value.trim()
        let surname = commentorSurname.value.trim()
        let email = commentorEmail.value.trim()
        let message = commentorMessage.value.trim()

        var n_message = {
            name: name,
            surname: surname,
            email: email,
            message1: message
        }
        fetch("https://localhost:44341/api/home/AddMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(n_message)
        }).then(data => {
            console.log(data);
            alert("Your message was sended successfuly")
        })
        document.querySelectorAll(".cmmnt").forEach(item => {
            item.value=""
        })
    } else {
        alert("Insert all data")
    }

}