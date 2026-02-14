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

    allCards = cards;



    const style = getComputedStyle(allCards[0]);
    const margin = parseInt(style.marginLeft) + parseInt(style.marginRight);
    cardWidth = allCards[0].offsetWidth + margin;
    const viewport = document.querySelector(".carousel-viewport");
    viewport.style.width = `${cardWidth * 3}px`;

    container.style.transform = `translateX(-${cardWidth * (index + 1)}px)`;

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

    // stop at last possible slide
    if (index >= allCards.length - 3) return;

    isAnimating = true;
    index++;
    updateCarousel(true);
}

function prev() {
    if (isAnimating) return;

    // stop at first slide
    if (index <= 0) return;

    isAnimating = true;
    index--;
    updateCarousel(true);
}

// Reset when hitting clones
container.addEventListener("transitionend", () => {
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

    // Because 3 cards are visible, the center is index + 1
    const centerIndex = index + 1;

    const centerCard = allCards[centerIndex];
    const leftCard = allCards[centerIndex - 1];
    const rightCard = allCards[centerIndex + 1];

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
            index = i + 2;
            updateCarousel(true);
        });
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index - 2]?.classList.add("active");
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
