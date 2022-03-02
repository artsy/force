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
  ResponsiveBox,
} from "@artsy/palette"
import { Fragment } from "react"
import { FullBleedHeader } from "v2/Components/FullBleedHeader"
import { MetaTags } from "v2/Components/MetaTags"
import { useLoadScript } from "v2/Utils/Hooks/useLoadScript"
import { resized } from "v2/Utils/resized"

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

const ArtsyForAuctions: React.FC = () => {
  //TODO: replace with high res image asset
  const headerImage =
    "http://files.artsy.net/images/auctionpartnerships-lowres-header-temp.png"

  return (
    <Box>
      <FullBleedHeader src={headerImage} />
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
  // TODO: replace height/width in resized function with correct 1x values when image asset is loaded in browser tab
  const image = resized("", {
    // width: 910,
    // height: 652,
  })

  return (
    <GridColumns>
      <Column span={6}>
        <ResponsiveBox
          aspectWidth={4}
          aspectHeight={3}
          maxWidth="100%"
          bg="black10"
        >
          <Image
            src={image.src}
            width="100%"
            height="100%"
            srcSet={image.srcSet}
            lazyLoad
            alt=""
          />
        </ResponsiveBox>
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
  // TODO: create a formik form and onSubmit send data to marketo:
  // https://nation.marketo.com/t5/marketo-whisperer-blogs/make-a-marketo-form-submission-in-the-background/ba-p/246490

  useLoadScript({
    id: "marketo-form",
    src: "https://app-ab14.marketo.com/js/forms2/js/forms2.min.js",
    // onReady: () => {
    //   // @ts-ignore
    //   window.MktoForms2.loadForm("//app-ab14.marketo.com", "609-FDY-207", 1240)
    // },
  })

  return (
    <GridColumns>
      <Column span={6}>
        <Text variant="lg" mb={1}>
          Interested in Partnering with Artsy?
        </Text>
        <Text variant="sm">Apply to host your auctions on Artsy</Text>
      </Column>
      <Column span={6}>
        <form id="#mktoForm_1240">
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
                {
                  text: "Biennial / Triennial",
                  value: "Biennial / Triennial",
                },
                { text: "Interior Designer", value: "Interior Designer" },
                { text: "Non-Profit", value: "Non-Profit" },
                { text: "Art Advisor", value: "Art Advisor" },
                { text: "Private Dealer", value: "Private Dealer" },
                { text: "Press/Publication", value: "Press/Publication" },
                {
                  text: "Broker - Real Estate",
                  value: "Broker - Real Estate",
                },
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
                {
                  text: "Non-Arts Organization",
                  value: "Non-Arts Organization",
                },
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
        </form>
      </Column>
    </GridColumns>
  )
}

const GlobalAudienceReach: React.FC = () => {
  // TODO: replace height/width in resized function with correct 1x values when image asset is loaded in browser tab
  const image = resized("", {
    // width: 910,
    // height: 652,
  })

  return (
    <GridColumns>
      <Column span={6}>
        <ResponsiveBox
          aspectWidth={4}
          aspectHeight={3}
          maxWidth="100%"
          bg="black10"
        >
          <Image
            src={image.src}
            width="100%"
            height="100%"
            srcSet={image.srcSet}
            lazyLoad
            alt=""
          />
        </ResponsiveBox>
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
  // TODO: replace height/width in resized function with correct 1x values when image asset is loaded in browser tab
  const image = resized("", {
    // width: 910,
    // height: 652,
  })

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
          <ResponsiveBox
            aspectWidth={4}
            aspectHeight={3}
            maxWidth="100%"
            bg="black10"
          >
            <Image
              src={image.src}
              width="100%"
              height="100%"
              srcSet={image.srcSet}
              lazyLoad
              alt=""
            />
          </ResponsiveBox>
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
  // TODO: replace height/width in resized function with correct 1x values when image asset is loaded in browser tab
  const image = resized("", {
    // width: 910,
    // height: 652,
  })

  return (
    <GridColumns>
      <Column span={6}>
        <ResponsiveBox
          aspectWidth={4}
          aspectHeight={3}
          maxWidth="100%"
          bg="black10"
        >
          <Image
            src={image.src}
            width="100%"
            height="100%"
            srcSet={image.srcSet}
            lazyLoad
            alt=""
          />
        </ResponsiveBox>
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
  // TODO: replace height/width in resized function with correct 1x values when image asset is loaded in browser tab
  const image = resized("", {
    // width: 910,
    // height: 652,
  })

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
          <ResponsiveBox
            aspectWidth={4}
            aspectHeight={3}
            maxWidth="100%"
            bg="black10"
          >
            <Image
              src={image.src}
              width="100%"
              height="100%"
              srcSet={image.srcSet}
              lazyLoad
              alt=""
            />
          </ResponsiveBox>
          <Spacer mt={4} />
          <ResponsiveBox
            aspectWidth={4}
            aspectHeight={3}
            maxWidth="100%"
            bg="black10"
          >
            <Image
              src={image.src}
              width="100%"
              height="100%"
              srcSet={image.srcSet}
              lazyLoad
              alt=""
            />
          </ResponsiveBox>
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
  // TODO: replace height/width in resized function with correct 1x values when image asset is loaded in browser tab
  const image = resized("", {
    // width: 910,
    // height: 652,
  })

  return (
    <GridColumns>
      <Column span={6}>
        <ResponsiveBox
          aspectWidth={4}
          aspectHeight={3}
          maxWidth="100%"
          bg="black10"
        >
          <Image
            src={image.src}
            width="100%"
            height="100%"
            srcSet={image.srcSet}
            lazyLoad
            alt=""
          />
        </ResponsiveBox>
        <Spacer mt={4} />
        <ResponsiveBox
          aspectWidth={4}
          aspectHeight={3}
          maxWidth="100%"
          bg="black10"
        >
          <Image
            src={image.src}
            width="100%"
            height="100%"
            srcSet={image.srcSet}
            lazyLoad
            alt=""
          />
        </ResponsiveBox>
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
