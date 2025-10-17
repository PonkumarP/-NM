
let users = [
  { id: 1, name: "PK", email: "pk23022006@example.com", phone: "9342189432" },
  { id: 2, name: "S2K", email: "s2k12052005@example.com", phone: "8072924083" },
  { id: 3, name: "SK", email: "sk16052006@example.com", phone: "9342514880" }
];
let nextId = 4;
let sortField = 'id';
let ascending = true;
let editId = null;

function render() {
  const cardsContainer = document.getElementById('cardsContainer');
  const tableBody = document.getElementById('usersTableBody');
  const search = document.getElementById('searchInput').value.toLowerCase();

  let filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search) || 
    u.email.toLowerCase().includes(search) || 
    u.phone.includes(search)
  );
  filteredUsers.sort((a,b) => ascending ? (a[sortField] > b[sortField]?1:-1) : (a[sortField]<b[sortField]?1:-1));

  cardsContainer.innerHTML = '';
  tableBody.innerHTML = '';

  filteredUsers.forEach(user => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${user.name}</h3><p>${user.email}</p><p>${user.phone}</p>
      <button onclick="editUser(${user.id})">Edit</button>
      <button onclick="deleteUser(${user.id})">Delete</button>`;
    cardsContainer.appendChild(card);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>
        <button onclick="editUser(${user.id})">Edit</button>
        <button onclick="deleteUser(${user.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function openModal() {
  editId = null;
  document.getElementById('modalTitle').textContent = "Add User";
  document.getElementById('modalName').value = '';
  document.getElementById('modalEmail').value = '';
  document.getElementById('modalPhone').value = '';
  document.getElementById('userModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('userModal').style.display = 'none';
}

function saveUser() {
  const name = document.getElementById('modalName').value.trim();
  const email = document.getElementById('modalEmail').value.trim();
  const phone = document.getElementById('modalPhone').value.trim();
  if(!name || !email || !phone) { alert('Fill all fields'); return; }

  if(editId) {
    let user = users.find(u => u.id === editId);
    user.name = name; user.email = email; user.phone = phone;
  } else {
    users.push({id: nextId++, name, email, phone});
  }
  closeModal();
  render();
}

function editUser(id) {
  editId = id;
  const user = users.find(u => u.id === id);
  document.getElementById('modalTitle').textContent = "Edit User";
  document.getElementById('modalName').value = user.name;
  document.getElementById('modalEmail').value = user.email;
  document.getElementById('modalPhone').value = user.phone;
  document.getElementById('userModal').style.display = 'flex';
}

function deleteUser(id) {
  if(confirm('Are you sure?')) {
    users = users.filter(u => u.id !== id);
    render();
  }
}

function sortBy(field) {
  if(sortField === field) ascending = !ascending;
  else { sortField = field; ascending = true; }
  render();
}

render();