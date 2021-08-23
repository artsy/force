import {
  ArtworkIcon,
  AuctionIcon,
  GridColumns,
  Pill,
  Text,
} from "@artsy/palette"
import match from "autosuggest-highlight/match"
import parse from "autosuggest-highlight/parse"
import React from "react"
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
  return (
    <SuggestionItemLink
      to={href}
      borderBottom="1px solid"
      borderBottomColor="black10"
      bg={isHighlighted ? "black5" : "white100"}
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

  const showQuickNavigation = !!showArtworksButton || !!showAuctionResultsButton

  return (
    <SuggestionItemLink to={href} bg={isHighlighted ? "black5" : "white100"}>
      <DefaultSuggestion {...props} />
      {showQuickNavigation && (
        <GridColumns mt={1}>
          {!!showArtworksButton && (
            <RouterLink to={`${href}/works-for-sale`}>
              <Pill variant="textSquare">
                <ArtworkIcon mr={0.5} />
                Artworks
              </Pill>
            </RouterLink>
          )}
          {!!showAuctionResultsButton && (
            <RouterLink to={`${href}/auction-results`}>
              <Pill variant="textSquare">
                <AuctionIcon mr={0.5} />
                <span>Auction Results</span>
              </Pill>
            </RouterLink>
          )}
        </GridColumns>
      )}
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
