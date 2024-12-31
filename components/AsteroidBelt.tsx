type AsteroidBeltProps = {
  useRealScale: boolean;
};

'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function AsteroidBelt({ useRealScale }: AsteroidBeltProps) {
  const asteroidsRef = useRef<THREE.Points>(null)
  const asteroidCount = 2000

  const [positions, sizes] = useMemo(() => {
    const positions = new Float32Array(asteroidCount * 3)
    const sizes = new Float32Array(asteroidCount)

    for (let i = 0; i < asteroidCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const r = THREE.MathUtils.randFloat(28, 32)
      positions[i * 3] = Math.cos(theta) * r
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2
      positions[i * 3 + 2] = Math.sin(theta) * r
      sizes[i] = useRealScale ? Math.random() * 0.1 + 0.05 : Math.random() * 0.3 + 0.15
    }

    return [positions, sizes]
  }, [useRealScale])

  useFrame((state, delta) => {
    if (asteroidsRef.current) {
      asteroidsRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <points ref={asteroidsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={asteroidCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={asteroidCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#888888" sizeAttenuation={true} />
    </points>
  )
}

