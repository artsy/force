import { FC } from "react"
import { SuggionItemOptionProps } from "./NewSuggestionItem"
import { useTracking } from "react-tracking"
import { Flex } from "@artsy/palette"
import GavelIcon from "@artsy/icons/GavelIcon"
import ArtworkIcon from "@artsy/icons/ArtworkIcon"
import {
  ActionType,
  ContextModule,
  SelectedSearchSuggestionQuickNavigationItem,
} from "@artsy/cohesion"
import { QuickNavigationItem } from "./QuickNavigationItem"

interface QuickNavigationProps {
  option: SuggionItemOptionProps
}

export const QuickNavigation: FC<QuickNavigationProps> = ({ option }) => {
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
