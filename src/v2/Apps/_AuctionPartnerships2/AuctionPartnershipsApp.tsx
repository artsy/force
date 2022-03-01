import {
  Text,
  Box,
  Image,
  GridColumns,
  Column,
  Join,
  Spacer,
  Flex,
} from "@artsy/palette"
import { MetaTags } from "v2/Components/MetaTags"

export const AuctionPartnershipsApp: React.FC = () => {
  return (
    <>
      <MetaTags
        title="Auction Partnerships"
        description=""
        pathname="/auction-partnerships"
      />

      <Join
        separator={
          <Spacer mt={6} mb={6} border="1px solid" borderColor="black15" />
        }
      >
        <ArtsyForAuctions />
        <MarketplaceExperience />
      </Join>
    </>
  )
}

const ArtsyForAuctions: React.FC = () => {
  // TODO: replace placeholder image with high res img asset
  const headerImage =
    "http://files.artsy.net/images/auctionpartnerships-lowres-header-temp.png"

  return (
    <Box>
      <Image src={headerImage} width="100%" />
      <GridColumns gridRowGap={4}>
        <Column span={6}>
          <Text variant="xl">Artsy for Auctions</Text>
        </Column>
        <Column span={6}>
          <Text variant="lg">
            Artsy offers a centralized online platform to promote your auction,
            expand your client base, maximize bids, and support auction
            operations with our suite of cloud-based and mobile tools.
          </Text>
        </Column>
      </GridColumns>
    </Box>
  )
}

const MarketplaceExperience: React.FC = () => {
  return (
    <GridColumns>
      <Column span={6}>
        <Box
          border="1px solid"
          borderColor="black100"
          width="100%"
          height="100%"
        ></Box>
      </Column>
      <Column span={6}>
        <Flex flexDirection="column">
          <Text variant="sm" textTransform="uppercase">
            Experience
          </Text>
          <Text variant="xl">
            Trusted Marketplace for Both Commercial and Benefit Auctions
          </Text>
          <Text variant="sm">
            Our roster of global auction house partners is rapidly expanding,
            including, Bonhams, Phillips, Heritage, Rago/Wright, and Hindman
            Auctions. To date, Artsy benefit auctions have helped to raise more
            than $25 million for museums, nonprofit organizations, and other
            charitable causes.
          </Text>
        </Flex>
      </Column>
    </GridColumns>
  )
}
