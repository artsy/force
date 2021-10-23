import {
  Box,
  Flex,
  HTML,
  QuestionCircleIcon,
  Spacer,
  Text,
  Tooltip,
} from "@artsy/palette"
import { data as sd } from "sharify"
import { createFragmentContainer, graphql } from "react-relay"
import { AddToCalendar } from "./AddToCalendar"
import { getLiveAuctionUrl } from "desktop/apps/auction/utils/urls"
import { useSystemContext } from "v2/System"
import { formatIsoDateNoZoneOffset } from "v2/Components/AddToCalendar/helpers"
import { ContextModule } from "@artsy/cohesion"
import { AuctionDetails_sale } from "v2/__generated__/AuctionDetails_sale.graphql"
import { useCurrentTime } from "v2/Utils/Hooks/useCurrentTime"
import { useEventTiming } from "v2/Utils/Hooks/useEventTiming"

interface AuctionDetailsProps {
  sale: AuctionDetails_sale
}

const AuctionDetails: React.FC<AuctionDetailsProps> = ({ sale }) => {
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
      <Text variant="xl">{sale.name}</Text>

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

        {sale.liveStartAt && (
          <Box>
            <Text
              variant="md"
              display="flex"
              alignItems="center"
              lineHeight={1}
            >
              Live Auction <Spacer mr={0.5} />
              <Tooltip
                content="Participating in a live auction means you’ll be competing
                  against bidders in real time on an auction room floor. You can
                  place max bids which will be represented by Artsy in the
                  auction room or you can bid live when the auction opens."
                placement="bottom"
              >
                {/* Icons don't forwardRefs so we have to wrap in a span */}
                <Box as="span" style={{ lineHeight: 0 }}>
                  <QuestionCircleIcon width={25} height={25} />
                </Box>
              </Tooltip>
            </Text>
          </Box>
        )}
      </Flex>

      <Spacer my={2} />

      <HTML html={sale.description!} />
    </>
  )
}

export const AuctionDetailsFragmentContainer = createFragmentContainer(
  AuctionDetails,
  {
    sale: graphql`
      fragment AuctionDetails_sale on Sale {
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
  }
)
