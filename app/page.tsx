'use client'

import dynamic from 'next/dynamic'
import { Suspense, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Loader2, Play, Pause, RotateCcw } from 'lucide-react'

const SolarSystem = dynamic(() => import('@/components/SolarSystem'), { ssr: false })

export default function Home() {
  const [focusedPlanet, setFocusedPlanet] = useState<string | null>(null)
  const [showInfo, setShowInfo] = useState(true)
  const [timeSpeed, setTimeSpeed] = useState(1)
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <div className="relative w-full h-screen">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center bg-black">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      }>
        <SolarSystem 
          focusedPlanet={focusedPlanet} 
          setFocusedPlanet={(planet: string | null) => setFocusedPlanet(planet)}
          timeSpeed={timeSpeed}
          isPlaying={isPlaying}
        />
      </Suspense>
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <h1 className="text-2xl font-bold text-white">3D Solar System Explorer</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setFocusedPlanet(null)}>Reset View</Button>
          <Button variant="outline" onClick={() => setShowInfo(!showInfo)}>
            {showInfo ? 'Hide Info' : 'Show Info'}
          </Button>
        </div>
      </div>
      {showInfo && (
        <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-center">
          <div className="flex flex-wrap justify-center gap-2 bg-black/50 p-2 rounded-lg max-w-full overflow-x-auto">
            {['Sun', 'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'].map((planet) => (
              <Button key={planet} variant="outline" size="sm" onClick={() => setFocusedPlanet(planet)}>
                {planet}
              </Button>
            ))}
          </div>
        </div>
      )}
      <div className="absolute bottom-4 left-4 z-10 flex items-center space-x-2 bg-black/50 p-2 rounded-lg">
        <Button variant="outline" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="outline" size="icon" onClick={() => setTimeSpeed(1)}>
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Slider
          value={[timeSpeed]}
          onValueChange={(value) => setTimeSpeed(value[0])}
          min={0.1}
          max={10}
          step={0.1}
          className="w-32"
        />
        <span className="text-white text-sm">{timeSpeed.toFixed(1)}x</span>
      </div>
    </div>
  )
}

