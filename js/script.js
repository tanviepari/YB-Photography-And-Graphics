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

  const getApiUrl = (path) => {
    const isLocalFile = window.location.protocol === 'file:';
    return isLocalFile ? `http://localhost:5001${path}` : path;
  };

  // Submit
  bookingForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!checkBookingFormValidity()) return;

    const data = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      event_type: event.value,
      event_date: date.value,
      location: document.getElementById("bookingLocation").value,
      message: document.getElementById("bookingMessage").value
    };

    try {
      const response = await fetch(getApiUrl('/api/book'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        alert("Booking request submitted successfully! We will contact you soon.");
        this.reset();
        submitBtn.disabled = true;
        closeModal();
        document
          .querySelectorAll("#bookingForm input, #bookingForm select, #bookingForm textarea")
          .forEach((el) => el.classList.remove("valid"));
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
    }
  });
}


let allImages = [];

async function fetchGalleryImages() {
  const getApiUrl = (path) => {
    const isLocalFile = window.location.protocol === 'file:';
    return isLocalFile ? `http://localhost:5001${path}` : path;
  };

  try {
    const res = await fetch(getApiUrl('/api/gallery'));
    allImages = await res.json();
    showImages("all");
  } catch (err) {
    console.error("Error fetching gallery images:", err);
  }
}

const grid = document.querySelector(".portfolio-grid");
const buttons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

// 🔹 Render function
function showImages(category) {
  grid.innerHTML = "";
  let imagesToShow = [];

  if (category === "all") {
    imagesToShow = allImages;
  } else {
    imagesToShow = allImages.filter(img => img.category === category);
  }

  if (imagesToShow.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding: 4rem 2rem; background:white; border-radius:12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
        <p style="font-size: 1.2rem; color: #666; margin-bottom: 1rem;">No images found in this category.</p>
        <p style="font-size: 0.9rem; color: #999;">The portfolio is now dynamically synced with the database. Add images from the Admin Panel to see them here.</p>
      </div>
    `;
    return;
  }

  imagesToShow.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("portfolio-item");

    const img = document.createElement("img");
    img.src = item.image_url;
    img.loading = "lazy";

    // LIGHTBOX CLICK
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = item.image_url;
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
fetchGalleryImages();

