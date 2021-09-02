import {
  ArtworkIcon,
  AuctionIcon,
  Clickable,
  Flex,
  Pill,
  Text,
} from "@artsy/palette"
import match from "autosuggest-highlight/match"
import parse from "autosuggest-highlight/parse"
import React from "react"
import styled from "styled-components"
import { Container } from "v2/Components/Sticky"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useRouter } from "v2/System/Router/useRouter"

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

  return (
    <SuggestionItemLink to={href} bg={isHighlighted ? "black5" : "white100"}>
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
    <Flex mt={1}>
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
  const { router } = useRouter()

  const onClick = event => {
    event.preventDefault()

    // router ? router.push(to) : window.location.assign(to)
  }
  return (
    <RouterLink
      tabIndex={0}
      role="button"
      display="flex"
      onClick={onClick}
      to={to}
      position="absolute"
    >
      <Pill variant="textSquare" mr="1" tabIndex={10}>
        <Flex alignItems="center">{children}</Flex>
      </Pill>
    </RouterLink>
  )

  // return (
  //   <Clickable display="flex" onClick={onClick} as="div">
  //     <Pill variant="textSquare" mr="1">
  //       <Flex alignItems="center">{children}</Flex>
  //     </Pill>
  //   </Clickable>
  // )
}
