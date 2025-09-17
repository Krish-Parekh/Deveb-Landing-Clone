import gsap from "gsap";

gsap.set(".ball", { xPercent: -50, yPercent: -50 });
let targets = gsap.utils.toArray(".ball");
window.addEventListener("mousemove", e => {
    gsap.to(targets, {
        duration: 0.35,
        x: e.pageX,
        y: e.pageY,
        ease: "none",
        overwrite: "auto",
    });
});

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
        currentRadius += (cursorRadiusTarget - currentRadius) * 0.15;
        headline.style.setProperty("--cursor-r", `${currentRadius}px`);

        const scale = Math.max(1, currentRadius / baseBallRadius);
        gsap.set(targets, { scale });
    });
}


const magneticButtons = document.querySelectorAll(".magnetic-button");

function handleMagneticMove(e) {
  magneticButtons.forEach((button) => {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.hypot(dx, dy);
    const radius = Math.max(rect.width, rect.height) * 1;

    if (distance < radius) {
      const strength = 0.15;
      gsap.to(button, {
        x: dx * strength,
        y: dy * strength,
        duration: 0.3,
        ease: "power3.out",
      });
    } else {
      gsap.to(button, { x: 0, y: 0, duration: 0.45, ease: "power3.out" });
    }
  });
}

if (magneticButtons.length) {
  window.addEventListener("mousemove", handleMagneticMove);
  magneticButtons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      gsap.to(button, { scale: 1.06, duration: 0.3, ease: "power3.out" });
    });
    button.addEventListener("mouseleave", () => {
      gsap.to(button, { x: 0, y: 0, scale: 1, duration: 0.45, ease: "power3.out" });
    });
  });
}
