import { Flex, Text, Button, GridColumns, Column } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"

export const ArtistAuctionResultsEmptyState: React.FC = () => {
  return (
    <GridColumns gridRowGap={2}>
      <Column span={6} start={4}>
        <Text variant="md" textAlign="center">
          There are no auction results for this artist at this time.
        </Text>
        <Text variant="md" color="black60" textAlign="center">
          The page will be updated once auction results are added. In the
          meantime, check out the millions of auction results and art market
          data.
        </Text>
      </Column>
      <Column span={12} alignItems="center">
        <Flex width="100%" justifyContent="center">
          <Button
            variant="secondaryNeutral"
            // @ts-ignore
            as={RouterLink}
            to="/price-database"
          >
            View Artsy’s Price Database
          </Button>
        </Flex>
      </Column>
    </GridColumns>
  )
}
