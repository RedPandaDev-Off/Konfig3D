import * as THREE from "three";
import { TEXTURES } from "./textures";
import { loadTextureSet } from "./textureLoader";

const textureSize = 0.5;

function applyRepeat(mat, repeatX, repeatY) {
  mat.userData.repeat = [repeatX, repeatY];
  [mat.map, mat.normalMap, mat.roughnessMap].forEach((tex) => {
    if (!tex) return;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
    tex.needsUpdate = true;
  });
}

function makeFaceMaterial(map, normalMap, roughnessMap, repeatX, repeatY) {
  const mat = new THREE.MeshStandardMaterial({
    map: map.clone(),
    normalMap: normalMap.clone(),
    roughnessMap: roughnessMap.clone(),
  });
  applyRepeat(mat, repeatX, repeatY);
  return mat;
}

export function createTable({ width, height, depth, color, textureIndex = 0 }) {
  const tabletopThickness = 0.1;
  const legThickness = 0.1;
  const legHeight = height - tabletopThickness;

  const tabletopGeometry = new THREE.BoxGeometry(width, tabletopThickness, depth);
  const legGeometry = new THREE.BoxGeometry(legThickness, legHeight, legThickness);

  const entry = TEXTURES[textureIndex];
  const { map, normalMap, roughnessMap } = loadTextureSet(entry);

  const faceMaterial = makeFaceMaterial(map, normalMap, roughnessMap, width / textureSize, depth / textureSize);
  const edgeMaterialLR = makeFaceMaterial(map, normalMap, roughnessMap, depth / textureSize, tabletopThickness / textureSize);
  const edgeMaterialFB = makeFaceMaterial(map, normalMap, roughnessMap, width / textureSize, tabletopThickness / textureSize);
  const legMaterial = makeFaceMaterial(map, normalMap, roughnessMap, legThickness / textureSize, legHeight / textureSize);

  const table = new THREE.Group();

  const tabletop = new THREE.Mesh(tabletopGeometry, [
    edgeMaterialLR, edgeMaterialLR, // +x, -x (tranches gauche/droite)
    faceMaterial, faceMaterial,     // +y, -y (dessus/dessous)
    edgeMaterialFB, edgeMaterialFB, // +z, -z (tranches avant/arrière)
  ]);
  tabletop.name = "tabletop";
  tabletop.position.y = tabletopThickness / 2;
  table.add(tabletop);

  const legOffsetX = width / 2 - legThickness / 2;
  const legOffsetZ = depth / 2 - legThickness / 2;
  const legPositions = [
    { name: "legFrontLeft",  x:  legOffsetX, z:  legOffsetZ },
    { name: "legFrontRight", x: -legOffsetX, z:  legOffsetZ },
    { name: "legBackLeft",   x:  legOffsetX, z: -legOffsetZ },
    { name: "legBackRight",  x: -legOffsetX, z: -legOffsetZ },
  ];

  legPositions.forEach(({ name, x, z }) => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.name = name;
    leg.position.set(x, -legHeight / 2, z);
    table.add(leg);
  });

  return table;
}

export function updateTable(table, { width, height, depth }) {
  const tabletopThickness = 0.1;
  const legThickness = 0.1;
  const legHeight = height - tabletopThickness;

  const tabletop = table.getObjectByName("tabletop");
  const oldTabletopGeometry = tabletop.geometry;
  tabletop.geometry = new THREE.BoxGeometry(width, tabletopThickness, depth);
  oldTabletopGeometry.dispose();
  tabletop.position.y = tabletopThickness / 2;

  const [edgeMaterialLR, , faceMaterial, , edgeMaterialFB] = tabletop.material;
  applyRepeat(faceMaterial, width / textureSize, depth / textureSize);
  applyRepeat(edgeMaterialLR, depth / textureSize, tabletopThickness / textureSize);
  applyRepeat(edgeMaterialFB, width / textureSize, tabletopThickness / textureSize);

  const legOffsetX = width / 2 - legThickness / 2;
  const legOffsetZ = depth / 2 - legThickness / 2;
  const legConfigs = [
    { name: "legFrontLeft",  x:  legOffsetX, z:  legOffsetZ },
    { name: "legFrontRight", x: -legOffsetX, z:  legOffsetZ },
    { name: "legBackLeft",   x:  legOffsetX, z: -legOffsetZ },
    { name: "legBackRight",  x: -legOffsetX, z: -legOffsetZ },
  ];

  legConfigs.forEach(({ name, x, z }) => {
    const leg = table.getObjectByName(name);
    const oldLegGeometry = leg.geometry;
    leg.geometry = new THREE.BoxGeometry(legThickness, legHeight, legThickness);
    oldLegGeometry.dispose();
    leg.position.set(x, -legHeight / 2, z);
    applyRepeat(leg.material, legThickness / textureSize, legHeight / textureSize);
  });
}
