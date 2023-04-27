import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { Flex, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { RouterLink } from "System/Router/RouterLink"
import { FC } from "react"
import styled from "styled-components"

interface SuggestionItemProps {
  display: string
  href: string
  imageUrl?: string
  label: string
  query: string
  showArtworksButton?: boolean
  showAuctionResultsButton?: boolean
  onRedirect: () => void
}

export const NewSearchBarFooter: FC<SuggestionItemProps> = ({
  href,
  query,
  onRedirect,
}) => {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    // TODO: send stats here?
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
