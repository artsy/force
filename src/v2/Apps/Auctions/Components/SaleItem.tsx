export const SaleItemFragmentContainer: any = () => null

// The below will eventually be refactored, moving timer logic to MP
/*
import React from "react"
import moment from "moment-timezone"
import { createFragmentContainer, graphql } from "react-relay"
import { SaleItem_sale } from "v2/__generated__/SaleItem_sale.graphql"
import {
  Box,
  Text,
  Image,
  ResponsiveBox,
  Flex,
  Button,
  Sans,
} from "@artsy/palette"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { resize } from "v2/Utils/resizer"
import { AuctionTimerFragmentContainer } from "v2/Components/AuctionTimer"
import styled from "styled-components"

interface SaleItemProps {
  sale: SaleItem_sale
}

const SaleItem: React.FC<SaleItemProps> = ({ sale }) => {
  const imageSrc = resize(
    sale?.coverImage?.imageURL?.replace(":version", "source"),
    {
      width: 1200,
      height: 533,
    }
  )
  return (
    <Box>
      <Box position="relative">
        <ResponsiveBox
          aspectWidth={1200}
          aspectHeight={533}
          maxWidth={1200}
          maxHeight={533}
        >
          <Box
            bg="black100"
            width="100%"
            height="100%"
            position="absolute"
            style={{ opacity: 0.3 }}
          />
          {sale.coverImage ? (
            <Image
              width="100%"
              height="100%"
              src={imageSrc}
              alt={sale.name + "image"}
            />
          ) : (
            <Box bg="black30" width="100%" height="100%" />
          )}
        </ResponsiveBox>
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <TimerContainer>
            {sale.liveStartAt && sale.isLiveOpen ? (
              <Sans size="3" weight="medium" mt={0.3} textAlign="center">
                LIVE BIDDING NOW OPEN
              </Sans>
            ) : (
              <Box>
                <AuctionTimerFragmentContainer sale={sale} />
              </Box>
            )}
          </TimerContainer>
        </Box>
      </Box>

      <Flex justifyContent="space-between" alignItems="center" py={1} mt={1}>
        <Box>
          {sale.liveStartAt && <Text color="black60">Live Auction</Text>}
          <Text variant="subtitle">{sale.name}</Text>
          <Text>{getUpcomingLabel(sale)}</Text>
        </Box>
        <Box>
          {sale.isOpen && (
            <RouterLink to={sale.href}>
              <Button width={150}>Bid Now</Button>
            </RouterLink>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export const SaleItemFragmentContainer = createFragmentContainer(SaleItem, {
  sale: graphql`
    fragment SaleItem_sale on Sale {
      ...AuctionTimer_sale
      id
      slug
      liveStartAt
      isOpen
      isPreview
      isClosed
      isBenefit
      isLiveOpen
      isAuction
      status
      startAt
      endAt
      saleType
      name
      href
      coverImage {
        imageURL
      }
    }
  `,
})

const TimerContainer = styled(Box)`
  ${Sans} {
    color: white;
    zoom: 1.8;
  }
`

function getUpcomingLabel(sale: SaleItemProps["sale"]) {
  const timeFormat = "MMM D h:mm A z"
  const zone = time => moment(time).tz("America/New_York")
  const isPreviewState = () => sale.isAuction && sale.status.includes("preview")

  const getLabel = () => {
    if (sale.isClosed) {
      return "Auction Closed"
    } else if (sale.liveStartAt && !sale.isLiveOpen) {
      return `Live bidding begins ${zone(sale.liveStartAt).format(timeFormat)}`
    } else if (sale.liveStartAt) {
      return "Live bidding now open"
    } else if (isPreviewState()) {
      return `Auction opens ${zone(sale.startAt).format(timeFormat)}`
    } else if (!sale.isAuction) {
      return `Closes ${zone(sale.endAt).format(timeFormat)}`
    } else if (sale.isAuction) {
      return `Bidding closes ${zone(sale.endAt).format(timeFormat)}`
    } else {
      return ""
    }
  }

  const label = getLabel()

  // Piggyback on common `moment` output to guard against missing / bad data
  // FIXME: This could perhaps be a bit safer
  if (label.includes("Invalid")) {
    return ""
  } else {
    return label
  }
}

*/
