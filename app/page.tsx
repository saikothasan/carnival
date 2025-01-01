'use client'

import dynamic from 'next/dynamic'
import { Suspense, useState } from 'react'
import { Button } from "@/components/ui/button"

const SolarSystem = dynamic(() => import('@/components/SolarSystem'), { ssr: false })

export default function Home() {
  const [focusedPlanet, setFocusedPlanet] = useState<string | null>(null) // Explicitly define the type

  return (
    <div className="relative w-full h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <SolarSystem focusedPlanet={focusedPlanet} setFocusedPlanet={setFocusedPlanet} />
      </Suspense>
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-2xl font-bold text-white mb-2">3D Solar System Explorer</h1>
        <Button variant="outline" onClick={() => setFocusedPlanet(null)}>Reset View</Button>
      </div>
      <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-center">
        <div className="flex space-x-2 bg-black/50 p-2 rounded-lg">
          {['Sun', 'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'].map((planet) => (
            <Button key={planet} variant="outline" size="sm" onClick={() => setFocusedPlanet(planet)}>
              {planet}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
