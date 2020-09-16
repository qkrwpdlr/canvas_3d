import * as THREE from "three/build/three.module"

export default class {
    constructor(width, height) {
        console.log("init")
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();

        this.objs = []
        var light = new THREE.PointLight(0xFFFFFF, 1, 500)
        light.position.set(10, 0, 25)
        this.scene.add(light)

        this.renderer.setSize(width, height);
        this.camera.position.z = 10
        this._mouseEvent()
        this._keyEvent()
        this.render()
    }
    _mouseEvent() {
        const mouseDown = () => {
            document.addEventListener("mousemove", mouseMove)
        }
        const mouseUp = () => {
            document.removeEventListener("mouseup", mouseUp)
            document.removeEventListener("mousemove", mouseMove)
        }
        const mouseMove = (e) => {
            this.camera.position.x -= e.movementX / 40
            this.camera.position.y += e.movementY / 40
            document.addEventListener("mouseup", mouseUp)
        }
        document.addEventListener("mousedown", mouseDown)
    }
    _keyEvent() {
        document.addEventListener("keypress", (e) => {
            console.log(this.camera.position.z)
            if (e.code === "KeyZ") {
                this.camera.position.z += 0.5
            } else if (e.code === "KeyX") {
                this.camera.position.z -= 0.5
            }
        })
    }
    getDomElement() {
        return this.renderer.domElement
    }
    add(obj) {
        this.scene.add(obj.obj);
        this.objs.push(obj)
    }
    render() {
        for (let obj of this.objs) {
            obj.render()
        }
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.render())
    }

}
export class Obj {
    constructor() {
    }
    render() { }

}
export class Cube extends Obj {
    constructor(x = 0, y = 0, z = 0) {
        super(x, y)
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
        this.obj = new THREE.Mesh(geometry, material);
        this.obj.position.x = x
        this.obj.position.y = y
        this.obj.position.z = z
    }
    rotateAnimation() {
        this.obj.rotation.x -= 0.01
        this.obj.rotation.y -= 0.01
    }
    render() {
        this.rotateAnimation()
    }
}
