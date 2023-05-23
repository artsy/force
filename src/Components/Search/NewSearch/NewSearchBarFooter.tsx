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
  onFooterClick: () => void
}

export const NewSearchBarFooter: FC<SuggestionItemProps> = ({
  href,
  query,
  index,
  onFooterClick,
}) => {
  const tracking = useTracking()

  const handleClick = () => {
    onFooterClick()
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
      backgroundColor="white100"
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
