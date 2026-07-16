import { Box } from "@artsy/palette"
import { useState, useMemo, useEffect, useRef } from "react"
import { Map as MapView, Marker } from "@vis.gl/react-maplibre"
import maplibregl from "maplibre-gl"
import type { CityGuidesAppQuery$data } from "__generated__/CityGuidesAppQuery.graphql"

interface PartnerLocation {
  partnerName: string
  partnerSlug: string
  latitude: number
  longitude: number
  locationId: string
}

interface City {
  name: string
  country: string
  latitude: number
  longitude: number
  galleryCount: number
  locations: PartnerLocation[]
}

interface GlobeMapProps {
  partnersData?: CityGuidesAppQuery$data["partnersConnection"]
}

export const GlobeMap = ({ partnersData }: GlobeMapProps) => {
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 20,
    zoom: 2.7,
  })
  const [isSpinning, setIsSpinning] = useState(true)
  const animationFrameRef = useRef<number | null>(null)
  const userInteractedRef = useRef(false)

  // Auto-spin effect
  useEffect(() => {
    if (!isSpinning) return

    const startTime = Date.now()
    const spinDuration = 6500 // 6.5 seconds
    const rotationSpeed = 360 / 25000 // Degrees per millisecond
    let lastTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime

      // Stop after duration
      if (elapsed > spinDuration) {
        setIsSpinning(false)
        return
      }

      if (!userInteractedRef.current) {
        const currentTime = Date.now()
        const deltaTime = currentTime - lastTime
        lastTime = currentTime

        setViewState(prev => {
          return {
            ...prev,
            longitude: prev.longitude + rotationSpeed * deltaTime,
          }
        })
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isSpinning])

  const cities = useMemo(() => {
    if (!partnersData?.edges) {
      return []
    }

    const cityMap = new Map<string, City>()

    partnersData.edges.forEach(edge => {
      const partner = edge?.node

      if (!partner?.locationsConnection?.edges) {
        return
      }

      partner.locationsConnection.edges.forEach(locationEdge => {
        const location = locationEdge?.node

        if (
          !location?.city ||
          !location?.coordinates?.lat ||
          !location?.coordinates?.lng ||
          location.publiclyViewable === false
        ) {
          return
        }

        const cityKey = `${location.city}, ${location.country}`
        const existing = cityMap.get(cityKey)

        const partnerLocation: PartnerLocation = {
          partnerName: partner.name || "",
          partnerSlug: partner.slug || "",
          latitude: location.coordinates.lat,
          longitude: location.coordinates.lng,
          locationId: location.internalID || "",
        }

        if (existing) {
          existing.galleryCount++
          existing.locations.push(partnerLocation)
        } else {
          cityMap.set(cityKey, {
            name: location.city,
            country: location.country || "",
            latitude: location.coordinates.lat,
            longitude: location.coordinates.lng,
            galleryCount: 1,
            locations: [partnerLocation],
          })
        }
      })
    })

    return Array.from(cityMap.values())
  }, [partnersData])

  return (
    <Box height="100%" width="100%" position="relative">
      <link
        rel="stylesheet"
        href="https://unpkg.com/maplibre-gl@5.24.0/dist/maplibre-gl.css"
      />
      <style>
        {`
          .maplibregl-marker-covered {
            display: none !important;
          }
        `}
      </style>
      <MapView
        {...viewState}
        onMove={evt => {
          userInteractedRef.current = true
          setIsSpinning(false)
          return setViewState(evt.viewState)
        }}
        mapLib={maplibregl}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        projection={{ type: "globe" }}
        attributionControl={false}
        scrollZoom={false}
        dragRotate={true}
        doubleClickZoom={false}
        touchZoomRotate={false}
      >
        {cities.map(city => {
          return (
            <Marker
              key={city.name}
              longitude={city.longitude}
              latitude={city.latitude}
              anchor="center"
            >
              <Box
                width={12}
                height={12}
                bg="blue100"
                borderRadius="50%"
                border="2px solid white"
                style={{
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
                onClick={() => {
                  console.log(`Clicked ${city.name}`)
                }}
              />
            </Marker>
          )
        })}
      </MapView>
    </Box>
  )
}
