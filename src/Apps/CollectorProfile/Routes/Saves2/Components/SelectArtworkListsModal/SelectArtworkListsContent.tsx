import { Box, Join, Spacer } from "@artsy/palette"
import { ExtractNodeType } from "Utils/typeSupport"
import { SelectArtworkListItemFragmentContainer } from "./SelectArtworkListItem"
import { SelectArtworkListsPlaceholder } from "./SelectArtworkListsPlaceholders"
import { SelectArtworkListsModal_me$data } from "__generated__/SelectArtworkListsModal_me.graphql"
import { FC } from "react"

// FIXME: Do not do this. Use a fragment container instead.
type ArtworkListEntity = ExtractNodeType<
  | SelectArtworkListsModal_me$data["savedArtworksArtworkList"]
  | SelectArtworkListsModal_me$data["customArtworkLists"]
>

interface SelectArtworkListsContentProps {
  isFetching: boolean
  artworkLists: ArtworkListEntity[]
  checkIsArtworkListSelected: (artworkList: ArtworkListEntity) => boolean
  onArtworkListPress: (artworkList: ArtworkListEntity) => void
}

export const SelectArtworkListsContent: FC<SelectArtworkListsContentProps> = ({
  isFetching,
  artworkLists,
  checkIsArtworkListSelected,
  onArtworkListPress,
}) => {
  if (isFetching) {
    return <SelectArtworkListsPlaceholder />
  }

  return (
    <Box role="listbox">
      <Join separator={<Spacer y={1} />}>
        {artworkLists.map(artworkList => {
          return (
            <SelectArtworkListItemFragmentContainer
              key={artworkList.internalID}
              item={artworkList}
              isSelected={checkIsArtworkListSelected(artworkList)}
              onClick={() => onArtworkListPress(artworkList)}
            />
          )
        })}
      </Join>
    </Box>
  )
}
