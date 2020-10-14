import { SolarSystem, Planet, Sun } from "./3d.js";
import { datas } from "./data";
const main = () => {
  const system = new SolarSystem(window.innerWidth, window.innerHeight);
  document.body.appendChild(system.domElement);
  for (let data of datas) {
    const obj = new Planet({
      distance: data.distance * 3,
      speed: data.orbitalSpeed * 0.05,
    });
    system.add(obj);
  }
};
window.onload = main;
