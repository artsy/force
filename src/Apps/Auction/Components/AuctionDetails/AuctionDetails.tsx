import {
  Column,
  Flex,
  GridColumns,
  HTML,
  Spacer,
  Stack,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { AddToCalendar } from "./AddToCalendar"
import { formatIsoDateNoZoneOffset } from "./helpers"
import { AuctionDetails_sale$data } from "__generated__/AuctionDetails_sale.graphql"
import { AuctionDetails_me$data } from "__generated__/AuctionDetails_me.graphql"
import { AuctionInfoSidebarFragmentContainer } from "./AuctionInfoSidebar"
import { RegisterButtonFragmentContainer } from "Apps/Auction/Components/RegisterButton"
import { SaleDetailTimerFragmentContainer } from "Apps/Auction/Components/AuctionDetails/SaleDetailTimer"
import { getENV } from "Utils/getENV"
import { AuctionDetailsStartTimeQueryRenderer } from "./AuctionDetailsStartTime"

interface AuctionDetailsProps {
  sale: AuctionDetails_sale$data
  me: AuctionDetails_me$data
}

const AuctionDetails: React.FC<AuctionDetailsProps> = ({ sale, me }) => {
  const liveAuctionUrl = `${getENV("PREDICTION_URL")}/${sale.slug}`

  const startDate = sale.liveStartAt || sale.startAt
  const endDate = sale.liveStartAt
    ? formatIsoDateNoZoneOffset(sale.liveStartAt, 4)
    : sale.endAt

  const showCascadingEndTimeIntervalMessage =
    !!sale.cascadingEndTimeIntervalMinutes && !sale.isClosed

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

      <Spacer y={4} />

      <Stack gap={[1, 0]}>
        {!!sale.cascadingEndTimeIntervalMinutes && (
          <SaleDetailTimerFragmentContainer sale={sale} />
        )}

        <Flex
          alignItems={["flex-start", "center"]}
          flexDirection={["column", "row"]}
          gap={[1, 2]}
        >
          <AuctionDetailsStartTimeQueryRenderer id={sale.internalID} />

          {!sale.isClosed && sale.name && startDate && (
            <AddToCalendar
              startDate={startDate}
              endDate={endDate}
              title={sale.name}
              description={sale.description}
              href={`${getENV("APP_URL")}${sale.href}`}
              liveAuctionUrl={liveAuctionUrl}
            />
          )}
        </Flex>
      </Stack>

      {showCascadingEndTimeIntervalMessage && (
        <>
          <Spacer y={2} />

          <Text variant="sm-display">
            Lots close at {sale.cascadingEndTimeIntervalMinutes}-minute
            intervals
          </Text>
        </>
      )}

      <Spacer y={2} />

      <GridColumns>
        {sale.description && (
          <Column span={9}>
            <HTML html={sale.description} />
          </Column>
        )}

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
  }
)
