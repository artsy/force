import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  Button,
  Column,
  Image,
  Flex,
  Spacer,
  Text,
} from "@artsy/palette"
import React from "react"
import { RouterLink } from "v2/System/Router/RouterLink"

interface UserActiveBidProps {
  // TODO
  lot: any
  shouldDisplayBorderBottom: boolean
}

export const UserActiveBid: React.FC<UserActiveBidProps> = ({
  lot,
  shouldDisplayBorderBottom,
}) => {
  // TODO
  const {
    saleArtwork: {
      artwork: { image, artist, href, title },
      lotLabel,
      counts: { bidderPositions },
      highestBid,
    },
    isLeadingBidder,
  } = lot

  return (
    <Column
      span={8}
      pb={2}
      display="flex"
      justifyContent="space-between"
      borderBottom={shouldDisplayBorderBottom ? "1px solid" : ""}
      borderColor="black10"
    >
      <Flex>
        <RouterLink to={href} noUnderline>
          <Image width={100} height={100} src={image?.url} lazyLoad />
        </RouterLink>

        <Flex ml={1} mr={1} flexDirection="column">
          <Text color="black60" variant="xs">
            Lot {lotLabel}
          </Text>

          <Spacer mb={0.5} />

          {artist?.name && (
            <Text color="black80" variant="sm">
              {artist.name}
            </Text>
          )}

          <Text color="black60" variant="sm" fontStyle="italic">
            {title}
          </Text>

          <Spacer mb={0.5} />

          <Text color="black60" variant="xs">
            {highestBid?.display} ({bidderPositions} Bids)
          </Text>
        </Flex>
      </Flex>

      <Flex flexDirection="column" alignItems="center">
        {isLeadingBidder ? (
          <Text
            variant="xs"
            color="green100"
            overflowEllipsis
            display="flex"
            alignItems="center"
          >
            <ArrowUpCircleIcon height={15} width={15} fill="green100" />
            &nbsp; Highest bid
          </Text>
        ) : (
          <Text
            variant="xs"
            color="red100"
            overflowEllipsis
            display="flex"
            alignItems="center"
          >
            <ArrowDownCircleIcon height={15} width={15} fill="red100" />
            &nbsp; Outbid
          </Text>
        )}

        <RouterLink to={href} noUnderline>
          <Button mt={1} size="medium">
            Bid
          </Button>
        </RouterLink>
      </Flex>
    </Column>
  )
}
