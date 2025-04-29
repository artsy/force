import {
  Button,
  Checkbox,
  Expandable,
  Flex,
  Input,
  Label,
  Separator,
  Text,
} from "@artsy/palette"
import { sampleSize } from "lodash"
import { mean } from "mathjs"
import React, { Fragment, useEffect } from "react"

// Constants for OpenSearch
const EXTRA_FETCH_SIZE = 5
const CURATED_COLLECTION_IDS = [
  "932d0b13-3cf1-46d1-8e49-18b186230347",
  "d78e9a17-ccf6-4104-b4e9-95c18f6412df",
  "26923cfe-ca0c-44e0-a9cf-aec5cb1349c6",
  "e28728c2-6426-47e2-b6a2-3307840c3387",
  "cde04c08-8490-4850-bc1d-d30ad8a236fb",
  "e79ec3dd-0412-40ae-a3d8-d1dd0ba77ac0",
  "d2fcfb01-9eb6-41cf-8abb-57a2078c171b",
]

// Collection ID to name mapping
const COLLECTION_NAMES = {
  "cde04c08-8490-4850-bc1d-d30ad8a236fb": "Statement Pieces",
  "26923cfe-ca0c-44e0-a9cf-aec5cb1349c6": "New This Week",
  "e79ec3dd-0412-40ae-a3d8-d1dd0ba77ac0": "New from Leading Galleries",
  "d78e9a17-ccf6-4104-b4e9-95c18f6412df": "Most Loved",
  "d2fcfb01-9eb6-41cf-8abb-57a2078c171b": "Little Gems",
  "e28728c2-6426-47e2-b6a2-3307840c3387": "Street Art Edit",
  "932d0b13-3cf1-46d1-8e49-18b186230347": "Curators' Picks",
}

const OPENSEARCH_URL =
  "https://vpc-artsy-staging-opensearch2-gfdbifpyvreziqr7r6ewx5zpe4.us-east-1.es.amazonaws.com/artworks_staging/_search"

// Add these constants after the existing constants
const NATIONALITY_OPTIONS = [
  "American",
  "British",
  "French",
  "German",
  "Italian",
  "Japanese",
  "Chinese",
  "Russian",
  "Spanish",
  "Dutch",
  "Swiss",
  "Austrian",
  "Belgian",
  "Canadian",
]

const MEDIUM_OPTIONS = [
  "Painting",
  "Photography",
  "Sculpture",
  "Prints",
  "Work on Paper",
  "NFT",
  "Design",
  "Drawing",
  "Installation",
  "Film/Video",
  "Jewelry",
  "Performance Art",
  "Reproduction",
  "Ephemera or Merchandise",
  "Digital Art",
]

// Add this interface at the top of the file, after the imports
interface UserFilters {
  nationalities: string[]
  mediums: string[]
  priceRange: {
    min: number
    max: number
  }
}

// Add these type definitions at the top of the file, after the imports
interface Artwork {
  id: string
  title: string
  artistNames: string[]
  artistName: string
  medium: string
  image: {
    url: string
  }
  vector_embedding: number[]
  artistId: string
  marketingCollectionId: string | string[]
  tags: string[]
  price?: number
  artist_nationality?: string
  genes?: string[]
}

