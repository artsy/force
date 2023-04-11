import { Flex, Spacer, Text } from "@artsy/palette"
import { SavesEntityImage } from "Apps/CollectorProfile/Routes/Saves2/Components/SavesEntityImage"
import { ArtworkEntity } from "Components/Artwork/ManageArtworkForSaves"
import { FC } from "react"

interface ArtworkModalHeaderInfoProps {
  artwork: ArtworkEntity
}

export const ArtworkModalHeaderInfo: FC<ArtworkModalHeaderInfoProps> = ({
  artwork,
}) => {
  const titleElements = [
    artwork.artists && `${artwork.artists}, `,
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
