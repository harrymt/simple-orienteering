import { useControl, useMap } from "react-map-gl/maplibre"
import { createPortal } from "react-dom"
import type { ReactNode } from "react"

class OverlayControl {
  _container: HTMLElement

  constructor() {
    this._container = document.createElement("div")
    Object.assign(this._container.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: "10",
    })
  }

  onAdd() {
    return this._container
  }

  onRemove() {
    this._container.remove()
  }
}

// This portals any React content into the overlay container
export default function CustomOverlay({ children }: { children: ReactNode }) {
  const ctrl = useControl(() => new OverlayControl())
  return createPortal(children, ctrl._container)
}
