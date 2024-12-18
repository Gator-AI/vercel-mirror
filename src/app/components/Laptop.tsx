import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useEffect } from "react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export function Laptop() {
  const topModel = useGLTF("/assets/LaptopTop.glb");
  const bottomModel = useGLTF("/assets/LaptopBottom.glb");

  // reference to the grouped laptop object and the top so we can rotate it about x-axis

  const groupRef = useRef<THREE.Group>(null);
  const topRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!groupRef.current || !topRef.current) return;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      })
      .to(topRef.current.rotation, {
        x: Math.PI,
        ease: "power2.inOut",
      });
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      rotation={[0.1, 0, Math.PI]}
      scale={0.3}
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
