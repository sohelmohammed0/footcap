const products = {
  "1": { title: "Running Sneaker Shoes", category: ["Men", "Women"], brand: "Nike", price: 180.85, image: "./assets/images/product-1.jpg", stock: 50 },
  "2": { title: "Leather Mens Slipper", category: ["Men", "Sports"], brand: "Adidas", price: 190.85, image: "./assets/images/product-2.jpg", stock: 30 },
  "3": { title: "Simple Fabric Shoe", category: ["Men", "Women"], brand: "Puma", price: 160.85, image: "./assets/images/product-3.jpg", stock: 40 },
  "4": { title: "Air Jordan 7 Retro", category: ["Men", "Sports"], brand: "Nike", price: 170.85, image: "./assets/images/product-4.jpg", stock: 20 },
  "5": { title: "Nike Air Max 270 SE", category: ["Men", "Women"], brand: "Nike", price: 120.85, image: "./assets/images/product-5.jpg", stock: 60 },
  "6": { title: "Adidas Sneakers Shoes", category: ["Men", "Women"], brand: "Adidas", price: 100.85, image: "./assets/images/product-6.jpg", stock: 45 },
  "7": { title: "Nike Basketball Shoes", category: ["Men", "Sports"], brand: "Nike", price: 120.85, image: "./assets/images/product-7.jpg", stock: 35 },
  "8": { title: "Simple Fabric Shoe", category: ["Men", "Women"], brand: "Puma", price: 100.85, image: "./assets/images/product-8.jpg", stock: 25 }
};

// Modal elements
const userModal = document.querySelector("#user-modal");
const loginModal = document.querySelector("#login-modal");
const signupModal = document.querySelector("#signup-modal");
const changePasswordModal = document.querySelector("#change-password-modal");
const profileModal = document.querySelector("#profile-modal");
const orderHistoryModal = document.querySelector("#order-history-modal");
const quickViewModal = document.querySelector("#quick-view-modal");
const cartModal = document.querySelector("#cart-modal");
const wishlistModal = document.querySelector("#wishlist-modal");
const compareModal = document.querySelector("#compare-modal");
const checkoutModal = document.querySelector("#checkout-modal");
const adminPanelModal = document.querySelector("#admin-panel-modal");
const orderTrackingModal = document.querySelector("#order-tracking-modal");
const overlay = document.querySelector(".overlay");

// Button elements
const userBtn = document.querySelector("#user-btn");
const cartBtn = document.querySelector("#cart-btn");
const wishlistBtn = document.querySelector("#wishlist-btn");
const openLogin = document.querySelector("#open-login");
const openSignup = document.querySelector("#open-signup");
const openChangePassword = document.querySelector("#open-change-password");
const openProfile = document.querySelector("#open-profile");
const openOrderHistory = document.querySelector("#open-order-history");
const openAdminPanel = document.querySelector("#open-admin-panel");
const logoutBtn = document.querySelector("#logout");
const closeUserModal = document.querySelector("#close-user-modal");
const closeLoginModal = document.querySelector("#close-login-modal");
const closeSignupModal = document.querySelector("#close-signup-modal");
const closeChangePasswordModal = document.querySelector("#close-change-password-modal");
const closeProfileModal = document.querySelector("#close-profile-modal");
const closeOrderHistoryModal = document.querySelector("#close-order-history-modal");
const closeQuickViewModal = document.querySelector("#close-quick-view-modal");
const closeCartModal = document.querySelector("#close-cart-modal");
const closeWishlistModal = document.querySelector("#close-wishlist-modal");
const closeCompareModal = document.querySelector("#close-compare-modal");
const closeCheckoutModal = document.querySelector("#close-checkout-modal");
const closeAdminPanelModal = document.querySelector("#close-admin-panel-modal");
const closeOrderTrackingModal = document.querySelector("#close-order-tracking-modal");

// Form elements
const loginForm = document.querySelector("#login-form");
const signupForm = document.querySelector("#signup-form");
const changePasswordForm = document.querySelector("#change-password-form");
const profileForm = document.querySelector("#profile-form");
const checkoutForm = document.querySelector("#checkout-form");
const trackingForm = document.querySelector("#tracking-form");
const footerTrackingForm = document.querySelector("#footer-tracking-form");

// Other elements
const cartBadge = document.querySelector("#cart-badge");
const wishlistBadge = document.querySelector("#wishlist-badge");
const quickViewAddToCart = document.querySelector("#quick-view-add-to-cart");
const checkoutBtn = document.querySelector("#checkout-btn");
const clearCompare = document.querySelector("#clear-compare");

