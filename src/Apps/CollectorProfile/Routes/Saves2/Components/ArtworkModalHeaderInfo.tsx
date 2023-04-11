import { Flex, Spacer, Text } from "@artsy/palette"
import { SavesEntityImage } from "Apps/CollectorProfile/Routes/Saves2/Components/SavesEntityImage"
import { ArtworkEntity } from "Components/Artwork/ManageArtworkForSaves"
import { FC } from "react"

export type ArtworkModalHeaderInfoEntity = Pick<
  ArtworkEntity,
  "title" | "year" | "imageURL" | "artists"
>

interface ArtworkModalHeaderInfoProps {
  artwork: ArtworkModalHeaderInfoEntity
}

export const ArtworkModalHeaderInfo: FC<ArtworkModalHeaderInfoProps> = ({
  artwork,
}) => {
  const getArtists = () => {
    if (!artwork.artists) {
      return "Artist Unavailable"
    }

    return artwork.artists
  }

  const artists = getArtists()
  const titleElements = [
    `${artists}, `,
    <i>{artwork.title}</i>,
    artwork.year && `, ${artwork.year}`,
  ]

  return (
    <Flex flex={1} flexDirection="row" alignItems="center">
      <SavesEntityImage size={50} url={artwork.imageURL} />
      <Spacer x={1} />
      <Text lineClamp={2}>‘{titleElements}’</Text>
    </Flex>
  )
}
