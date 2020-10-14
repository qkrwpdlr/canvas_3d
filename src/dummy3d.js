import * as THREE from 'three';
import OrbitControls from "./util/orbitControls"
export default class {
    constructor(width, height) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.index = 0
        this.gap = 0.05
        this.objs = []
        const backlight = new THREE.AmbientLight(0xFFFF00); // soft white light
        this.scene.add(backlight)
        const light = new THREE.PointLight(0xFFFFFF, 5, 10)
        light.position.set(0, 0, 2)
        this.targetObj = null
        this.scene.add(light)
        this.renderer.setSize(width, height);
        this.camera.position.z = 40
        this.cameraZ = this.camera.position.z
        this._mouseEvent()
        this._keyEvent()
        this.render()
    }
    _mouseEvent() {
        new OrbitControls(this.camera, this.renderer.domElement);
        // const mouseDown = () => {
        //     document.addEventListener("mousemove", mouseMove)
        // }
        // const mouseUp = () => {
        //     document.removeEventListener("mouseup", mouseUp)
        //     document.removeEventListener("mousemove", mouseMove)
        // }
        // const mouseMove = (e) => {
        //     this.camera.position.x -= e.movementX / 40
        //     this.camera.position.y += e.movementY / 40
        //     document.addEventListener("mouseup", mouseUp)
        // }
        // document.addEventListener("mousedown", mouseDown)
    }
    _keyEvent() {
        document.addEventListener("keypress", (e) => {
            if (e.code === "KeyZ" && this.cameraZ <= 100) {
                this.cameraZ += 5
            } else if (e.code === "KeyX" && this.cameraZ > 5) {
                this.cameraZ -= 5
            }
        })
        const keyPress = (e) => {
            if (e.code === "KeyA") {
                if (this.index >= (this.objs.length - 1)) this.index = 0
                else this.index += 1
                this.targetObj = this.objs[this.index]
                const q1 = new THREE.Quaternion().copy(this.camera.quaternion)
                this.camera.lookAt(new THREE.Vector3(this.targetObj.obj.position.x, this.targetObj.obj.position.y, this.targetObj.obj.position.z))
                const q2 = new THREE.Quaternion().copy(this.camera.quaternion)
            }
        }
        document.addEventListener("keypress", keyPress)

    }
    getDomElement() {
        return this.renderer.domElement
    }
    add(obj) {
        if (this.targetObj === null) this.targetObj = obj
        this.scene.add(obj.obj)
        this.objs.push(obj)
    }
    render() {
        for (let obj of this.objs) {
            obj.render()
        }
        if (this.targetObj !== null) {
            const offset = new THREE.Vector3(this.targetObj.obj.position.x, this.targetObj.obj.position.y, this.cameraZ);
            this.camera.position.lerp(offset, this.gap);
        }
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.render())
    }
}
export class Obj {
    constructor() { }
    render() { }
}
export class Planet extends Obj {
    constructor({ distance, speed }) {
        super()
        const geometry = new THREE.SphereGeometry(0.5, 100, 100);
        const loader = new THREE.TextureLoader();
        const material = new THREE.MeshLambertMaterial({ map: loader.load('./../assets/earth.jpg') });
        this.obj = new THREE.Mesh(geometry, material);
        this.obj.position.z = 0
        this.obj.position.x = 0
        this.obj.position.y = 0
        this.time = 0
        this.speed = speed
        this.distance = distance
    }
    rotateAnimation() {
        this.obj.position.x = this.distance * Math.sin(this.time)
        this.obj.position.y = this.distance * Math.cos(this.time)
        this.time += this.speed
        this.obj.rotation.x -= 0.01
        this.obj.rotation.y -= 0.01
    }
    render() {
        this.rotateAnimation()
    }
}

export class Sun extends Planet {
    constructor() {
        super({ distance: 0, speed: 0 })
        this.obj.material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    }

}
