import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import "promise-polyfill/src/polyfill";
import { WEBGL } from "three/examples/jsm/WebGL.js";
import * as Stats from "stats.js";
import * as OfflinePluginRuntime from "offline-plugin/runtime";
import { Refractor } from "three/examples/jsm/objects/Refractor.js";
import { WaterRefractionShader } from "three/examples/jsm/shaders/WaterRefractionShader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// import FireSfx from "../static/audio/fire_compressed.mp3";
// import Image from "../static/images/es6.png";
import "../sass/style.scss";
import "../static/html/index.html";
OfflinePluginRuntime.install();

/*Threejs Vars */
// these need to be accessed inside more than one function so we'll declare them
let container;
let camera;
let renderer;
let scene;
let mesh;
let refractor;
let controls;
/* TweenjS vars*/
const duration = 8000;
let cubeRotateTweenA;
let outerLayerTween;
const rotateCoords = new THREE.Vector3(Math.PI, Math.PI, Math.PI);
const clock = new THREE.Clock();

function init() {
  container = document.querySelector("#three-container");
  // create a Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x2b3a42);
  // set up the options for a perspective camera
  const fov = 35; // fov = Field Of View
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 100;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  // every object is initially created at ( 0, 0, 0 )
  // we'll move the camera back a bit so that we can view the scene
  camera.position.set(0, 0, 10);

  /* Init refractor*/
  var refractorGeometry = new THREE.BoxBufferGeometry(2.5, 2.5, 2.5);
  // refractor = new Refractor(refractorGeometry, {
  //   color: 0xfff8f8,
  //   textureWidth: 1024,
  //   textureHeight: 1024,
  //   shader: WaterRefractionShader
  // });
  // refractor.position.set(0, 0, 1);
  // scene.add(refractor);
  const testMat = new THREE.MeshPhongMaterial({
    color: 0x8dd6f9,
    opacity: 0.3,
    transparent: true
  });
  const test = new THREE.Mesh(refractorGeometry, testMat);
  scene.add(test);
  const geometry = new THREE.BoxBufferGeometry(2, 2, 2);

  const material = new THREE.MeshStandardMaterial({ color: 0x155b93 });

  mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);
  console.log(mesh.rotation);
  const light = new THREE.DirectionalLight(0xffffff, 2.0);

  light.position.set(10, 10, 10);

  scene.add(light);

  //Initialize the rotation tween from 0deg to 360deg
  cubeRotateTweenA = new TWEEN.Tween(mesh.rotation)
    .to(rotateCoords, duration)
    .easing(TWEEN.Easing.Linear.None);

  cubeRotateTweenA.start();
  cubeRotateTweenA.repeat(Infinity);

  //Rotate outer shell
  outerLayerTween = new TWEEN.Tween(test.rotation)
    .to(rotateCoords, duration)
    .easing(TWEEN.Easing.Linear.None);

  outerLayerTween.start();
  outerLayerTween.repeat(Infinity);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x20252f);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);
  controls = new OrbitControls(camera, renderer.domElement);

  renderer.setAnimationLoop(() => {
    update();
    render();
  });
}

function update() {
  // mesh.rotation.z += 0.01;
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.01;
  TWEEN.update();
}

function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

/* https://threejs.org/docs/#manual/en/introduction/WebGL-compatibility-check */
if (WEBGL.isWebGLAvailable()) {
  window.addEventListener("resize", onWindowResize);
  init();
} else {
  const warning = WEBGL.getWebGLErrorMessage();
  document.getElementById("three-container").appendChild(warning);
}
