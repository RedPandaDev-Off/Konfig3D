import * as THREE from "three";

export function createTable({ width, height, depth, color }) {
  const tabletopThickness = 0.1;
  const legThickness = 0.1;
  const legHeight = height - tabletopThickness;

  const tabletopGeometry = new THREE.BoxGeometry(width, tabletopThickness, depth);
  const legGeometry = new THREE.BoxGeometry(legThickness, legHeight, legThickness);
const textureLoader = new THREE.TextureLoader();

const colorMap = textureLoader.load('/textures/wood/Color.jpg');
const normalMap = textureLoader.load('/textures/wood/NormalGL.jpg');
const roughnessMap = textureLoader.load('/textures/wood/Roughness.jpg');

colorMap.colorSpace = THREE.SRGBColorSpace;

const material = new THREE.MeshStandardMaterial({
  map: colorMap,
  normalMap: normalMap,
  roughnessMap: roughnessMap,
});

  const table = new THREE.Group();

  const tabletop = new THREE.Mesh(tabletopGeometry, material);
  tabletop.name = "tabletop";
  tabletop.position.y = tabletopThickness/ 2;
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
    const leg = new THREE.Mesh(legGeometry, material);
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
  });
}
