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
  Button,
} from "@artsy/palette"
import { Form, Formik } from "formik"
import { Fragment } from "react"
import { FullBleedHeader } from "v2/Components/FullBleedHeader"
import { MetaTags } from "v2/Components/MetaTags"
import { useLoadScript } from "v2/Utils/Hooks/useLoadScript"
import { cropped, resized } from "v2/Utils/resized"
import * as Yup from "yup"
import { SHOULD_WARN_PRODUCTION_ENVIRONMENT } from "v2/Utils/Hooks/useProductionEnvironmentWarning"

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
  const headerImage = "http://files.artsy.net/auction-partnerships2-header.png"

  return (
    <Box>
      <FullBleedHeader src={headerImage} />
      <Spacer mb={4} />
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
  const image = resized(
    "http://files.artsy.net/images/gallery-names/temp.jpeg",
    {
      width: 910,
      height: 345,
    }
  )

  return (
    <GridColumns>
      <Column span={6}>
        <ResponsiveBox aspectWidth={4300} aspectHeight={1632} maxWidth="100%">
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
  useLoadScript({
    id: "marketo-form",
    src: "https://app-ab14.marketo.com/js/forms2/js/forms2.min.js",
    onReady: () => {
      // @ts-ignore
      window.MktoForms2.loadForm(
        "//app-ab14.marketo.com",
        "609-FDY-207",
        SHOULD_WARN_PRODUCTION_ENVIRONMENT
          ? MARKETO_FORM_IDS.production
          : MARKETO_FORM_IDS.development
      )
    },
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
        <form id="mktoForm_4419" style={{ display: "none" }}></form>
        <Formik
          initialValues={{
            Company: "",
            FirstName: "",
            LastName: "",
            Title: "",
            Website: "",
            Email: "",
            B2B_TOU_Active_Consent__c: false,
            Type__c: "Gallery",
          }}
          onSubmit={values => {
            // @ts-ignore
            const form = window.MktoForms2.allForms()[0]
            form.addHiddenFields(values)
            form.submit()
          }}
          validationSchema={Yup.object().shape({
            Company: Yup.string().required("Required"),
            FirstName: Yup.string().required("Required"),
            LastName: Yup.string().required("Required"),
            Title: Yup.string(),
            Website: Yup.string()
              .url("Invalid website url")
              .required("Required"),
            Email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            B2B_TOU_Active_Consent__c: Yup.boolean().oneOf([true], "Required"),
            Type__c: Yup.string(),
          })}
        >
          {({ values, handleChange, setFieldValue, errors, isSubmitting }) => (
            <Form id="#mktoForm_1240">
              <Join separator={<Spacer mb={2} />}>
                <Input
                  title="Auction House or Organization Name"
                  name="Company"
                  value={values.Company}
                  onChange={handleChange}
                  error={errors.Company}
                  required
                />
                <Flex flexDirection="row">
                  <Input
                    title="First name"
                    name="FirstName"
                    value={values.FirstName}
                    onChange={handleChange}
                    error={errors.FirstName}
                    required
                  />
                  <Spacer mr={2} />
                  <Input
                    title="Last Name"
                    name="LastName"
                    value={values.LastName}
                    onChange={handleChange}
                    error={errors.LastName}
                    required
                  />
                </Flex>
                <Input
                  title="Title at Organization"
                  name="Title"
                  value={values.Title}
                  onChange={handleChange}
                  error={errors.Title}
                />
                <Input
                  title="Website"
                  name="Website"
                  value={values.Website}
                  onChange={handleChange}
                  error={errors.Website}
                  required
                />
                <Input
                  title="Email Address"
                  name="Email"
                  value={values.Email}
                  onChange={handleChange}
                  error={errors.Email}
                  required
                />
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
                  onSelect={selected => setFieldValue("Type__c", selected)}
                  selected={values.Type__c}
                  error={errors.Type__c}
                />
                <Checkbox
                  onSelect={selected =>
                    setFieldValue("B2B_TOU_Active_Consent__c", selected)
                  }
                  selected={values.B2B_TOU_Active_Consent__c}
                  error={!!errors.B2B_TOU_Active_Consent__c}
                >
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
                <Button type="submit" loading={isSubmitting} width="60%">
                  Apply
                </Button>
              </Join>
            </Form>
          )}
        </Formik>
      </Column>
    </GridColumns>
  )
}

const GlobalAudienceReach: React.FC = () => {
  const image = resized(
    "http://files.artsy.net/images/audience_map/temp.jpeg",
    {
      width: 910,
      height: 387,
    }
  )

  return (
    <GridColumns>
      <Column span={6}>
        <ResponsiveBox aspectWidth={2208} aspectHeight={938} maxWidth="100%">
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
        <Text textTransform="uppercase" mb={1} variant="sm">
          Audience
        </Text>
        <Text variant="lg" mb={1}>
          Reach a Global Audience of 24+ Million Collectors and Art Lovers
        </Text>
        <Text variant="sm">
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
  // const image = resized(
  //   "http://files.artsy.net/images/auction-devices/temp.png",
  //   {
  //     width: 910,
  //     height: 403,
  //   }
  // )

  return (
    <Box>
      <GridColumns>
        <Column span={6}>
          <Text textTransform="uppercase" mb={1} variant="sm">
            Access
          </Text>
          <Text variant="lg" mb={1}>
            Maximize Bids With Our User-Friendly Bidding Tools
          </Text>
          <Text variant="sm">
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
          <ResponsiveBox aspectWidth={2256} aspectHeight={998} maxWidth="100%">
            {/* <Image
              src={image.src}
              width="100%"
              height="100%"
              srcSet={image.srcSet}
              lazyLoad
              alt=""
            /> */}
          </ResponsiveBox>
        </Column>
      </GridColumns>
      <Spacer mt={6} />
      <GridColumns>
        <Column span={6} start={4}>
          <Text variant="lg" textColor="blue100">
            “Artsy's technology created a unique user experience which was
            essential to generating our most successful auction in years.”
          </Text>
          <Spacer mb={4} />
          <Text variant="sm" color="blue100" textAlign="right">
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
        <ResponsiveBox
          aspectWidth={4}
          aspectHeight={3}
          maxWidth="100%"
        ></ResponsiveBox>
      </Column>
      <Column span={6}>
        <Text textTransform="uppercase" mb={1} variant="sm">
          Consignments
        </Text>
        <Text variant="lg" mb={1}>
          Access to a Comprehensive Artwork Database
        </Text>
        <Text variant="sm">
          Artsy can be your additional source of consignments. Log in and
          seamlessly browse hundreds of vetted artworks from Modern to Post-War
          and Contemporary art. Artsy’s consignment experts have international
          auction house experience and liaise with our consignors directly to
          explain the auction process and walk them through market
          pricing—ensuring a seamless experience for all stakeholders.
        </Text>
        <Spacer mt={2} />
        <Text variant="sm">
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
  const image1 = resized(
    "http://files.artsy.net/images/auctions-partnerships2desktp.png",
    {
      width: 910,
      height: 539,
    }
  )

  const image2 = resized(
    "http://files.artsy.net/images/auction-partnership2phone.png",
    {
      width: 240,
      height: 400,
    }
  )

  return (
    <GridColumns>
      <Column span={6}>
        <Text textTransform="uppercase" mb={1} variant="sm">
          Visibility
        </Text>
        <Text variant="lg" mb={1}>
          Exceptional Services to Reach New Collectors, Drive Bid Activity, and
          Promote Your Brand
        </Text>
        <Text variant="sm">
          Promotion on Artsy’s website, iPhone and iPad app, newsletter emails,
          personalized “Follow” emails, push notifications, and more. Rich
          contextual information, including artist biographies, lot
          descriptions, and metadata. Collector targeting via The Art Genome
          Project.
        </Text>
      </Column>
      <Column span={6}>
        <Flex flexDirection="column">
          <ResponsiveBox aspectWidth={1668} aspectHeight={988} maxWidth="100%">
            <Image
              src={image1.src}
              width="100%"
              height="100%"
              srcSet={image1.srcSet}
              lazyLoad
              alt=""
            />
          </ResponsiveBox>
          <Spacer mt={4} />
          <ResponsiveBox
            aspectWidth={1144}
            aspectHeight={1664}
            maxWidth={240}
            maxHeight={400}
            mx="auto"
          >
            <Image
              src={image2.src}
              width="100%"
              height="100%"
              srcSet={image2.srcSet}
              lazyLoad
              alt=""
            />
          </ResponsiveBox>
          <Text variant="sm" textAlign="center" fontWeight="bold">
            Social Media Coverage <br /> 1,700,000+ combined following across
            platforms
          </Text>
        </Flex>
      </Column>
    </GridColumns>
  )
}

const VisibilityInfoBottom: React.FC = () => {
  const image1 = resized("http://files.artsy.net/images/auction-kiosk2.png", {
    width: 910,
    height: 585,
  })

  const image2 = resized(
    "http://files.artsy.net/images/auction-projection2.png",
    {
      width: 910,
      height: 586,
    }
  )

  return (
    <GridColumns>
      <Column span={6}>
        <ResponsiveBox aspectWidth={1096} aspectHeight={704} maxWidth="100%">
          <Image
            src={image1.src}
            width="100%"
            height="100%"
            srcSet={image1.srcSet}
            lazyLoad
            alt=""
          />
        </ResponsiveBox>
        <Spacer mt={4} />
        <ResponsiveBox aspectWidth={1094} aspectHeight={704} maxWidth="100%">
          <Image
            src={image2.src}
            width="100%"
            height="100%"
            srcSet={image2.srcSet}
            lazyLoad
            alt=""
          />
        </ResponsiveBox>
      </Column>
      <Column span={6}>
        <Text textTransform="uppercase" mb={1} variant="sm">
          Visibility
        </Text>
        <Text variant="lg" mb={1}>
          Exceptional Services to Reach New Collectors, Drive Bid Activity, and
          Promote Your Brand
        </Text>
        <Text variant="sm">
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
        <Text textTransform="uppercase" mb={1} variant="sm">
          Support
        </Text>
        <Text variant="lg" mb={1}>
          We’re With You Every Step of the Way
        </Text>
        <Text variant="sm">
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
            const image = cropped(specialist.photo, { width: 100, height: 100 })

            return (
              <Fragment key={specialist.name}>
                <Flex flexDirection="row">
                  <Avatar
                    size="md"
                    src={image.src}
                    srcSet={image.srcSet}
                    mr={2}
                    backgroundColor="black100"
                  ></Avatar>
                  <Flex flexDirection="column">
                    <Text variant="lg">{specialist.name}</Text>
                    <Text variant="sm">{specialist.title}</Text>
                    <Text variant="sm" color="black60" mb={2}>
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

const MARKETO_FORM_IDS = {
  production: 1240,
  development: 4419,
}

const AUCTIONS_PARTNERSHIPS_SPECIALISTS = [
  {
    name: "Erica Lyon",
    title: "Associate Director, Auction & Institutional Partnerships",
    location: "",
    email: "",
    phone: "",
    photo: "http://files.artsy.net/specialist-headshot4.png",
  },
  {
    name: "Sophie Salamon",
    title: "Senior Auction Manager, Partnerships",
    location: "",
    email: "",
    phone: "",
    photo: "http://files.artsy.net/specialist-headshot1.png",
  },
  {
    name: "Chloé Bigio",
    title: "Senior Auction Manager, Partnerships",
    location: "",
    email: "",
    phone: "",
    photo: "http://files.artsy.net/specialist-headshot2.png",
  },
  {
    name: "Perry Weber",
    title: "Manager, Auction Partnerships",
    location: "",
    email: "",
    phone: "",
    photo: "http://files.artsy.net/specialist-headshot3.png",
  },
]
