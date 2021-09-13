function setUserToUI(){
    let user = JSON.parse(localStorage.getItem("user"));
    let userNameSpan = document.getElementById('username');

    userNameSpan.innerText += user.firstName;
}