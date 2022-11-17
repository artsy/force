import {
  Box,
  Column,
  Flex,
  GridColumns,
  HTML,
  Spacer,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { AddToCalendar } from "./AddToCalendar"
import { formatIsoDateNoZoneOffset } from "./helpers"
import { AuctionDetails_sale$data } from "__generated__/AuctionDetails_sale.graphql"
import { AuctionDetails_me$data } from "__generated__/AuctionDetails_me.graphql"
import { AuctionDetails_viewer$data } from "__generated__/AuctionDetails_viewer.graphql"
import { AuctionInfoSidebarFragmentContainer } from "./AuctionInfoSidebar"
import { RegisterButtonFragmentContainer } from "Apps/Auction/Components/RegisterButton"
import { SaleDetailTimerFragmentContainer } from "Apps/Auction/Components/AuctionDetails/SaleDetailTimer"
import { getENV } from "Utils/getENV"
import { AuctionDetailsStartTimeQueryRenderer } from "./AuctionDetailsStartTime"

interface AuctionDetailsProps {
  sale: AuctionDetails_sale$data
  me: AuctionDetails_me$data
  viewer: AuctionDetails_viewer$data
}

const AuctionDetails: React.FC<AuctionDetailsProps> = ({
  sale,
  me,
  viewer,
}) => {
  const liveAuctionUrl = `${getENV("PREDICTION_URL")}/${sale.slug}`

  const endDate = sale.liveStartAt
    ? formatIsoDateNoZoneOffset(sale.liveStartAt, 4)
    : sale.endAt

  const showCascadingEndTimeIntervalMessage: boolean =
    !!sale.cascadingEndTimeIntervalMinutes && !sale.isClosed

  const getCascadingEndTimeIntervalMessage = () => {
    if (viewer.auctionDetailsSaleArtworks?.counts?.total === 1) {
      return `Lot close at ${sale.cascadingEndTimeIntervalMinutes!}-minute intervals`
    }

    return `Lots close at ${sale.cascadingEndTimeIntervalMinutes!}-minute intervals`
  }

  return (
    <>
      <GridColumns>
        <Column span={9}>
          <Text variant="xl" as="h1">
            {sale.name}
          </Text>
        </Column>
        <Column span={3}>
          <RegisterButtonFragmentContainer sale={sale} me={me} />
        </Column>
      </GridColumns>
      <Spacer my={4} />
      <Flex alignItems="center" justifyContent="space-between">
        {!!sale.cascadingEndTimeIntervalMinutes && (
          <>
            <SaleDetailTimerFragmentContainer sale={sale} />
            <Spacer my={2} />
          </>
        )}
      </Flex>
      <Flex alignItems="center">
        <AuctionDetailsStartTimeQueryRenderer id={sale.internalID} pr={2} />

        {!sale.isClosed && (
          <Box mt={0.5}>
            <AddToCalendar
              startDate={sale.liveStartAt || sale.startAt!}
              endDate={endDate!}
              title={sale.name!}
              description={sale.description!}
              href={`${getENV("APP_URL")}${sale.href!}`}
              liveAuctionUrl={liveAuctionUrl}
            />
          </Box>
        )}
      </Flex>

      {showCascadingEndTimeIntervalMessage && (
        <>
          <Spacer my={2} />
          <Text variant="sm-display" pr={2}>
            {getCascadingEndTimeIntervalMessage()}
          </Text>
        </>
      )}

      <Spacer my={2} />

      <GridColumns>
        <Column span={9}>
          <HTML html={sale.description!} />
        </Column>
        <Column span={3}>
          <AuctionInfoSidebarFragmentContainer sale={sale} />
        </Column>
      </GridColumns>
    </>
  )
}

export const AuctionDetailsFragmentContainer = createFragmentContainer(
  AuctionDetails,
  {
    sale: graphql`
      fragment AuctionDetails_sale on Sale {
        ...RegisterButton_sale
        ...AuctionInfoSidebar_sale
        ...SaleDetailTimer_sale
        internalID
        name
        slug
        liveStartAt
        startAt
        endAt
        description(format: HTML)
        href
        isClosed
        cascadingEndTimeIntervalMinutes
      }
    `,
    me: graphql`
      fragment AuctionDetails_me on Me {
        ...RegisterButton_me
      }
    `,
    viewer: graphql`
      fragment AuctionDetails_viewer on Viewer
        @argumentDefinitions(saleID: { type: "String" }) {
        auctionDetailsSaleArtworks: saleArtworksConnection(
          saleSlug: $saleID
          aggregations: [TOTAL]
        ) {
          counts {
            total
          }
        }
      }
    `,
  }
)
