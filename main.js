const btnLoginNow = document.querySelector(".btn_login_now");
const input = document.querySelectorAll(".input");

const regEx = /\S+@\S+\.\S+/;

const inputEmail = document.querySelector(`input[type='email']`);
const inputPassword = document.querySelector(`input[type='password']`);
const inputRadio = document.querySelector(`input[type='checkbox']`);

document.addEventListener("DOMContentLoaded", () => {
  inputEmail.value = localStorage.getItem("email");
  inputPassword.value = localStorage.getItem("password");
  inputRadio.checked = localStorage.getItem("radio");
});

inputRadio.addEventListener("change", rememberMe);

btnLoginNow.addEventListener("click", () => {
  const valueArr = [];
  const textElement = document.body.querySelector(".text");

  input.forEach((item) => {
    if (item.value) {
      valueArr.push(item.value);
    }
  });

  if (valueArr.length === input.length) {
    if (!validationEmail(inputEmail.value)) {
      inputError("The email is incorrect", textElement);
    }
    else if (inputPassword.value > 6) {
      inputError("The password must be more than 6 characters", textElement);
    } else {
      inputSuccessfully(textElement);
      rememberMe();
    }
  } else {
    inputError("Empty string", textElement);
  }
});

function validationEmail(value) {
  return regEx.test(value);
}

function inputError(error, textElement) {
  let text = textElement || document.createElement("p");
  text.classList.add("text");
  text.textContent = error;
  btnLoginNow.before(text);
  input.forEach((item) => {
    item.style.border = "1px solid red";
  });
}

function inputSuccessfully(textElement) {
  textElement ? textElement.remove() : null;
  input.forEach((item) => {
    item.style.border = "1px solid #e8e8e8";
  });
  alert("Everything went well");
}

function rememberMe() {
  if (inputRadio.checked) {
    localStorage.setItem("email", inputEmail.value);
    localStorage.setItem("password", inputPassword.value);
    localStorage.setItem("radio", inputRadio.checked);
  } else {
    localStorage.clear();
  }
}
