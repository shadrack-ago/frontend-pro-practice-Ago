
const slider = document.querySelector('.testimonial-slider');
const testimonials = document.querySelectorAll('.testimonial-content');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.dots-container');

let currentIndex = 0;
const testimonialCount = testimonials.length;
let autoSlideInterval;
const autoSlideDelay = 5000; // 5 seconds

function updateDots() {
    dotsContainer.innerHTML = ''; // Clear existing dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.dataset.index = index;
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
    });
    highlightActiveDot();
}

function highlightActiveDot() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    testimonials[index].classList.add('active');
    currentIndex = index;
    highlightActiveDot();
}

function goToPrev() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonialCount - 1;
    goToSlide(currentIndex);
    resetAutoSlide();
}

function goToNext() {
    currentIndex = (currentIndex < testimonialCount - 1) ? currentIndex + 1 : 0;
    goToSlide(currentIndex);
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(goToNext, autoSlideDelay);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Event listeners
prevBtn.addEventListener('click', goToPrev);
nextBtn.addEventListener('click', goToNext);

// Initialize
updateDots();
goToSlide(0); // Show the first testimonial initially
startAutoSlide();