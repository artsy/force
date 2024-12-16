import { Flex, Button, Text, Separator } from "@artsy/palette"
import React, { useEffect } from "react"
import { sampleSize } from "lodash"
import { getMetaphysicsEndpoint } from "System/Relay/getMetaphysicsEndpoint"

const buildMetaphysicsQuery = (likedArtworks, dismissedArtworks) => {
  const likedArtworkIds = likedArtworks.map(artwork => artwork.id)
  const dismissedArtworkIds = dismissedArtworks.map(artwork => artwork.id)

  // Adjust query variables based on conditions
  const variables = {
    likedArtworkIds: likedArtworkIds.length > 2 ? likedArtworkIds : [],
    dismissedArtworkIds:
      likedArtworkIds.length < 3
        ? [...likedArtworkIds, ...dismissedArtworkIds]
        : dismissedArtworkIds,
  }

  return {
    query: `
      query InfiniteDiscoveryAppQuery($likedArtworkIds: [String], $dismissedArtworkIds: [String]) {
        discoverArtworks(
          useOpenSearch: true,
          likedArtworkIds: $likedArtworkIds,
          excludeArtworkIds: $dismissedArtworkIds
        ) {
          edges {
            node {
              id: internalID
              title
              artistNames
              image {
                url
              }
            }
          }
        }
      }
    `,
    variables,
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

export const InfiniteDiscoveryApp = () => {
  const [artworks, setArtworks] = React.useState([]) as any
  const [likedArtworks, setLikedArtworks] = React.useState([]) as any
  const [dismissedArtworks, setDismissedArtworks] = React.useState([]) as any
  const [loading, setLoading] = React.useState(false)

  const onLike = artwork => {
    setLikedArtworks([...likedArtworks, artwork])
  }

  const onDismiss = artwork => {
    setDismissedArtworks([...dismissedArtworks, artwork])
  }

  const initialArtworks = async () => {
    const response = await request(getMetaphysicsEndpoint(), {
      body: JSON.stringify(
        buildMetaphysicsQuery(likedArtworks, dismissedArtworks)
      ),
    })

    const artworks = response?.data?.discoverArtworks?.edges.map(
      edge => edge.node
    )
    setArtworks(sampleSize(artworks, 10))
    setLoading(false)
  }

  const submitSearch = async () => {
    setLoading(true)

    // continue showing curated artworks if liked artworks are less than 3
    if (likedArtworks.length < 3) {
      return initialArtworks()
    }

    const response = await request(getMetaphysicsEndpoint(), {
      body: JSON.stringify(
        buildMetaphysicsQuery(likedArtworks, dismissedArtworks)
      ),
    })

    const artworks = response?.data?.discoverArtworks?.edges.map(
      edge => edge.node
    )
    setArtworks(artworks)
    setLoading(false)
  }

  useEffect(() => {
    initialArtworks()
  }, []) // eslint-disable-line

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
          <Flex>
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
          </Flex>
        </div>
      </Flex>
      <Flex justifyContent={"space-between"} flexWrap={"wrap"}>
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

  return (
    <div style={{ width: "20%", flexShrink: 1, marginBottom: "20px" }}>
      <a
        href={`https://staging.artsy.net/artwork/${artwork.id}`}
        target="_blank"
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
        <i>{artwork?.artistNames}</i>
      </h3>
      <h3 style={{ fontSize: "13px" }}>{artwork.id}</h3>
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