const buildInitialOpenSearchQuery = (
  excludeArtworkIds: string[],
  limit: number,
  randomSeed = Date.now(),
  dismissedArtists: string[] = [],
  dismissedCollectionIds: string[] = [],
  dismissedTags: string[] = [],
  userFilters: UserFilters = {
    nationalities: [],
    mediums: [],
    priceRange: { min: 0, max: 1000000 },
  },
) => {
  const mustNotClauses = [
    ...(excludeArtworkIds.length > 0
      ? [
          {
            terms: {
              _id: excludeArtworkIds,
            },
          },
        ]
      : []),
    ...(dismissedArtists.length > 0
      ? [
          {
            terms: {
              artist_id: dismissedArtists,
            },
          },
        ]
      : []),
    ...(dismissedCollectionIds.length > 0
      ? [
          {
            terms: {
              marketing_collection_id: dismissedCollectionIds,
            },
          },
        ]
      : []),
    ...(dismissedTags.length > 0
      ? [
          {
            terms: {
              tags: dismissedTags,
            },
          },
        ]
      : []),
  ]

  return {
    size: limit,
    _source: [
      "id",
      "artist_id",
      "artist_name",
      "title",
      "artist_names",
      "medium",
      "image_url",
      "vector_embedding",
      "marketing_collection_id",
      "tags",
      "list_price_amount",
      "artist_nationality",
      "genes",
    ],
    query: {
      function_score: {
        query: {
          bool: {
            ...(mustNotClauses.length > 0 ? { must_not: mustNotClauses } : {}),
            filter: [
              {
                terms: {
                  marketing_collection_id: CURATED_COLLECTION_IDS,
                },
              },
              {
                term: {
                  availability: "for sale",
                },
              },
              ...(userFilters.nationalities.length > 0
                ? [
                    {
                      terms: {
                        artist_nationality: userFilters.nationalities.map(n =>
                          n.toLowerCase(),
                        ),
                      },
                    },
                  ]
                : []),
              ...(userFilters.mediums.length > 0
                ? [
                    {
                      terms: {
                        medium: userFilters.mediums,
                      },
                    },
                  ]
                : []),
              {
                range: {
                  list_price_amount: {
                    gte: userFilters.priceRange.min,
                    lte: userFilters.priceRange.max,
                  },
                },
              },
            ],
          },
        },
        functions: [
          {
            random_score: {
              seed: randomSeed,
            },
          },
        ],
        boost_mode: "replace",
      },
    },
  }
}

const buildHybridOpenSearchQuery = (
  likedArtworks: Artwork[],
  dismissedArtworks: Artwork[],
  weights: number[],
  artworksCountForTaste = 3,
  mltFields: string[] = [],
  limit: number,
  dismissedArtists: string[] = [],
  dismissedCollectionIds: string[] = [],
  dismissedTags: string[] = [],
  userFilters: UserFilters = {
    nationalities: [],
    mediums: [],
    priceRange: { min: 0, max: 1000000 },
  },
) => {
  const likedArtworkIds = likedArtworks.map(artwork => artwork.id)
  const dismissedArtworkIds = dismissedArtworks.map(artwork => artwork.id)
  const excludeArtworkIds = [...likedArtworkIds, ...dismissedArtworkIds]

  // Get the most recent liked artworks for MLT
  const savedArtworksIds =
    likedArtworkIds.length > artworksCountForTaste - 1
      ? likedArtworkIds.slice(-artworksCountForTaste)
      : likedArtworkIds

  // Get recent artist IDs to exclude
  const recentArtistIds = likedArtworks
    .slice(-artworksCountForTaste)
    .map(artwork => artwork.artistId)
    .filter(Boolean)

  // Calculate mean vector from the last 3 liked artworks
  const calculateMeanVector = vectors => {
    // Take only the last 3 vectors
    const recentVectors = vectors.slice(-3)

    return mean(recentVectors, 0)
  }

  const meanVector = calculateMeanVector(
    likedArtworks.map(a => a.vector_embedding),
  )

  // Build MLT query
  const mltQuery = {
    more_like_this: {
      fields: mltFields,
      like: savedArtworksIds.map(id => ({ _id: id })),
      min_term_freq: 1,
      min_doc_freq: 1,
    },
  }

  // Build filter query
  const filterQuery = {
    range: {
      published_at: {
        gte: "now-4M/M",
      },
    },
  }

  // Build availability query
  const availabilityQuery = {
    term: {
      availability: "for sale",
    },
  }

  // Build bool query
  const boolQuery = {
    bool: {
      must_not: [
        {
          terms: {
            _id: excludeArtworkIds,
          },
        },
        {
          terms: {
            artist_id: recentArtistIds,
          },
        },
        ...(dismissedArtists.length > 0
          ? [
              {
                terms: {
                  artist_id: dismissedArtists,
                },
              },
            ]
          : []),
        ...(dismissedCollectionIds.length > 0
          ? [
              {
                terms: {
                  marketing_collection_id: dismissedCollectionIds,
                },
              },
            ]
          : []),
        ...(dismissedTags.length > 0
          ? [
              {
                terms: {
                  tags: dismissedTags,
                },
              },
            ]
          : []),
      ],
      must: [mltQuery, filterQuery, availabilityQuery],
    },
  }

  // Build KNN query for positive vector
  const knnQuery = {
    knn: {
      vector_embedding: {
        vector: meanVector,
        k: limit + EXTRA_FETCH_SIZE,
        filter: {
          bool: {
            must: [filterQuery, availabilityQuery],
            must_not: [
              {
                terms: {
                  _id: excludeArtworkIds,
                },
              },
              {
                terms: {
                  artist_id: recentArtistIds,
                },
              },
              ...(dismissedArtists.length > 0
                ? [
                    {
                      terms: {
                        artist_id: dismissedArtists,
                      },
                    },
                  ]
                : []),
              ...(dismissedCollectionIds.length > 0
                ? [
                    {
                      terms: {
                        marketing_collection_id: dismissedCollectionIds,
                      },
                    },
                  ]
                : []),
              ...(dismissedTags.length > 0
                ? [
                    {
                      terms: {
                        tags: dismissedTags,
                      },
                    },
                  ]
                : []),
            ],
          },
        },
      },
    },
  }

  return {
    size: limit,
    _source: [
      "id",
      "artist_id",
      "artist_name",
      "title",
      "artist_names",
      "medium",
      "image_url",
      "vector_embedding",
      "marketing_collection_id",
      "tags",
    ],
    query: {
      hybrid: {
        queries: [boolQuery, knnQuery],
      },
    },
    search_pipeline: {
      phase_results_processors: [
        {
          "normalization-processor": {
            normalization: {
              technique: "min_max",
            },
            combination: {
              technique: "arithmetic_mean",
              parameters: {
                weights: weights,
              },
            },
            ignore_failure: false,
          },
        },
      ],
      response_processors: [
        {
          collapse: {
            field: "artist_id",
          },
        },
      ],
    },
  }
}

