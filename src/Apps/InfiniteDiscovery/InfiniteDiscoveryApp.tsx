import { Flex, Button, Text, Separator } from "@artsy/palette"
import { getMetaphysicsEndpoint } from "System/Relay/getMetaphysicsEndpoint"
import React, { useEffect } from "react"
import { uniq, sampleSize, shuffle } from "lodash"

const ES_URL =
  "https://vpc-artsy-staging-es7-srsqgcck5vzy7uq2eqqhvrm4x4.us-east-1.es.amazonaws.com"

const BUILD_SEARCH_QUERY = (lArtworks, dArtworks, cArtworks) => {
  const likedArtworks = lArtworks.map(artwork => {
    return {
      _index: "artworks_7shards_production",
      _type: "_doc",
      _id: artwork.internalID,
    }
  })

  const dismissedArtworks = dArtworks.map(artwork => ({
    term: {
      _id: artwork.internalID,
    },
  }))

  const curatedArtworks = cArtworks.map(artwork => {
    return {
      _index: "artworks_7shards_production",
      _type: "_doc",
      _id: artwork,
    }
  })

  const sampleCurated = sampleSize(curatedArtworks, 3)

  const artistsToFilterIds = uniq(
    [...lArtworks, ...dArtworks].map(artwork => artwork.artist.internalID)
  )

  console.log("artistsToFilterIds")
  console.log(artistsToFilterIds)

  const filterArtists = artistsToFilterIds.map(id => ({
    term: {
      artist_id: id,
    },
  }))

  return {
    query: {
      bool: {
        should: [
          {
            more_like_this: {
              fields: ["id", "genes_vectors"],
              like: likedArtworks.length === 0 ? sampleCurated : likedArtworks,
              min_term_freq: 1,
              min_doc_freq: 30,
              max_query_terms: 18,
              minimum_should_match: "30%",
            },
          },
        ],
        must: [
          {
            term: { published: true },
          },
          {
            term: { for_sale: true },
          },
        ],
        filter: [
          { range: { career_stage: { gte: 0, lte: 100 } } },
          {
            script: {
              script: {
                source: "doc['genes.raw'].size() >= 1",
              },
            },
          },
        ],
        must_not: [...(dismissedArtworks || []), ...filterArtists],
      },
    },
    collapse: {
      field: "artist_id",
    },
    aggregations: {
      uniq_artists: {
        terms: {
          field: "artist_id",
          size: 1,
          order: {
            top_score: "desc",
          },
        },
        aggs: {
          sim_works: {
            top_hits: {
              size: 1,
              _source: ["_id"],
            },
          },
          top_score: {
            max: {
              script: "_score",
            },
          },
        },
      },
    },
  }
}

const CURATORS_PICKS_QUERY = `
  query {
    marketingCollection(slug: "curators-picks") {
      slug
      artworkIds
    }
  }
`

const ARTWORK_QUERY = internalID => `
  query {
    artwork(id: "${internalID}") {
      title
      imageUrl
      internalID
      artist {
        name
        internalID
      }
    }
  }
`

const request = async (url, opts) => {
  try {
    const options = {
      method: "POST",
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

  const isCurated = artwork => curatedArtworks.includes(artwork)

  const submitSearch = async () => {
    const data = await request(`${ES_URL}/_search`, {
      body: JSON.stringify(
        BUILD_SEARCH_QUERY(likedArtworks, dismissedArtworks, curatedArtworks)
      ),
    })

    console.log("curatedArtworks", curatedArtworks)
    console.log("likedArtworks", likedArtworks)
    console.log("dismissedArtworks", dismissedArtworks)

    console.log(data)
    const artworksResponse = data?.hits?.hits.map(hit => hit._id)

    const aArtworks = artworksResponse.slice(0, 8)
    const cArtworks = sampleSize(curatedArtworks, 2)

    console.log("aArtworks", aArtworks)
    console.log("cArtworks", cArtworks)

    setArtworks(shuffle([...aArtworks, ...cArtworks]))
  }

  useEffect(() => {
    const req = async () => {
      const response = await request(getMetaphysicsEndpoint(), {
        body: JSON.stringify({ query: CURATORS_PICKS_QUERY }),
        mode: "no-cors",
      })

      const artworks = uniq(response?.data?.marketingCollection?.artworkIds)
      setArtworks(sampleSize(artworks, 10))
      setCuratedArtworks(artworks)
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
              disabled={
                likedArtworks.length === 0 && dismissedArtworks.length === 0
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
              key={artwork}
              internalID={artwork}
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
                key={artwork.internalID + "liked"}
                internalID={artwork.internalID}
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
                key={artwork.internalID + "dismissed"}
                internalID={artwork.internalID}
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
}) => {
  const [artwork, setArtwork] = React.useState({}) as any

  useEffect(() => {
    const req = async () => {
      const response = await request(getMetaphysicsEndpoint(), {
        body: JSON.stringify({ query: ARTWORK_QUERY(internalID) }),
        mode: "no-cors",
      })
      if (!response?.data?.artwork) {
        return setArtwork({
          title: "Artwork not available",
        })
      }
      setArtwork(response?.data?.artwork)
    }
    req()
  }, []) // eslint-disable-line

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
        href={`https://staging.artsy.net/artwork/${internalID}`}
        target="_blank"
      >
        <img
          src={artwork?.imageUrl}
          alt={artwork?.title || ""}
          style={{ cursor: "pointer", width: viewed ? "30%" : "auto" }}
        />
      </a>
      <h2 style={{ fontSize: "12px" }}>
        <b>{artwork?.title}</b>
      </h2>
      <h3 style={{ fontSize: "13px" }}>
        <i>{artwork?.artist?.name}</i>
      </h3>
      <h3 style={{ fontSize: "13px" }}>{artwork.internalID}</h3>
      {isCurated(artwork.internalID) && (
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
