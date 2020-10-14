import * as THREE from "three/build/three.module";

export class SolarSystem {
  constructor(width, height) {
    this.timer = null;
    this._init(width, height);
    this._test();
    this._setBackground();
    this._setSize();
    this.render();
    this._activeObjectIndex = 0;
    this._mouseEvent();
    this._keyEvent();
    this.camera.position.x = 0;
    this.camera.position.y = 29;
    this.camera.position.z = 20;
    this.camera.up.set(0, 0, 1);
    this.camera.lookAt(0, 9, 0);
  }
  _init(width, height) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.objs = [];
    this.distance = 7;
  }
  _setBackground() {
    const backlight = new THREE.AmbientLight(0x404040); // soft white light
    this.scene.add(backlight);
    const light = new THREE.PointLight(0xffffff, 5, 100);
    light.position.set(0, 0, 0);
    this.scene.add(light);
    const geometry = new THREE.Geometry();

    for (let i = 0; i < 100000; i++) {
      const star = new THREE.Vector3();
      star.x = THREE.Math.randFloatSpread(2000);
      star.y = THREE.Math.randFloatSpread(2000);
      star.z = THREE.Math.randFloatSpread(2000);
      geometry.vertices.push(star);
    }

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
    });
    const starField = new THREE.Points(geometry, material);
    this.scene.add(starField);
  }
  _setSize() {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
  _test() {
    this.t = 0;
    this.camera.useQuaternion = true;
    this.startQuaternion = new THREE.Quaternion().set(0, 0, 0, 1).normalize();
    this.endQuaternion = new THREE.Quaternion().set(0, 0, 0, 1).normalize();
  }
  _testRender() {
    // const distance = 20;
    // const target = 9;
    // this.camera.position.set(
    //   Math.sin(this.t) * distance,
    //   target + Math.cos(this.t) * distance,
    //   10
    // );
    // this.t += 0.01;
  }
  _keyEvent() {
    const keyPress = (e) => {
      if (e.code === "KeyA") {
        this.change(this._activeObjectIndex + 1);
      } else if (e.code === "KeyZ") {
        this.distance += 0.5;
      } else if (e.code === "KeyX") {
        this.distance -= 0.5;
      }
    };
    document.addEventListener("keypress", keyPress);
  }
  _mouseEvent() {
    const { distance } = this;

    const mouseDown = () => {
      document.addEventListener("mousemove", mouseMove);
    };
    const mouseUp = () => {
      document.removeEventListener("mouseup", mouseUp);
      document.removeEventListener("mousemove", mouseMove);
    };
    const mouseMove = (e) => {
      this.t += e.movementX / 60;
      const { x, y } = this.objs[this._activeObjectIndex].obj.position;
      this.camera.position.set(
        x + Math.sin(this.t) * distance,
        y + Math.cos(this.t) * distance,
        3
      );
      this.camera.up.set(0, 0, 1);
      this.camera.lookAt(x, y, 0);

      document.addEventListener("mouseup", mouseUp);
    };
    document.addEventListener("mousedown", mouseDown);
    window.addEventListener("mousewheel", (e) => {
      if (e.deltaY > 0) {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.timer = null;
          this.change(this._activeObjectIndex + 1);
        }, 100);
      } else if (e.deltaY < 0) {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.timer = null;
          if (this._activeObjectIndex === 0) this.change(this.objs.length - 1);
          else this.change(this._activeObjectIndex - 1);
        }, 100);
      }
    });
  }
  get domElement() {
    return this.renderer.domElement;
  }
  add(obj) {
    if (this.targetObj === null) this.targetObj = obj;
    this.scene.add(obj.obj);
    this.objs.push(obj);
  }
  change(index) {
    this._activeObjectIndex = index % this.objs.length;
    const { x, y } = this.objs[this._activeObjectIndex].obj.position;
    this.camera.up.set(0, 0, 1);
    this.camera.lookAt(x, y, 0);
  }
  render() {
    for (let obj of this.objs) {
      obj.render();
    }
    if (this.objs.length > 0) {
      const { distance } = this;
      const { x, y } = this.objs[this._activeObjectIndex].obj.position;
      this.camera.position.set(
        x + Math.sin(this.t) * distance,
        y + Math.cos(this.t) * distance,
        3
      );

      this.camera.up.set(0, 0, 1);
      this.camera.lookAt(x, y, 0);
    }

    this._testRender();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());
  }
}
export class Obj {
  constructor() {}
  render() {}
}
export class Planet extends Obj {
  constructor({ distance, speed }) {
    super();
    const geometry = new THREE.SphereGeometry(0.5, 100, 100);
    const loader = new THREE.TextureLoader();
    const material = new THREE.MeshLambertMaterial({
      map: loader.load("./assets/earth.jpg"),
    });
    this.obj = new THREE.Mesh(geometry, material);
    this.obj.position.z = 0;
    this.obj.position.x = 0;
    this.obj.position.y = 0;
    this.time = 0;
    this.speed = speed;
    this.distance = distance;
  }
  rotateAnimation() {
    this.obj.position.x = this.distance * Math.sin(this.time);
    this.obj.position.y = this.distance * Math.cos(this.time);
    this.time += this.speed;
    this.obj.rotation.z -= 0.03;
    // this.obj.rotation.y -= 0.01;
  }
  render() {
    this.rotateAnimation();
  }
}

export class Sun extends Obj {
  constructor() {
    super({ distance: 0, speed: 0 });
    this.obj.material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  }
}
