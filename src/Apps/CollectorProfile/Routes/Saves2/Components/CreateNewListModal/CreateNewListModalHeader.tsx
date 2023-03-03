import { Flex, Spacer, Text } from "@artsy/palette"
import { SelectListsForArtworkImage } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkImage"
import { FC } from "react"

export interface ArtworkEntity {
  title: string
  imageURL: string | null
}

interface CreateNewListModalHeaderProps {
  artwork: ArtworkEntity
}

export const CreateNewListModalHeader: FC<CreateNewListModalHeaderProps> = ({
  artwork,
}) => {
  return (
    <Flex flex={1} flexDirection="row" alignItems="center" mb={2}>
      <SelectListsForArtworkImage size={50} url={artwork.imageURL} />
      <Spacer x={1} />
      <Text lineClamp={2}>{artwork.title}</Text>
    </Flex>
  )
}
