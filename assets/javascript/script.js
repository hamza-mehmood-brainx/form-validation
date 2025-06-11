const InitValidation= function () {
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

  function validateForm() {
    let isValid = true;

    // First Name
    const fnameValid = fields.fname.value.trim() !== "";
    validateField(fields.fname, fnameValid);
    isValid &= fnameValid;

    // Last Name
    const lnameValid = fields.lname.value.trim() !== "";
    validateField(fields.lname, lnameValid);
    isValid &= lnameValid;

    // Age
    const ageValue = parseInt(fields.age.value, 10);
    const ageValid = ageValue >= 18 && ageValue <= 151;
    validateField(fields.age, ageValid);
    isValid &= ageValid;

    // Emails
    const emailValid = fields.emails.value.trim() !== "" && validateEmailList(fields.emails.value);
    validateField(fields.emails, emailValid);
    isValid &= emailValid;

    // Password
    const pwdValid = validatePassword(fields.pwd.value);
    validateField(
      fields.pwd,
      pwdValid,
      "Password must be at least 8 characters, contain an uppercase, lowercase, and a number."
    );
    isValid &= pwdValid;

    // Confirm Password
    const cpwdValid = fields.cpwd.value === fields.pwd.value && fields.cpwd.value !== "";
    validateField(fields.cpwd, cpwdValid, "Passwords do not match.");
    isValid &= cpwdValid;

    // Contact Number
    const contactValue = fields.contact.value.trim();
    const contactValid =  /^[0-9]{11}$/.test(contactValue);
    validateField(fields.contact, contactValid, "Contact number must be exactly 11 digits.");
    isValid &= contactValid;

    submitBtn.disabled = !Boolean(isValid);
  }

//   Adding Event Listners for validation

  Object.values(fields).forEach(field => {
    field.addEventListener("input", validateForm);
    field.addEventListener("blur", validateForm);
  });

//   Form Submission Checking

  form.addEventListener("submit", function (e) {
    e.preventDefault(); 
    validateForm();
    if (!submitBtn.disabled) {
      alert("Form submitted successfully!");
    }
  });
};


InitValidation();