import type { EntityModuleType, OwnerType } from "@artsy/cohesion"
import { useAuctionResultsTracking } from "Apps/Artist/Routes/AuctionResults/Components/Hooks/useAuctionResultsTracking"
import { EmptyState } from "Components/EmptyState"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { getFactsAndFigures } from "Utils/factsAndFigures"

export const ArtistAuctionResultsEmptyState: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { trackClickedAuctionResultItem } = useAuctionResultsTracking()
  const { contextPageOwnerType } = useAnalyticsContext()

  return (
    <EmptyState
      title="There are currently no auction results for this artist."
      description={
        <>
          We’ll update this area when results become available.
          <br />
          Meanwhile, you can check out free auction results and art market data
          for over {getFactsAndFigures("auctionRecordsCount")} artists.
        </>
      }
      action={{
        label: "View the Artsy Database",
        href: "/price-database",
        onClick: () => {
          trackClickedAuctionResultItem({
            type: "emptyState" as EntityModuleType,
            context_page_owner_type: contextPageOwnerType as OwnerType.artist,
          })
        },
      }}
    />
  )
}
