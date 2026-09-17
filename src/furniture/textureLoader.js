import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();
const cache = new Map();

export function loadTextureSet(entry) {
  if (cache.has(entry.id)) return cache.get(entry.id);
  const colorMap = textureLoader.load(entry.colorMap);
  colorMap.colorSpace = THREE.SRGBColorSpace;
  const set = {
    map: colorMap,
    normalMap: textureLoader.load(entry.normalMap),
    roughnessMap: textureLoader.load(entry.roughnessMap),
  };
  cache.set(entry.id, set);
  return set;
}

export function setTableTexture(table, entry) {
  const { map, normalMap, roughnessMap } = loadTextureSet(entry);

  table.traverse((child) => {
    if (!child.material) return;
    const materials = Array.isArray(child.material) ? child.material : [child.material];

    materials.forEach((mat) => {
      if (!mat.userData?.repeat) return;
      const [repeatX, repeatY] = mat.userData.repeat;

      const clonedMap = map.clone();
      const clonedNormal = normalMap.clone();
      const clonedRoughness = roughnessMap.clone();

      [clonedMap, clonedNormal, clonedRoughness].forEach((tex) => {
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(repeatX, repeatY);
        tex.needsUpdate = true;
      });

      mat.map = clonedMap;
      mat.normalMap = clonedNormal;
      mat.roughnessMap = clonedRoughness;
      mat.needsUpdate = true;
    });
  });
}