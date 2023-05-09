import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { Flex, Text } from "@artsy/palette"
import { FC } from "react"
import { useTracking } from "react-tracking"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { SuggestionItemLink } from "./SuggestionItem/SuggestionItemLink"
import { Highlight } from "./SuggestionItem/Highlight"

interface SuggestionItemProps {
  href: string
  query: string
  index: number
}

export const NewSearchBarFooter: FC<SuggestionItemProps> = ({
  href,
  query,
  index,
}) => {
  const tracking = useTracking()

  const handleClick = () => {
    tracking.trackEvent({
      action_type: DeprecatedSchema.ActionType.SelectedItemFromSearch,
      destination_path: href,
      item_number: index,
      item_type: "FirstItem",
      query: query,
    })
  }

  return (
    <SuggestionItemLink
      borderTop="1px solid"
      borderTopColor="black10"
      onClick={handleClick}
      to={href}
    >
      <Flex alignItems="center">
        <Text variant="sm" mr={1}>
          See full results for <Highlight>{query}</Highlight>
        </Text>
        <ChevronRightIcon />
      </Flex>
    </SuggestionItemLink>
  )
}
