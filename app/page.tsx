"use client"

import { Metadata } from "next"
import * as React from "react"
import Map from "react-map-gl/maplibre"
import "maplibre-gl/dist/maplibre-gl.css"
import { Button } from "components/Button/Button"

// export const metadata: Metadata = {
//   title: "Next.js Enterprise Boilerplate",
//   twitter: {
//     card: "summary_large_image",
//   },
//   openGraph: {
//     url: "https://next-enterprise.vercel.app/",
//     images: [
//       {
//         width: 1200,
//         height: 630,
//         url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/.github/assets/project-logo.png",
//       },
//     ],
//   },
// }

export default function Web() {
  const [history, setHistory] = React.useState<{ longitude: number; latitude: number }[]>([])
  const [viewState, setViewState] = React.useState({
    longitude: -100,
    latitude: 40,
    zoom: 15,
  })
  function geoFindMe() {
    function error() {
      console.log("Unable to retrieve your location")
    }

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser")
    } else {
      console.log("Locating…")
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        setViewState({ latitude, longitude, zoom: viewState.zoom })
        setHistory((his) => {
          return [...his, { latitude, longitude }]
        })
      }, error)
    }
  }

  // const [[lat, lng], setLatLng] = React.useState<[number, number]>([0, 0])

  React.useEffect(() => {
    geoFindMe()
  }, [])

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto grid max-w-(--breakpoint-xl) px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-2xl text-4xl leading-none font-extrabold tracking-tight md:text-5xl xl:text-6xl dark:text-white">
              Map
            </h1>

            <Map
              {...viewState}
              onMove={(evt) => setViewState(evt.viewState)}
              style={{ width: 600, height: 400 }}
              mapStyle="https://tiles.openfreemap.org/styles/bright"
            />
          </div>
          <Button
            onClick={() => {
              geoFindMe()
            }}
          >
            Log Lat Lng
          </Button>
          Current: {viewState.latitude},{viewState.longitude}
          <p>History:</p>
          <ul>
            {history.map((his) => (
              <li>
                {his.latitude},{his.longitude}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-8 sm:py-16 lg:px-6">
          <div className="justify-center space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3"></div>
        </div>
      </section>
    </>
  )
}
