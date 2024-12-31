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

'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface Planet {
  name: string;
  size: number;
  mass: number;
  rotationSpeed: number;
  orbitalPeriod?: number;
  info: string;
}

interface InfoPanelProps {
  planets: Planet[];
  focusedPlanet: string | null;
  useRealScale: boolean;
  setUseRealScale: (value: boolean) => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ planets, focusedPlanet, useRealScale, setUseRealScale }) => {
  const planet = planets.find(p => p.name === focusedPlanet) || 
    { name: 'Earth', size: 1, mass: 5.972e24, rotationSpeed: 0.01, orbitalPeriod: 1, info: 'Our home planet, the only known planet to harbor life.' }

  return (
    <Card className="absolute top-4 right-4 w-80 max-w-[calc(100%-2rem)] bg-black/70 text-white overflow-auto max-h-[calc(100vh-8rem)]">
      <CardHeader>
        <CardTitle>{planet.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl>
          <dt className="font-bold">Size:</dt>
          <dd>{planet.size} units</dd>
          <dt className="font-bold mt-2">Mass:</dt>
          <dd>{planet.mass.toExponential(2)} kg</dd>
          <dt className="font-bold mt-2">Rotation Speed:</dt>
          <dd>{planet.rotationSpeed}</dd>
          {planet.orbitalPeriod && (
            <>
              <dt className="font-bold mt-2">Orbital Period:</dt>
              <dd>{planet.orbitalPeriod} Earth years</dd>
            </>
          )}
        </dl>
        <p className="mt-4">{planet.info}</p>
        <div className="flex items-center space-x-2 mt-4">
          <Switch
            id="use-real-scale"
            checked={useRealScale}
            onCheckedChange={setUseRealScale}
          />
          <Label htmlFor="use-real-scale">Use Real Scale</Label>
        </div>
      </CardContent>
    </Card>
  )
}

export default React.memo(InfoPanel)

