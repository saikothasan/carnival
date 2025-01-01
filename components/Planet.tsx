'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface PlanetProps {
  position: [number, number, number] // A 3D position vector
  size: number // Radius of the planet
  color: string // Color of the planet material
  name: string // Name of the planet
  rotationSpeed: number // Speed of rotation
  onClick: () => void // Callback for click events
  isFocused: boolean // Whether the planet is focused
}

export default function Planet({
  position,
  size,
  color,
  name,
  rotationSpeed,
  onClick,
  isFocused,
}: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed
    }
  })

  return (
    <group position={position}>
      <mesh ref={meshRef} onClick={onClick}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[0, size + 1, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
      {isFocused && (
        <mesh position={[0, size + 2, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="yellow" />
        </mesh>
      )}
    </group>
  )
}
