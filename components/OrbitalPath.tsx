'use client'

import React, { useMemo } from 'react'
import * as THREE from 'three'
import { Line } from '@react-three/drei'

interface OrbitalPathProps {
  radius: number;
}

export default function OrbitalPath({ radius }: OrbitalPathProps) {
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
    }
    return pts
  }, [radius])

  return (
    <Line
      points={points}
      color="#444444"
      lineWidth={1}
    />
  )
}

