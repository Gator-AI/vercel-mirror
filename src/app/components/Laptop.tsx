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

    const boundingBox = new THREE.Box3().setFromObject(topRef.current);
    const center = new THREE.Vector3();
    boundingBox.getCenter(center);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "animation-container",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Hinge opening animation
    timeline.to(topRef.current.rotation, {
      x: Math.PI / 2, // Open hinge to 90 degrees
      ease: "power2.inOut",
    });

    // Adjust group position during scroll
    timeline.to(
      groupRef.current.position,
      {
        x: 0.03,
        y: -1.5,
        z: 0,
        ease: "power2.inOut",
      },
      "<"
    );

    // scale the laptop down as it moves into position
    timeline.to(
      groupRef.current.scale,
      {
        x: 0.4,
        y: 0.4,
        z: 0.4,
        ease: "power2.inOut",
      },
      "<"
    );

    // scale header down
    timeline.to(
      "#header-container",
      {
        scale: 0.8,
        ease: "power2.out",
      },
      "<"
    );

    // smooth camera zoom and focus
    timeline.to(
      camera.position,
      {
        x: center.x,
        y: center.y,
        z: center.z + 1, // Zoom closer to the laptop screen
        ease: "power2.inOut",
        onUpdate: () => {
          camera.lookAt(center);
        },
      },
      "<"
    );

    // Adjust the field of view for better zoom control
    timeline.to(
      camera,
      {
        fov: 30, // Adjust to your desired zoom level
        ease: "power2.inOut",
        onUpdate: () => camera.updateProjectionMatrix(),
      },
      "<"
    );
  }, [camera]);

  return (
    <group
      ref={groupRef}
      position={[0, -0.5, 0]}
      rotation={[0, 0, Math.PI]}
      scale={0.5}
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
