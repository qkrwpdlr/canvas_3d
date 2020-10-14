import Test, { Planet, Sun } from "./dummy3d"
// import ReactDOM from "react-dom"
// import { MainComponent } from "./component/index.js"

const main = () => {
    var canvas = new Test(window.innerWidth, window.innerHeight)
    // const root = document.getElementById("root")
    // ReactDOM.render(<MainComponent />, root)

    document.createElement("div")
    document.body.appendChild(canvas.getDomElement());
    const planets = [
        { distance: 3, speed: 0.02 },
        { distance: 6, speed: 0.02 },
        { distance: 9, speed: 0.02 },
    ]
    canvas.add(new Sun());
    for (let planet of planets) canvas.add(new Planet(planet))
}

window.onload = main