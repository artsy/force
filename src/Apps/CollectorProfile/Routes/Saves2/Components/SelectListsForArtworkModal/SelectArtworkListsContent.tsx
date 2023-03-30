import { Box, Join, Spacer } from "@artsy/palette"
import { ExtractNodeType } from "Utils/typeSupport"
import { SelectArtworkListItemFragmentContainer } from "./SelectArtworkListItem"
import { SelectArtworkListsPlaceholder } from "./SelectArtworkListsPlaceholders"
import { SelectListsForArtworkModal_me$data } from "__generated__/SelectListsForArtworkModal_me.graphql"
import { FC } from "react"

type ArtworkListEntity = ExtractNodeType<
  | SelectListsForArtworkModal_me$data["defaultSaves"]
  | SelectListsForArtworkModal_me$data["collectionsConnection"]
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
