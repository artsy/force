import { EmptyState } from "Components/EmptyState"
import { FACTS_AND_FIGURES } from "Utils/factsAndFigures"

export const ArtistAuctionResultsEmptyState: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <EmptyState
      title="There are currently no auction results for this artist."
      description={
        <>
          We’ll update this area when results become available.
          <br />
          Meanwhile, you can check out free auction results and art market data
          for over ${FACTS_AND_FIGURES.auctionRecordsCount} artists.
        </>
      }
      action={{
        href: "/price-database",
        label: "View the Artsy Database",
      }}
    />
  )
}
