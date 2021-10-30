function load() {
  var wrapper1 = document.getElementById('businessName');
  var wrapper2 = document.getElementById('businessAddress');
  var wrapper3 = document.getElementById('businessDescription');

  let user = JSON.parse(localStorage.getItem("user"));

  let input1 = document.createElement("input");
  input1.id = "businessNameInput";
  input1.value = user.businessName;
  wrapper1.prepend(input1);

  let input2 = document.createElement("input");
  input2.id = "businessAddressInput";
  input2.value = user.businessAddress;
  wrapper2.prepend(input2);

  let input3 = document.createElement("input");
  input3.id = "businessDescriptionInput";
  input3.value = user.businessDescription;
  wrapper3.prepend(input3);

  var nameInput = document.getElementById('nameInput');

  nameInput.value = user.firstName;
}

function save() {
  let businessNameInput = document.getElementById("businessNameInput");
  let businessAddressInput = document.getElementById("businessAddressInput");
  let businessDescriptionInput = document.getElementById("businessDescriptionInput");
  let nameInput = document.getElementById("nameInput");

  let user = JSON.parse(localStorage.getItem("user"));

  user.businessName = businessNameInput.value;
  user.businessAddress = businessAddressInput.value;
  user.businessDescription = businessDescriptionInput.value;
  user.firstName = nameInput.value;
  
  fetch("/users/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "/users/",
      "Access-Control-Allow-Credentials": true,
      "x-api-key": localStorage.getItem("token")
    },
    body: JSON.stringify(user)//convert an object to JSON respresentive string
  }).then(res => {
    res.json().then(response => {
      if (Math.floor(res.status / 100) !== 2) {
        alert("Error: " + response[0].message)
      } else {
        localStorage.setItem("user", JSON.stringify(response.user))
      }
    }
    )
  }).catch(err => {
    console.log('err: ', err);
  })
}

setTimeout(() => {
  load();
}, 500);