function closeAllModals() {
  [userModal, loginModal, signupModal, changePasswordModal, profileModal, orderHistoryModal, quickViewModal, cartModal, wishlistModal, compareModal, checkoutModal, adminPanelModal, orderTrackingModal].forEach(modal => modal.classList.remove("active"));
  overlay.classList.remove("active");
}

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function updateBadges() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  cartBadge.textContent = cart.length;
  wishlistBadge.textContent = wishlist.length;
  cartBadge.style.display = cart.length > 0 ? "grid" : "none";
  wishlistBadge.style.display = wishlist.length > 0 ? "grid" : "none";
}

function updateUserActions() {
  const isLoggedIn = localStorage.getItem("loggedInUser");
  const isAdmin = isLoggedIn === "admin@footcap.com";
  if (isLoggedIn) {
    openLogin.style.display = "none";
    openSignup.style.display = "none";
    openChangePassword.style.display = "block";
    openProfile.style.display = "block";
    openOrderHistory.style.display = "block";
    openAdminPanel.style.display = isAdmin ? "block" : "none";
    logoutBtn.style.display = "block";
  } else {
    openLogin.style.display = "block";
    openSignup.style.display = "block";
    openChangePassword.style.display = "none";
    openProfile.style.display = "none";
    openOrderHistory.style.display = "none";
    openAdminPanel.style.display = "none";
    logoutBtn.style.display = "none";
  }
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContent = document.querySelector("#cart-content");
  if (cart.length === 0) {
    cartContent.innerHTML = "<p>Your cart is empty.</p>";
    checkoutBtn.style.display = "none";
    return;
  }
  const cartItems = cart.reduce((acc, item) => {
    acc[item.id] = (acc[item.id] || 0) + 1;
    return acc;
  }, {});
  cartContent.innerHTML = Object.entries(cartItems).map(([productId, quantity]) => {
    const product = products[productId];
    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.title}" class="cart-item-image">
        <div class="cart-item-details">
          <h4>${product.title}</h4>
          <p>$${product.price.toFixed(2)} x <input type="number" value="${quantity}" min="1" onchange="updateCartQuantity('${productId}', this.value)"></p>
          <button class="btn btn-secondary" onclick="removeFromCart('${productId}')">Remove</button>
        </div>
      </div>
    `;
  }).join("");
  checkoutBtn.style.display = "block";
}

function updateCartQuantity(productId, quantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== productId);
  for (let i = 0; i < parseInt(quantity); i++) {
    cart.push({ id: productId });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateBadges();
  renderCart();
  renderCheckoutCart();
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateBadges();
  renderCart();
  showToast("Item removed from cart!");
}

function renderWishlist() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const wishlistContent = document.querySelector("#wishlist-content");
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
          <p>$${product.price.toFixed(2)}</p>
          <button class="btn btn-secondary" onclick="removeFromWishlist('${productId}')">Remove</button>
        </div>
      </div>
    `;
  }).join("");
}

function removeFromWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist = wishlist.filter(id => id !== productId);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateBadges();
  renderWishlist();
  showToast("Item removed from wishlist!");
}

