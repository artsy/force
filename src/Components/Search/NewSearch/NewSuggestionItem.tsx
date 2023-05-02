import {
  ActionType,
  ContextModule,
  SelectedSearchSuggestionQuickNavigationItem,
} from "@artsy/cohesion"
import { Flex, Pill, PillProps, Spacer, Text } from "@artsy/palette"
import match from "autosuggest-highlight/match"
import parse from "autosuggest-highlight/parse"
import { SuggestionItemPreview } from "Components/Search/Suggestions/SuggestionItemPreview"
import * as React from "react"
import { useTracking } from "react-tracking"
import GavelIcon from "@artsy/icons/GavelIcon"
import ArtworkIcon from "@artsy/icons/ArtworkIcon"
import { FC } from "react"
import { SuggestionItemLink } from "./SuggestionItemLink"
import { Highlight } from "./Highlight"

export interface SuggionItemOptionProps {
  text: string
  value: string
  subtitle: string
  imageUrl: string
  showArtworksButton: boolean
  showAuctionResultsButton: boolean
  href: string
  typename: string
  item_id: string
  item_number: number
  item_type: string
}

interface SuggestionItemProps {
  query: string
  option: SuggionItemOptionProps
  onRedirect: () => void
}

export const NewSuggestionItem: FC<SuggestionItemProps> = props => {
  const { option, onRedirect } = props

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault()
    onRedirect()
  }

  return (
    <SuggestionItemLink onClick={handleClick} to={option.href}>
      <DefaultSuggestion {...props} />
      <QuickNavigation option={option} />
    </SuggestionItemLink>
  )
}

interface DefaultSuggestionProps {
  option: SuggionItemOptionProps
  query: string
}

const DefaultSuggestion: FC<DefaultSuggestionProps> = ({ option, query }) => {
  const matches = match(option.text, query)
  const parts = parse(option.text, matches)
  const partTags = parts.map(({ highlight, text }, index) =>
    highlight ? <Highlight key={index}>{text}</Highlight> : text
  )

  return (
    <Flex alignItems="center">
      <SuggestionItemPreview
        imageUrl={option.imageUrl}
        label={option.subtitle}
      />
      <Spacer x={1} />
      <Flex flexDirection="column" flex={1} overflow="hidden">
        <Text variant="sm-display" overflowEllipsis>
          {partTags}
        </Text>

        <Text color="black60" variant="xs" overflowEllipsis>
          {option.subtitle}
        </Text>
      </Flex>
    </Flex>
  )
}

interface QuickNavigationProps {
  option: SuggionItemOptionProps
}

const QuickNavigation: FC<QuickNavigationProps> = ({ option }) => {
  const { trackEvent } = useTracking()

  const handleArtworksItemClicked = () => {
    trackEvent(
      tracks.quickNavigationItemClicked({
        destinationPath: `${option.href}/works-for-sale`,
        label: "Artworks",
      })
    )
  }

  const handleAuctionResultsItemClicked = () => {
    trackEvent(
      tracks.quickNavigationItemClicked({
        destinationPath: `${option.href}/auction-results`,
        label: "Auction Results",
      })
    )
  }

  if (!option.showArtworksButton && !option.showAuctionResultsButton)
    return null

  return (
    <Flex flexWrap="wrap">
      {!!option.showArtworksButton && (
        <QuickNavigationItem
          onClick={handleArtworksItemClicked}
          to={`${option.href}/works-for-sale`}
          Icon={ArtworkIcon}
        >
          Artworks
        </QuickNavigationItem>
      )}
      {!!option.showAuctionResultsButton && (
        <QuickNavigationItem
          onClick={handleAuctionResultsItemClicked}
          to={`${option.href}/auction-results`}
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

const QuickNavigationItem: FC<QuickNavigationItemProps & PillProps> = ({
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
