import CheckmarkFillIcon from "@artsy/icons/CheckmarkFillIcon"
import CloseFillIcon from "@artsy/icons/CloseFillIcon"
import {
  Column,
  Text,
  Image,
  Clickable,
  Flex,
  Spacer,
  useToasts,
} from "@artsy/palette"
import {
  DiscoveryArtwork,
  DiscoveryUser,
} from "Apps/ArtAdvisor/06-Discovery-Neartext/types"
import _ from "lodash"
import { FC } from "react"

type ArtworkProps = {
  artwork: DiscoveryArtwork
  user: DiscoveryUser
  setUser: (user: DiscoveryUser) => void
}

export const Artwork: FC<ArtworkProps> = ({ artwork, user, setUser }) => {
  const { sendToast } = useToasts()

  if (!artwork.imageUrl) {
    return null
  }

  const handleClickLike = async () => {
    try {
      const like = await fetch("/api/advisor/6/artworks/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          artworkId: artwork.internalID,
        }),
      })

      if (like.ok) {
        // optimistic update of user state
        setUser({
          ...user,
          likedArtworkIds: _.uniq([
            ...user.likedArtworkIds,
            artwork.internalID,
          ]),
        })
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
      const dislike = await fetch("/api/advisor/6/artworks/dislikes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          artworkId: artwork.internalID,
        }),
      })

      if (dislike.ok) {
        // optimistic update of user state
        setUser({
          ...user,
          dislikedArtworkIds: _.uniq([
            ...user.dislikedArtworkIds,
            artwork.internalID,
          ]),
        })
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
    <Column span={[6, 4]}>
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Image src={artwork.imageUrl} height={300} />
        <Spacer y={1} />
        <Text py={1} variant="sm-display" color="black60" overflowEllipsis>
          {artwork.title}
        </Text>

        <Flex py={1} gap={1} justifyContent={"center"}>
          <Clickable onClick={handleClickLike}>
            <CheckmarkFillIcon fill={"black60"} size={30} />
          </Clickable>
          <Clickable onClick={handleClickDislike}>
            <CloseFillIcon fill={"black60"} size={30} />
          </Clickable>
        </Flex>
      </Flex>
    </Column>
  )
}
