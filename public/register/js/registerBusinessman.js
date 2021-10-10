
function register() {
    let firstName = document.getElementById("FirstName").value;
    let lastName = document.getElementById("LastName").value;
    let city = document.getElementById("city").value;
    let address = document.getElementById("Address").value;
    let email = document.getElementById("Email").value;
    let repeatEmail = document.getElementById("Remail").value;
    let dateOfBirth = document.getElementById("DateOfBirth").value;
    let password = document.getElementById("Psw").value;
    let repeatPassword = document.getElementById("PswRepeat").value;
    let businessName = document.getElementById("BusinessName").value;
    let businessAddress = document.getElementById("BusinessAddress").value;
    let businessDescription = document.getElementById("BusinessDescription").value;
    let authorizedDealer = document.getElementById("AuthorizedDealer").value;
    let activeAccountPage = document.getElementById("ActiveAccountPage").value;
    let profitAndLoss = document.getElementById("ProfitAndLoss").value;
    let registrarOfCompanies = document.getElementById("RegistrarOfCompanies").value;
    let bookManagment = document.getElementById("BookManagment").value;
let y = password;
    if (y.length < 8) {
        alert("Your password needs a minimum of 8 characters")
        return false;
    }
    if (y.search(/[a-z]/) < 0) {
        alert("Your password needs a lower case letter")
        return false;
    }
    if (y.search(/[A-Z]/) < 0) {
        alert("Your password needs an uppser case letter")
        return false;
    }
    if (y.search(/[0-9]/) < 0) {
        alert("Your password needs a number")
        return false;
    }

    if(email !== repeatEmail){
        alert("email not good");
        return;
    }

    let date1= new Date(dateOfBirth)
    const now = new Date();

    function dateDiffInDays(a, b) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
      }

      let diffInYear = (dateDiffInDays(date1, now)/365);

      if(diffInYear < 18){
          alert("young");
          return;
      }
      
    let userObject = {
        firstName,
        lastName,
        city,
        address,
        email,
        repeatEmail,
        dateOfBirth,
        password,
        repeatPassword,
        businessName,
        businessAddress,
        businessDescription,
        authorizedDealer,
        activeAccountPage,
        profitAndLoss,
        registrarOfCompanies,
        bookManagment,
        type: "business"
    }

    fetch("/users/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "/users/",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(userObject)//convert an object to JSON respresentive string
    }).then(res => {
        res.json().then(response => {
            if (Math.floor(res.status / 100) !== 2) {
                alert("Error: " + response[0].message)
            } else {
                localStorage.setItem("token", response.token);
                getUserInformation();
            }
        }
        )
    }).catch(err => {
        console.log('err: ', err);
    })
}

function getUserInformation() {
    let g = fetch("/users/userInfo/", {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "/users/userInfo",
            "Access-Control-Allow-Credentials": true,
            "x-api-key": localStorage.getItem("token")
        },
    }).then(res => {
        res.json()
            .then(response => {
                if (Math.floor(res.status / 100) !== 2) {
                    alert("Error: " + response[0].message)
                } else {
                    localStorage.setItem("user", JSON.stringify(response.user));
                    window.location.href = "/profile/homesign.html";
                }
            }
            )
    }).catch(err => {
        console.log('err: ', err);
    })
    console.log(g);
}
