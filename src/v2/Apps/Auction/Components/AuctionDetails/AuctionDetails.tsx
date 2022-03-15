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
import { formatIsoDateNoZoneOffset } from "v2/Components/AddToCalendar/helpers"
import { ContextModule } from "@artsy/cohesion"
import { AuctionDetails_sale } from "v2/__generated__/AuctionDetails_sale.graphql"
import { AuctionDetails_me } from "v2/__generated__/AuctionDetails_me.graphql"
import { AuctionInfoSidebarFragmentContainer } from "./AuctionInfoSidebar"
import { RegisterButtonFragmentContainer } from "../RegisterButton"
import { getENV } from "v2/Utils/getENV"

interface AuctionDetailsProps {
  sale: AuctionDetails_sale
  me: AuctionDetails_me
}

const AuctionDetails: React.FC<AuctionDetailsProps> = ({ sale, me }) => {
  const liveAuctionUrl = `${getENV("PREDICTION_URL")}/${sale.slug}`

  const endDate = sale.liveStartAt
    ? formatIsoDateNoZoneOffset(sale.liveStartAt, 4)
    : sale.endAt

  // TODO: Do we really need the countdown
  // const currentTime = useCurrentTime({ syncWithServer: true })
  // const { formattedTime, hasEnded } = useEventTiming({
  //   currentTime,
  //   startAt: sale.liveStartAt ?? sale.startAt!,
  //   endAt: endDate!,
  //   // isLiveSale: !!sale.liveStartAt,
  // })

  return (
    <>
      <GridColumns>
        <Column span={9}>
          <Text variant="xl">{sale.name}</Text>
        </Column>
        <Column span={3}>
          <RegisterButtonFragmentContainer sale={sale} me={me} />
        </Column>
      </GridColumns>

      <Spacer my={4} />

      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Text variant="xl" pr={2}>
            {sale.formattedStartDateTime}
          </Text>

          {!sale.isClosed && (
            <Box mt={0.5}>
              <AddToCalendar
                startDate={sale.liveStartAt || sale.startAt!}
                endDate={endDate!}
                title={sale.name!}
                description={sale.description!}
                href={`${getENV("APP_URL")}${sale.href!}`}
                liveAuctionUrl={liveAuctionUrl}
                contextModule={ContextModule.auctionHome}
              />
            </Box>
          )}
        </Flex>
      </Flex>

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

        name
        slug
        formattedStartDateTime
        liveStartAt
        startAt
        endAt
        description(format: HTML)
        href
        isClosed
      }
    `,
    me: graphql`
      fragment AuctionDetails_me on Me {
        ...RegisterButton_me
      }
    `,
  }
)
