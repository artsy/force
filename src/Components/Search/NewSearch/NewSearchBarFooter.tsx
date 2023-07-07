import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { Flex, Text } from "@artsy/palette"
import { FC } from "react"
import { useTracking } from "react-tracking"
import { ActionType } from "@artsy/cohesion"
import { SuggestionItemLink } from "./SuggestionItem/SuggestionItemLink"
import { Highlight } from "./SuggestionItem/Highlight"
import { PillType } from "Components/Search/NewSearch/constants"

interface SuggestionItemProps {
  href: string
  query: string
  selectedPill: PillType
  onClick: () => void
}

export const NewSearchBarFooter: FC<SuggestionItemProps> = ({
  href,
  query,
  selectedPill,
  onClick,
}) => {
  const tracking = useTracking()

  const handleClick = () => {
    tracking.trackEvent({
      action_type: ActionType.selectedItemFromSearch,
      context_module: selectedPill.analyticsContextModule,
      destination_path: href,
      query: query,
    })

    onClick()
  }

  return (
    <SuggestionItemLink
      borderTop="1px solid"
      borderTopColor="black10"
      backgroundColor="white100"
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
