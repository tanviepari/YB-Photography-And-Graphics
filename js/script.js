const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const modal = document.getElementById("bookingModal");

function openModal(){
  modal.style.display = "flex";
}

function closeModal(){
  modal.style.display = "none";
}

document.getElementById("closeModal").onclick = closeModal;
document.getElementById("cancelModal").onclick = closeModal;

/* CLOSE WHEN CLICK OUTSIDE */
document.querySelector(".modal-overlay").onclick = closeModal;


/* FORM VALIDATION */

document.getElementById("bookingForm").addEventListener("submit", function(e){

  const phone = this.phone.value.trim();

  const phonePattern = /^[0-9+\-\s()]{7,15}$/;

  if(!phonePattern.test(phone)){
    alert("Please enter a valid phone number");
    e.preventDefault();
    return;
  }

  alert("Form submitted successfully!");
});

const portfolioData = {
  wedding: [
    "images/wedding/w1.png",
    "images/wedding/w2.jpg",
    "images/wedding/w3.jpg"
  ],
  prewedding: [
    "images/prewedding/p1.jpg",
    "images/prewedding/p2.jpg"
  ],
  portrait: [
    "images/portrait/pt1.jpg",
    "images/portrait/pt2.jpg"
  ],
  events: [
    "images/events/e1.jpg",
    "images/events/e2.jpg"
  ],
  graphics: [
    "images/graphics/g1.jpg"
  ]
};

const grid = document.querySelector(".portfolio-grid");
const buttons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

// 🔹 Render function
function showImages(category){

  grid.innerHTML = "";

  let imagesToShow = [];

  if(category === "all"){
    Object.values(portfolioData).forEach(arr=>{
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
    img.addEventListener("click", ()=>{
      lightbox.style.display = "flex";
      lightboxImg.src = src;
    });

    div.appendChild(img);
    grid.appendChild(div);
  });

}

// 🔹 Filter buttons
buttons.forEach(btn=>{
  btn.addEventListener("click", ()=>{

    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");

    showImages(btn.dataset.filter);

  });
});

// 🔹 Lightbox close
document.querySelector(".close-lightbox").onclick = ()=>{
  lightbox.style.display = "none";
};

lightbox.onclick = (e)=>{
  if(e.target === lightbox){
    lightbox.style.display = "none";
  }
};

// 🔹 Initial load
showImages("all");

