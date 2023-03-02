import { Box, Join, Spacer } from "@artsy/palette"
import { ExtractNodeType } from "Utils/typeSupport"
import { SelectListItemFragmentContainer } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListItem"
import { SelectListsPlaceholder } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkPlaceholders"
import { SelectListsForArtworkModal_me$data } from "__generated__/SelectListsForArtworkModal_me.graphql"
import { FC } from "react"

type CollectionEntity = ExtractNodeType<
  | SelectListsForArtworkModal_me$data["defaultSaves"]
  | SelectListsForArtworkModal_me$data["collectionsConnection"]
>

interface SelectListsForArtworkContentProps {
  isFetching: boolean
  collections: CollectionEntity[]
  checkIsItemSelected: (item: CollectionEntity) => boolean
  onItemPress: (item: CollectionEntity) => void
}

export const SelectListsForArtworkContent: FC<SelectListsForArtworkContentProps> = ({
  isFetching,
  collections,
  checkIsItemSelected,
  onItemPress,
}) => {
  if (isFetching) {
    return <SelectListsPlaceholder />
  }

  return (
    <Box role="listbox">
      <Join separator={<Spacer y={1} />}>
        {collections.map(item => {
          return (
            <SelectListItemFragmentContainer
              item={item}
              isSelected={checkIsItemSelected(item)}
              onClick={() => onItemPress(item)}
            />
          )
        })}
      </Join>
    </Box>
  )
}
