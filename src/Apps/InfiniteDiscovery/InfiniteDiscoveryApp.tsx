import { Flex, Button, Text, Separator } from "@artsy/palette"
import React, { useEffect } from "react"
import { sampleSize, uniq } from "lodash"
import { mean } from "mathjs"

const SEARCH_URL =
  "https://vpc-artsy-staging-opensearch2-gfdbifpyvreziqr7r6ewx5zpe4.us-east-1.es.amazonaws.com/artworks_local/_search"

const CURATORS_PICKS_URL =
  "https://vpc-artsy-staging-opensearch2-gfdbifpyvreziqr7r6ewx5zpe4.us-east-1.es.amazonaws.com/curators_picks/_search?size=135"

const calculateMeanVector = vectors => {
  return mean(vectors, 0)
}

const BUILD_OPEN_SEARCH_QUERY = (lArtworks, dArtworks, cArtworks) => {
  const likedArtworks = lArtworks.map(artwork => {
    return {
      vector_embedding: artwork.vector_embedding,
    }
  })

  const meanVector = calculateMeanVector(
    likedArtworks.map(a => a.vector_embedding)
  )

  const dismissedArtworks = dArtworks.map(artwork => ({
    term: {
      _id: artwork.id,
    },
  }))

  const ignoreArtworks = lArtworks.map(artwork => ({
    term: {
      _id: artwork.id,
    },
  }))

  const dismissedAndLiked = uniq([...dismissedArtworks, ...ignoreArtworks])

  const query = {
    size: 10,
    collapse: {
      field: "artistName",
    },
    query: {
      bool: {
        filter: {
          bool: {
            must_not: [...(dismissedAndLiked || [])],
          },
        },
        should: [
          {
            knn: {
              vector_embedding: {
                vector: meanVector,
                k: 10,
              },
            },
          },
        ],
      },
    },
  }

  console.log("QUERY")
  console.log(query)

  return query
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

export const InfiniteDiscoveryApp = () => {
  const [artworks, setArtworks] = React.useState([]) as any
  const [likedArtworks, setLikedArtworks] = React.useState([]) as any
  const [dismissedArtworks, setDismissedArtworks] = React.useState([]) as any
  const [curatedArtworks, setCuratedArtworks] = React.useState([]) as any
  const [ca, setCa] = React.useState([]) as any
  const [loading, setLoading] = React.useState(false)

  const onLike = artwork => {
    setLikedArtworks([...likedArtworks, artwork])
    // filter out from curated artworks
    setCuratedArtworks(curatedArtworks.filter(a => a !== artwork.internalID))
  }

  const onDismiss = artwork => {
    setDismissedArtworks([...dismissedArtworks, artwork])
    // filter out from curated artworks
    setCuratedArtworks(curatedArtworks.filter(a => a !== artwork))
  }

  const isCurated = artwork => ca.includes(artwork)

  const submitSearch = async () => {
    setLoading(true)

    // continue showing curated artworks if liked artworks are less than 3
    if (likedArtworks.length < 3) {
      const sampleArtworks = sampleSize(curatedArtworks, 10)
      setArtworks(sampleArtworks)
      return setLoading(false)
    }

    const data = await request(`${SEARCH_URL}`, {
      body: JSON.stringify(
        BUILD_OPEN_SEARCH_QUERY(
          likedArtworks,
          dismissedArtworks,
          curatedArtworks
        )
      ),
    })

    const artworksResponse = data?.hits?.hits?.map(hit => hit._source)

    const aArtworks = artworksResponse.slice(0, 8)
    const cArtworks = sampleSize(curatedArtworks, 2)

    setArtworks([...aArtworks, ...cArtworks])
    setLoading(false)
  }

  useEffect(() => {
    const req = async () => {
      const response = await request(`${CURATORS_PICKS_URL}`, { method: "GET" })
      const curatedPicksArtworks = response?.hits?.hits.map(hit => hit._source)

      setArtworks(sampleSize(curatedPicksArtworks, 10))
      setCuratedArtworks(curatedPicksArtworks)
      setCa(curatedPicksArtworks)
    }
    req()
  }, [])

  if (artworks.length === 0) {
    return <h1>Nothing to show</h1>
  }

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        <div>
          <br />
          <Text>
            Welcome to the Infinite Discovery Notebook! Like or dismiss artworks
            to receive personalized recommendations tailored to your
            preferences.
          </Text>
          <br />
          <div>
            <Button
              onClick={submitSearch}
              loading={loading}
              disabled={
                (likedArtworks.length === 0 &&
                  dismissedArtworks.length === 0) ||
                loading
              }
            >
              Get Recommendations
            </Button>
            <br />
            <br />
            <br />
          </div>
        </div>
      </Flex>
      <Flex justifyContent={"space-between"} flexWrap={"wrap"}>
        {artworks.map((artwork: any) => {
          return (
            <Artwork
              artworkResource={artwork}
              key={artwork.id}
              internalID={artwork.id}
              onLike={onLike}
              onDismiss={onDismiss}
              isCurated={isCurated}
            />
          )
        })}
      </Flex>
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
                internalID={artwork.id}
                onLike={onLike}
                onDismiss={onDismiss}
                isCurated={isCurated}
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
                internalID={artwork.id}
                onLike={onLike}
                onDismiss={onDismiss}
                isCurated={isCurated}
                viewed
              />
            )
          })}
        </Flex>
      </Flex>
    </Flex>
  )
}

const Artwork = ({
  internalID,
  onLike,
  onDismiss,
  isCurated,
  viewed = false,
  artworkResource,
}) => {
  const [artwork, setArtwork] = React.useState(artworkResource) as any

  const onLikeEvent = a => {
    onLike(a)
    setArtwork({ ...artwork, liked: true })
  }

  const onDismissEvent = id => {
    onDismiss(id)
    setArtwork({ ...artwork, dismissed: true })
  }

  return (
    <div style={{ width: "20%", flexShrink: 1, marginBottom: "20px" }}>
      <a
        href={`https://staging.artsy.net/artwork/${artwork.id}`}
        target="_blank"
      >
        <img
          src={`https://d7hftxdivxxvm.cloudfront.net/?src=${artwork?.image_url}&resize_to=fit&width=200&height=200&grow=false`}
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
      <h3 style={{ fontSize: "13px" }}>{artwork.id}</h3>
      {isCurated(artwork.id) && (
        <Text color="purple" fontSize="10px">
          curators-picks
        </Text>
      )}
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
