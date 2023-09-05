import React from 'react';

function SphereComponent({ color, position }) {
  return (
     <mesh position={position}>
      <sphereGeometry></sphereGeometry>
      <meshStandardMaterial color={color} />
      </mesh>
  );
}

export default SphereComponent;
