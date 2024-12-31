'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture, Text } from '@react-three/drei'
import * as THREE from 'three'

interface EarthProps {
  position: [number, number, number];
  size: number;
  onClick: () => void;
  isFocused: boolean;
  time: number;
}

export default function Earth({ position, size, onClick, isFocused, time }: EarthProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [dayTexture, nightTexture, cloudsTexture] = useTexture([
    '/assets/earth-day.jpg',
    '/assets/earth-night.jpg',
    '/assets/earth-clouds.png'
  ])

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002 * delta

      // Orbital motion
      const orbitalPeriod = 1 // Earth's orbital period is 1 Earth year
      const angle = (time / orbitalPeriod) * Math.PI * 2
      meshRef.current.position.x = position[0] * Math.cos(angle)
      meshRef.current.position.z = position[0] * Math.sin(angle)

      // Add a slight wobble to the planet's position
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group>
      <mesh ref={meshRef} onClick={onClick}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshPhongMaterial
          map={dayTexture}
          specularMap={nightTexture}
          shininess={5}
        />
        <mesh>
          <sphereGeometry args={[size * 1.01, 32, 32]} />
          <meshPhongMaterial
            map={cloudsTexture}
            transparent={true}
            opacity={0.4}
          />
        </mesh>
      </mesh>
      <Text
        position={[0, size + 1, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Earth
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

