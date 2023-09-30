function sign_in(event) {
    event.preventDefault()

    let inserted_username = document.querySelector("#username_inp").value
    let inserted_password = document.querySelector("#password_inp").value

    var inserted_user = {
        username: inserted_username,
        password: inserted_password
    }

    fetch("https://localhost:44341/api/home/CheckUser",
        {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(inserted_user)
        }
    ).then(response => response.json()).then(data => {
        if (data.user != null) {
            if (data.user.userStatus != 2) {
                window.location.href = `admin.html?user_id=${data.user.userId}`
            } else {
                let user_id = data.user.userId
                localStorage.setItem("User_ID",user_id)
                window.location.href = `profile.html?user_id=${data.user.userId}`
            }
        }
        else {
            alert(data.message)
        }
    })
}



