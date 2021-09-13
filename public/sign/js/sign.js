function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let logi = {
        email,
        password
    }

    fetch("/users/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3020/users/",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(logi)//convert an object to JSON respresentive string
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

function getUserInformation(){
    fetch("/users/userInfo", {
       method: "get",
       headers: {
           "Content-Type": "application/json",
           "Access-Control-Allow-Origin": "http://localhost:3020/users/",
           "Access-Control-Allow-Credentials": true,
           "x-api-key": localStorage.getItem("token")
       },
   }).then(res => {
       res.json().then(response => {
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
}