import React, { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber'

// SphereComponent.js
import { Sphere } from '@react-three/drei';
function SphereComponent({ color }) {
  return (
    <Sphere args={[1, 32, 32]}>
      <meshStandardMaterial color={color} />
    </Sphere>
  );
}



const spheres = [
  { id: 0, color: 'blue' },
  { id: 1, color: 'red' },
  { id: 2, color: 'green' },
  // Add more spheres as needed
];

function Swiper() {
  const { camera } = useThree();
  const groupRef = useRef();
  const prevMouseX = useRef();

  const handleMouseMove = (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const delta = prevMouseX.current - mouseX;

    groupRef.current.rotation.y += delta * 4;
    prevMouseX.current = mouseX;
  };

  useFrame(() => {
    camera.lookAt(groupRef.current.position);
  });

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      onMouseMove={handleMouseMove}
    >
      <group ref={groupRef}>
        {spheres.map((sphere) => (
          <SphereComponent key={sphere.id} color={sphere.color} />
        ))}
      </group>
    </div>
  );
}

export default Swiper;