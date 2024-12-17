import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export function Laptop() {
  const topModel = useGLTF("/assets/LaptopTop.glb");
  const bottomModel = useGLTF("/assets/LaptopBottom.glb");

  // reference to the grouped laptop object and the top so we can rotate it about x-axis

  const groupRef = useRef<THREE.Group>(null);
  const topRef = useRef<THREE.Mesh>(null);

  // gsap.timeline({
  //   scrollTrigger: {
  //     trigger:
  //   }
  // })

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0.3}>
      <mesh ref={topRef}>
        <primitive object={topModel.nodes.Top} />
      </mesh>
      <mesh>
        <primitive object={bottomModel.nodes.Bottom} />
      </mesh>
    </group>
  );
}