function renderCompare() {
  const compare = JSON.parse(localStorage.getItem("compare")) || [];
  const compareContent = document.querySelector("#compare-content");
  if (compare.length === 0) {
    compareContent.innerHTML = "<p>No products to compare.</p>";
    return;
  }
  compareContent.innerHTML = `
    <table class="compare-table">
      <thead>
        <tr>
          <th></th>
          ${compare.map(productId => `<th>${products[productId].title}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Image</td>
          ${compare.map(productId => `<td><img src="${products[productId].image}" alt="${products[productId].title}" class="compare-image"></td>`).join("")}
        </tr>
        <tr>
          <td>Price</td>
          ${compare.map(productId => `<td>$${products[productId].price.toFixed(2)}</td>`).join("")}
        </tr>
        <tr>
          <td>Category</td>
          ${compare.map(productId => `<td>${products[productId].category.join(", ")}</td>`).join("")}
        </tr>
        <tr>
          <td>Brand</td>
          ${compare.map(productId => `<td>${products[productId].brand}</td>`).join("")}
        </tr>
        <tr>
          <td>Action</td>
          ${compare.map(productId => `<td><button class="btn btn-secondary" onclick="removeFromCompare('${productId}')">Remove</button></td>`).join("")}
        </tr>
      </tbody>
    </table>
  `;
}

function removeFromCompare(productId) {
  let compare = JSON.parse(localStorage.getItem("compare")) || [];
  compare = compare.filter(id => id !== productId);
  localStorage.setItem("compare", JSON.stringify(compare));
  renderCompare();
  showToast("Item removed from comparison!");
}

function renderCheckoutCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const checkoutCart = document.querySelector("#checkout-cart");
  if (cart.length === 0) {
    checkoutCart.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  const cartItems = cart.reduce((acc, item) => {
    acc[item.id] = (acc[item.id] || 0) + 1;
    return acc;
  }, {});
  checkoutCart.innerHTML = Object.entries(cartItems).map(([productId, quantity]) => {
    const product = products[productId];
    return `
      <div class="cart-item">
        <h4>${product.title}</h4>
        <p>Quantity: ${quantity}</p>
        <p>Total: $${(product.price * quantity).toFixed(2)}</p>
      </div>
    `;
  }).join("") + `<p><strong>Total: $${cart.reduce((sum, item) => sum + products[item.id].price, 0).toFixed(2)}</strong></p>`;
}

function renderOrderHistory() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const loggedInUser = localStorage.getItem("loggedInUser");
  const orderHistoryContent = document.querySelector("#order-history-content");
  const userOrders = orders.filter(order => order.user === loggedInUser);
  
  if (userOrders.length === 0) {
    orderHistoryContent.innerHTML = "<p>No orders found.</p>";
    return;
  }

  orderHistoryContent.innerHTML = userOrders.map(order => {
    const items = order.items.reduce((acc, item) => {
      acc[item.id] = (acc[item.id] || 0) + 1;
      return acc;
    }, {});
    
    const itemDetails = Object.entries(items).map(([productId, quantity]) => {
      const product = products[productId];
      return `
        <div class="order-item-details">
          <p><strong>Product Name:</strong> ${product.title}</p>
          <p><strong>Product ID:</strong> ${productId}</p>
          <p><strong>Quantity:</strong> ${quantity}</p>
          <p><strong>Price per Unit:</strong> $${product.price.toFixed(2)}</p>
          <p><strong>Total:</strong> $${(product.price * quantity).toFixed(2)}</p>
        </div>
      `;
    }).join("");

    return `
      <div class="order-item">
        <h4>Order ID: ${order.id}</h4>
        <p><strong>Date:</strong> ${new Date(order.timestamp).toLocaleString()}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <p><strong>Total Order Amount:</strong> $${order.total.toFixed(2)}</p>
        ${itemDetails}
      </div>
    `;
  }).join("");
}

function renderAdminPanel(tab = "inventory") {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const productsSold = orders.reduce((acc, order) => {
    order.items.forEach(item => {
      acc[item.id] = (acc[item.id] || 0) + 1;
    });
    return acc;
  }, {});
  if (tab === "inventory") {
    const inventory = Object.entries(products).reduce((acc, [id, product]) => {
      product.category.forEach(cat => {
        acc[cat] = (acc[cat] || { count: 0, stock: 0 });
        acc[cat].count += 1;
        acc[cat].stock += product.stock;
      });
      return acc;
    }, {});
    document.querySelector("#inventory-content").innerHTML = `
      <table class="admin-table">
        <thead><tr><th>Category</th><th>Products</th><th>Stock</th></tr></thead>
        <tbody>
          ${Object.entries(inventory).map(([cat, data]) => `
            <tr><td>${cat}</td><td>${data.count}</td><td>${data.stock}</td></tr>
          `).join("")}
        </tbody>
      </table>
    `;
  } else if (tab === "sales") {
    document.querySelector("#sales-content").innerHTML = `
      <p>Total Orders: ${orders.length}</p>
      <p>Total Revenue: $${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</p>
      <h4>Most Sold Products</h4>
      <table class="admin-table">
        <thead><tr><th>Product</th><th>Units Sold</th></tr></thead>
        <tbody>
          ${Object.entries(productsSold).sort((a, b) => b[1] - a[1]).map(([id, count]) => `
            <tr><td>${products[id].title}</td><td>${count}</td></tr>
          `).join("")}
        </tbody>
      </table>
    `;
  } else if (tab === "stock") {
    document.querySelector("#stock-content").innerHTML = `
      <table class="admin-table">
        <thead><tr><th>Product</th><th>Stock</th><th>Update</th></tr></thead>
        <tbody>
          ${Object.entries(products).map(([id, product]) => `
            <tr>
              <td>${product.title}</td>
              <td>${product.stock}</td>
              <td>
                <input type="number" id="stock-${id}" value="${product.stock}" min="0">
                <button class="btn btn-secondary" onclick="updateStock('${id}')">Update</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }
}

function updateStock(productId) {
  const stock = parseInt(document.querySelector(`#stock-${productId}`).value);
  if (stock >= 0) {
    products[productId].stock = stock;
    showToast("Stock updated!");
    renderAdminPanel("stock");
  } else {
    showToast("Invalid stock value!", "error");
  }
}

function simulateOrderTracking(orderId) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = orders.find(o => o.id === orderId);
  if (!order) return;
  const statuses = ["Order Placed", "Processing", "Shipped", "Delivered"];
  let currentStatusIndex = statuses.indexOf(order.status);
  if (currentStatusIndex < statuses.length - 1) {
    setTimeout(() => {
      order.status = statuses[currentStatusIndex + 1];
      localStorage.setItem("orders", JSON.stringify(orders));
      if (order.status !== "Delivered") {
        simulateOrderTracking(orderId);
      }
    }, 5000); // Update every 5 seconds
  }
}

function handleOrderTracking(e, statusElement) {
  e.preventDefault();
  const orderId = e.target.querySelector("[name='order-id']").value;
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = orders.find(o => o.id === orderId);
  if (order) {
    statusElement.innerHTML = `
      <p><strong>Order ID:</strong> ${order.id}</p>
      <p><strong>Status:</strong> ${order.status}</p>
      <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
      <p><strong>Date:</strong> ${new Date(order.timestamp).toLocaleString()}</p>
    `;
  } else {
    statusElement.innerHTML = "<p>Order not found!</p>";
  }
}

// Event listeners
userBtn.addEventListener("click", () => {
  closeAllModals();
  updateUserActions();
  userModal.classList.add("active");
  overlay.classList.add("active");
});

cartBtn.addEventListener("click", () => {
  closeAllModals();
  renderCart();
  cartModal.classList.add("active");
  overlay.classList.add("active");
});

wishlistBtn.addEventListener("click", () => {
  closeAllModals();
  renderWishlist();
  wishlistModal.classList.add("active");
  overlay.classList.add("active");
});

openLogin.addEventListener("click", () => {
  closeAllModals();
  loginModal.classList.add("active");
  overlay.classList.add("active");
});

openSignup.addEventListener("click", () => {
  closeAllModals();
  signupModal.classList.add("active");
  overlay.classList.add("active");
});

openChangePassword.addEventListener("click", () => {
  closeAllModals();
  changePasswordModal.classList.add("active");
  overlay.classList.add("active");
});

openProfile.addEventListener("click", () => {
  closeAllModals();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  document.querySelector("#name").value = user.name || "";
  document.querySelector("#email").value = localStorage.getItem("loggedInUser") || "";
  document.querySelector("#phone").value = user.phone || "";
  document.querySelector("#address").value = user.address || "";
  profileModal.classList.add("active");
  overlay.classList.add("active");
});

openOrderHistory.addEventListener("click", () => {
  closeAllModals();
  renderOrderHistory();
  orderHistoryModal.classList.add("active");
  overlay.classList.add("active");
});

openAdminPanel.addEventListener("click", () => {
  closeAllModals();
  renderAdminPanel();
  adminPanelModal.classList.add("active");
  overlay.classList.add("active");
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("user");
  updateUserActions();
  closeAllModals();
  showToast("Logged out successfully!");
});

[closeUserModal, closeLoginModal, closeSignupModal, closeChangePasswordModal, closeProfileModal, closeOrderHistoryModal, closeQuickViewModal, closeCartModal, closeWishlistModal, closeCompareModal, closeCheckoutModal, closeAdminPanelModal, closeOrderTrackingModal].forEach(btn => {
  btn.addEventListener("click", closeAllModals);
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#login-email").value;
  const password = document.querySelector("#login-password").value;
  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[email] && users[email].password === password) {
    localStorage.setItem("loggedInUser", email);
    updateUserActions();
    closeAllModals();
    showToast("Logged in successfully!");
  } else {
    showToast("Invalid email or password!", "error");
  }
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#signup-email").value;
  const password = document.querySelector("#signup-password").value;
  let users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[email]) {
    showToast("Email already registered!", "error");
    return;
  }
  users[email] = { password, name: "", phone: "", address: "" };
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedInUser", email);
  updateUserActions();
  closeAllModals();
  showToast("Signed up successfully!");
});

changePasswordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const currentPassword = document.querySelector("#current-password").value;
  const newPassword = document.querySelector("#new-password").value;
  const email = localStorage.getItem("loggedInUser");
  let users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[email].password === currentPassword) {
    users[email].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    closeAllModals();
    showToast("Password changed successfully!");
  } else {
    showToast("Current password is incorrect!", "error");
  }
});

profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = {
    name: document.querySelector("#name").value,
    phone: document.querySelector("#phone").value,
    address: document.querySelector("#address").value
  };
  localStorage.setItem("user", JSON.stringify(user));
  closeAllModals();
  showToast("Profile updated successfully!");
});

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    showToast("Please log in to checkout!", "error");
    closeAllModals();
    loginModal.classList.add("active");
    overlay.classList.add("active");
    return;
  }
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    showToast("Your cart is empty!", "error");
    closeAllModals();
    return;
  }
  const orderId = `ORD-${Date.now()}`;
  const order = {
    id: orderId,
    user: loggedInUser,
    items: cart,
    total: cart.reduce((sum, item) => sum + products[item.id].price, 0),
    status: "Order Placed",
    timestamp: Date.now()
  };
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
  cart.forEach(item => {
    if (products[item.id].stock > 0) {
      products[item.id].stock -= 1;
    } else {
      showToast(`Product ${products[item.id].title} is out of stock!`, "error");
    }
  });
  localStorage.setItem("cart", JSON.stringify([]));
  updateBadges();
  renderCart();
  showToast(`Order placed successfully! Order ID: ${orderId}`);
  closeAllModals();
  simulateOrderTracking(orderId);
});

