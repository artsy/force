import { Flex, Text, Button, GridColumns, Column } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"

export const EmptyArtistAuctionResults: React.FC = () => {
  return (
    <Flex>
      <GridColumns width="100%" gridRowGap={[4, 2]}>
        <Column span={12} alignItems="center">
          <Text variant="md" textAlign="center">
            There are no auction results for this artist at this time.
          </Text>
        </Column>
        <Column span={12} alignItems="center">
          <Text variant="md" color="black60" textAlign="center">
            The page will be updated once auction results are added. In the
            meantime, check out the millions of auction results and art market
            data.
          </Text>
        </Column>
        <Column span={12} alignItems="center">
          <Flex>
            <RouterLink to="/price-database">
              <Button variant="secondaryNeutral">
                View Artsy’s Price Database
              </Button>
            </RouterLink>
          </Flex>
        </Column>
      </GridColumns>
    </Flex>
  )
}
