import { SolarSystem, Planet, Sun } from "./3d.js";
import { datas } from "./data";
const main = () => {
  const system = new SolarSystem(window.innerWidth, window.innerHeight);
  document.body.appendChild(system.domElement);
  for (let data of datas) {
    // if(data.radius > 10000) data.radius = 10000
    const obj = new Planet({
      distance: data.distance * 40,
      speed: 3 / data.cycle,
      size: data.radius / 12000,
      planetName: data.planetName,
    });
    system.add(obj);
  }
};
window.onload = main;
