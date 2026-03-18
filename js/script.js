const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const modal = document.getElementById("bookingModal");

function openModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

document.getElementById("closeModal").onclick = closeModal;
document.getElementById("cancelModal").onclick = closeModal;

/* CLOSE WHEN CLICK OUTSIDE */
document.querySelector(".modal-overlay").onclick = closeModal;


/* FORM VALIDATION */

document.getElementById("bookingForm").addEventListener("submit", function (e) {

  const phone = this.phone.value.trim();

  const phonePattern = /^[0-9+\-\s()]{7,15}$/;

  if (!phonePattern.test(phone)) {
    alert("Please enter a valid phone number");
    e.preventDefault();
    return;
  }

  alert("Form submitted successfully!");
});

const portfolioData = {
  wedding: [
    "images/wedding/W1.jpg",
    "images/wedding/W2.jpg",
    "images/wedding/W3.jpg",
    "images/wedding/W4.jpg",
    "images/wedding/W5.jpg",
  ],
  prewedding: [
    "images/prewedding/S1.jpg",
    "images/prewedding/S2.jpg",
    "images/prewedding/S3.jpg"
  ],
  portrait: [
    "images/portrait/M1.jpg",
    "images/portrait/M2.jpg",
    "images/portrait/M3.jpg"
  ],
  events: [
    "images/events/E1.jpg",
    "images/events/E2.jpg",
    "images/events/E3.jpg",
    "images/events/E4.jpg"
  ],
  graphics: [
    "images/graphics/G1.jpg",
    "images/graphics/G2.jpg",
    "images/graphics/G3.jpg",
  ]
};

const grid = document.querySelector(".portfolio-grid");
const buttons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

// 🔹 Render function
function showImages(category) {

  grid.innerHTML = "";

  let imagesToShow = [];

  if (category === "all") {
    Object.values(portfolioData).forEach(arr => {
      imagesToShow = imagesToShow.concat(arr);
    });
  } else {
    imagesToShow = portfolioData[category];
  }

  imagesToShow.forEach(src => {

    const div = document.createElement("div");
    div.classList.add("portfolio-item");

    const img = document.createElement("img");
    img.src = src;

    // LIGHTBOX CLICK
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = src;
    });

    div.appendChild(img);
    grid.appendChild(div);
  });

}

// 🔹 Filter buttons
buttons.forEach(btn => {
  btn.addEventListener("click", () => {

    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");

    showImages(btn.dataset.filter);

  });
});

// 🔹 Lightbox close
document.querySelector(".close-lightbox").onclick = () => {
  lightbox.style.display = "none";
};

lightbox.onclick = (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
};

// 🔹 Initial load
showImages("all");

