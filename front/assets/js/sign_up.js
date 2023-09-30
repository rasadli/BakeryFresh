

function addUser() {
    const necessaryInputs = document.querySelectorAll('.necessary');

    let hasEmptyInput = false;

    necessaryInputs.forEach(input => {
        if (input.value.trim() === '') {
            hasEmptyInput = true;
            return;
        }
    });

    if (hasEmptyInput) {
        alert('Insert all necessary data');
    } else {
        if (nPassword.value == nPassword_repeat.value) {
            let n_FirstName = nFirstName.value
            let n_SecondName = nSecondName.value
            let n_Username = nUsername.value
            let n_Email = nEmail.value
            let n_Password = nPassword.value
            let n_Adress = nAdress.value
            let n_PhoneNumber = nPhoneNumber.value
            let n_UserStatus = 2

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
            console.log(n_User);
            fetch("https://localhost:44341/api/home/AddUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(n_User)
            }
            ).then(response => response.json()).then(data => {
                if (data) {
                    window.location.href = "sign_in.html"
                    alert("Compleated")
                } else {
                    alert("Username or email has already taken")
                }
            });
        } else {
            alert("confirm your password")
        }
    }
}