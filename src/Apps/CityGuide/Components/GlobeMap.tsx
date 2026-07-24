import { Box, Text, Button } from "@artsy/palette"
import { useState, useMemo, useEffect, useRef } from "react"
import { Map as MapView, Marker, Popup } from "@vis.gl/react-maplibre"
import maplibregl from "maplibre-gl"
import type { CityGuidesAppQuery$data } from "__generated__/CityGuidesAppQuery.graphql"
import { graphql } from "react-relay"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import type { GlobeMapMexicoCityQuery } from "__generated__/GlobeMapMexicoCityQuery.graphql"

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
  selectedCity: City | null
  onCitiesChange: (cities: City[]) => void
  onCityClick: (city: City) => void
}

const TIER_CITIES = [
  "London",
  "New York",
  "Paris",
  "Los Angeles",
  "Tokyo",
  "Hong Kong",
  "Berlin",
  "Seoul",
  "Shanghai",
  "Milan",
  "Mexico City",
  "Barcelona",
  "Amsterdam",
  "Dubai",
  "Mumbai",
  "Lagos",
  "Venice",
  "Rome",
  "Lisbon",
  "Athens",
  "Manila",
  "Vienna",
  "Copenhagen",
  "Stockholm",
  "São Paulo",
  "Buenos Aires",
  "Cape Town",
  "Bangkok",
  "Taipei",
  "Tbilisi",
  "Delhi",
  "Chicago",
  "Marseille",
  "Oslo",
  "Marrakech",
  "Dakar",
  "Marfa",
  "Oaxaca",
  "Valletta",
  "Medellín",
  "Montevideo",
  "Naoshima",
]

const formatCityName = (name: string): string => {
  return name
    .toLowerCase()
    .split(" ")
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(" ")
}

