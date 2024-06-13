import CloseIcon from "@artsy/icons/CloseIcon"
import HeartStrokeIcon from "@artsy/icons/HeartStrokeIcon"
import {
  Column,
  Text,
  Image,
  Clickable,
  Flex,
  Spacer,
  useToasts,
} from "@artsy/palette"
import { FC } from "react"
import { ArtworkType } from "Apps/ArtAdvisor/05-Near-Object-Rail/App"

type ActionType = "like" | "dislike"

type ArtworkProps = {
  artwork: ArtworkType
  userId: string
  getNearObject: any
}

export const Artwork: FC<ArtworkProps> = ({
  artwork,
  userId,
  getNearObject,
}) => {
  const { sendToast } = useToasts()

  const handleClick = async (action: ActionType) => {
    try {
      const response = await fetch(`/api/advisor/5/${action}_artwork`, {
        method: "POST",
        body: JSON.stringify({
          artworkId: artwork._additional.id,
          userId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("An error occurred")
      }

      getNearObject(userId)

      sendToast({
        message: `${artwork.title} ${action}d`,
      })
    } catch (error) {
      sendToast({
        variant: "error",
        message: `Something went wrong ${action}ing artwork: ${artwork.title}`,
      })
      console.error(error)
    }
  }

  if (!artwork.imageUrl) {
    return null
  }

  return (
    <Column span={[6, 4]}>
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Image src={artwork.imageUrl} height={500} />
        <Spacer y={1} />
        <Flex>
          <Clickable onClick={() => handleClick("like")}>
            <HeartStrokeIcon />
          </Clickable>
          <Spacer x={6} />
          <Clickable onClick={() => handleClick("dislike")}>
            <CloseIcon />
          </Clickable>
        </Flex>
        <Spacer y={1} />
        <Text variant="sm">{artwork.title}</Text>
      </Flex>
    </Column>
  )
}
