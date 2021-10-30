
function register() {
  removeErrors();

  let firstName = document.getElementById("FirstName").value;
  let lastName = document.getElementById("LastName").value;
  let city = document.getElementById("city").value;
  let address = document.getElementById("Address").value;
  let email = document.getElementById("Email").value;
  let repeatEmail = document.getElementById("Remail").value;
  let dateOfBirth = document.getElementById("DateOfBirth").value;
  let password = document.getElementById("Psw").value;
  let repeatPassword = document.getElementById("PswRepeat").value;
  let activeAccountPage = document.getElementById("ActiveAccountPage").value;
  let backYearOperationsInAccount = document.getElementById("BackYearOperationsInAccount").value;
  let checkloans = document.getElementById("Checkloans").value;

  let y = password;

  if (firstName.length < 2) {
    createErrorMessage(document.getElementById("FirstName"), "Must be at least 2 characters.");
    return false;
  }

  if (lastName.length < 2) {
    createErrorMessage(document.getElementById("LastName"), "Must be at least 2 characters.");
    return false;
  }

  if (city.length < 2) {
    createErrorMessage(document.getElementById("city"), "City is required.");
    return false;
  }

  if (address.length < 2) {
    createErrorMessage(document.getElementById("Address"), "Address is required.");
    return false;
  }

  if (email.length < 2) {
    createErrorMessage(document.getElementById("Email"), "Email is required.");
    return false;
  }

  if (y.length < 3) {
    createErrorMessage(document.getElementById("Psw"), "Password must contain uppercase, lowercase and numbers.");
    return false;
  }

  if (y.search(/[a-z]/) < 0) {
    createErrorMessage(document.getElementById("Psw"), "Password must contain uppercase, lowercase and numbers.")
    return false;
  }
  if (y.search(/[A-Z]/) < 0) {
    createErrorMessage(document.getElementById("Psw"), "Password must contain uppercase, lowercase and numbers.")
    return false;
  }
  if (y.search(/[0-9]/) < 0) {
    createErrorMessage(document.getElementById("Psw"), "Password must contain uppercase, lowercase and numbers.")
    return false;
  }

  if (password !== repeatPassword) {
    createErrorMessage(document.getElementById("PswRepeat"), "Password and repeat password must match.")
    return false;
  }

  if (email !== repeatEmail) {
    createErrorMessage(document.getElementById("Remail"), "Email and repeat email must match.")
    return false;
  }

  if (dateOfBirth.length < 2) {
    createErrorMessage(document.getElementById("DateOfBirth"), "DateOfBirth is required.")
    return false;
  }

  if (activeAccountPage.length < 2) {
    createErrorMessage(document.getElementById("ActiveAccountPage"), "ActiveAccountPage is required.")
    return false;
  }

  if (backYearOperationsInAccount.length < 2) {
    createErrorMessage(document.getElementById("BackYearOperationsInAccount"), "BackYearOperationsInAccount is required.")
    return false;
  }

  if (checkloans.length < 2) {
    createErrorMessage(document.getElementById("Checkloans"), "Checkloans is required.")
    return false;
  }

  let date1 = new Date(dateOfBirth)
  const now = new Date();

  function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  let diffInYear = (dateDiffInDays(date1, now) / 365);

  if (diffInYear < 18) {
    createErrorMessage(document.getElementById("DateOfBirth"), "You must be at least 18 years old.");
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
    activeAccountPage,
    backYearOperationsInAccount,
    checkloans,
    type: "invesment"
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

function createErrorMessage(input, message) {
  input.classList.add("is-invalid");
  let errorDiv = document.createElement("div");
  errorDiv.classList.add("invalid-feedback");
  errorDiv.innerHTML = message;
  input.parentElement.appendChild(errorDiv);
}

function removeErrors() {
  let oldError = document.querySelectorAll(".invalid-feedback");
  for (let i = 0; i < oldError.length; i++) {
    oldError[i].remove();
  }

  let markedInputs = document.querySelectorAll(".is-invalid");
  for (let i = 0; i < markedInputs.length; i++) {
    markedInputs[i].classList.remove("is-invalid")
  }
}