// JavaScript to handle modal data fetching
document.addEventListener("click", function (event) {
  if (event.target.closest('.btn-primary[data-bs-toggle="modal"]')) {
    const card = event.target.closest(".card");
    const modal = document.querySelector("#bookModal");

    // Fetch data from card
    const title = card.getAttribute("data-title");
    const price = card.getAttribute("data-price");
    const originalPrice = card.getAttribute("data-original-price");
    const author = card.getAttribute("data-author");
    const publisher = card.getAttribute("data-publisher");
    const isbn = card.getAttribute("data-isbn");
    const summary = card.getAttribute("data-summary");
    const imgSrc = card.getAttribute("data-img");

    // Populate modal
    modal.querySelector("#bookModalLabel").textContent = title;
    modal.querySelector("#modalPrice").textContent = price;
    modal.querySelector("#modalOriginalPrice").textContent = originalPrice;
    modal.querySelector("#modalAuthor").textContent = author;
    modal.querySelector("#modalPublisher").textContent = publisher;
    modal.querySelector("#modalISBN").textContent = isbn;
    modal.querySelector("#modalSummary").textContent = summary;
    modal.querySelector("#modalImage").src = imgSrc;
  }
});

//   shopping card section js code here
let cartItems = [];
const cartCountBadge = document.getElementById("cartCount");
const cartModalBody = document.getElementById("cartItems");
const checkoutButton = document.querySelector(".btn-checkout");

// Function to update cart count
function updateCartCount() {
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  cartCountBadge.textContent = itemCount;
}

// Function to render cart items in modal
function renderCartItems() {
  cartModalBody.innerHTML = "";
  if (cartItems.length === 0) {
    cartModalBody.innerHTML = '<p class="text-center">Your cart is empty.</p>';
    return;
  }

  cartItems.forEach((item, index) => {
    const cartRow = `
      <div class="row mb-3 border-bottom pb-3">
        <div class="col-3">
          <img src="${item.image}" alt="${item.title}" class="img-fluid rounded shadow-lg" style="height: 100px; object-fit: cover;">
        </div>
        <div class="col-6">
          <h6>${item.title}</h6>
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span>Price: $${item.price}</span>
            <span>Quantity: ${item.quantity}</span>
          </div>
        </div>
        <div class="col-3 d-flex align-items-center justify-content-end">
          <button class="btn btn-danger btn-sm me-2" onclick="removeItem(${index})">Remove</button>
          <input type="number" class="form-control form-control-sm" value="${item.quantity}" min="1" style="width: 60px;" onchange="updateQuantity(${index}, this.value)">
        </div>
      </div>
    `;
    cartModalBody.innerHTML += cartRow;
  });

  // Calculate total
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Add total and amount at the bottom (with Total on the left and amount on the right)
  cartModalBody.innerHTML += `
    <div class="d-flex justify-content-between align-items-center mt-3 border-top pt-3">
      <strong>Total:</strong>
      <span>$${totalAmount.toFixed(2)}</span>
    </div>
  `;
}

// Function to remove item from cart
function removeItem(index) {
  cartItems.splice(index, 1);
  updateCartCount();
  renderCartItems();
}

// Function to update item quantity
function updateQuantity(index, quantity) {
  const newQuantity = Math.max(1, parseInt(quantity));
  cartItems[index].quantity = newQuantity;
  updateCartCount();
  renderCartItems();
}

// Add to Cart Button Functionality
document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const title = this.dataset.title;
    const price = parseFloat(this.dataset.price);
    const image = this.dataset.image;

    const existingItem = cartItems.find((item) => item.title === title);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ title, price, image, quantity: 1 });
    }

    updateCartCount();
  });
});

// Render cart items when modal is shown
document
  .getElementById("shoppingCartModal")
  .addEventListener("show.bs.modal", renderCartItems);

// Initialize cart count
updateCartCount();

// Handle Checkout Button Click
checkoutButton.addEventListener("click", function () {
  // Show Thank You Message
  alert("Thank you for your purchase!");

  // Reset the cart
  cartItems = [];
  updateCartCount();
  renderCartItems();

  // Optionally, close the modal after checkout
  const shoppingCartModal = new bootstrap.Modal(
    document.getElementById("shoppingCartModal")
  );
  shoppingCartModal.hide();
});
