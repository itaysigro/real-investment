function register() {

    let businessName = document.getElementById("BusinessName").value;
    let businessAddress = document.getElementById("BusinessAddress").value;
    let businessEmail = document.getElementById("BusinessEmail").value;
    let businessDescription = document.getElementById("BusinessDescription").value;
    let authorizedDealer = document.getElementById("AuthorizedDealer").value;
    let activeAccountPage = document.getElementById("ActiveAccountPage").value;
    let profitAndLoss = document.getElementById("ProfitAndLoss").value;
    let registrarOfCompanies = document.getElementById("RegistrarOfCompanies").value;
    let bookManagment = document.getElementById("BookManagment").value;




    let userObject = {
        businessName,
        businessAddress,
        businessEmail,
        businessDescription,
        authorizedDealer,
        activeAccountPage,
        profitAndLoss,
        registrarOfCompanies,
        bookManagment
    }

    fetch("/users/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObject)//convert an object to JSON respresentive string
    }).then(res => {
        res.json().then(response => {
            if (Math.floor(res.status / 100) !== 2) {
                alert("Error: " + response[0].message)
            } else {
                console.log('success: ', response)
            }
        }
        )
    }).catch(err => {
        console.log('err: ', err);
    })
}

