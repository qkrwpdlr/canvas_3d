import { Planet } from "./model";
import dummys from "./dummy";
const initData = () => {
  const temp = [];
  for (let dummy of dummys)
    temp.push(
      new Planet(
        dummy.orbitalSpeed,
        dummy.rotationSpeed,
        dummy.distance,
        dummy.radius,
        dummy.planetName,
        dummy.cycle
      )
    );
  return temp;
};

export const datas = initData();
