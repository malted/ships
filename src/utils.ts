import * as THREE from "three";

export function rad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function randomSpherePoint(
  pos: THREE.Vector3,
  radius: number,
): THREE.Vector3 {
  var u = Math.random();
  var v = Math.random();
  var theta = 2 * Math.PI * u;
  var phi = Math.acos(2 * v - 1);
  var x = pos.x + radius * Math.sin(phi) * Math.cos(theta);
  var y = pos.y + radius * Math.sin(phi) * Math.sin(theta);
  var z = pos.z + radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export class PickHelper {
  raycaster: THREE.Raycaster;
  pickedObject?: THREE.Object3D;

  constructor() {
    this.raycaster = new THREE.Raycaster();
    this.pickedObject = undefined;
    // this.pickedObjectSavedColor = 0;
  }
  pick(
    normalizedPosition: THREE.Vector2,
    scene: THREE.Scene,
    camera: THREE.Camera,
    time: number,
  ) {
    // restore the color if there is a picked object
    if (this.pickedObject) {
      // this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
      this.pickedObject = undefined;
    }

    // cast a ray through the frustum
    this.raycaster.setFromCamera(normalizedPosition, camera);
    // get the list of objects the ray intersected
    const intersectedObjects = this.raycaster.intersectObjects(scene.children);
    return intersectedObjects;

    // if (intersectedObjects.length) {
    //   // pick the first object. It's the closest one
    //   this.pickedObject = intersectedObjects[0].object;
    //   // save its color
    //   // this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
    //   // set its emissive color to flashing red/yellow
    //   // this.pickedObject.material.emissive.setHex(
    //   //   (time * 8) % 2 > 1 ? 0xffff00 : 0xff0000,
    //   // );
    // }
  }
}
