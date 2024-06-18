import { Text, Button, GridColumns, Column } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"

export const ArtistAuctionResultsEmptyState: React.FC = () => {
  return (
    <GridColumns gridRowGap={2}>
      <Column span={6} start={4}>
        <Text variant="md" textAlign="center">
          There are currently no auction results for this artist.
        </Text>

        <Text variant="md" color="black60" textAlign="center">
          We'll update this page when results become available. Meanwhile, you
          can check out free auction results and art market data for over
          300,000 artists.
        </Text>
      </Column>

      <Column span={12} alignItems="center" display="flex">
        <Button
          variant="secondaryNeutral"
          // @ts-ignore
          as={RouterLink}
          to="/price-database"
          mx="auto"
        >
          View the Artsy Price Database
        </Button>
      </Column>
    </GridColumns>
  )
}
