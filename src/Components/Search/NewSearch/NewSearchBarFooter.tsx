import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { Flex, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { RouterLink } from "System/Router/RouterLink"
import { FC } from "react"
import { useTracking } from "react-tracking"
import styled from "styled-components"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"

interface SuggestionItemProps {
  href: string
  query: string
  onRedirect: () => void
}

export const NewSearchBarFooter: FC<SuggestionItemProps> = ({
  href,
  query,
  onRedirect,
}) => {
  const tracking = useTracking()

  const handleClick = (
    _event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    tracking.trackEvent({
      action_type: DeprecatedSchema.ActionType.SelectedItemFromSearch,
      destination_path: href,
      item_number: 7,
      item_type: "FirstItem",
      query: query,
    })

    onRedirect()
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

const SuggestionItemLink = styled(RouterLink).attrs({
  color: "black100",
  px: 2,
  py: 1,
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  min-height: 60px;
  background-color: ${themeGet("colors.white100")};

  &:hover {
    background-color: ${themeGet("colors.black5")};
  }
`

const Highlight = styled.strong`
  color: ${themeGet("colors.blue100")};
`
