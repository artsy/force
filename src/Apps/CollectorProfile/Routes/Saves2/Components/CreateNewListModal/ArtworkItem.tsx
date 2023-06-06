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

  return (
    <Clickable
      width="100%"
      onClick={onClick}
      data-testid="artwork-list-modal-item"
    >
      <ArtworkGridItemFragmentContainer
        disableRouterLinking
        artwork={item}
        renderSaveButton={() => {
          return <SelectArtworkItem isSelected={selected} />
        }}
      />
    </Clickable>
  )
}
