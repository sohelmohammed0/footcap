'use strict';

/**
 * navbar toggle
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
 * header & go top btn active on page scroll
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
 * user modals
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

// Helper function to close all modals
function closeAllModals() {
  userModal.classList.remove("active");
  loginModal.classList.remove("active");
  signupModal.classList.remove("active");
  changePasswordModal.classList.remove("active");
  profileModal.classList.remove("active");
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
    alert("Email already registered!");
    return;
  }

  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Sign up successful! Please login.");
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
    alert("Login successful!");
    closeAllModals();
    updateUserActions();
  } else {
    alert("Invalid email or password!");
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
    alert("Password changed successfully!");
    closeAllModals();
  } else {
    alert("Current password is incorrect!");
  }
});

// Handle profile update
profileForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    alert("You must be logged in to edit your profile!");
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
  alert("Profile saved successfully!");
  closeAllModals();
});

// Handle logout
logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("loggedInUser");
  alert("Logged out successfully!");
  closeAllModals();
  updateUserActions();
});

// Initialize user actions on page load
document.addEventListener("DOMContentLoaded", updateUserActions);