const MEXICO_CITY_QUERY = graphql`
  query GlobeMapMexicoCityQuery {
    viewer {
      partnersConnection(
        near: "19.4326,-99.1332"
        defaultProfilePublic: true
        eligibleForListing: true
        type: [GALLERY]
        sort: RANDOM_SCORE_DESC
        first: 100
      ) {
        edges {
          node {
            internalID
            name
            slug
            locationsConnection(first: 10) {
              edges {
                node {
                  internalID
                  city
                  country
                  publiclyViewable
                  coordinates {
                    lat
                    lng
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const GlobeMap = ({
  partnersData,
  selectedCity: externalSelectedCity,
  onCitiesChange,
  onCityClick,
}: GlobeMapProps) => {
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 20,
    zoom: 2.7,
  })
  const [isSpinning, setIsSpinning] = useState(true)
  const [hoveredCity, setHoveredCity] = useState<City | null>(null)
  const [hoveredLocation, setHoveredLocation] =
    useState<PartnerLocation | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const userInteractedRef = useRef(false)
  const mapRef = useRef<any>(null)

  // Query for accurate Mexico City data
  const { data: mexicoCityData } = useClientQuery<GlobeMapMexicoCityQuery>({
    query: MEXICO_CITY_QUERY,
  })

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
            name: formatCityName(location.city),
            country: location.country || "",
            latitude: location.coordinates.lat,
            longitude: location.coordinates.lng,
            galleryCount: 1,
            locations: [partnerLocation],
          })
        }
      })
    })

    const allCities = Array.from(cityMap.values())

    // Filter to only show tier cities
    const tierCitiesFiltered = allCities.filter(city => {
      const cityNameLower = city.name.toLowerCase()
      return TIER_CITIES.some(tierCity => {
        const tierLower = tierCity.toLowerCase()
        return (
          cityNameLower.includes(tierLower) || tierLower.includes(cityNameLower)
        )
      })
    })

    return tierCitiesFiltered
  }, [partnersData])

  // Process Mexico City locations for accurate data
  const mexicoCityLocations = useMemo(() => {
    if (!mexicoCityData?.viewer?.partnersConnection?.edges) {
      return []
    }

    const locations: PartnerLocation[] = []

    mexicoCityData.viewer.partnersConnection.edges.forEach(edge => {
      const partner = edge?.node
      if (!partner?.locationsConnection?.edges) return

      partner.locationsConnection.edges.forEach(locationEdge => {
        const location = locationEdge?.node
        if (
          !location?.coordinates?.lat ||
          !location?.coordinates?.lng ||
          location.publiclyViewable === false
        ) {
          return
        }

        locations.push({
          partnerName: partner.name || "",
          partnerSlug: partner.slug || "",
          latitude: location.coordinates.lat,
          longitude: location.coordinates.lng,
          locationId: location.internalID || "",
        })
      })
    })

    return locations
  }, [mexicoCityData])

  // Get unique partner count for Mexico City
  const mexicoCityPartnerCount = useMemo(() => {
    const uniquePartners = new Set(
      mexicoCityLocations.map(loc => {
        return loc.partnerSlug
      }),
    )
    return uniquePartners.size
  }, [mexicoCityLocations])

  // Notify parent when cities change
  useEffect(() => {
    onCitiesChange(cities)
  }, [cities, onCitiesChange])

  // Get locations for the selected city
  const selectedCityLocations = useMemo(() => {
    if (!externalSelectedCity) return []

    if (externalSelectedCity.name === "Mexico City") {
      return mexicoCityLocations
    }

    return externalSelectedCity.locations
  }, [externalSelectedCity, mexicoCityLocations])

  // Trigger zoom animation when selectedCity changes (from marker click OR list click)
  useEffect(() => {
    if (externalSelectedCity && mapRef.current) {
      setIsSpinning(false)
      setHoveredCity(null)

      mapRef.current.flyTo({
        center: [externalSelectedCity.longitude, externalSelectedCity.latitude],
        zoom: 12,
        duration: 2000,
        essential: true,
      })
    } else if (!externalSelectedCity && mapRef.current) {
      // Back to globe view
      mapRef.current.flyTo({
        center: [0, 20],
        zoom: 2.7,
        duration: 2000,
        essential: true,
      })
    }
  }, [externalSelectedCity])

  // Debug logging for selected city
  useEffect(() => {
    if (externalSelectedCity) {
      console.log(
        `Selected city: ${externalSelectedCity.name}, Locations: ${selectedCityLocations.length}`,
      )
      if (selectedCityLocations.length > 0) {
        console.log("First location:", selectedCityLocations[0])
      }
    }
  }, [externalSelectedCity, selectedCityLocations])

  // Handle city marker click to zoom in
  const handleCityClick = (city: City) => {
    setHoveredCity(null)
    onCityClick(city)
  }

  // Handle back to globe view
  const handleBackToGlobe = () => {
    onCityClick(null as any)
  }

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
        ref={mapRef}
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
        scrollZoom={true}
        dragRotate={true}
        doubleClickZoom={false}
        touchZoomRotate={false}
      >
        {!externalSelectedCity &&
          cities.map(city => {
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
                  onMouseEnter={() => {
                    setHoveredCity(city)
                  }}
                  onMouseLeave={() => {
                    setHoveredCity(null)
                  }}
                  onClick={() => {
                    handleCityClick(city)
                  }}
                />
              </Marker>
            )
          })}

        {externalSelectedCity &&
          selectedCityLocations.map(location => {
            return (
              <Marker
                key={location.locationId}
                longitude={location.longitude}
                latitude={location.latitude}
                anchor="center"
              >
                <Box
                  width={16}
                  height={16}
                  borderRadius="50%"
                  border="2px solid white"
                  style={{
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
                    backgroundColor: "#5B8FFF",
                  }}
                  onMouseEnter={() => {
                    setHoveredLocation(location)
                  }}
                  onMouseLeave={() => {
                    setHoveredLocation(null)
                  }}
                  onClick={() => {
                    window.open(`/partner/${location.partnerSlug}`, "_blank")
                  }}
                />
              </Marker>
            )
          })}

        {hoveredCity && !externalSelectedCity && (
          <Popup
            key={hoveredCity.name}
            longitude={hoveredCity.longitude}
            latitude={hoveredCity.latitude}
            anchor="bottom"
            offset={15}
            closeButton={false}
            closeOnClick={false}
          >
            <Box p={2} maxWidth={280}>
              <Text variant="lg-display" mb={0.5}>
                {hoveredCity.name}
              </Text>
              <Text variant="sm" color="black60" mb={2}>
                {hoveredCity.name === "Mexico City"
                  ? `${mexicoCityPartnerCount} ${
                      mexicoCityPartnerCount === 1 ? "gallery" : "galleries"
                    }`
                  : `${hoveredCity.galleryCount} ${
                      hoveredCity.galleryCount === 1 ? "gallery" : "galleries"
                    }`}
              </Text>
              <Box
                as="ul"
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  maxHeight: 200,
                  overflowY: "auto",
                }}
              >
                {hoveredCity.name === "Mexico City" ? (
                  <>
                    {(() => {
                      const uniquePartners = Array.from(
                        new Map(
                          mexicoCityLocations.map(loc => {
                            return [loc.partnerSlug, loc]
                          }),
                        ).values(),
                      )
                      return uniquePartners.slice(0, 10).map(location => {
                        return (
                          <Box key={location.partnerSlug} mb={1}>
                            <a
                              href={`/partner/${location.partnerSlug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ textDecoration: "none" }}
                            >
                              <Text variant="xs" color="blue100">
                                {location.partnerName}
                              </Text>
                            </a>
                          </Box>
                        )
                      })
                    })()}
                    {mexicoCityPartnerCount > 10 && (
                      <Text variant="xs" color="black60" mt={1.5}>
                        +{mexicoCityPartnerCount - 10} more
                      </Text>
                    )}
                  </>
                ) : (
                  <>
                    {hoveredCity.locations.slice(0, 10).map(location => {
                      return (
                        <Box key={location.locationId} mb={1}>
                          <a
                            href={`/partner/${location.partnerSlug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none" }}
                          >
                            <Text variant="xs" color="blue100">
                              {location.partnerName}
                            </Text>
                          </a>
                        </Box>
                      )
                    })}
                    {hoveredCity.galleryCount > 10 && (
                      <Text variant="xs" color="black60" mt={1.5}>
                        +{hoveredCity.galleryCount - 10} more
                      </Text>
                    )}
                  </>
                )}
              </Box>
            </Box>
          </Popup>
        )}

        {hoveredLocation && externalSelectedCity && (
          <Popup
            key={hoveredLocation.locationId}
            longitude={hoveredLocation.longitude}
            latitude={hoveredLocation.latitude}
            anchor="bottom"
            offset={10}
            closeButton={false}
            closeOnClick={false}
          >
            <Box p={1.5}>
              <Text variant="sm">{hoveredLocation.partnerName}</Text>
            </Box>
          </Popup>
        )}
      </MapView>

      {externalSelectedCity && (
        <Box position="absolute" top={20} right={20}>
          <Button onClick={handleBackToGlobe} size="small">
            ← Back to Globe View
          </Button>
        </Box>
      )}
    </Box>
  )
}
