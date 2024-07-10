import { Clickable } from "@artsy/palette"
import { FC } from "react"
import { SelectArtworkItem } from "./SelectArtworkItem"
import ArtworkGridItemFragmentContainer from "Components/Artwork/GridItem"

interface ArtworkItemProps {
  item: any
  selected: boolean
  SaveButton: React.FC
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
        renderSaveButton={saveButtonFactory(selected)}
      />
    </Clickable>
  )
}

// TODO: This is effectively breaking a linter rule by redeclaring the component
// but written in a way that hides from the linter.
// https://github.com/artsy/force/blob/f10aa7898a1cbb4b19dfaceaa0e713a2462b0b3f/src/Apps/Example/Routes/AddToCollection/AddToCollectionRoute.tsx#L50-L57
// might be a better component to use
const saveButtonFactory = (selected: boolean) => () => {
  return <SelectArtworkItem isSelected={selected} />
}
