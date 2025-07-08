const idInput = document.getElementById('id');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const qtyInput = document.getElementById('qty');
const submitBtn = document.getElementById('submit');
const productBody = document.getElementById('product-body');

let editRow = null;

document.getElementById('product-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const id = idInput.value.trim();
  const name = nameInput.value.trim();
  const price = priceInput.value.trim();
  const qty = qtyInput.value.trim();

  if (!id || !name || !price || !qty) {
    alert("Please fill all fields!");
    return;
  }

  if (editRow) {
    
    editRow.cells[0].innerText = id;
    editRow.cells[1].innerText = name;
    editRow.cells[2].innerText = price;
    editRow.cells[3].innerText = qty;
    submitBtn.value = "Add Product";
    editRow = null;
  } else {

    addRow(id, name, price, qty);
  }

  clearForm();
});

function addRow(id, name, price, qty) {
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${id}</td>
    <td>${name}</td>
    <td>${price}</td>
    <td>${qty}</td>
    <td>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </td>
  `;

  // Delete
  row.querySelector('.delete-btn').addEventListener('click', () => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      row.remove();
      alert("Product deleted successfully.");
      clearForm();
    }
  });

  // Edit
  row.querySelector('.edit-btn').addEventListener('click', () => {
    idInput.value = row.cells[0].innerText;
    nameInput.value = row.cells[1].innerText;
    priceInput.value = row.cells[2].innerText;
    qtyInput.value = row.cells[3].innerText;
    submitBtn.value = "Save Changes";
    editRow = row;
  });

  productBody.appendChild(row);
}

function clearForm() {
  idInput.value = '';
  nameInput.value = '';
  priceInput.value = '';
  qtyInput.value = '';
  submitBtn.value = "Add Product";
  editRow = null;
}
