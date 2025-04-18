'use strict';

/**
 * Navbar toggle
 */
const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElems = [overlay, navOpenBtn, navCloseBtn];

for (let i = 0; i < navElems.length; i++) {
  navElems[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}

/**
 * Header & go top btn active on page scroll
 */
const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 80) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

/**
 * User modals
 */
const userBtn = document.querySelector("#user-btn");
const userModal = document.querySelector("#user-modal");
const closeUserModal = document.querySelector("#close-user-modal");
const loginModal = document.querySelector("#login-modal");
const closeLoginModal = document.querySelector("#close-login-modal");
const signupModal = document.querySelector("#signup-modal");
const closeSignupModal = document.querySelector("#close-signup-modal");
const changePasswordModal = document.querySelector("#change-password-modal");
const closeChangePasswordModal = document.querySelector("#close-change-password-modal");
const profileModal = document.querySelector("#profile-modal");
const closeProfileModal = document.querySelector("#close-profile-modal");

const loginForm = document.querySelector("#login-form");
const signupForm = document.querySelector("#signup-form");
const changePasswordForm = document.querySelector("#change-password-form");
const profileForm = document.querySelector("#profile-form");

const openLogin = document.querySelector("#open-login");
const openSignup = document.querySelector("#open-signup");
const openChangePassword = document.querySelector("#open-change-password");
const openProfile = document.querySelector("#open-profile");
const logoutBtn = document.querySelector("#logout");

// New modal elements
const quickViewModal = document.querySelector("#quick-view-modal");
const closeQuickViewModal = document.querySelector("#close-quick-view-modal");
const cartModal = document.querySelector("#cart-modal");
const closeCartModal = document.querySelector("#close-cart-modal");
const wishlistModal = document.querySelector("#wishlist-modal");
const closeWishlistModal = document.querySelector("#close-wishlist-modal");
const compareModal = document.querySelector("#compare-modal");
const closeCompareModal = document.querySelector("#close-compare-modal");
const clearCompareBtn = document.querySelector("#clear-compare");

const wishlistBtn = document.querySelector("#wishlist-btn");
const cartBtn = document.querySelector("#cart-btn");
const wishlistBadge = document.querySelector("#wishlist-badge");
const cartBadge = document.querySelector("#cart-badge");

// Helper function to close all modals
function closeAllModals() {
  userModal.classList.remove("active");
  loginModal.classList.remove("active");
  signupModal.classList.remove("active");
  changePasswordModal.classList.remove("active");
  profileModal.classList.remove("active");
  quickViewModal.classList.remove("active");
  cartModal.classList.remove("active");
  wishlistModal.classList.remove("active");
  compareModal.classList.remove("active");
  overlay.classList.remove("active");
}

// Update user action buttons based on login state
function updateUserActions() {
  const isLoggedIn = localStorage.getItem("loggedInUser");
  if (isLoggedIn) {
    openLogin.style.display = "none";
    openSignup.style.display = "none";
    openChangePassword.style.display = "block";
    openProfile.style.display = "block";
    logoutBtn.style.display = "block";
    userBtn.querySelector("ion-icon").setAttribute("name", "person-circle-outline");
  } else {
    openLogin.style.display = "block";
    openSignup.style.display = "block";
    openChangePassword.style.display = "none";
    openProfile.style.display = "none";
    logoutBtn.style.display = "none";
    userBtn.querySelector("ion-icon").setAttribute("name", "person-outline");
  }
}

// Load profile data
function loadProfile() {
  const profile = JSON.parse(localStorage.getItem("userProfile")) || {};
  document.querySelector("#name").value = profile.name || "";
  document.querySelector("#email").value = profile.email || "";
  document.querySelector("#phone").value = profile.phone || "";
  document.querySelector("#address").value = profile.address || "";
}

// Show user modal
userBtn.addEventListener("click", function () {
  updateUserActions();
  userModal.classList.add("active");
  overlay.classList.add("active");
});

// Close user modal
closeUserModal.addEventListener("click", closeAllModals);

// Open login modal
openLogin.addEventListener("click", function () {
  closeAllModals();
  loginModal.classList.add("active");
  overlay.classList.add("active");
});

// Close login modal
closeLoginModal.addEventListener("click", closeAllModals);

// Open signup modal
openSignup.addEventListener("click", function () {
  closeAllModals();
  signupModal.classList.add("active");
  overlay.classList.add("active");
});

// Close signup modal
closeSignupModal.addEventListener("click", closeAllModals);

// Open change password modal
openChangePassword.addEventListener("click", function () {
  closeAllModals();
  changePasswordModal.classList.add("active");
  overlay.classList.add("active");
});

// Close change password modal
closeChangePasswordModal.addEventListener("click", closeAllModals);

// Open profile modal
openProfile.addEventListener("click", function () {
  closeAllModals();
  loadProfile();
  profileModal.classList.add("active");
  overlay.classList.add("active");
});

// Close profile modal
closeProfileModal.addEventListener("click", closeAllModals);

