import {
  Text,
  Box,
  Image,
  GridColumns,
  Column,
  Join,
  Spacer,
  Flex,
  Avatar,
  Input,
  Select,
  Checkbox,
} from "@artsy/palette"
import { Fragment } from "react"
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
        separator={<Spacer my={6} border="1px solid" borderColor="black15" />}
      >
        <ArtsyForAuctions />
        <MarketplaceExperience />
        <PartnerWithArtsyForm />
        <GlobalAudienceReach />
        <BiddingTools />
        <ConsignmentsInfo />
        <VisibilityInfoTop />
        <VisibilityInfoBottom />
        <AuctionsSupportTeam />
      </Join>
    </>
  )
}

// TODO: replace all placeholder images with high res img assets

const ArtsyForAuctions: React.FC = () => {
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
          height="480px"
        ></Box>
      </Column>
      <Column span={6}>
        <Text variant="sm" textTransform="uppercase" mb={1}>
          Experience
        </Text>
        <Text variant="lg" mb={1}>
          Trusted Marketplace for Both Commercial and Benefit Auctions
        </Text>
        <Text variant="sm">
          Our roster of global auction house partners is rapidly expanding,
          including, Bonhams, Phillips, Heritage, Rago/Wright, and Hindman
          Auctions. To date, Artsy benefit auctions have helped to raise more
          than $25 million for museums, nonprofit organizations, and other
          charitable causes.
        </Text>
      </Column>
    </GridColumns>
  )
}

