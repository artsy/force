import { MetaTags } from "Components/MetaTags"
import {
  Avatar,
  Box,
  Button,
  Column,
  Flex,
  GridColumns,
  Image,
  Join,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { FullBleedHeader } from "Components/FullBleedHeader/FullBleedHeader"
import { cropped, resized } from "Utils/resized"
import { Media } from "Utils/Responsive"
import { RouterLink } from "System/Components/RouterLink"

export const ArtAppraisalsApp: React.FC = () => {
  return (
    <>
      <MetaTags
        title="Art Appraisals and Valuations for Your Collection — Artsy"
        description="Artsy will connect you with the best appraiser for your collection and find the best buyers for your works through auctions, private sales, and direct listings, providing white-glove service through the entire process."
        pathname="/art-appraisals"
      />

      <Join separator={<Spacer y={[6, 12]} />}>
        <Header />
        <WhyUseArtsy />
        <MeetOurSpecialists />
      </Join>
    </>
  )
}

const Header: React.FC = () => {
  return (
    <FullBleedHeader src="https://files.artsy.net/images/appraisals-header.jpg">
      <Flex
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        px={6}
      >
        <GridColumns>
          <Column span={[12, 12, 8, 6]}>
            <Text variant={["lg", "xxl"]} as="h1" color="white100">
              Art Appraisals for Your Collection
            </Text>

            <Text variant={["xs", "sm"]} as="h2" color="white100">
              Artsy offers a full range of services to appraise trusts, estates,
              and art collections. We act as a trusted partner for collectors,
              their advisors, as well as executors, fiduciaries, and
              beneficiaries of estates.
            </Text>

            <Spacer y={4} />

            <Media greaterThan="xs">
              <Button
                // @ts-ignore
                as="a"
                href="mailto:appraisals@artsymail.com"
              >
                Request an Appraisal
              </Button>
            </Media>
            <Media at="xs">
              <Button
                // @ts-ignore
                as="a"
                href="mailto:appraisals@artsymail.com"
                size="small"
              >
                Request an Appraisal
              </Button>
            </Media>
          </Column>
        </GridColumns>
      </Flex>
    </FullBleedHeader>
  )
}

const WhyUseArtsy: React.FC = () => {
  const { src, srcSet } = resized(
    "https://files.artsy.net/images/shinpei-kusanagi-stop-talking-to-yourself-you-will-be-alright-number-3.jpeg",
    {
      width: 850,
      height: 887,
    }
  )

  return (
    <GridColumns>
      <Column span={6} pr={[0, 6]}>
        <ResponsiveBox aspectWidth={690} aspectHeight={720} maxWidth="100%">
          <Image
            src={src}
            srcSet={srcSet}
            width="100%"
            height="100%"
            lazyLoad
            alt=""
          />
        </ResponsiveBox>
      </Column>

      <Column span={6} pt={[2, 0]}>
        <Join separator={<Spacer y={2} />}>
          <Text variant={["md", "lg"]} mb={1}>
            Why Use Artsy for Appraisal and Collection Management Services
          </Text>

          <Box>
            <Text variant={["lg", "xl"]}>Pre-vetted certified appraisers</Text>
            <Text variant="sm">
              Artsy will connect you with the best independent appraiser for
              your collection. Receive professional valuations for best
              independent, fully certified and USPAP compliant appraiser for
              your collection.
            </Text>
          </Box>

          <Box>
            <Text variant={["lg", "xl"]}>Tailored sales plan</Text>
            <Text variant="sm">
              You will receive a customized sales plan to monetize your art
              assets. We’ll find the best buyers for your works through
              auctions, private sales, and direct listings.
            </Text>
          </Box>

          <Box>
            <Text variant={["lg", "xl"]}>Selling with confidence and ease</Text>
            <Text variant="sm">
              We provide white glove service through the entire process,
              including arranging shipping and securing payment when your works
              sell.
            </Text>
          </Box>
        </Join>
      </Column>
    </GridColumns>
  )
}

const MeetOurSpecialists: React.FC = () => {
  const image = cropped("https://files.artsy.net/images/simon-headshot.png", {
    width: 100,
    height: 100,
  })

  return (
    <GridColumns>
      <Column span={6}>
        <Text variant={["lg", "xl"]} mb={1}>
          Meet Our Trusts & Estates Specialist
        </Text>
        <Text variant="sm">
          Prior to joining Artsy, Simon worked as a Financial Advisor at Merrill
          Lynch, a Senior Account Manager at Christie’s, and did business
          development for Winston Art Group, one of the leading independent art
          appraisal and advisory firms. With over fifteen years of experience in
          the art and financial markets, he brings extensive knowledge and
          insight to your planning needs.
        </Text>
      </Column>
      <Column span={6} pt={[2, 0]}>
        <Flex flexDirection="row">
          <Avatar
            size="md"
            src={image.src}
            srcSet={image.srcSet}
            mr={2}
            backgroundColor="black100"
            border="none"
            borderColor="transparent"
            background="none"
          />
          <Flex flexDirection="column">
            <Text variant="lg-display">Simon Wills</Text>
            <Text variant="sm-display">Senior Manager, Trusts & Estates</Text>
            <Text variant="sm-display" color="black60" mb={2}>
              <RouterLink inline to="mailto:appraisals@artsymail.com">
                appraisals@artsymail.com
              </RouterLink>
            </Text>
          </Flex>
        </Flex>
      </Column>
    </GridColumns>
  )
}
