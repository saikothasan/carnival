'use client'

import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Environment, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useRef, useEffect } from 'react'
import * as THREE from 'three'
import Planet from './Planet'
import InfoPanel from './InfoPanel'

const planets = [
  { name: 'Sun', position: [0, 0, 0], size: 5, color: '#FDB813', mass: 1.989e30, rotationSpeed: 0.002, info: 'The star at the center of our Solar System.' },
  { name: 'Mercury', position: [10, 0, 0], size: 0.5, color: '#A9A9A9', mass: 3.285e23, rotationSpeed: 0.01, info: 'The smallest planet in our Solar System and closest to the Sun.' },
  { name: 'Venus', position: [15, 0, 0], size: 0.8, color: '#FFA500', mass: 4.867e24, rotationSpeed: 0.008, info: 'Often called Earth\'s sister planet due to their similar size and mass.' },
  { name: 'Earth', position: [20, 0, 0], size: 1, color: '#4169E1', mass: 5.972e24, rotationSpeed: 0.01, info: 'Our home planet, the only known planet to harbor life.' },
  { name: 'Mars', position: [25, 0, 0], size: 0.7, color: '#FF4500', mass: 6.39e23, rotationSpeed: 0.009, info: 'Known as the Red Planet due to its reddish appearance.' },
  { name: 'Jupiter', position: [35, 0, 0], size: 2, color: '#DEB887', mass: 1.898e27, rotationSpeed: 0.004, info: 'The largest planet in our Solar System.' },
  { name: 'Saturn', position: [45, 0, 0], size: 1.8, color: '#F4A460', mass: 5.683e26, rotationSpeed: 0.003, info: 'Known for its prominent ring system.' },
  { name: 'Uranus', position: [55, 0, 0], size: 1.3, color: '#87CEEB', mass: 8.681e25, rotationSpeed: 0.002, info: 'An ice giant with a tilted rotation axis.' },
  { name: 'Neptune', position: [65, 0, 0], size: 1.2, color: '#4169E1', mass: 1.024e26, rotationSpeed: 0.001, info: 'The windiest planet in our Solar System.' },
]

function CameraController({ focusedPlanet }) {
  const { camera } = useThree()
  const controlsRef = useRef()

  useEffect(() => {
    if (focusedPlanet) {
      const planet = planets.find(p => p.name === focusedPlanet)
      if (planet) {
        const targetPosition = new THREE.Vector3(...planet.position)
        targetPosition.y += 5
        targetPosition.z += 10
        camera.position.copy(targetPosition)
        controlsRef.current.target.set(...planet.position)
      }
    } else {
      camera.position.set(0, 50, 100)
      controlsRef.current.target.set(0, 0, 0)
    }
    controlsRef.current.update()
  }, [focusedPlanet, camera])

  return <OrbitControls ref={controlsRef} />
}

export default function SolarSystem({ focusedPlanet, setFocusedPlanet }) {
  return (
    <>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 50, 100]} />
        <CameraController focusedPlanet={focusedPlanet} />
        <Suspense fallback={null}>
          <Environment preset="night" background />
          <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} />
          <directionalLight position={[0, 10, 5]} intensity={1} />
          <ambientLight intensity={0.2} />
          {planets.map((planet) => (
            <Planet
              key={planet.name}
              {...planet}
              isFocused={focusedPlanet === planet.name}
              onClick={() => setFocusedPlanet(planet.name)}
            />
          ))}
        </Suspense>
      </Canvas>
      <InfoPanel planets={planets} focusedPlanet={focusedPlanet} />
    </>
  )
}

