const USER_DATA_KEY = "user_data";
let propertyList = [];
let selectedProperty = null;

function saveUserDataToLocalStorage(userData) {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
}

function getUserDataFromLocalStorage() {
  const userDataString = localStorage.getItem(USER_DATA_KEY);
  return userDataString ? JSON.parse(userDataString) : null;
}

let currentUser = "Sir";

function displayUser() {
  const loggedInUser = document.getElementById("loggedInUser");

  const userData = getUserDataFromLocalStorage();

  if (userData && userData.username) {
    currentUser = userData.username;
  }

  loggedInUser.textContent = `Welcome, ${currentUser}!`;
}

function displayPropertyList() {
  const propertyListElement = document.getElementById("propertyList");
  propertyListElement.innerHTML = "";

  for (const property of propertyList) {
    const listItem = document.createElement("li");
    listItem.textContent = property.name;

    listItem.addEventListener("click", () => showPropertyDetails(property));

    listItem.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      editProperty(property);
    });

    propertyListElement.appendChild(listItem);
  }
}

function toggleForm() {
  const addPropertyForm = document.getElementById("addPropertyForm");
  addPropertyForm.style.display =
    addPropertyForm.style.display === "none" ? "block" : "none";
}

function addProperty() {
  const propertyName = document.getElementById("propertyName").value;
  const propertyImage = document.getElementById("propertyImage").value;
  const propertyLocation = document.getElementById("propertyLocation").value;
  const propertyPrice = document.getElementById("propertyPrice").value;
  const propertyDescription = document.getElementById(
    "propertyDescription"
  ).value;

  if (
    !propertyName ||
    !propertyImage ||
    !propertyLocation ||
    !propertyPrice ||
    !propertyDescription
  ) {
    alert("Please fill out all fields");
    return;
  }

  const newProperty = {
    name: propertyName,
    image: propertyImage,
    location: propertyLocation,
    price: propertyPrice,
    description: propertyDescription,
  };

  propertyList.push(newProperty);

  displayPropertyList();
  clearFormFields("addPropertyForm");
  toggleForm();
}

function clearFormFields(formId) {
  const form = document.getElementById(formId);
  const formInputs = form.querySelectorAll("input, textarea");
  formInputs.forEach((input) => (input.value = ""));
}

function showPropertyDetails(property) {
  const propertyDetails = document.getElementById("propertyDetails");
  const propertyDetailsImage = document.getElementById("propertyDetailsImage");
  const propertyDetailsName = document.getElementById("propertyDetailsName");
  const propertyDetailsLocation = document.getElementById(
    "propertyDetailsLocation"
  );
  const propertyDetailsPrice = document.getElementById("propertyDetailsPrice");
  const propertyDetailsDescription = document.getElementById(
    "propertyDetailsDescription"
  );

  if (!property) {
    propertyDetails.style.display = "none";
    return;
  }

  propertyDetailsImage.src = property.image;
  propertyDetailsImage.alt = property.name;

  propertyDetailsName.textContent = `Name: ${property.name}`;
  propertyDetailsLocation.textContent = `Location: ${property.location}`;
  propertyDetailsPrice.textContent = `Price: $${property.price}`;
  propertyDetailsDescription.textContent = `Description: ${property.description}`;

  propertyDetails.style.display = "block";
}

function updateProperty() {
  if (!selectedProperty) {
    alert("No property selected for update");
    return;
  }

  const updatedPropertyName = document.getElementById("editPropertyName").value;
  const updatedPropertyImage =
    document.getElementById("editPropertyImage").value;
  const updatedPropertyLocation = document.getElementById(
    "editPropertyLocation"
  ).value;
  const updatedPropertyPrice =
    document.getElementById("editPropertyPrice").value;
  const updatedPropertyDescription = document.getElementById(
    "editPropertyDescription"
  ).value;

  if (
    !updatedPropertyName ||
    !updatedPropertyImage ||
    !updatedPropertyLocation ||
    !updatedPropertyPrice ||
    !updatedPropertyDescription
  ) {
    alert("Please fill out all fields");
    return;
  }

  selectedProperty.name = updatedPropertyName;
  selectedProperty.image = updatedPropertyImage;
  selectedProperty.location = updatedPropertyLocation;
  selectedProperty.price = updatedPropertyPrice;
  selectedProperty.description = updatedPropertyDescription;

  showPropertyDetails(selectedProperty);

  displayPropertyList();

  saveUserDataToLocalStorage({
    username: currentUser,
    properties: propertyList,
  });
}


function editProperty(property) {
  const editPropertyForm = document.getElementById("editPropertyForm");
  const propertyDetails = document.getElementById("propertyDetails");

  if (property) {
    selectedProperty = property;
    propertyDetails.style.display = "none";
    document.getElementById("editPropertyName").value = selectedProperty.name;
    document.getElementById("editPropertyImage").value = selectedProperty.image;
    document.getElementById("editPropertyLocation").value =
      selectedProperty.location;
    document.getElementById("editPropertyPrice").value = selectedProperty.price;
    document.getElementById("editPropertyDescription").value =
      selectedProperty.description;
  } else {
    selectedProperty = null;
    propertyDetails.style.display = "none";
    editPropertyForm.style.display = "block";
  }
}

function cancelEdit() {
  const editPropertyForm = document.getElementById("editPropertyForm");
  const propertyDetails = document.getElementById("propertyDetails");
  propertyDetails.style.display = "block";
  editPropertyForm.style.display = "none";
}

function deleteProperty() {
  if (propertyList.length === 0) {
    console.error("No properties available for deletion");
    return;
  }

  propertyList.splice(0, 1);

  selectedPropertyIndex = -1;

  displayPropertyList();

  const propertyDetails = document.getElementById("propertyDetails");
  propertyDetails.style.display = "none";
}

deleteProperty();

function searchProperty() {}

function logout() {
  window.location.href = "index.html";
}

displayUser();
displayPropertyList();
