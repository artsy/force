import {
  ActionType,
  ContextModule,
  SelectedSearchSuggestionQuickNavigationItem,
} from "@artsy/cohesion"
import { Flex, Pill, PillProps, Spacer, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import match from "autosuggest-highlight/match"
import parse from "autosuggest-highlight/parse"
import { SuggestionItemPreview } from "Components/Search/Suggestions/SuggestionItemPreview"
import * as React from "react"
import { useTracking } from "react-tracking"
import styled from "styled-components"
import { RouterLink } from "System/Router/RouterLink"
import GavelIcon from "@artsy/icons/GavelIcon"
import ArtworkIcon from "@artsy/icons/ArtworkIcon"

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

// TODO: make it a fragment container?
const SuggestionItem: React.FC<SuggestionItemProps> = props => {
  const {
    href,
    showArtworksButton,
    showAuctionResultsButton,
    onRedirect,
  } = props

  const handleClick = _event => {
    // TODO: send stats here?
    onRedirect()
  }

  return (
    <SuggestionItemLink onClick={handleClick} to={href}>
      <DefaultSuggestion {...props} />
      <QuickNavigation
        href={href}
        showArtworksButton={!!showArtworksButton}
        showAuctionResultsButton={!!showAuctionResultsButton}
      />
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

const DefaultSuggestion: React.FC<SuggestionItemProps> = ({
  display,
  label,
  query,
  imageUrl,
}) => {
  const matches = match(display, query)
  const parts = parse(display, matches)
  const partTags = parts.map(({ highlight, text }, index) =>
    highlight ? <Highlight key={index}>{text}</Highlight> : text
  )

  return (
    <Flex alignItems="center">
      <SuggestionItemPreview imageUrl={imageUrl} label={label} />
      <Spacer x={1} />
      <Flex flexDirection="column" flex={1} overflow="hidden">
        <Text variant="sm-display" overflowEllipsis>
          {partTags}
        </Text>

        <Text color="black60" variant="xs" overflowEllipsis>
          {label}
        </Text>
      </Flex>
    </Flex>
  )
}

const QuickNavigation: React.FC<{
  href: string
  showArtworksButton: boolean
  showAuctionResultsButton: boolean
}> = ({ href, showArtworksButton, showAuctionResultsButton }) => {
  const { trackEvent } = useTracking()

  const handleArtworksItemClicked = () => {
    trackEvent(
      tracks.quickNavigationItemClicked({
        destinationPath: `${href}/works-for-sale`,
        label: "Artworks",
      })
    )
  }

  const handleAuctionResultsItemClicked = () => {
    trackEvent(
      tracks.quickNavigationItemClicked({
        destinationPath: `${href}/auction-results`,
        label: "Auction Results",
      })
    )
  }

  if (!showArtworksButton && !showAuctionResultsButton) return null

  return (
    <Flex flexWrap="wrap">
      {!!showArtworksButton && (
        <QuickNavigationItem
          onClick={handleArtworksItemClicked}
          to={`${href}/works-for-sale`}
          Icon={ArtworkIcon}
        >
          Artworks
        </QuickNavigationItem>
      )}
      {!!showAuctionResultsButton && (
        <QuickNavigationItem
          onClick={handleAuctionResultsItemClicked}
          to={`${href}/auction-results`}
          Icon={GavelIcon}
        >
          Auction Results
        </QuickNavigationItem>
      )}
    </Flex>
  )
}

interface QuickNavigationItemProps {
  to: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

const QuickNavigationItem: React.FC<QuickNavigationItemProps & PillProps> = ({
  to,
  onClick,
  ...rest
}) => {
  const handleClick = event => {
    // Stopping the event from propagating to prevent SearchBar from navigation to the main suggestion item url.
    event.stopPropagation()
    event.preventDefault()
    onClick?.(event)

    // TODO: Use routerLink instead of manual navigation?
    // FIXME: Using `window.location.assign(to)` instead of `router.push(to)` to prevent a bug where the search bar won't hide anymore.
    window.location.assign(to)
  }

  return <Pill onClick={handleClick} mt={1} mr={1} {...rest} />
}

const tracks = {
  quickNavigationItemClicked: ({
    destinationPath,
    label,
  }: {
    destinationPath: string
    label: "Auction Results" | "Artworks"
  }): SelectedSearchSuggestionQuickNavigationItem => ({
    context_module: ContextModule.header,
    destination_path: destinationPath,
    action: ActionType.selectedSearchSuggestionQuickNavigationItem,
    label,
  }),
}

export const Highlight = styled.strong`
  color: ${themeGet("colors.blue100")};
`

interface SearchResultProps extends SuggestionItemProps {}

export const SearchResult: React.FC<SearchResultProps> = props => {
  return <SuggestionItem {...props}></SuggestionItem>
}
