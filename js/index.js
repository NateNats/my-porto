document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(".card, .thanks");

    revealElements.forEach((el, index) => {
        el.classList.add("reveal");
        el.style.setProperty("--reveal-delay", `${index * 0.12}s`);
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px",
        }
    );

    revealElements.forEach((el) => observer.observe(el));

    const slides = document.querySelectorAll(".project-slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.getElementById("prev-project");
    const nextBtn = document.getElementById("next-project");
    let currentSlide = 0;

    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");

        currentSlide = index;

        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => goToSlide(currentSlide - 1));
        nextBtn.addEventListener("click", () => goToSlide(currentSlide + 1));
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => goToSlide(index));
        dot.style.cursor = "pointer";
    });
});
