import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import useFurnitureStore from "./store/useFurnitureStore";
import Stats from "stats.js";
import { createTable, updateTable } from "./furniture/createTable";
function Viewer3D() {
  const containerRef = useRef(null);
  const boxWidth = useFurnitureStore((state) => state.boxWidth);
  const boxDepth = useFurnitureStore((state) => state.boxDepth);
  const boxHeight = useFurnitureStore((state) => state.boxHeight);
  const cubeRef = useRef(null);
  const color = useFurnitureStore((state) => state.color);
  const furnitureType = useFurnitureStore((state) => state.furnitureType);


  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();

    //perf state
    const stats = new Stats();
    stats.showPanel(0); // 0 = FPS, 1 = ms par frame, 2 = mémoire
    container.appendChild(stats.dom);

    let fov = 75;
    let aspect =
      containerRef.current.clientWidth / containerRef.current.clientHeight;
    let near = 0.1;
    let far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 10;

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(-1, 2, 4);
    scene.add(light);



const table = createTable({ width: boxWidth, height: boxHeight, depth: boxDepth, color });
cubeRef.current = table;
scene.add(table);

    const renderer = new THREE.WebGLRenderer({alpha: true});
    containerRef.current.appendChild(renderer.domElement);
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight,
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    function handleResize() {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    //animate the cube
    let animationId;
    function animate() {
      stats.begin();

      //mesh.rotation.x += 0.01
      //mesh.rotation.y += 0.01
      controls.update();
      renderer.render(scene, camera);
      stats.end();
      animationId = requestAnimationFrame(animate);
    }
    animationId = requestAnimationFrame(animate);

return () => {
  cancelAnimationFrame(animationId);
  resizeObserver.disconnect();
  controls.dispose();
  container.removeChild(renderer.domElement);
  renderer.dispose();
  table.traverse((child) => {
    if (child.geometry) child.geometry.dispose();
    if (child.material) child.material.dispose();
  });
  container.removeChild(stats.dom);
};
  }, []);

useEffect(() => {
  if (cubeRef.current) {
    updateTable(cubeRef.current, { width: boxWidth, height: boxHeight, depth: boxDepth });
  }
}, [boxWidth, boxHeight, boxDepth]);
useEffect(() => {
  if (cubeRef.current) {
    cubeRef.current.traverse((child) => {
      if (child.material) child.material.color.set(color);
    });
  }
}, [color]);
  return <div ref={containerRef} className="absolute inset-0" />;
}

export default Viewer3D;
