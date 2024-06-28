import { FC } from "react"
import { Box, Clickable, Flex, Image, useToasts, Text } from "@artsy/palette"
import { DiscoveryArtwork } from "Apps/ArtAdvisor/07-Curated-Discovery/types"
import CheckmarkFillIcon from "@artsy/icons/CheckmarkFillIcon"
import CloseFillIcon from "@artsy/icons/CloseFillIcon"
import { useSystemContext } from "System/Hooks/useSystemContext"
import _ from "lodash"
import { resize } from "Utils/resizer"
import { RouterLink } from "System/Components/RouterLink"

const IMAGE_HEIGHT = 300

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

  const resizedImage = resize(
    artwork.imageUrl || "https://www.artsy.net/images/missing_image.png",
    { height: IMAGE_HEIGHT }
  )

  return (
    <Box>
      <RouterLink
        to={`/artwork/${artwork.slug}`}
        target="_blank"
        textDecoration={"none"}
        overflow={"hidden"}
      >
        <Image src={resizedImage} height={IMAGE_HEIGHT} />
      </RouterLink>

      <Flex
        alignItems={"flex-start"}
        justifyContent={"space-between"}
        gap={1}
        pt={0.5}
      >
        <RouterLink
          to={`/artwork/${artwork.slug}`}
          target="_blank"
          textDecoration={"none"}
          overflow={"hidden"}
        >
          <Flex flexDirection="column">
            <Text variant="sm-display" overflowEllipsis>
              {artwork.artistNames?.join(", ") || "Unknown Artist"}
            </Text>
            <Text
              variant="sm-display"
              color="black60"
              overflowEllipsis
              maxWidth={"15em"}
            >
              <i>{artwork.title}</i>
              {artwork.date && `, ${artwork.date}`}
            </Text>

            <Text
              variant="xs"
              color="black100"
              fontWeight="bold"
              overflowEllipsis
            >
              {artwork.price}
            </Text>
          </Flex>
        </RouterLink>

        <Flex gap={1} justifyContent={"center"}>
          <Clickable onClick={handleClickLike}>
            <CheckmarkFillIcon fill={"black60"} size={25} />
          </Clickable>
          <Clickable onClick={handleClickDislike}>
            <CloseFillIcon fill={"black60"} size={25} />
          </Clickable>
        </Flex>
      </Flex>
    </Box>
  )
}
