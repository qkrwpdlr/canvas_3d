import Test, { Cube } from "./3d.js"

const main = () => {
    var canvas = new Test(window.innerWidth, window.innerHeight)

    document.body.appendChild(canvas.getDomElement());

    canvas.add(new Cube(0, 4, 4));
    canvas.add(new Cube(4, 4, 0));
    canvas.add(new Cube(4, 4, 0));
    canvas.add(new Cube(4, 4, 4));
    canvas.add(new Cube(0, 0, 0));
}

window.onload = main