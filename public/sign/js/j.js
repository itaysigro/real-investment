const base64 = require('base-64');

function login() {
    let username = 'user';
    let password = 'passwd';

    let headers = new Headers();

    headers.append('Authorization', 'Basic' + base64.encode(username + ":" + password));

    fetch("/users/userInfo",
        {
            method: 'GET',
            headers: headers,
        })
        .then(response => response.json())
        .then(json => console.log(json));
}