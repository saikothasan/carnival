'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw } from 'lucide-react'

interface ControlsProps {
  focusedPlanet: string | null;
  setFocusedPlanet: (planet: string | null) => void;
  timeSpeed: number;
  setTimeSpeed: (speed: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

const Controls: React.FC<ControlsProps> = ({
  focusedPlanet,
  setFocusedPlanet,
  timeSpeed,
  setTimeSpeed,
  isPlaying,
  setIsPlaying
}) => {
  return (
    <>
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <h1 className="text-2xl font-bold text-white">3D Solar System Explorer</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setFocusedPlanet(null)}>Reset View</Button>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-center">
        <div className="flex flex-wrap justify-center gap-2 bg-black/50 p-2 rounded-lg max-w-full overflow-x-auto">
          {['Sun', 'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'].map((planetName) => (
            <Button key={planetName} variant="outline" size="sm" onClick={() => setFocusedPlanet(planetName)}>
              {planetName}
            </Button>
          ))}
        </div>
      </div>
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
    </>
  )
}

export default React.memo(Controls)
