// Ambil elemen dari HTML
const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const todoDate = document.getElementById("todo-date");
const todoList = document.getElementById("todo-list");
const deleteAllBtn = document.getElementById("delete-all-btn"); // Harus ada di HTML
const filterBtn = document.getElementById("filter-btn"); // Harus ada di HTML

// 1. Fitur Tambah & Validasi [cite: 17, 18]
addBtn.addEventListener("click", function () {
  if (todoInput.value === "" || todoDate.value === "") {
    alert("Wajib diisi semua ya bro!");
    return;
  }

  const row = document.createElement("tr");
  row.innerHTML = `
        <td>${todoInput.value}</td>
        <td>${todoDate.value}</td>
        <td><span class="status">Active</span></td>
        <td><button class="delete-row-btn">Delete</button></td>
    `;

  row
    .querySelector(".delete-row-btn")
    .addEventListener("click", () => row.remove());
  todoList.appendChild(row);
  todoInput.value = "";
  todoDate.value = "";
});

// 2. Fitur DELETE ALL [cite: 17]
deleteAllBtn.addEventListener("click", function () {
  if (todoList.children.length === 0) {
    alert("List udah kosong, bro!");
    return;
  }
  if (confirm("Yakin mau hapus SEMUA tugas?")) {
    todoList.innerHTML = ""; // Langsung dikosongin dalem tabelnya
  }
});

// 3. Fitur FILTER (Urutin berdasarkan Tanggal) [cite: 17]
filterBtn.addEventListener("click", function () {
  const rows = Array.from(todoList.querySelectorAll("tr"));

  if (rows.length === 0) {
    alert("Gak ada data buat difilter, bro!");
    return;
  }

  // Sortir baris berdasarkan tanggal (cells[1] itu kolom DUE DATE)
  rows.sort((a, b) => {
    return new Date(a.cells[1].textContent) - new Date(b.cells[1].textContent);
  });

  // Masukin lagi yang udah rapi ke tabel
  rows.forEach((row) => todoList.appendChild(row));
  alert("Berhasil diurutkan berdasarkan tanggal terdekat!");
});
