import { ArtworkIcon, AuctionIcon, Flex, Pill, Text } from "@artsy/palette"
import match from "autosuggest-highlight/match"
import parse from "autosuggest-highlight/parse"
import * as React from "react";
import styled from "styled-components"
import { RouterLink } from "v2/System/Router/RouterLink"

interface SuggestionItemProps {
  display: string
  href: string
  isHighlighted: boolean
  label: string
  query: string
  showArtworksButton?: boolean
  showAuctionResultsButton?: boolean
}

export const FirstSuggestionItem: React.FC<SuggestionItemProps> = ({
  href,
  isHighlighted,
  query,
}) => {
  const handleClick = event => {
    event.preventDefault()
  }

  return (
    <SuggestionItemLink
      bg={isHighlighted ? "black5" : "white100"}
      borderBottom="1px solid"
      borderBottomColor="black10"
      onClick={handleClick}
      to={href}
    >
      <Text variant="sm">See full results for &ldquo;{query}&rdquo;</Text>
    </SuggestionItemLink>
  )
}

export const SuggestionItem: React.FC<SuggestionItemProps> = props => {
  const {
    href,
    isHighlighted,
    showArtworksButton,
    showAuctionResultsButton,
  } = props

  const handleClick = event => {
    event.preventDefault()
  }

  return (
    <SuggestionItemLink
      bg={isHighlighted ? "black5" : "white100"}
      onClick={handleClick}
      to={href}
    >
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
`

export const PLACEHOLDER = "Search by artist, gallery, style, theme, tag, etc."
export const PLACEHOLDER_XS = "Search Artsy"

const DefaultSuggestion: React.FC<SuggestionItemProps> = ({
  display,
  label,
  query,
}) => {
  const matches = match(display, query)
  const parts = parse(display, matches)
  const partTags = parts.map(({ highlight, text }, index) =>
    highlight ? <strong key={index}>{text}</strong> : text
  )

  return (
    <>
      <Text variant="sm" overflowEllipsis>
        {partTags}
      </Text>

      <Text color="black60" variant="xs" overflowEllipsis>
        {label}
      </Text>
    </>
  )
}

const QuickNavigation: React.FC<{
  href: string
  showArtworksButton: boolean
  showAuctionResultsButton: boolean
}> = ({ href, showArtworksButton, showAuctionResultsButton }) => {
  if (!showArtworksButton && !showAuctionResultsButton) return null

  return (
    <Flex flexWrap="wrap">
      {!!showArtworksButton && (
        <QuickNavigationItem to={`${href}/works-for-sale`}>
          <ArtworkIcon mr={0.5} />
          Artworks
        </QuickNavigationItem>
      )}
      {!!showAuctionResultsButton && (
        <QuickNavigationItem to={`${href}/auction-results`}>
          <AuctionIcon mr={0.5} />
          Auction Results
        </QuickNavigationItem>
      )}
    </Flex>
  )
}

const QuickNavigationItem: React.FC<{ to: string }> = ({ children, to }) => {
  const onClick = event => {
    // Stopping the event from propagating to prevent SearchBar from navigation to the main suggestion item url.
    event.stopPropagation()
    event.preventDefault()

    // FIXME: Using `window.location.assign(to)` instead of `router.push(to)` to prevent a bug where the search bar won't hide anymore.
    window.location.assign(to)
  }
  return (
    <Flex onClick={onClick} mt={1} mr={1}>
      <Pill variant="textSquare">
        <Flex alignItems="center">{children}</Flex>
      </Pill>
    </Flex>
  )
}
