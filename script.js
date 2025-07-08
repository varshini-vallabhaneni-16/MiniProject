let products = [];
let editIndex = null;


const form = document.getElementById('product-form');
const displayBtn = document.getElementById('Display');
const addBtn = document.getElementById('add-btn');
const updateBtn = document.getElementById('update-btn');
const productBody = document.getElementById('product-body');


form.addEventListener('submit', function (e) {
  e.preventDefault();

  const id = document.getElementById('id').value;
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const qty = document.getElementById('qty').value;

  if (editIndex === null) {

    products.push({ id, name, price, qty });
  } else {
    
    products[editIndex] = { id, name, price, qty };
    editIndex = null;
    addBtn.style.display = 'inline';
    updateBtn.style.display = 'none';
  }

  form.reset();
  displayProducts();
});


function displayProducts() {
  productBody.innerHTML = '';

  products.forEach((product, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.qty}</td>
      <td>
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Delete</button>
      </td>
    `;
    productBody.appendChild(row);
  });
}


displayBtn.addEventListener('click', displayProducts);


window.editProduct = function (index) {
  const product = products[index];
  document.getElementById('id').value = product.id;
  document.getElementById('name').value = product.name;
  document.getElementById('price').value = product.price;
  document.getElementById('qty').value = product.qty;

  editIndex = index;
  addBtn.style.display = 'none';
  updateBtn.style.display = 'inline';
};


window.deleteProduct = function (index) {
  if (confirm("Are you sure you want to delete this product?")) {
    products.splice(index, 1);
    displayProducts();
  }
};
