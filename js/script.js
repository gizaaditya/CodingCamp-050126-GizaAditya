// Membungkus semua kode agar jalan setelah HTML siap
document.addEventListener("DOMContentLoaded", () => {
  // 1. Ambil elemen dari HTML
  const addBtn = document.getElementById("add-btn");
  const todoInput = document.getElementById("todo-input");
  const todoDate = document.getElementById("todo-date");
  const todoList = document.getElementById("todo-list");
  const deleteAllBtn = document.getElementById("delete-all-btn");
  const filterBtn = document.getElementById("filter-btn");

  // Fungsi untuk mengecek jika tabel kosong (Fitur pesan "Belum ada tugas")
  function checkEmpty() {
    if (todoList.children.length === 0) {
      todoList.innerHTML = `
                <tr id="no-data">
                    <td colspan="4" style="text-align: center; color: #8b949e;">Belum ada tugas nih, Yuk tambah!</td>
                </tr>
            `;
    }
  }

  // 2. Fitur Tambah & Validasi
  addBtn.onclick = () => {
    // Cek jika input kosong
    if (todoInput.value.trim() === "" || todoDate.value === "") {
      alert("Waduh, isi dulu tugas sama tanggalnya! Jangan dikosongin ya.");
      return;
    }

    // Hapus pesan "Belum ada tugas" jika ada
    const noData = document.getElementById("no-data");
    if (noData) noData.remove();

    // Buat baris baru
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${todoInput.value}</td>
            <td>${todoDate.value}</td>
            <td><span class="status-badge" style="background: #238636; color: white; padding: 4px 8px; border-radius: 12px; font-size: 11px;">Active</span></td>
            <td><button class="del-row-btn" style="background: #ff4d4d; color: white; padding: 5px 10px; border-radius: 4px; border: none; cursor: pointer;">Delete</button></td>
        `;

    // Pasang fungsi delete per baris
    row.querySelector(".del-row-btn").onclick = () => {
      row.remove();
      checkEmpty(); // Cek lagi jika tabel jadi kosong
    };

    todoList.appendChild(row);

    // Reset input
    todoInput.value = "";
    todoDate.value = "";
  };

  // 3. Fitur DELETE ALL
  deleteAllBtn.onclick = () => {
    // Cek jika emang gak ada data (hanya ada pesan "no-data")
    if (todoList.querySelector("#no-data")) {
      alert("List udah kosong!");
      return;
    }

    if (confirm("Yakin mau hapus SEMUA tugas?")) {
      todoList.innerHTML = "";
      checkEmpty(); // Munculin lagi pesan "Belum ada tugas"
    }
  };

  // 4. Fitur FILTER (Urutin berdasarkan Tanggal)
  filterBtn.onclick = () => {
    // Ambil semua baris kecuali pesan "Belum ada tugas"
    const rows = Array.from(todoList.querySelectorAll("tr:not(#no-data)"));

    if (rows.length === 0) {
      alert("Gak ada data buat difilter!");
      return;
    }

    // Sortir baris berdasarkan tanggal (cells[1])
    rows.sort((a, b) => {
      return (
        new Date(a.cells[1].textContent) - new Date(b.cells[1].textContent)
      );
    });

    // Masukin lagi yang udah rapi ke tabel
    rows.forEach((row) => todoList.appendChild(row));
  };
});
