import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

gsap.registerPlugin(ScrollTrigger);

export function Laptop() {
  const topModel = useGLTF("/assets/LaptopTop.glb");
  const bottomModel = useGLTF("/assets/LaptopBottom.glb");
  const groupRef = useRef<THREE.Group>(null);
  const topRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (!groupRef.current || !topRef.current) return;
    // bounding box for the center of topModel
    const boundingBox = new THREE.Box3().setFromObject(topRef.current);
    const center = new THREE.Vector3();
    boundingBox.getCenter(center);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#animation-frame-2",
        start: "top bottom",
        end: "50% top",
        scrub: true,
      },
    });
    timeline.to(topRef.current.rotation, {
      x: Math.PI / 2,
      ease: "power2.inOut",
    });

    timeline.to(
      camera.position,
      {
        x: center.x,
        y: center.y,
        z: center.z + 0.3,
        ease: "power2.inOut",
        onUpdate: () => {
          camera.lookAt(center);
        },
      },
      "<"
    );
    // timeline.to(
    //   groupRef.current.position,
    //   {
    //     x: -0.065,
    //     ease: "power2.inOut",
    //   },
    //   "<"
    // );
    // Zoom in by adjusting the camera's FOV
    timeline.to(
      camera,
      {
        fov: 22, // Adjust to your desired zoom level
        ease: "power2.inOut",
        onUpdate: () => camera.updateProjectionMatrix(),
      },
      "<"
    );
  }, [camera]);
  return (
    <group
      ref={groupRef}
      position={[0.05, -0.95, 0]}
      rotation={[0, 0, Math.PI]}
      scale={0.25}
    >
      <mesh ref={topRef} rotation={[0, 0, Math.PI]}>
        <primitive object={topModel.nodes.Top} />
      </mesh>
      <mesh>
        <primitive
          object={bottomModel.nodes.Bottom}
          rotation={[0, 0, Math.PI]}
        />
      </mesh>
    </group>
  );
}