const PartnerWithArtsyForm: React.FC = () => {
  return (
    <GridColumns>
      <Column span={6}>
        <Text variant="lg" mb={1}>
          Interested in Partnering with Artsy?
        </Text>
        <Text variant="sm">Apply to host your auctions on Artsy</Text>
      </Column>
      <Column span={6}>
        <Join separator={<Spacer mb={2} />}>
          <Input title="Auction House or Organization Name" />
          <Flex flexDirection="row">
            <Input title="First name" />
            <Spacer mr={2} />
            <Input title="Last Name" />
          </Flex>
          <Input title="Title at Organization" />
          <Input title="Website" />
          <Input title="Email Address" />
          <Select
            options={[
              { text: "Gallery", value: "Gallery" },
              { text: "Design Gallery", value: "Design Gallery" },
              { text: "Artist", value: "Artist" },
              { text: "Art Fair", value: "Art Fair" },
              { text: "Auction House", value: "Auction House" },
              { text: "Antique", value: "Antique" },
              { text: "Performance Venue", value: "Performance Venue" },
              { text: "Artist Estate", value: "Artist Estate" },
              { text: "Institution", value: "Institution" },
              { text: "Museum", value: "Museum" },
              { text: "Framing Gallery", value: "Framing Gallery" },
              { text: "Biennial / Triennial", value: "Biennial / Triennial" },
              { text: "Interior Designer", value: "Interior Designer" },
              { text: "Non-Profit", value: "Non-Profit" },
              { text: "Art Advisor", value: "Art Advisor" },
              { text: "Private Dealer", value: "Private Dealer" },
              { text: "Press/Publication", value: "Press/Publication" },
              { text: "Broker - Real Estate", value: "Broker - Real Estate" },
              {
                text: "Independent Art World Professional",
                value: "Independent Art World Professional",
              },
              { text: "Online Platform", value: "Online Platform" },
              { text: "Curator", value: "Curator" },
              {
                text: "Publications / Publishers / Archives",
                value: "Publications / Publishers / Archives",
              },
              {
                text: "Government Organization",
                value: "Government Organization",
              },
              { text: "Artist Studios", value: "Artist Studios" },
              { text: "Non-Arts Organization", value: "Non-Arts Organization" },
              { text: "Other", value: "Other" },
              { text: "Non Profit Gallery", value: "Non Profit Gallery" },
              {
                text: "Prospect Indicated Gallery",
                value: "Prospect Indicated Gallery",
              },
              { text: "Art Dealer", value: "Art Dealer" },
            ]}
            title="Company Type"
          />
          <Checkbox>
            <Text variant="md" lineHeight={1}>
              I agree to Artsy{" "}
              <a href="/terms" target="_blank">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="/privacy" target="_blank">
                Privacy Policy
              </a>
              , and to receive emails from Artsy.
            </Text>
          </Checkbox>
        </Join>
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
          height="480px"
        ></Box>
      </Column>
      <Column span={6}>
        <Text textTransform="uppercase" mb={1}>
          Audience
        </Text>
        <Text variant="lg" mb={1}>
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

const BiddingTools: React.FC = () => {
  return (
    <Box>
      <GridColumns>
        <Column span={6}>
          <Text textTransform="uppercase" mb={1}>
            Access
          </Text>
          <Text variant="lg" mb={1}>
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
            height="480px"
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

const ConsignmentsInfo: React.FC = () => {
  return (
    <GridColumns>
      <Column span={6}>
        <Box
          border="1px solid"
          borderColor="black100"
          width="100%"
          height="480px"
        ></Box>
      </Column>
      <Column span={6}>
        <Text textTransform="uppercase" mb={1}>
          Consignments
        </Text>
        <Text variant="lg" mb={1}>
          Access to a Comprehensive Artwork Database
        </Text>
        <Text>
          Artsy can be your additional source of consignments. Log in and
          seamlessly browse hundreds of vetted artworks from Modern to Post-War
          and Contemporary art. Artsy’s consignment experts have international
          auction house experience and liaise with our consignors directly to
          explain the auction process and walk them through market
          pricing—ensuring a seamless experience for all stakeholders. <br />
          Grow your footprint and build relationships with this international
          database of consignors quickly and easily. Available across desktop
          and mobile devices—submit consignment proposals wherever and whenever.
          See here for more details.
        </Text>
      </Column>
    </GridColumns>
  )
}

const VisibilityInfoTop: React.FC = () => {
  return (
    <GridColumns>
      <Column span={6}>
        <Text textTransform="uppercase" mb={1}>
          Visibility
        </Text>
        <Text variant="lg" mb={1}>
          Exceptional Services to Reach New Collectors, Drive Bid Activity, and
          Promote Your Brand
        </Text>
        <Text>
          Promotion on Artsy’s website, iPhone and iPad app, newsletter emails,
          personalized “Follow” emails, push notifications, and more. Rich
          contextual information, including artist biographies, lot
          descriptions, and metadata. Collector targeting via The Art Genome
          Project.
        </Text>
      </Column>
      <Column span={6}>
        <Flex flexDirection="column">
          <Box
            border="1px solid"
            borderColor="black100"
            width="100%"
            height="480px"
          ></Box>
          <Spacer mt={4} />
          <Box
            border="1px solid"
            borderColor="black100"
            width="100%"
            height="400px"
          ></Box>
          <Text>
            Social Media Coverage <br /> 1,700,000+ combined following across
            platforms
          </Text>
        </Flex>
      </Column>
    </GridColumns>
  )
}

const VisibilityInfoBottom: React.FC = () => {
  return (
    <GridColumns>
      <Column span={6}>
        <Box
          border="1px solid"
          borderColor="black100"
          width="100%"
          height="480px"
        ></Box>
        <Spacer mt={4} />
        <Box
          border="1px solid"
          borderColor="black100"
          width="100%"
          height="400px"
        ></Box>
      </Column>
      <Column span={6}>
        <Text textTransform="uppercase" mb={1}>
          Visibility
        </Text>
        <Text variant="lg" mb={1}>
          Exceptional Services to Reach New Collectors, Drive Bid Activity, and
          Promote Your Brand
        </Text>
        <Text>
          Promotion on Artsy’s website, iPhone and iPad app, newsletter emails,
          personalized “Follow” emails, push notifications, and more. Rich
          contextual information, including artist biographies, lot
          descriptions, and metadata. Collector targeting via The Art Genome
          Project.
        </Text>
      </Column>
    </GridColumns>
  )
}

const AuctionsSupportTeam: React.FC = () => {
  return (
    <GridColumns>
      <Column span={6}>
        <Text textTransform="uppercase" mb={1}>
          Support
        </Text>
        <Text variant="lg" mb={1}>
          We’re With You Every Step of the Way
        </Text>
        <Text>
          Our auctions team is dedicated to delivering a world-class auction
          experience for collectors and our partners. We’ll lead you through
          every step of the process and assist with getting the most out of your
          partnership with us.
        </Text>
      </Column>
      <Column span={6}>
        <Join
          separator={<Spacer my={2} border="1px solid" borderColor="black15" />}
        >
          {AUCTIONS_PARTNERSHIPS_SPECIALISTS.map((specialist, index) => {
            return (
              <Fragment key={specialist.name}>
                <Flex flexDirection="row">
                  <Avatar
                    size="md"
                    src=""
                    srcSet=""
                    mr={2}
                    backgroundColor="black100"
                  ></Avatar>
                  <Flex flexDirection="column">
                    <Text variant="lg">{specialist.name}</Text>
                    <Text variant="md">{specialist.title}</Text>
                    <Text variant="md" color="black60" mb={2}>
                      {specialist.location}
                    </Text>
                  </Flex>
                </Flex>
              </Fragment>
            )
          })}
        </Join>
      </Column>
    </GridColumns>
  )
}

// TODO: replace with hardcocded Auction Partnership team data

const AUCTIONS_PARTNERSHIPS_SPECIALISTS = [
  {
    name: "name1",
    title: "title1",
    location: "location1",
    email: "email1",
    phone: "phone1",
    photo: "photo1",
  },
  {
    name: "name2",
    title: "title2",
    location: "location2",
    email: "email2",
    phone: "phone2",
    photo: "photo2",
  },
]
