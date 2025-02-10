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
import React, { useEffect } from "react"

const buildMetaphysicsQuery = (
  likedArtworks,
  dismissedArtworks,
  weight,
  artworksCountForTaste = 3,
  mltFields = [],
  artworksLimit,
) => {
  const likedArtworkIds = likedArtworks.map(artwork => artwork.id)
  const dismissedArtworkIds = dismissedArtworks.map(artwork => artwork.id)

  const variables = {
    osWeights: weight,
    likedArtworkIds:
      likedArtworkIds.length > artworksCountForTaste - 1
        ? likedArtworkIds.slice(-artworksCountForTaste)
        : [],
    excludeArtworkIds:
      likedArtworkIds.length < artworksCountForTaste
        ? [...likedArtworkIds, ...dismissedArtworkIds]
        : // split artworks after the last artworksCountForTaste liked artwork
          [
            ...likedArtworkIds.slice(0, -artworksCountForTaste),
            ...dismissedArtworkIds,
          ],
    ...(mltFields.length > 0 && { mltFields }),
    limit: artworksLimit,
  }

  return {
    query: `
      query InfiniteDiscoveryAppQuery($likedArtworkIds: [String], $excludeArtworkIds: [String], $osWeights: [Float], $mltFields: [String], $limit: Int) {
        discoverArtworks(
          osWeights: $osWeights,
          likedArtworkIds: $likedArtworkIds,
          excludeArtworkIds: $excludeArtworkIds,
          mltFields: $mltFields,
          limit: $limit
        ) {
          edges {
            node {
              id: internalID
              title
              artistNames
              medium
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
        "Cache-Control": "no-cache",
        "X-Access-Token": window.sd.CURRENT_USER.accessToken,
        "X-User-Id": window.sd.CURRENT_USER.id,
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
  const [mltWeight, setMltWeight] = React.useState(0.6)
  const [knnWeight, setKnnWeight] = React.useState(0.4)
  const [tasteArtworks, setTasteArtworks] = React.useState(3)
  const [mltFields, setMltFields] = React.useState([
    "genes",
    "materials",
    "tags",
    "medium",
  ])
  const [artworksLimit, setArtworksLimit] = React.useState(5)

  const onLike = artwork => {
    setLikedArtworks([...likedArtworks, artwork])
  }

  const onDismiss = artwork => {
    setDismissedArtworks([...dismissedArtworks, artwork])
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
    const response = await request("https://metaphysics-staging.artsy.net/v2", {
      body: JSON.stringify(
        buildMetaphysicsQuery(
          likedArtworks,
          dismissedArtworks,
          [0.6, 0.4],
          tasteArtworks,
          mltFields as any,
          artworksLimit,
        ),
      ),
    })

    const artworks = response?.data?.discoverArtworks?.edges.map(
      edge => edge.node,
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

    const response = await request("https://metaphysics-staging.artsy.net/v2", {
      body: JSON.stringify(
        buildMetaphysicsQuery(
          likedArtworks,
          dismissedArtworks,
          [mltWeight, knnWeight],
          tasteArtworks,
          mltFields as any,
          artworksLimit,
        ),
      ),
    })

    const artworks = response?.data?.discoverArtworks?.edges.map(
      edge => edge.node,
    )
    setArtworks(artworks)
    setLoading(false)
  }

  useEffect(() => {
    initialArtworks()
  }, []) // eslint-disable-line

  if (artworks.length === 0) {
    return <h1>Loading...</h1>
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
          <Flex flexDirection={"row"}>
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
                  </Flex>
                  <Flex flexDirection={"column"} marginLeft={20}>
                    <Label>
                      How many liked artworks to consider for recommendations
                    </Label>
                    <Input
                      typeof="number"
                      placeholder="Number of liked artworks to consider for recommendations"
                      value={tasteArtworks.toString()}
                      type="number"
                      onChange={e =>
                        setTasteArtworks(Number.parseInt(e.target.value))
                      }
                    />
                    <Separator marginY={5} />
                    <Text>Fields to consider for MLT</Text>
                    <Flex flexDirection={"row"}>
                      {["genes", "materials", "tags", "medium"].map(field => (
                        <>
                          <Label key={field}>{field}</Label>
                          <Checkbox
                            selected={mltFields.includes(field)}
                            onClick={() => handleCheckboxChange(field)}
                          />
                        </>
                      ))}
                    </Flex>
                  </Flex>
                  <Separator marginLeft={10} border={0} />
                  <Flex flexDirection={"column"}>
                    <Label>How many artworks to consider for batch</Label>
                    <Input
                      typeof="number"
                      placeholder="Number artworks for batch"
                      value={artworksLimit.toString()}
                      type="number"
                      onChange={e =>
                        setArtworksLimit(Number.parseInt(e.target.value))
                      }
                    />
                  </Flex>
                </Flex>
              </Expandable>
            </Flex>
            <br />
            <br />
          </Flex>
        </div>
      </Flex>
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
        <i>{artwork?.artistNames}</i>
      </h3>
      <h3 style={{ fontSize: "13px" }}>{artwork.medium}</h3>
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
