import { FC } from "react"
import { SuggionItemOptionProps } from "./NewSuggestionItem"
import { Flex } from "@artsy/palette"
import GavelIcon from "@artsy/icons/GavelIcon"
import ArtworkIcon from "@artsy/icons/ArtworkIcon"
import { QuickNavigationItem } from "./QuickNavigationItem"

interface QuickNavigationProps {
  option: SuggionItemOptionProps
  onClick?: () => void
}

export const QuickNavigation: FC<QuickNavigationProps> = ({
  option,
  onClick,
}) => {
  if (!option.showArtworksButton && !option.showAuctionResultsButton)
    return null

  return (
    <Flex flexWrap="wrap">
      {!!option.showArtworksButton && (
        <QuickNavigationItem
          to={`${option.href}/works-for-sale`}
          Icon={ArtworkIcon}
          label="Artworks"
          onClick={onClick}
        />
      )}
      {!!option.showAuctionResultsButton && (
        <QuickNavigationItem
          to={`${option.href}/auction-results`}
          Icon={GavelIcon}
          label="Auction Results"
          onClick={onClick}
        />
      )}
    </Flex>
  )
}
