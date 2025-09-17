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