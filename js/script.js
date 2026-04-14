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

// SAFETY CHECK
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  const name = document.getElementById("bookingName");
  const email = document.getElementById("bookingEmail");
  const phone = document.getElementById("bookingPhone");
  const event = document.getElementById("bookingEvent");
  const date = document.getElementById("bookingDate");
  const submitBtn = document.getElementById("bookingSubmitBtn");

  const nameError = document.getElementById("bookingNameError");
  const emailError = document.getElementById("bookingEmailError");
  const phoneError = document.getElementById("bookingPhoneError");
  const eventError = document.getElementById("bookingEventError");
  const dateError = document.getElementById("bookingDateError");

  const nameRegex = /^[A-Za-z\s]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  function validateName() {
    if (!nameRegex.test(name.value.trim())) {
      nameError.textContent = "Enter valid name";
      name.classList.add("error-border");
      return false;
    }
    nameError.textContent = "";
    name.classList.remove("error-border");
    name.classList.add("valid");
    return true;
  }

  function validateEmail() {
    if (!emailRegex.test(email.value.trim())) {
      emailError.textContent = "Enter valid email";
      email.classList.add("error-border");
      return false;
    }
    emailError.textContent = "";
    email.classList.remove("error-border");
    email.classList.add("valid");
    return true;
  }

  function validatePhone() {
    if (!phoneRegex.test(phone.value.trim())) {
      phoneError.textContent = "Enter 10-digit number";
      phone.classList.add("error-border");
      return false;
    }
    phoneError.textContent = "";
    phone.classList.remove("error-border");
    phone.classList.add("valid");
    return true;
  }

  function validateEvent() {
    if (!event.value) {
      eventError.textContent = "Select event type";
      event.classList.add("error-border");
      return false;
    }
    eventError.textContent = "";
    event.classList.remove("error-border");
    event.classList.add("valid");
    return true;
  }

  function validateDate() {
    if (!date.value) {
      dateError.textContent = "Select a date";
      date.classList.add("error-border");
      return false;
    }
    dateError.textContent = "";
    date.classList.remove("error-border");
    date.classList.add("valid");
    return true;
  }

  // FIXED BOOLEAN RETURN
  function checkBookingFormValidity() {
    const isValid =
      validateName() &&
      validateEmail() &&
      validatePhone() &&
      validateEvent() &&
      validateDate();

    submitBtn.disabled = !isValid;
    return isValid;
  }

  // Real-time validation
  name.addEventListener("input", checkBookingFormValidity);
  email.addEventListener("input", checkBookingFormValidity);
  phone.addEventListener("input", checkBookingFormValidity);
  event.addEventListener("change", checkBookingFormValidity);
  date.addEventListener("change", checkBookingFormValidity);

  // Submit
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!checkBookingFormValidity()) return;

    alert("Booking request submitted!");

    this.reset();
    submitBtn.disabled = true;

    document
      .querySelectorAll("#bookingForm input, #bookingForm select, #bookingForm textarea")
      .forEach((el) => el.classList.remove("valid"));
  });
}


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

