import Test, { Planet, Sun } from "./3d.js"
// import ReactDOM from "react-dom"
// import { MainComponent } from "./component/index.js"

const main = () => {
    var canvas = new Test(window.innerWidth, window.innerHeight)

    // const root = document.getElementById("root")
    // ReactDOM.render(<MainComponent />, root)

    document.createElement("div")
    document.body.appendChild(canvas.getDomElement());
    const planets = [
        { distance: 3, speed: Math.random() % 0.01 },
        { distance: 6, speed: Math.random() % 0.01 },
        { distance: 9, speed: Math.random() % 0.01 },
    ]
    canvas.add(new Sun());
    for (let planet of planets) canvas.add(new Planet(planet))
}

window.onload = main