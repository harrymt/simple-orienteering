"use client"

import { useEffect, useState } from "react"
import { useMap } from "react-map-gl/maplibre"

export const CourseOverlay = () => {
  const { current: map } = useMap()
  const [position, setPosition] = useState<{ left: number; top: number } | null>(null)

  const course = {
    id: "hampstead-heath.png",
    latitude: 51.549453378349824,
    longitude: -0.13929854513105316,
  }

  useEffect(() => {
    if (!map) return

    const updatePosition = () => {
      const p = map.project({ lat: course.latitude, lng: course.longitude })
      setPosition({ left: p.x, top: p.y })
    }

    // initial position
    if (map.loaded()) {
      updatePosition()
    } else {
      map.once("load", updatePosition)
    }

    // update on move/zoom
    map.on("move", updatePosition)
    map.on("zoom", updatePosition)

    return () => {
      map.off("move", updatePosition)
      map.off("zoom", updatePosition)
    }
  }, [map])

  if (!map || !position) return null

  return (
    <img
      src={`/courses/${course.id}`}
      alt="Course"
      style={{
        position: "absolute",
        left: position.left - 300, // center image horizontally
        top: position.top - 200, // center image vertically
        width: 600,
        height: 400,
        pointerEvents: "none",
        zIndex: 20,
      }}
    />
  )
}
