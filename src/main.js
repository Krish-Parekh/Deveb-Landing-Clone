import * as THREE from "three";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Lenis from 'lenis'

const lenis = new Lenis({
  autoRaf: true,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.registerPlugin(ScrollTrigger);

const canvas = document.querySelector("canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const geometry = new THREE.IcosahedronGeometry(3, 50, 50);
const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uColorChange: { value: 0 },
  },
});
const icosahedron = new THREE.Mesh(geometry, shaderMaterial);
icosahedron.position.y = -4.1;
camera.position.z = 4;

scene.add(icosahedron);

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".landing",
    start: "top top",
    end: "bottom center",
    scrub: 2,
  },
});

tl.to(
  icosahedron.position,
  {
    y: 0,
    z: -2,
    ease: "power2.inOut",
  },
  "a"
).to(
  shaderMaterial.uniforms.uColorChange,
  {
    value: 1,
    ease: "linear",
    duration: 1,
  },
  "a"
);

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
  renderer.render(scene, camera);
  update();
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


animate();
