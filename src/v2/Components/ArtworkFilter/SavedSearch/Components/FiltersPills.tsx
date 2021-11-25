import React, { FC } from "react"
import { CloseIcon, Flex, Pill, Spacer } from "@artsy/palette"
import { CreateAlertButton } from "./CreateAlertButton"
import { SavedSearchAttributes } from "../types"

const PILL_HORIZONTAL_MARGIN_SIZE = 0.5
const CLOSE_ICON_SIZE = 15

interface FilterPill {
  name: string
  isDefault: boolean
}

interface FiltersPillsProps {
  pills: FilterPill[]
  savedSearchAttributes: SavedSearchAttributes
}

export const FiltersPills: FC<FiltersPillsProps> = ({
  pills,
  savedSearchAttributes,
}) => {
  return (
    <>
      <Flex flexWrap="wrap" mx={-PILL_HORIZONTAL_MARGIN_SIZE}>
        {pills.map((pill, index) => (
          <Pill
            key={`filter-label-${index}`}
            variant="textSquare"
            mx={PILL_HORIZONTAL_MARGIN_SIZE}
            mb={1}
          >
            {pill.name}
            {!pill.isDefault && (
              <CloseIcon
                fill="currentColor"
                width={CLOSE_ICON_SIZE}
                height={CLOSE_ICON_SIZE}
                ml={0.5}
              />
            )}
          </Pill>
        ))}
        <CreateAlertButton
          savedSearchAttributes={savedSearchAttributes}
          ml={PILL_HORIZONTAL_MARGIN_SIZE}
        />
      </Flex>
      <Spacer mt={4} />
    </>
  )
}
