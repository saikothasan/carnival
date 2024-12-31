'use client'

import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, PerspectiveCamera, useTexture } from '@react-three/drei'
import { Suspense, useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import Planet from './Planet'
import Earth from './Earth'
import OrbitalPath from './OrbitalPath'
import InfoPanel from './InfoPanel'
import AsteroidBelt from './AsteroidBelt'

const planets = [
  { name: 'Sun', position: [0, 0, 0], size: 5, textureUrl: '/2k_sun.jpg', mass: 1.989e30, rotationSpeed: 0.002, info: 'The star at the center of our Solar System.' },
  { name: 'Mercury', position: [10, 0, 0], size: 0.5, textureUrl: '/2k_mercury.jpg', mass: 3.285e23, rotationSpeed: 0.01, orbitalPeriod: 0.24, info: 'The smallest planet in our Solar System and closest to the Sun.' },
  { name: 'Venus', position: [15, 0, 0], size: 0.8, textureUrl: '/2k_uranus.jpg', mass: 4.867e24, rotationSpeed: 0.008, orbitalPeriod: 0.62, info: 'Often called Earth\'s sister planet due to their similar size and mass.' },
  { name: 'Mars', position: [25, 0, 0], size: 0.7, textureUrl: '/2k_mars.jpg', mass: 6.39e23, rotationSpeed: 0.009, orbitalPeriod: 1.88, info: 'Known as the Red Planet due to its reddish appearance.' },
  { name: 'Jupiter', position: [35, 0, 0], size: 2, textureUrl: '/2k_jupiter.jpg', mass: 1.898e27, rotationSpeed: 0.004, orbitalPeriod: 11.86, info: 'The largest planet in our Solar System.' },
  { name: 'Saturn', position: [45, 0, 0], size: 1.8, textureUrl: '/2k_saturn.jpg', mass: 5.683e26, rotationSpeed: 0.003, orbitalPeriod: 29.46, info: 'Known for its prominent ring system.' },
  { name: 'Uranus', position: [55, 0, 0], size: 1.3, textureUrl: '/2k_uranus.jpg', mass: 8.681e25, rotationSpeed: 0.002, orbitalPeriod: 84.01, info: 'An ice giant with a tilted rotation axis.' },
  { name: 'Neptune', position: [65, 0, 0], size: 1.2, textureUrl: '/2k_neptune.jpg', mass: 1.024e26, rotationSpeed: 0.001, orbitalPeriod: 164.79, info: 'The windiest planet in our Solar System.' },
]

function CameraController({ focusedPlanet }) {
  const { camera } = useThree()
  const controlsRef = useRef()

  useEffect(() => {
    if (focusedPlanet) {
      const planet = planets.find(p => p.name === focusedPlanet)
      if (planet) {
        const targetPosition = new THREE.Vector3(...planet.position)
        targetPosition.y += planet.size * 2
        targetPosition.z += planet.size * 5
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

function SunLight() {
  const light = useRef()
  useFrame(({ clock }) => {
    light.current.intensity = 1.5 + Math.sin(clock.getElapsedTime() * 2) * 0.1
  })
  return <pointLight ref={light} position={[0, 0, 0]} intensity={1.5} distance={100} decay={2} />
}

function SpaceBackground() {
  const spaceTexture = useTexture('/2k_stars_milky_way.jpg')
  return (
    <primitive object={new THREE.Mesh(
      new THREE.SphereGeometry(300, 64, 64),
      new THREE.MeshBasicMaterial({ map: spaceTexture, side: THREE.BackSide })
    )} />
  )
}

function SolarSystemScene({ focusedPlanet, setFocusedPlanet, useRealScale, timeSpeed, isPlaying }) {
  const [time, setTime] = useState(0)

  useFrame((state, delta) => {
    if (isPlaying) {
      setTime(prevTime => prevTime + delta * timeSpeed)
    }
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 50, 100]} />
      <CameraController focusedPlanet={focusedPlanet} />
      <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
      <SunLight />
      <ambientLight intensity={0.1} />
      <SpaceBackground />
      {planets.map((planet) => (
        planet.name !== 'Earth' && planet.name !== 'Sun' && (
          <group key={planet.name}>
            <OrbitalPath radius={planet.position[0]} />
            <Planet
              {...planet}
              size={useRealScale ? planet.size : Math.pow(planet.size, 1/3)}
              isFocused={focusedPlanet === planet.name}
              onClick={() => setFocusedPlanet(planet.name)}
              time={time}
            />
          </group>
        )
      ))}
      <OrbitalPath radius={20} />
      <Earth
        position={[20, 0, 0]}
        size={useRealScale ? 1 : Math.pow(1, 1/3)}
        isFocused={focusedPlanet === 'Earth'}
        onClick={() => setFocusedPlanet('Earth')}
        time={time}
      />
      <AsteroidBelt useRealScale={useRealScale} />
    </>
  )
}

export default function SolarSystem({ focusedPlanet, setFocusedPlanet, timeSpeed, isPlaying }) {
  const [useRealScale, setUseRealScale] = useState(false)

  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <SolarSystemScene
            focusedPlanet={focusedPlanet}
            setFocusedPlanet={setFocusedPlanet}
            useRealScale={useRealScale}
            timeSpeed={timeSpeed}
            isPlaying={isPlaying}
          />
        </Suspense>
      </Canvas>
      <InfoPanel
        planets={planets}
        focusedPlanet={focusedPlanet}
        useRealScale={useRealScale}
        setUseRealScale={setUseRealScale}
      />
    </>
  )
}

