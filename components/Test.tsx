"use client"

import { useEffect, useState } from "react"
import { Map } from "react-map-gl/maplibre"
import type { Map as MaplibreMap } from "maplibre-gl"

export const Test = () => {
  const [map, setMap] = useState<MaplibreMap | null>(null)
  const [position, setPosition] = useState<{ left: number; top: number } | null>(null)

  // Image location
  const course = {
    id: "hampstead-heath.png",
    latitude: 51.549453378349824,
    longitude: -0.13929854513105316,
  }

  // Update position whenever map changes
  useEffect(() => {
    if (!map) return

    const update = () => {
      const p = map.project({ lat: course.latitude, lng: course.longitude })
      setPosition({ left: p.x, top: p.y })
    }

    update() // initial position
    map.on("move", update)
    map.on("zoom", update)

    return () => {
      map.off("move", update)
      map.off("zoom", update)
    }
  }, [map])

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Map
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        initialViewState={{ longitude: -0.1393, latitude: 51.54945, zoom: 14 }}
        style={{ width: "100%", height: "100%" }}
        onLoad={(evt) => setMap(evt.target as MaplibreMap)}
      />

      {position && (
        <img
          src={`/courses/${course.id}`}
          alt="Course"
          style={{
            position: "absolute",
            left: position.left - 300,
            top: position.top - 200,
            width: 600,
            height: 400,
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      )}
    </div>
  )
}