trackingForm.addEventListener("submit", (e) => {
  handleOrderTracking(e, document.querySelector("#tracking-status"));
});

footerTrackingForm.addEventListener("submit", (e) => {
  handleOrderTracking(e, document.querySelector("#footer-tracking-status"));
});

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".product-item").forEach(item => {
      const categories = item.dataset.categories.split(",");
      item.style.display = filter === "all" || categories.includes(filter) ? "block" : "none";
    });
  });
});

document.querySelectorAll(".card-action-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const productId = btn.closest(".product-item").dataset.productId;
    const action = btn.dataset.action;
    if (action === "add-to-cart") {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (products[productId].stock > 0) {
        cart.push({ id: productId });
        localStorage.setItem("cart", JSON.stringify(cart));
        updateBadges();
        showToast("Added to cart!");
      } else {
        showToast("Product is out of stock!", "error");
      }
    } else if (action === "add-to-wishlist") {
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        updateBadges();
        showToast("Added to wishlist!");
      } else {
        showToast("Already in wishlist!", "error");
      }
    } else if (action === "quick-view") {
      const product = products[productId];
      document.querySelector("#quick-view-image").src = product.image;
      document.querySelector("#quick-view-title").textContent = product.title;
      document.querySelector("#quick-view-category").textContent = product.category.join(", ");
      document.querySelector("#quick-view-price").textContent = `$${product.price.toFixed(2)}`;
      quickViewAddToCart.dataset.productId = productId;
      closeAllModals();
      quickViewModal.classList.add("active");
      overlay.classList.add("active");
    } else if (action === "add-to-compare") {
      let compare = JSON.parse(localStorage.getItem("compare")) || [];
      if (!compare.includes(productId)) {
        if (compare.length < 4) {
          compare.push(productId);
          localStorage.setItem("compare", JSON.stringify(compare));
          renderCompare();
          showToast("Added to comparison!");
        } else {
          showToast("Cannot compare more than 4 products!", "error");
        }
      } else {
        showToast("Already in comparison!", "error");
      }
    }
  });
});

quickViewAddToCart.addEventListener("click", () => {
  const productId = quickViewAddToCart.dataset.productId;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (products[productId].stock > 0) {
    cart.push({ id: productId });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateBadges();
    showToast("Added to cart!");
  } else {
    showToast("Product is out of stock!", "error");
  }
});

clearCompare.addEventListener("click", () => {
  localStorage.setItem("compare", JSON.stringify([]));
  renderCompare();
  showToast("Comparison cleared!");
});

checkoutBtn.addEventListener("click", () => {
  closeAllModals();
  renderCheckoutCart();
  checkoutModal.classList.add("active");
  overlay.classList.add("active");
});

document.querySelectorAll(".admin-tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".admin-tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".admin-tab-content").forEach(c => c.style.display = "none");
    btn.classList.add("active");
    document.querySelector(`#${btn.dataset.tab}-tab`).style.display = "block";
    renderAdminPanel(btn.dataset.tab);
  });
});

// Initialize
updateBadges();
updateUserActions();
renderCart();
renderWishlist();
renderCompare();