// Open cart modal
cartBtn.addEventListener("click", function () {
  closeAllModals();
  renderCart();
  cartModal.classList.add("active");
  overlay.classList.add("active");
});

// Close cart modal
closeCartModal.addEventListener("click", closeAllModals);

// Open wishlist modal
wishlistBtn.addEventListener("click", function () {
  closeAllModals();
  renderWishlist();
  wishlistModal.classList.add("active");
  overlay.classList.add("active");
});

// Close wishlist modal
closeWishlistModal.addEventListener("click", closeAllModals);

// Open compare modal
document.querySelectorAll("[data-action='add-to-compare']").forEach(btn => {
  btn.addEventListener("click", function () {
    const productId = btn.closest(".product-item").dataset.productId;
    addToCompare(productId);
  });
});

// Close compare modal
closeCompareModal.addEventListener("click", closeAllModals);

// Clear compare list
clearCompareBtn.addEventListener("click", function () {
  localStorage.removeItem("compare");
  renderCompare();
  showToast("Comparison cleared!");
});

// Close modals when clicking overlay
overlay.addEventListener("click", function (e) {
  if (e.target === overlay) {
    closeAllModals();
  }
});

// Handle signup
signupForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.querySelector("#signup-email").value;
  const password = document.querySelector("#signup-password").value;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  
  if (users.some(user => user.email === email)) {
    showToast("Email already registered!", "error");
    return;
  }

  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));
  showToast("Sign up successful! Please login.");
  closeAllModals();
  loginModal.classList.add("active");
  overlay.classList.add("active");
});

// Handle login
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.querySelector("#login-email").value;
  const password = document.querySelector("#login-password").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    localStorage.setItem("loggedInUser", email);
    showToast("Login successful!");
    closeAllModals();
    updateUserActions();
  } else {
    showToast("Invalid email or password!", "error");
  }
});

// Handle change password
changePasswordForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const currentPassword = document.querySelector("#current-password").value;
  const newPassword = document.querySelector("#new-password").value;
  const loggedInUser = localStorage.getItem("loggedInUser");
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const userIndex = users.findIndex(user => user.email === loggedInUser && user.password === currentPassword);
  if (userIndex !== -1) {
    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    showToast("Password changed successfully!");
    closeAllModals();
  } else {
    showToast("Current password is incorrect!", "error");
  }
});

// Handle profile update
profileForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    showToast("You must be logged in to edit your profile!", "error");
    closeAllModals();
    loginModal.classList.add("active");
    overlay.classList.add("active");
    return;
  }

  const profile = {
    email: loggedInUser,
    name: document.querySelector("#name").value,
    phone: document.querySelector("#phone").value,
    address: document.querySelector("#address").value,
  };
  localStorage.setItem("userProfile", JSON.stringify(profile));
  showToast("Profile saved successfully!");
  closeAllModals();
});

// Handle logout
logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("loggedInUser");
  showToast("Logged out successfully!");
  closeAllModals();
  updateUserActions();
});

// Initialize user actions on page load
document.addEventListener("DOMContentLoaded", function () {
  updateUserActions();
  updateBadges();
  initializeProductActions();
});

// Product data (simplified for demonstration)
const products = {
  "1": {
    title: "Running Sneaker Shoes",
    category: "Men / Women",
    price: "$180.85",
    image: "./assets/images/product-1.jpg"
  },
  "2": {
    title: "Leather Mens Slipper",
    category: "Men / Sports",
    price: "$190.85",
    image: "./assets/images/product-2.jpg"
  },
  "3": {
    title: "Simple Fabric Shoe",
    category: "Men / Women",
    price: "$160.85",
    image: "./assets/images/product-3.jpg"
  },
  "4": {
    title: "Air Jordan 7 Retro",
    category: "Men / Sports",
    price: "$170.85",
    image: "./assets/images/product-4.jpg"
  },
  "5": {
    title: "Nike Air Max 270 SE",
    category: "Men / Women",
    price: "$120.85",
    image: "./assets/images/product-5.jpg"
  },
  "6": {
    title: "Adidas Sneakers Shoes",
    category: "Men / Women",
    price: "$100.85",
    image: "./assets/images/product-6.jpg"
  },
  "7": {
    title: "Nike Basketball shoes",
    category: "Men / Sports",
    price: "$120.85",
    image: "./assets/images/product-7.jpg"
  },
  "8": {
    title: "Simple Fabric Shoe",
    category: "Men / Women",
    price: "$100.85",
    image: "./assets/images/product-8.jpg"
  }
};

// Initialize product action buttons
function initializeProductActions() {
  document.querySelectorAll(".card-action-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const action = btn.dataset.action;
      const productId = btn.closest(".product-item").dataset.productId;
      switch (action) {
        case "quick-view":
          showQuickView(productId);
          break;
        case "add-to-cart":
          addToCart(productId);
          break;
        case "add-to-wishlist":
          addToWishlist(productId);
          break;
        case "add-to-compare":
          addToCompare(productId);
          break;
      }
    });
  });
}

// Show toast notification
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }, 100);
}

