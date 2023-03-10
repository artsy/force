import { Clickable } from "@artsy/palette"
import { FC } from "react"
import { SelectArtworkItem } from "./SelectArtworkItem"
import ArtworkGridItemFragmentContainer from "Components/Artwork/GridItem"

interface ArtworkItemProps {
  item: any
  selected: boolean
  onItemClick: (artworkID: string) => void
}

export const ArtworkItem: FC<ArtworkItemProps> = ({
  item,
  selected,
  onItemClick,
}) => {
  const onClick = () => {
    onItemClick(item.internalID)
  }

  const renderSelect = () => {
    return <SelectArtworkItem isSelected={selected} />
  }

  return (
    <Clickable width="100%" onClick={onClick}>
      <ArtworkGridItemFragmentContainer
        disableRouterLinking
        artwork={item}
        renderSaveButton={renderSelect}
      />
    </Clickable>
  )
}
