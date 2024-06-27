import { FC } from "react"
import { Box, Clickable, Flex, Image, useToasts, Text } from "@artsy/palette"
import { DiscoveryArtwork } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/ArtworksRail"
import CheckmarkFillIcon from "@artsy/icons/CheckmarkFillIcon"
import CloseFillIcon from "@artsy/icons/CloseFillIcon"
import { useSystemContext } from "System/Hooks/useSystemContext"
import _ from "lodash"

interface ArtworkProps {
  artwork: DiscoveryArtwork
  setExcludeArtworkIds: any
}

export const Artwork: FC<ArtworkProps> = props => {
  const { artwork, setExcludeArtworkIds } = props
  const { sendToast } = useToasts()
  const { user } = useSystemContext()

  const handleClickLike = async () => {
    try {
      const like = await fetch("/api/advisor/7/artworks/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          artworkId: artwork.internalID,
        }),
      })

      if (like.ok) {
        setExcludeArtworkIds(prevState => [...prevState, artwork.internalID])
      }

      sendToast({
        message: `Liked ${artwork.title}`,
      })
    } catch (error) {
      console.error(error)
      sendToast({
        variant: "error",
        message: `Something went wrong liking artwork: ${artwork.title}`,
      })
    }
  }

  const handleClickDislike = async () => {
    try {
      const dislike = await fetch("/api/advisor/7/artworks/dislikes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          artworkId: artwork.internalID,
        }),
      })

      if (dislike.ok) {
        setExcludeArtworkIds(prevState => [...prevState, artwork.internalID])
      }

      sendToast({
        message: `Disliked ${artwork.title}`,
      })
    } catch (error) {
      console.error(error)
      sendToast({
        variant: "error",
        message: `Something went wrong disliking artwork: ${artwork.title}`,
      })
    }
  }

  return (
    <Box>
      <Image src={artwork.imageUrl} height={300} />
      <Flex py={1} gap={1} justifyContent={"center"}>
        <Clickable onClick={handleClickLike}>
          <CheckmarkFillIcon fill={"black60"} size={30} />
        </Clickable>
        <Clickable onClick={handleClickDislike}>
          <CloseFillIcon fill={"black60"} size={30} />
        </Clickable>
      </Flex>
      <Flex flexDirection="column" alignItems="center">
        <a href={`/artwork/${artwork.slug}`} target="_blank">
          {artwork.title}
        </a>
        <Text>{artwork.price}</Text>
      </Flex>
    </Box>
  )
}
