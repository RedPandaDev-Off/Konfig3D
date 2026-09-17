import { applyRepeat } from "./textureLoader"
import * as THREE from "three";
class Panel {
  constructor({ width, height, depth, material, name }) {
    this.geometry = new THREE.BoxGeometry(width, height, depth);
    this.mesh = new THREE.Mesh(this.geometry, material);
    this.mesh.name = name;
    this.material = material;
  }

  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }

  resize(width, height, depth) {
    const old = this.geometry;
    this.geometry = new THREE.BoxGeometry(width, height, depth);
    this.mesh.geometry = this.geometry;
    old.dispose();
  }

  dispose() {
    this.geometry.dispose();
  }

  updateTetxure(repeatX, repeatY){
  
      if (!this.material) return;
      const materials = Array.isArray(this.material) ? this.material : [this.material];
      materials.forEach(element => {
       applyRepeat(element, repeatX, repeatY)
        
      });
    }
  }

export default Panel;

