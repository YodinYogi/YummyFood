// ======================================
// 1. Sticky Navbar Glass Effect
// ======================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});


// ======================================
// 2. CAROUSEL SETUP (INFINITE SLIDER)
// ======================================
const container = document.getElementById("menuContainer");
const cards = Array.from(document.querySelectorAll(".menu-card"));
const btnNext = document.getElementById("scrollRight");
const btnPrev = document.getElementById("scrollLeft");
const dotsContainer = document.querySelector(".carousel-dots");

let index = 1;
let cardWidth;
let isAnimating = false;
let allCards;

// Clone first & last for infinite illusion
function setupCarousel() {
    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[cards.length - 1].cloneNode(true);

    container.appendChild(firstClone);
    container.insertBefore(lastClone, container.firstChild);

    allCards = document.querySelectorAll(".menu-card");
    cardWidth = allCards[0].offsetWidth;

    container.style.transform = `translateX(-${cardWidth * index}px)`;

    createDots();
    updateCarousel(false);
}

function updateCarousel(animate = true) {
    if (animate) container.style.transition = "transform 0.4s ease";
    else container.style.transition = "none";

    container.style.transform = `translateX(-${cardWidth * index}px)`;

    updateActiveCards();
    updateDots();
}

function next() {
    if (isAnimating) return;
    isAnimating = true;
    index++;
    updateCarousel(true);
}

function prev() {
    if (isAnimating) return;
    isAnimating = true;
    index--;
    updateCarousel(true);
}

// Reset when hitting clones
container.addEventListener("transitionend", () => {
    if (index === allCards.length - 1) {
        index = 1;
        updateCarousel(false);
    }
    if (index === 0) {
        index = allCards.length - 2;
        updateCarousel(false);
    }
    isAnimating = false;
});

btnNext.addEventListener("click", next);
btnPrev.addEventListener("click", prev);


// ======================================
// 3. ACTIVE CENTER CARD LOGIC
// ======================================
function updateActiveCards() {
    allCards.forEach(card => {
        card.classList.remove("center", "side");
    });

    const centerCard = allCards[index];
    const leftCard = allCards[index - 1];
    const rightCard = allCards[index + 1];

    if (centerCard) centerCard.classList.add("center");
    if (leftCard) leftCard.classList.add("side");
    if (rightCard) rightCard.classList.add("side");
}


// ======================================
// 4. DOTS NAVIGATION
// ======================================
function createDots() {
    dotsContainer.innerHTML = "";
    cards.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.addEventListener("click", () => {
            index = i + 1;
            updateCarousel(true);
        });
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index - 1]?.classList.add("active");
}


// ======================================
// 5. FORM SUBMIT MESSAGE
// ======================================
const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    form.innerHTML = `
        <h3 style="text-align:center;color:#1d3557;">
            Form submitted. Wait 2–4 hours for our reply. Thank you 🙏
        </h3>
    `;
});


// Init after page loads
window.addEventListener("load", setupCarousel);

// ======================================
// 6. AUTOPLAY
// ======================================
let autoPlay = setInterval(next, 2000);

// Pause on hover (so users can click without rage)
const viewport = document.querySelector(".carousel-viewport");

viewport.addEventListener("mouseenter", () => clearInterval(autoPlay));
viewport.addEventListener("mouseleave", () => autoPlay = setInterval(next, 2000));
