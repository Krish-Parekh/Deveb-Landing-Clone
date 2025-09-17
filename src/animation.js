import gsap from "gsap";

// Ball animation
gsap.set(".ball", { xPercent: -50, yPercent: -50 });
let targets = gsap.utils.toArray(".ball");
window.addEventListener("mousemove", e => {
    gsap.to(targets, {
        duration: 0.35,
        x: e.pageX,
        y: e.pageY,
        ease: "none",
        overwrite: "auto",
        delay: 0.1,
    });
});

// Interactive headline animation
let cursorRadius = 90;
let cursorRadiusTarget = 0;
const headline = document.querySelector(".interactive-headline");

if (headline) {
    const overlay = headline.cloneNode(true);
    overlay.classList.add("interactive-headline-overlay");
    overlay.classList.add("text-white");
    overlay.setAttribute("aria-hidden", "true");
    headline.appendChild(overlay);

    headline.addEventListener("mouseenter", () => {
        cursorRadiusTarget = cursorRadius;
    });
    headline.addEventListener("mouseleave", () => {
        cursorRadiusTarget = 0;
    });

    const updateCursorPositionVars = (e) => {
        const rect = headline.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        headline.style.setProperty("--cursor-x", `${x}px`);
        headline.style.setProperty("--cursor-y", `${y}px`);
    };

    headline.addEventListener("mousemove", updateCursorPositionVars);

    let currentRadius = 0;
    const baseBallRadius = 8;
    gsap.ticker.add(() => {
        currentRadius += (cursorRadiusTarget - currentRadius) * 0.10;
        headline.style.setProperty("--cursor-r", `${currentRadius}px`);

        const scale = Math.max(1, currentRadius / baseBallRadius);
        gsap.set(targets, { scale });
    });
}
