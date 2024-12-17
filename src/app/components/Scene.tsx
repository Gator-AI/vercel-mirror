"use client";
import { Bounds, Box, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
import { Laptop } from "./Laptop";

export function Scene() {
  return (
    <div className="fixed inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <directionalLight intensity={2} position={[1, 2, 3]}></directionalLight>

        <Laptop />

        <axesHelper scale={2} />
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}
