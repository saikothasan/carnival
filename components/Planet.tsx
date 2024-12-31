'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, useTexture } from '@react-three/drei'
import * as THREE from 'three'

export default function Planet({ position, size, textureUrl, name, rotationSpeed, orbitalPeriod, onClick, isFocused, time }) {
  const meshRef = useRef()
  const texture = useTexture(textureUrl)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * delta

      // Orbital motion
      if (orbitalPeriod) {
        const angle = (time / orbitalPeriod) * Math.PI * 2
        meshRef.current.position.x = position[0] * Math.cos(angle)
        meshRef.current.position.z = position[0] * Math.sin(angle)
      } else {
        // For the Sun, which doesn't orbit
        meshRef.current.position.set(...position)
      }

      // Add a slight wobble to the planet's position
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group>
      <mesh ref={meshRef} onClick={onClick}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={texture} />
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

