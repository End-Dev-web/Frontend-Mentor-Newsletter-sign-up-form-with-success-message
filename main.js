// import "./sass/main.scss";

const form = document.querySelector("[data-form]");
const emailEl = document.querySelector("[data-email]");
const submit = document.querySelector("[data-submit]");
const successEl = document.querySelector("[data-success]");

let valid = false;
const checkEmail = () => {
  const email = emailEl.value.trim();

  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be empty");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Valid email required");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

const isRequired = (value) => (value === "" ? false : true);

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");

  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.add("success");
  formField.classList.remove("error");

  const error = formField.querySelector("small");
  error.textContent = "";
};

const validEl = () => {
  if (valid === true) {
    successEl.innerHTML = `
    <div class="card">
          <div class="card-details padding-block-7 padding-inline-7">
            <img
              src="/assets/images/icon-success.svg"
              alt="icon-success"
              class="padding-block-end-9" />
            <h2 class="heading-2">Thanks for subscribing!</h2>
            <p class="padding-block-5">
              A confirmation email has been sent to
              <b>${emailEl.value}.</b> Please open it and click the button
              inside to confirm your subscription.
            </p>
            <form action="#" class="padding-block-start-7">
              <input type="submit" value="Dismiss message" data-confirme />
            </form>
          </div>
        </div>
    `;
    emailEl.value = "";
    submit.style.visibility = "hidden"; // visibility: hidden
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkEmail();
  validEl();
});

form.addEventListener("input", function (e) {
  switch (e.target.id) {
    case "email":
      checkEmail();
      break;
  }
});
