// Predefined admin
const defaultCreds = { "admin": "password@1" };
let users = JSON.parse(localStorage.getItem('users')) || { ...defaultCreds };

// Saree Data
const sarees = [
  { id: 1, name: "Kanjivaram Silk", price: 8500, color: "red", img: "https://via.placeholder.com/400x300/8B0000/FFFFFF?text=Kanjivaram" },
  { id: 2, name: "Banarasi Saree", price: 6500, color: "gold", img: "https://via.placeholder.com/400x300/FFD700/000000?text=Banarasi" },
  { id: 3, name: "Chanderi Cotton", price: 1800, color: "blue", img: "https://via.placeholder.com/400x300/00008B/FFFFFF?text=Chanderi" },
  { id: 4, name: "Tussar Silk", price: 4500, color: "green", img: "https://via.placeholder.com/400x300/006400/FFFFFF?text=Tussar" },
  { id: 5, name: "Paithani Saree", price: 12000, color: "gold", img: "https://via.placeholder.com/400x300/DAA520/000000?text=Paithani" },
  { id: 6, name: "Bandhani Saree", price: 3200, color: "red", img: "https://via.placeholder.com/400x300/DC143C/FFFFFF?text=Bandhani" }
];

// Save users
function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

// Login
function login() {
  const id = document.getElementById('loginId')?.value.trim();
  const pass = document.getElementById('loginPass')?.value;

  if (users[id] && users[id] === pass) {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('currentUser', id);
    window.location.href = 'dashboard.html';
  } else {
    document.getElementById('loginError').textContent = 'Invalid credentials!';
  }
}

// Register
function register() {
  const id = document.getElementById('regId')?.value.trim();
  const pass = document.getElementById('regPass')?.value;
  const confirm = document.getElementById('regConfirm')?.value;

  const error = document.getElementById('regError');

  if (!id || !pass) return error.textContent = 'All fields required!';
  if (pass !== confirm) return error.textContent = 'Passwords do not match!';
  if (users[id]) return error.textContent = 'User already exists!';

  users[id] = pass;
  saveUsers();
  alert('Registered successfully! Please login.');
  window.location.href = 'login.html';
}

// Logout
function logout() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

// Render Sarees
function renderSarees(data) {
  const grid = document.getElementById('sareeGrid');
  if (!grid) return;
  grid.innerHTML = '';
  data.forEach(s => {
    const card = document.createElement('div');
    card.className = 'saree-card';
    card.innerHTML = `
      <img src="${s.img}" alt="${s.name}">
      <div class="saree-info">
        <h3>${s.name}</h3>
        <p>₹${s.price}</p>
        <div class="saree-actions">
          <button class="try-btn" onclick="openTryOn(${s.id})">Try 3D</button>
          <button class="buy-btn" onclick="alert('Buy ${s.name} - ₹${s.price}')">Buy</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Try-On Modal
function openTryOn(id) {
  const s = sarees.find(x => x.id === id);
  document.getElementById('modalSareeName').textContent = s.name;
  document.getElementById('modalImage').src = s.img;
  document.getElementById('tryOnModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('tryOnModal').style.display = 'none';
}

// Filter
function filterSarees() {
  const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const color = document.getElementById('colorFilter')?.value || '';
  const price = document.getElementById('priceFilter')?.value || '';

  let filtered = sarees.filter(s => {
    const matchName = s.name.toLowerCase().includes(search);
    const matchColor = !color || s.color === color;
    let matchPrice = true;
    if (price === 'under2000') matchPrice = s.price < 2000;
    else if (price === '2000-5000') matchPrice = s.price >= 2000 && s.price <= 5000;
    else if (price === 'above5000') matchPrice = s.price > 5000;
    return matchName && matchColor && matchPrice;
  });

  renderSarees(filtered);
}

// Close modal on outside click
window.onclick = function(e) {
  const modal = document.getElementById('tryOnModal');
  if (e.target === modal) closeModal();
};