// Update badges
function updateBadges() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  
  cartBadge.textContent = cart.length;
  wishlistBadge.textContent = wishlist.length;
  
  cartBadge.style.display = cart.length > 0 ? "grid" : "none";
  wishlistBadge.style.display = wishlist.length > 0 ? "grid" : "none";
}

// Show quick view
function showQuickView(productId) {
  const product = products[productId];
  if (!product) return;
  
  document.querySelector("#quick-view-image").src = product.image;
  document.querySelector("#quick-view-title").textContent = product.title;
  document.querySelector("#quick-view-category").textContent = product.category;
  document.querySelector("#quick-view-price").textContent = product.price;
  
  const addToCartBtn = document.querySelector("#quick-view-add-to-cart");
  addToCartBtn.onclick = () => addToCart(productId);
  
  closeAllModals();
  quickViewModal.classList.add("active");
  overlay.classList.add("active");
}

// Add to cart
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart.includes(productId)) {
    cart.push(productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateBadges();
    showToast("Added to cart!");
  } else {
    showToast("Item already in cart!", "error");
  }
}

// Add to wishlist
function addToWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateBadges();
    showToast("Added to wishlist!");
  } else {
    showToast("Item already in wishlist!", "error");
  }
}

// Render cart
function renderCart() {
  const cartContent = document.querySelector("#cart-content");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  if (cart.length === 0) {
    cartContent.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  
  cartContent.innerHTML = cart.map(productId => {
    const product = products[productId];
    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.title}" class="cart-item-image">
        <div class="cart-item-details">
          <h4>${product.title}</h4>
          <p>${product.price}</p>
          <button class="btn btn-secondary" onclick="removeFromCart('${productId}')">Remove</button>
        </div>
      </div>
    `;
  }).join("");
}

// Remove from cart
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(id => id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateBadges();
  renderCart();
  showToast("Removed from cart!");
}

// Render wishlist
function renderWishlist() {
  const wishlistContent = document.querySelector("#wishlist-content");
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  
  if (wishlist.length === 0) {
    wishlistContent.innerHTML = "<p>Your wishlist is empty.</p>";
    return;
  }
  
  wishlistContent.innerHTML = wishlist.map(productId => {
    const product = products[productId];
    return `
      <div class="wishlist-item">
        <img src="${product.image}" alt="${product.title}" class="wishlist-item-image">
        <div class="wishlist-item-details">
          <h4>${product.title}</h4>
          <p>${product.price}</p>
          <button class="btn btn-secondary" onclick="removeFromWishlist('${productId}')">Remove</button>
        </div>
      </div>
    `;
  }).join("");
}

// Remove from wishlist
function removeFromWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist = wishlist.filter(id => id !== productId);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateBadges();
  renderWishlist();
  showToast("Removed from wishlist!");
}

// Add to compare
function addToCompare(productId) {
  let compare = JSON.parse(localStorage.getItem("compare")) || [];
  if (compare.length >= 4) {
    showToast("You can compare up to 4 products!", "error");
    return;
  }
  if (!compare.includes(productId)) {
    compare.push(productId);
    localStorage.setItem("compare", JSON.stringify(compare));
    showToast("Added to comparison!");
    renderCompare();
    closeAllModals();
    compareModal.classList.add("active");
    overlay.classList.add("active");
  } else {
    showToast("Item already in comparison!", "error");
  }
}

// Render compare
function renderCompare() {
  const compareContent = document.querySelector("#compare-content");
  const compare = JSON.parse(localStorage.getItem("compare")) || [];
  
  if (compare.length === 0) {
    compareContent.innerHTML = "<p>No products selected for comparison.</p>";
    return;
  }
  
  compareContent.innerHTML = `
    <table class="compare-table">
      <thead>
        <tr>
          <th>Product</th>
          ${compare.map(() => "<th></th>").join("")}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Image</td>
          ${compare.map(productId => `
            <td><img src="${products[productId].image}" alt="${products[productId].title}" class="compare-image"></td>
          `).join("")}
        </tr>
        <tr>
          <td>Title</td>
          ${compare.map(productId => `<td>${products[productId].title}</td>`).join("")}
        </tr>
        <tr>
          <td>Category</td>
          ${compare.map(productId => `<td>${products[productId].category}</td>`).join("")}
        </tr>
        <tr>
          <td>Price</td>
          ${compare.map(productId => `<td>${products[productId].price}</td>`).join("")}
        </tr>
        <tr>
          <td>Action</td>
          ${compare.map(productId => `
            <td><button class="btn btn-secondary" onclick="removeFromCompare('${productId}')">Remove</button></td>
          `).join("")}
        </tr>
      </tbody>
    </table>
  `;
}

// Remove from compare
function removeFromCompare(productId) {
  let compare = JSON.parse(localStorage.getItem("compare")) || [];
  compare = compare.filter(id => id !== productId);
  localStorage.setItem("compare", JSON.stringify(compare));
  renderCompare();
  showToast("Removed from comparison!");
}

// Close quick view modal
closeQuickViewModal.addEventListener("click", closeAllModals);