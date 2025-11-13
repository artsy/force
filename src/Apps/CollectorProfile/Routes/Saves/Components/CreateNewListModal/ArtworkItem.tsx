import ArtworkGridItemFragmentContainer from "Components/Artwork/GridItem"
import { Clickable } from "@artsy/palette"
import type { FC } from "react"
import { SelectArtworkItem } from "./SelectArtworkItem"

interface ArtworkItemProps {
  item: any
  selected: boolean
  onItemClick: (artworkID: string) => void
}

export const ArtworkItem: FC<React.PropsWithChildren<ArtworkItemProps>> = ({
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
