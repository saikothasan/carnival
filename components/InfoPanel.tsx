'use client'

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

export default function InfoPanel({ planets, focusedPlanet, useRealScale, setUseRealScale }: InfoPanelProps) {
  const planet = planets.find(p => p.name === focusedPlanet) || 
    { name: 'Earth', size: 1, mass: 5.972e24, rotationSpeed: 0.01, orbitalPeriod: 1, info: 'Our home planet, the only known planet to harbor life.' }

  return (
    <Card className="absolute top-4 right-4 w-80 max-w-[calc(100%-2rem)] bg-black/70 text-white overflow-auto max-h-[calc(100vh-8rem)]">
      <CardHeader>
        <CardTitle>{planet.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Size: {planet.size} units</p>
        <p>Mass: {planet.mass.toExponential(2)} kg</p>
        <p>Rotation Speed: {planet.rotationSpeed}</p>
        {planet.orbitalPeriod && <p>Orbital Period: {planet.orbitalPeriod} Earth years</p>}
        <p className="mt-2">{planet.info}</p>
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

