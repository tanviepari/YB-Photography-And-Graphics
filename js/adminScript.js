
function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("active-section");
  });

  document.getElementById(id).classList.add("active-section");

  document.querySelectorAll(".sidebar li").forEach(li => {
    li.classList.remove("active");
  });

  event.target.classList.add("active");
}

// Modal
function openModal(text) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("modalText").innerText = text;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Filter bookings
function filterStatus(status) {
  let rows = document.querySelectorAll("#bookingTable tr");

  rows.forEach((row, index) => {
    if (index === 0) return;
    if (status === "all" || row.dataset.status === status) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Mark message read
function markRead(el) {
  el.classList.remove("unread");
}

function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");

  // Desktop collapse
  if (window.innerWidth > 768) {
    sidebar.classList.toggle("collapsed");
  } 
  // Mobile slide
  else {
    sidebar.classList.toggle("active");
  }
}