const request = async (url, opts) => {
  try {
    const options: RequestInit = {
      method: opts.method || "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: opts.body,
    }

    const response = await fetch(url, options)

    if (!response?.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const json = await response.json()
    return json
  } catch (error) {
    console.log("Error fetching data")
    console.error(error.message)
  }
}

export const DiscoverDailyApp = () => {
  const [artworks, setArtworks] = React.useState<Artwork[]>([])
  const [likedArtworks, setLikedArtworks] = React.useState<Artwork[]>([])
  const [dismissedArtworks, setDismissedArtworks] = React.useState<Artwork[]>(
    [],
  )
  const [dismissedArtists, setDismissedArtists] = React.useState<string[]>([])
  const [dismissedCollectionIds, setDismissedCollectionIds] = React.useState<
    string[]
  >([])
  const [dismissedTags, setDismissedTags] = React.useState<string[]>([])
  const [excludeDismissedArtists, setExcludeDismissedArtists] =
    React.useState(false)
  const [excludeDismissedCollections, setExcludeDismissedCollections] =
    React.useState(false)
  const [excludeDismissedTags, setExcludeDismissedTags] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [mltWeight, setMltWeight] = React.useState(0.6)
  const [knnWeight, setKnnWeight] = React.useState(0.4)
  const [tasteArtworks, _setTasteArtworks] = React.useState(3)
  const [mltFields, setMltFields] = React.useState<string[]>([
    "genes",
    "materials",
    "medium",
    "tags",
  ])
  const [artworksLimit, _setArtworksLimit] = React.useState(5)
  const [selectedNationalities, setSelectedNationalities] = React.useState<
    string[]
  >([])
  const [selectedMediums, setSelectedMediums] = React.useState<string[]>([])
  const [priceRange, setPriceRange] = React.useState({ min: 0, max: 1000000 })

  const onLike = artwork => {
    setLikedArtworks([...likedArtworks, artwork])
  }

  const onDismiss = artwork => {
    setDismissedArtworks([...dismissedArtworks, artwork])

    // Track dismissed artists
    if (artwork.artistId && !dismissedArtists.includes(artwork.artistId)) {
      setDismissedArtists([...dismissedArtists, artwork.artistId])
    }

    // Track dismissed collection IDs
    if (artwork.marketingCollectionId) {
      const collectionIds = Array.isArray(artwork.marketingCollectionId)
        ? artwork.marketingCollectionId
        : [artwork.marketingCollectionId]

      const newCollectionIds = collectionIds.filter(
        id => !dismissedCollectionIds.includes(id),
      )

      if (newCollectionIds.length > 0) {
        setDismissedCollectionIds([
          ...dismissedCollectionIds,
          ...newCollectionIds,
        ])
      }
    }

    // Track dismissed tags
    if (artwork.tags && Array.isArray(artwork.tags)) {
      const newTags = artwork.tags.filter(tag => !dismissedTags.includes(tag))

      if (newTags.length > 0) {
        setDismissedTags([...dismissedTags, ...newTags])
      }
    }
  }

  const handleCheckboxChange = field => {
    setMltFields(prevFields => {
      const updatedFields = prevFields.includes(field)
        ? prevFields.filter(f => f !== field)
        : [...prevFields, field]
      return updatedFields
    })
  }

  const initialArtworks = async () => {
    setLoading(true)

    const excludeArtworkIds = [...likedArtworks, ...dismissedArtworks].map(
      artwork => artwork.id,
    )

    const query = buildInitialOpenSearchQuery(
      excludeArtworkIds,
      artworksLimit,
      Date.now(),
      excludeDismissedArtists ? dismissedArtists : [],
      excludeDismissedCollections ? dismissedCollectionIds : [],
      excludeDismissedTags ? dismissedTags : [],
      {
        nationalities: selectedNationalities,
        mediums: selectedMediums,
        priceRange,
      },
    )

    const response = await request(OPENSEARCH_URL, {
      body: JSON.stringify(query),
    })

    // Transform the response to match the expected format
    const artworks =
      response?.hits?.hits?.map(hit => ({
        id: hit._id,
        title: hit._source.title,
        artistNames: hit._source.artist_names,
        artistName: hit._source.artist_name,
        medium: hit._source.medium,
        image: {
          url: hit._source.image_url,
        },
        vector_embedding: hit._source.vector_embedding,
        artistId: hit._source.artist_id,
        marketingCollectionId: hit._source.marketing_collection_id,
        tags: hit._source.tags,
        list_price_amount: hit._source.list_price_amount,
        artist_nationality: hit._source.artist_nationality,
        genes: hit._source.genes,
      })) || []

    setArtworks(sampleSize(artworks, artworksLimit))
    setLoading(false)
  }

  const submitSearch = async () => {
    setLoading(true)

    // continue showing curated artworks if liked artworks are less than 3
    if (likedArtworks.length < 3) {
      return initialArtworks()
    }

    // Get hybrid recommendations
    const hybridQuery = buildHybridOpenSearchQuery(
      likedArtworks,
      dismissedArtworks,
      [mltWeight, knnWeight],
      tasteArtworks,
      mltFields,
      3, // Get only 3 recommendations from hybrid query
      excludeDismissedArtists ? dismissedArtists : [],
      excludeDismissedCollections ? dismissedCollectionIds : [],
      excludeDismissedTags ? dismissedTags : [],
      {
        nationalities: selectedNationalities,
        mediums: selectedMediums,
        priceRange,
      },
    )

    const hybridResponse = await request(OPENSEARCH_URL, {
      body: JSON.stringify(hybridQuery),
    })

    // Transform the hybrid response
    const hybridArtworks =
      hybridResponse?.hits?.hits?.map(hit => ({
        id: hit._id,
        title: hit._source.title,
        artistNames: hit._source.artist_names,
        artistName: hit._source.artist_name,
        medium: hit._source.medium,
        image: {
          url: hit._source.image_url,
        },
        vector_embedding: hit._source.vector_embedding,
        artistId: hit._source.artist_id,
        marketingCollectionId: hit._source.marketing_collection_id,
        tags: hit._source.tags,
        list_price_amount: hit._source.list_price_amount,
        artist_nationality: hit._source.artist_nationality,
        genes: hit._source.genes,
      })) || []

    // Calculate how many additional artworks we need
    const hybridCount = hybridArtworks.length
    const neededCount = 5 - hybridCount

    // Get initial curated artworks to backfill if needed
    let curatedArtworks = []
    if (neededCount > 0) {
      const excludeArtworkIds = [
        ...likedArtworks.map(artwork => artwork.id),
        ...dismissedArtworks.map(artwork => artwork.id),
        ...hybridArtworks.map(artwork => artwork.id), // Exclude hybrid results
      ]

      const curatedQuery = buildInitialOpenSearchQuery(
        excludeArtworkIds,
        neededCount, // Get exactly the number we need
        Date.now(),
        excludeDismissedArtists ? dismissedArtists : [],
        excludeDismissedCollections ? dismissedCollectionIds : [],
        excludeDismissedTags ? dismissedTags : [],
        {
          nationalities: selectedNationalities,
          mediums: selectedMediums,
          priceRange,
        },
      )

      const curatedResponse = await request(OPENSEARCH_URL, {
        body: JSON.stringify(curatedQuery),
      })

      // Transform the curated response
      curatedArtworks =
        curatedResponse?.hits?.hits?.map(hit => ({
          id: hit._id,
          title: hit._source.title,
          artistNames: hit._source.artist_names,
          artistName: hit._source.artist_name,
          medium: hit._source.medium,
          image: {
            url: hit._source.image_url,
          },
          vector_embedding: hit._source.vector_embedding,
          artistId: hit._source.artist_id,
          marketingCollectionId: hit._source.marketing_collection_id,
          tags: hit._source.tags,
          list_price_amount: hit._source.list_price_amount,
          artist_nationality: hit._source.artist_nationality,
          genes: hit._source.genes,
        })) || []
    }

    // Combine hybrid and curated artworks
    const combinedArtworks = [...hybridArtworks, ...curatedArtworks]

    // If we still don't have 5 artworks, get more curated artworks
    if (combinedArtworks.length < 5) {
      const additionalNeeded = 5 - combinedArtworks.length
      const additionalExcludeIds = [
        ...likedArtworks.map(artwork => artwork.id),
        ...dismissedArtworks.map(artwork => artwork.id),
        ...combinedArtworks.map(artwork => artwork.id),
      ]

      const additionalQuery = buildInitialOpenSearchQuery(
        additionalExcludeIds,
        additionalNeeded,
        Date.now(),
        excludeDismissedArtists ? dismissedArtists : [],
        excludeDismissedCollections ? dismissedCollectionIds : [],
        excludeDismissedTags ? dismissedTags : [],
        {
          nationalities: selectedNationalities,
          mediums: selectedMediums,
          priceRange,
        },
      )

      const additionalResponse = await request(OPENSEARCH_URL, {
        body: JSON.stringify(additionalQuery),
      })

      const additionalArtworks =
        additionalResponse?.hits?.hits?.map(hit => ({
          id: hit._id,
          title: hit._source.title,
          artistNames: hit._source.artist_names,
          artistName: hit._source.artist_name,
          medium: hit._source.medium,
          image: {
            url: hit._source.image_url,
          },
          vector_embedding: hit._source.vector_embedding,
          artistId: hit._source.artist_id,
          marketingCollectionId: hit._source.marketing_collection_id,
          tags: hit._source.tags,
          list_price_amount: hit._source.list_price_amount,
          artist_nationality: hit._source.artist_nationality,
          genes: hit._source.genes,
        })) || []

      combinedArtworks.push(...additionalArtworks)
    }

    setArtworks(combinedArtworks)
    setLoading(false)
  }

  useEffect(() => {
    initialArtworks()
  }, []) // eslint-disable-line

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        <div>
          <br />
          <Text>
            Welcome to the Discover Daily Notebook! Like or dismiss artworks to
            receive personalized recommendations tailored to your preferences.
          </Text>
          <br />
          <Flex flexDirection={"row"}>
            <Button onClick={submitSearch} loading={loading} disabled={loading}>
              Get Recommendations
            </Button>
            <Flex flexDirection={"row"}>
              <Expandable
                marginLeft={20}
                marginBottom={20}
                label="Advanced Options"
                width={400}
              >
                <Flex flexDirection={"row"} justifyContent="space-between">
                  <Flex flexDirection={"column"}>
                    <Label>MLT weight</Label>
                    <Input
                      width={200}
                      type="number"
                      value={mltWeight.toString()}
                      placeholder="MLT Weight"
                      onChange={e =>
                        setMltWeight(Number.parseFloat(e.target.value))
                      }
                      max={1}
                      min={0}
                    />
                    <Separator marginY={5} />
                    <Label>KNN weight</Label>
                    <Input
                      value={knnWeight.toString()}
                      type="number"
                      placeholder="KNN Weight default. 0.4"
                      onChange={e =>
                        setKnnWeight(Number.parseFloat(e.target.value))
                      }
                      max={1}
                      min={0}
                    />
                    <Separator marginY={5} />
                    <Label>Exclude dismissed artists</Label>
                    <Checkbox
                      selected={excludeDismissedArtists}
                      onClick={() =>
                        setExcludeDismissedArtists(!excludeDismissedArtists)
                      }
                    />
                    <Separator marginY={5} />
                    <Label>Exclude dismissed collections</Label>
                    <Checkbox
                      selected={excludeDismissedCollections}
                      onClick={() =>
                        setExcludeDismissedCollections(
                          !excludeDismissedCollections,
                        )
                      }
                    />
                    <Separator marginY={5} />
                    <Label>Exclude dismissed tags</Label>
                    <Checkbox
                      selected={excludeDismissedTags}
                      onClick={() =>
                        setExcludeDismissedTags(!excludeDismissedTags)
                      }
                    />
                  </Flex>
                  <Flex flexDirection={"column"} marginLeft={20} marginTop={3}>
                    <Text>Fields to consider for MLT</Text>
                    <Flex flexDirection={"row"}>
                      {["genes", "materials", "tags", "medium"].map(field => (
                        <Fragment key={field}>
                          <Label>{field}</Label>
                          <Checkbox
                            selected={mltFields.includes(field)}
                            onClick={() => handleCheckboxChange(field)}
                          />
                        </Fragment>
                      ))}
                    </Flex>
                  </Flex>
                </Flex>
                <Flex flexDirection={"column"} marginLeft={20} marginTop={3}>
                  <Text>Filter Options</Text>

                  <Label marginTop={3}>Artist Nationalities</Label>
                  <Flex flexDirection={"row"} flexWrap="wrap" marginBottom={3}>
                    {NATIONALITY_OPTIONS.map(nationality => (
                      <Fragment key={nationality}>
                        <Label>{nationality}</Label>
                        <Checkbox
                          selected={selectedNationalities.includes(nationality)}
                          onClick={() => {
                            setSelectedNationalities(prev =>
                              prev.includes(nationality)
                                ? prev.filter(n => n !== nationality)
                                : [...prev, nationality],
                            )
                          }}
                        />
                      </Fragment>
                    ))}
                  </Flex>

                  <Label marginTop={3}>Mediums</Label>
                  <Flex flexDirection={"row"} flexWrap="wrap" marginBottom={3}>
                    {MEDIUM_OPTIONS.map(medium => (
                      <Fragment key={medium}>
                        <Label>{medium}</Label>
                        <Checkbox
                          selected={selectedMediums.includes(medium)}
                          onClick={() => {
                            setSelectedMediums(prev =>
                              prev.includes(medium)
                                ? prev.filter(m => m !== medium)
                                : [...prev, medium],
                            )
                          }}
                        />
                      </Fragment>
                    ))}
                  </Flex>

                  <Label marginTop={3}>Price Range</Label>
                  <Flex
                    flexDirection={"row"}
                    alignItems="center"
                    marginBottom={3}
                  >
                    <Input
                      width={100}
                      type="number"
                      value={priceRange.min}
                      placeholder="Min"
                      onChange={e =>
                        setPriceRange(prev => ({
                          ...prev,
                          min: Number(e.target.value),
                        }))
                      }
                    />
                    <Text mx={2}>to</Text>
                    <Input
                      width={100}
                      type="number"
                      value={priceRange.max}
                      placeholder="Max"
                      onChange={e =>
                        setPriceRange(prev => ({
                          ...prev,
                          max: Number(e.target.value),
                        }))
                      }
                    />
                  </Flex>

                  <Button
                    size="small"
                    variant="secondaryWhite"
                    marginTop={3}
                    onClick={() => {
                      setSelectedNationalities([])
                      setSelectedMediums([])
                      setPriceRange({ min: 0, max: 1000000 })
                    }}
                  >
                    Reset Filters
                  </Button>
                </Flex>
              </Expandable>
            </Flex>
            <br />
            <br />
          </Flex>
        </div>
      </Flex>
      {loading ? (
        <Text>Loading...</Text>
      ) : artworks.length === 0 ? (
        <Text>
          No artworks found matching your filters. Try adjusting your filters or
          resetting them.
        </Text>
      ) : (
        <Flex justifyContent="space-between" flexWrap={"wrap"}>
          {artworks.map((artwork: any) => {
            return (
              <Artwork
                artworkResource={artwork}
                key={artwork.id}
                onLike={onLike}
                onDismiss={onDismiss}
              />
            )
          })}
        </Flex>
      )}
      <Separator />
      <Flex flexDirection={"column"}>
        <Text fontSize={15}>
          <b>Liked artworks:</b>
        </Text>
        <Flex flexDirection={"row"} flexWrap={"wrap"}>
          {likedArtworks.map((artwork: any) => {
            return (
              <Artwork
                artworkResource={artwork}
                key={artwork.id + "liked"}
                onLike={onLike}
                onDismiss={onDismiss}
                viewed
              />
            )
          })}
        </Flex>
        <Text fontSize={15}>
          <b>Dismissed artworks:</b>
        </Text>
        <Flex flexDirection={"row"} flexWrap={"wrap"}>
          {dismissedArtworks.map((artwork: any) => {
            return (
              <Artwork
                artworkResource={artwork}
                key={artwork.id + "dismissed"}
                onLike={onLike}
                onDismiss={onDismiss}
                viewed
              />
            )
          })}
        </Flex>
      </Flex>
    </Flex>
  )
}

