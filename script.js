const USER_DATA_KEY = "user_data";

function showRegisterForm() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  loginForm.style.display = "none";
  registerForm.style.display = "block";
}

function showLoginForm() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  loginForm.style.display = "block";
  registerForm.style.display = "none";
}

function saveUserDataToLocalStorage(userData) {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
}

function getSavedUserDataFromLocalStorage() {
  const userDataString = localStorage.getItem(USER_DATA_KEY);
  return userDataString ? JSON.parse(userDataString) : null;
}

async function register() {
  const username = document.getElementById("registerUsername").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const registerSpinner = document.getElementById("loginSpinner");

  if (!username || !email || !password) {
    alert("Please enter valid username, email, and password.");
    return;
  }

  registerSpinner.style.display = "inline-block";

  try {
    saveUserDataToLocalStorage({ username, email, password });
    registerSpinner.style.display = "none";

    console.log("Registration successful:", username, email, password);
    alert("Registration successful! Please log in.");
    showLoginForm();
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Error during registration. Please try again.");
  }
}

async function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const loginSpinner = document.getElementById("loginSpinner");

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  loginSpinner.style.display = "inline-block";

  try {
    const storedUserData = getSavedUserDataFromLocalStorage();

    if (
      storedUserData &&
      storedUserData.username === username &&
      storedUserData.password === password
    ) {
      loginSpinner.style.display = "none";

      console.log("Login successful. Redirecting to dashboard.");
      window.location.href = "./dashboard.html";
    } else {
      loginSpinner.style.display = "none";

      const errorContainer = document.getElementById("loginError");
      errorContainer.textContent =
        "Invalid username or password. Please try again.";
      errorContainer.style.color = "red";
      document.getElementById("loginPassword").value = "";
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Error during login. Please try again.");
  }
}
