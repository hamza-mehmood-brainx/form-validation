const InitValidation = function () {
  const form = document.getElementById("userForm");
  const submitBtn = document.getElementById("submitBtn");

  const fields = {
    fname: document.getElementById("fname"),
    lname: document.getElementById("lname"),
    age: document.getElementById("age"),
    emails: document.getElementById("emails"),
    pwd: document.getElementById("pwd"),
    cpwd: document.getElementById("cpwd"),
    contact: document.getElementById("contact")
  };

  function validateEmailList(emailStr) {
    const emails = emailStr.split(",").map(e => e.trim());
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emails.every(email => emailRegex.test(email));
  }

  function validatePassword(pwd) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(pwd);
  }
// Validate field
  function validateField(field, isValid, message = "") {
    if (isValid) {
      field.classList.remove("is-invalid");
      field.classList.add("is-valid");
    } else {
      field.classList.add("is-invalid");
      field.classList.remove("is-valid");
      if (message) {
        field.nextElementSibling.textContent = message;
      }
    }
  }
// Validating single field
  function validateSingleField(fieldEl) {
    const id = fieldEl.id;
    let valid = true;

    switch (id) {
      case "fname":
      case "lname":
        valid = fieldEl.value.trim() !== "";
        validateField(fieldEl, valid);
        break;

      case "age":
        const age = parseInt(fieldEl.value, 10);
        valid = age >= 18 && age <= 151;
        validateField(fieldEl, valid);
        break;

      case "emails":
        valid = fieldEl.value.trim() !== "" && validateEmailList(fieldEl.value);
        validateField(fieldEl, valid);
        break;

      case "pwd":
        valid = validatePassword(fieldEl.value);
        validateField(fieldEl, valid, "Password must be at least 8 characters, contain an uppercase, lowercase, and a number.");
        validateSingleField(fields.cpwd);
        break;

      case "cpwd":
        valid = fieldEl.value === fields.pwd.value && fieldEl.value !== "";
        validateField(fieldEl, valid, "Passwords do not match.");
        break;

      case "contact":
        valid = /^[0-9]{11}$/.test(fieldEl.value.trim());
        validateField(fieldEl, valid, "Contact number must be exactly 11 digits.");
        break;
    }

    validateSubmitButton(); 
  }
// Submit Button Validation
  function validateSubmitButton() {
    const allValid = Object.values(fields).every(field => field.classList.contains("is-valid"));
    submitBtn.disabled = !allValid;
  }

  // Validate Whole Form
  function validateForm() {
    Object.values(fields).forEach(field => validateSingleField(field));
  }
// Adding EventListener to all fields
  Object.values(fields).forEach(field => {
    field.addEventListener("input", () => validateSingleField(field));
    field.addEventListener("blur", () => validateSingleField(field));
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    validateForm();
    if (!submitBtn.disabled) {
      alert("Form submitted successfully!");
    }
  });
};

InitValidation();