const Artwork = ({ onLike, onDismiss, viewed = false, artworkResource }) => {
  const [artwork, setArtwork] = React.useState(artworkResource) as any

  const onLikeEvent = a => {
    onLike(a)
    setArtwork({ ...artwork, liked: true })
  }

  const onDismissEvent = id => {
    onDismiss(id)
    setArtwork({ ...artwork, dismissed: true })
  }

  // Format marketing collection IDs for display
  const formatMarketingCollectionIds = () => {
    if (
      !artwork.marketingCollectionId ||
      !Array.isArray(artwork.marketingCollectionId)
    ) {
      return "No collection"
    }

    // Map IDs to friendly names, but only include those that exist in COLLECTION_NAMES
    const collectionNames = artwork.marketingCollectionId
      .filter(id => COLLECTION_NAMES[id]) // Only keep IDs that exist in the mapping
      .map(id => COLLECTION_NAMES[id])

    if (collectionNames.length === 0) {
      return "No collection"
    }

    return `Collection: ${collectionNames.join(", ")}`
  }

  // Format price for display
  const formatPrice = () => {
    if (!artwork.list_price_amount) {
      return "Price not available"
    }
    // Format float to 2 decimal places and add thousands separator
    return `$${artwork.list_price_amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  return (
    <div style={{ width: "20%", flexShrink: 1, marginBottom: "20px" }}>
      <a
        href={`https://staging.artsy.net/artwork/${artwork.id}`}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={`https://d7hftxdivxxvm.cloudfront.net/?src=${artwork?.image?.url}&resize_to=fit&width=200&height=200&grow=false`}
          alt={artwork?.title || ""}
          style={{ cursor: "pointer", width: viewed ? "30%" : "auto" }}
        />
      </a>
      <h2 style={{ fontSize: "12px" }}>
        <b>{artwork?.title}</b>
      </h2>
      <h3 style={{ fontSize: "13px" }}>
        <i>{artwork?.artistName}</i>
      </h3>
      {artwork.medium && <h3 style={{ fontSize: "13px" }}>{artwork.medium}</h3>}
      <h3 style={{ fontSize: "13px" }}>{formatMarketingCollectionIds()}</h3>
      <h3 style={{ fontSize: "13px" }}>{formatPrice()}</h3>
      {viewed ||
        (artwork.title !== "Artwork not available" && (
          <>
            <Button
              size="small"
              variant="primaryWhite"
              onClick={() => onLikeEvent(artwork)}
              disabled={artwork.liked || artwork.dismissed}
            >
              Like
            </Button>
            <Button
              size="small"
              variant="primaryWhite"
              onClick={() => onDismissEvent(artwork)}
              disabled={artwork.dismissed || artwork.liked}
            >
              Dismiss
            </Button>
          </>
        ))}
    </div>
  )
}
