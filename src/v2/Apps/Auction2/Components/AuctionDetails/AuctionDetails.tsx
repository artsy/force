import { Column, Flex, GridColumns, HTML, Spacer, Text } from "@artsy/palette"
import { data as sd } from "sharify"
import { createFragmentContainer, graphql } from "react-relay"
import { AddToCalendar } from "./AddToCalendar"
import { getLiveAuctionUrl } from "desktop/apps/auction/utils/urls"
import { useSystemContext } from "v2/System"
import { formatIsoDateNoZoneOffset } from "v2/Components/AddToCalendar/helpers"
import { ContextModule } from "@artsy/cohesion"
import { AuctionDetails_sale } from "v2/__generated__/AuctionDetails_sale.graphql"
import { AuctionDetails_me } from "v2/__generated__/AuctionDetails_me.graphql"
import { useCurrentTime } from "v2/Utils/Hooks/useCurrentTime"
import { useEventTiming } from "v2/Utils/Hooks/useEventTiming"
import { AuctionInfoSidebarFragmentContainer } from "./AuctionInfoSidebar"
import { RegisterButtonFragmentContainer } from "./RegisterButton"

interface AuctionDetailsProps {
  sale: AuctionDetails_sale
  me: AuctionDetails_me
}

const AuctionDetails: React.FC<AuctionDetailsProps> = ({ sale, me }) => {
  const { user } = useSystemContext()

  const liveAuctionUrl = getLiveAuctionUrl(sale.slug, {
    isLoggedIn: Boolean(user),
  })
  const endDate = sale.liveStartAt
    ? formatIsoDateNoZoneOffset(sale.liveStartAt, 4)
    : sale.endAt

  const currentTime = useCurrentTime({ syncWithServer: true })
  const { formattedTime, hasEnded } = useEventTiming({
    currentTime,
    startAt: sale.startAt!,
    endAt: endDate!,
    isLiveSale: true,
  })

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
            {formattedTime}
          </Text>

          {!hasEnded && (
            <AddToCalendar
              startDate={sale.liveStartAt || sale.startAt!}
              endDate={endDate!}
              title={sale.name!}
              description={sale.description!}
              href={`${sd.APP_URL}${sale.href!}`}
              liveAuctionUrl={liveAuctionUrl}
              contextModule={ContextModule.auctionHome}
            />
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
      }
    `,
    me: graphql`
      fragment AuctionDetails_me on Me {
        ...RegisterButton_me
      }
    `,
  }
)
