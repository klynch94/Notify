$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const confirmPassInput = $("input#confirmPass-input");
  const usernameInput = $("input#username-input");
  const neighborhoodInput = $("#neighborhood-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      username: usernameInput.val().trim(),
      neighborhood: neighborhoodInput.val()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    console.log(confirmPassInput.val());
    console.log(passwordInput.val());
    if (confirmPassInput.val() !== passwordInput.val()) {
      alert("Passwords do not match. Try again.");
      return;
    }

    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
    console.log(userData);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(userData) {
    $.post("/api/signup", {
      email: userData.email,
      password: userData.password,
      username: userData.username,
      neighborhood: userData.neighborhood
    })
      .then(() => {
        window.location.replace("/forum");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
