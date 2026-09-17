import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import useFurnitureStore from "./store/useFurnitureStore";
import Stats from "stats.js";

function Viewer3D() {
  const containerRef = useRef(null);
  const boxWidth = useFurnitureStore((state) => state.boxWidth);
  const boxDepth = useFurnitureStore((state) => state.boxDepth);
  const boxHeight = useFurnitureStore((state) => state.boxHeight);
  const cubeRef = useRef(null);

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

    const geometry = new THREE.BoxGeometry(boxDepth, boxHeight, boxWidth);

    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

    const cubeTest = new THREE.Mesh(geometry, material);
    cubeRef.current = cubeTest; // ajoute cette ligne
    scene.add(cubeTest);

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

      //cubeTest.rotation.x += 0.01
      //cubeTest.rotation.y += 0.01
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
      geometry.dispose();
      material.dispose();
      container.removeChild(stats.dom);
    };
  }, []);
  useEffect(() => {
    if (cubeRef.current) {
      const oldGeometry = cubeRef.current.geometry;
      cubeRef.current.geometry = new THREE.BoxGeometry(
        boxWidth,
        boxHeight,
        boxDepth,
      );
      oldGeometry.dispose();
    }
  }, [boxWidth, boxHeight, boxDepth]);

  return <div ref={containerRef} className="absolute inset-0" />;
}

export default Viewer3D;
