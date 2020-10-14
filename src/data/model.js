export class Planet {
  constructor(
    //공전속도
    orbitalSpeed,
    //자전속도
    rotationSpeed,
    // 태양과의 거리
    distance,
    // 행성의 지름
    radius
  ) {
    this.orbitalSpeed = orbitalSpeed;
    this.rotationSpeed = rotationSpeed;
    this.distance = distance;
    this.radius = radius;
    this.id = uuidv4();
  }
}

const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
