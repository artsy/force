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
        <PartnerWithArtsyForm />
        <GlobalAudienceReach />
        <BiddingTools />
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
          <Text variant="lg">
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

const PartnerWithArtsyForm: React.FC = () => {
  return (
    <GridColumns>
      <Column span={6}>
        <Text variant="lg">Interested in Partnering with Artsy?</Text>
        <Text variant="sm">Apply to host your auctions on Artsy</Text>
      </Column>
      <Column span={6}>
        <Text>Form goes here</Text>
      </Column>
    </GridColumns>
  )
}

const GlobalAudienceReach: React.FC = () => {
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
        <Text textTransform="uppercase">Audience</Text>
        <Text variant="lg">
          Reach a Global Audience of 24+ Million Collectors and Art Lovers
        </Text>
        <Text>
          Since launching in October 2012, Artsy has had over 24 million unique
          site visitors from 150+ countries across web and mobile, driven by
          organic search traffic, as well as growing engagement with the world's
          most comprehensive art resource, and other sources of collector
          traffic.
        </Text>
      </Column>
    </GridColumns>
  )
}

export const BiddingTools: React.FC = () => {
  return (
    <Box>
      <GridColumns>
        <Column span={6}>
          <Text textTransform="uppercase">Access</Text>
          <Text variant="lg">
            Maximize Bids With Our User-Friendly Bidding Tools
          </Text>
          <Text>
            Artsy delivers a beautifully designed online bidding
            experience—collectors can place bids from web, mobile, and tablet,
            while receiving notifications about the status of their bids. In
            addition to our timed online-only auctions, Artsy’s Live Auction
            Integration software allows collectors to browse lots from upcoming
            live sales, leave max bids, and continue bidding in the live sale
            from anywhere in the world.
          </Text>
        </Column>
        <Column span={6}>
          <Box
            border="1px solid"
            borderColor="black100"
            width="100%"
            height="100%"
          ></Box>
        </Column>
      </GridColumns>
      <Spacer mt={6} />
      <GridColumns>
        <Column span={12}>
          <Text variant="lg" textColor="blue100">
            “Artsy's technology created a unique user experience which was
            essential to generating our most successful auction in years.”
          </Text>
          <Text variant="sm" color="blue100">
            — Renaud Proch, Executive Director, Independent Curators
            International
          </Text>
        </Column>
      </GridColumns>
    </Box>
  )
}
