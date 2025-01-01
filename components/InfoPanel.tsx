'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function InfoPanel({ planets, focusedPlanet }) {
  const planet = planets.find(p => p.name === focusedPlanet)

  if (!planet) return null

  return (
    <Card className="absolute top-4 right-4 w-80 bg-black/70 text-white">
      <CardHeader>
        <CardTitle>{planet.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Size: {planet.size} units</p>
        <p>Color: {planet.color}</p>
        <p>Mass: {planet.mass.toExponential(2)} kg</p>
        <p>Rotation Speed: {planet.rotationSpeed}</p>
        <p className="mt-2">{planet.info}</p>
      </CardContent>
    </Card>
  )
}
