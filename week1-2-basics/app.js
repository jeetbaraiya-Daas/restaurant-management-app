// Week 2: Store food items in a JavaScript array and perform CRUD
let foods = [
  {
    name: "Truffle & Wild Mushroom Arancini",
    price: 420,
    category: "Starters",
    description: "Crispy risotto spheres stuffed with porcini and aged parmesan."
  },
  {
    name: "Charred Burrata & Heirloom Tomato",
    price: 480,
    category: "Starters",
    description: "Fresh artisanal burrata with basil oil and sourdough."
  },
  {
    name: "Smoked Paprika Paneer Steak",
    price: 560,
    category: "Wood-Fired Mains",
    description: "Wood-fired cottage cheese steak with herb butter."
  }
];

const foodForm = document.getElementById("foodForm");
const foodTableBody = document.getElementById("foodTableBody");
const itemCount = document.getElementById("itemCount");
const editIndexInput = document.getElementById("editIndex");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

// Validate form fields
function validateForm(name, price, category, desc) {
  let isValid = true;
  document.getElementById("nameError").textContent = "";
  document.getElementById("priceError").textContent = "";
  document.getElementById("categoryError").textContent = "";
  document.getElementById("descError").textContent = "";

  if (!name || name.trim().length < 3) {
    document.getElementById("nameError").textContent = "Food name must be at least 3 characters.";
    isValid = false;
  }
  if (!price || Number(price) <= 0) {
    document.getElementById("priceError").textContent = "Enter a valid price greater than 0.";
    isValid = false;
  }
  if (!category) {
    document.getElementById("categoryError").textContent = "Please select a food category.";
    isValid = false;
  }
  if (!desc || desc.trim().length < 10) {
    document.getElementById("descError").textContent = "Description must be at least 10 characters.";
    isValid = false;
  }
  return isValid;
}

// Render array data into HTML Table
function renderTable() {
  foodTableBody.innerHTML = "";
  itemCount.textContent = foods.length;

  foods.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td><strong>${item.name}</strong></td>
      <td>${item.category}</td>
      <td>₹${Number(item.price).toFixed(2)}</td>
      <td>${item.description}</td>
      <td>
        <button class="action-btn edit-btn" onclick="editFood(${index})">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteFood(${index})">Delete</button>
      </td>
    `;
    foodTableBody.appendChild(row);
  });
}

// Handle Form Submit (Add or Update)
foodForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("foodName").value;
  const price = document.getElementById("foodPrice").value;
  const category = document.getElementById("foodCategory").value;
  const description = document.getElementById("foodDesc").value;
  const editIndex = parseInt(editIndexInput.value, 10);

  if (!validateForm(name, price, category, description)) return;

  const foodData = {
    name: name.trim(),
    price: parseFloat(price),
    category,
    description: description.trim()
  };

  if (editIndex === -1) {
    foods.push(foodData);
  } else {
    foods[editIndex] = foodData;
    resetFormMode();
  }

  foodForm.reset();
  renderTable();
});

// Populate form for editing
window.editFood = function (index) {
  const item = foods[index];
  document.getElementById("foodName").value = item.name;
  document.getElementById("foodPrice").value = item.price;
  document.getElementById("foodCategory").value = item.category;
  document.getElementById("foodDesc").value = item.description;
  editIndexInput.value = index;

  formTitle.textContent = "Edit Food Item";
  submitBtn.textContent = "Update Item";
  cancelBtn.classList.remove("hidden");
};

// Delete item from array
window.deleteFood = function (index) {
  if (confirm(`Remove "${foods[index].name}" from the menu?`)) {
    foods.splice(index, 1);
    renderTable();
  }
};

function resetFormMode() {
  editIndexInput.value = "-1";
  formTitle.textContent = "Add Food Item";
  submitBtn.textContent = "Save Food Item";
  cancelBtn.classList.add("hidden");
}

cancelBtn.addEventListener("click", function () {
  foodForm.reset();
  resetFormMode();
});

// Initial table load
renderTable();
