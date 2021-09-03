import React from "react"
import {
  Box,
  Button,
  CertificateIcon,
  CheckIcon,
  Column,
  Flex,
  GridColumns,
  Image,
  LockIcon,
  Separator,
  Text,
  themeProps,
  VerifiedIcon,
} from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"
import { RouterLink } from "v2/System/Router/RouterLink"
import { resize } from "v2/Utils/resizer"
import { FullBleedHeader } from "v2/Components/FullBleedHeader"
import {
  ChatIcon,
  MoneyBackIcon,
  PoweredByStripeIcon,
} from "../Components/Icons"
import { Feature } from "../Components/Feature"
import { MOBILE_NAV_HEIGHT, DESKTOP_NAV_BAR_HEIGHT } from "v2/Components/NavBar"
import { scrollIntoView } from "v2/Utils/scrollHelpers"
import { useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import { BuyerGuaranteeMeta } from "../Components/BuyerGuaranteeMeta"

export const BuyerGuaranteeIndex: React.FC = () => {
  const isMobile = useMatchMedia(themeProps.mediaQueries.xs)

  const authenticityText = `We are dedicated to being the world’s most trustworthy marketplace
  to buy and sell art. In the rare case that a work purchased
  through Artsy’s secure checkout is found to be inauthentic, report
  the issue within 180 days from delivery arrival and we’ll help
  facilitate a refund for the sale.`

  const securePaymentText = `Purchases completed through our secure checkout are powered by
  Stripe, the leader in online payment processing that’s trusted by
  millions of global businesses.`

  const moneyBackGuaranteeText = `If a work purchased through Artsy’s secure checkout does not arrive, arrives damaged, or is deemed not as described, we'll work with you to find the best resolution—including a full refund where applicable.`

  const supportArticleURL =
    "https://support.artsy.net/hc/en-us/articles/360048946973"

  const authenticityGuaranteeImageURL = resize(
    "https://files.artsy.net/authenticityguaranteeartwork.jpg",
    { width: 400, height: 600, convert_to: "jpg" }
  )
  const securePaymentImageURL = resize(
    "https://files.artsy.net/securepaymentartwork.jpg",
    { width: 400, height: 600, convert_to: "jpg" }
  )
  const moneyBackGuaranteeImageURL = resize(
    "https://files.artsy.net/moneybackguaranteeartwork.jpg",
    { width: 400, height: 600, convert_to: "jpg" }
  )

  const heroImageURL = resize(
    "https://files.artsy.net/buyerGuaranteeHeroImage.jpg",
    { width: 1600, height: 800, convert_to: "jpg" }
  )

  const scrollTo = (selector: string) => {
    const offset = (isMobile ? MOBILE_NAV_HEIGHT : DESKTOP_NAV_BAR_HEIGHT) + 30

    scrollIntoView({
      offset: offset,
      behavior: "smooth",
      selector: `#jump--${selector}`,
    })
  }

  const learnMoreButton = (width?: string) => (
    <RouterLink to={supportArticleURL} target="_blank">
      <Button
        width={width ? width : ["100%", "80%", "40%"]}
        variant="secondaryOutline"
      >
        Learn More
      </Button>
    </RouterLink>
  )

  const headerImage = {
    imageTitle: "Sophie Treppendahl, ‘Swimming Hole’, 2019",
    image: {
      resized: {
        srcSet: "https://files.artsy.net/images/normalizedheaderimage.jpeg 1x",
      },
    },
  }

  const authenticityImage = {
    imageTitle: "Paul Wackers, ‘Constructing Planets’, 2018",
    image: {
      resized: {
        srcSet: "https://files.artsy.net/authenticityguaranteeartwork.jpg 1x",
      },
    },
    artist: {
      name: "Paul Wackers",
    },
  }

  const moneyBackGuaranteeImage = {
    imageTitle: "Alex Katz, ‘Blue Umbrella 2’, 2020",
    image: {
      resized: {
        srcSet: "https://files.artsy.net/moneybackguaranteeartwork.jpg 1x",
      },
    },
    artist: {
      name: "Alex Katz",
    },
  }

  const securePaymentImage = {
    imageTitle: "Louise Belcourt, ‘Mound #26’, 2014-2015",
    image: {
      resized: {
        srcSet: "https://files.artsy.net/securepaymentartwork.jpg 1x",
      },
    },
    artist: {
      name: "Louise Belcourt",
    },
  }

  const tableColor = useMatchMedia(themeProps.mediaQueries.xs)
    ? "black10"
    : "black100"

  return (
    <>
      <BuyerGuaranteeMeta />
      {heroImageURL && (
        <FullBleedHeader
          {...headerImage?.image?.resized?.srcSet}
          height={[283, 469]}
          src={heroImageURL}
          caption={
            headerImage.imageTitle?.replace(/‘|’/g, "") +
            ". Courtesy of the artist and Kenise Barnes Fine Art. "
          }
        >
          <Flex
            position="absolute"
            top={0}
            right={0}
            bottom={0}
            left={0}
            justifyContent="center"
            alignItems="center"
          >
            <Text
              fontSize={[34, null, 80]}
              color="white100"
              position="relative"
              as="h1"
            >
              The Artsy Guarantee
            </Text>
          </Flex>
        </FullBleedHeader>
      )}
      <Flex justifyContent="center" flexDirection="column">
        <Flex justifyContent="center" mx={["10%", "25%"]} textAlign="center">
          <Text variant="lg" mt={6}>
            Artsy is the safest place to buy the art you love.
            <br />
            Every purchase made exclusively with Artsy’s secure checkout
            benefits from our full suite of buyer protections.
          </Text>
        </Flex>

        <Flex
          justifyContent={["space-around", "center"]}
          mt={4}
          mx={[0, "20%"]}
          pl={[0, 1]}
        >
          <Feature
            title="Vetted Sellers"
            text="We partner with leading galleries, institutions, and auction houses around the world in order to maintain the integrity of our listings."
            icon={VerifiedIcon}
          />
          <Feature
            title="Dedicated Support"
            text="Our global team of specialists is always here to answer your questions and assist with any purchase-related needs."
            icon={ChatIcon}
          />
        </Flex>
        <Flex
          justifyContent={["space-around", "center"]}
          flexWrap={["wrap", "nowrap"]}
          mt={2}
        >
          <Feature
            title="Authenticity Guarantee"
            text="In the rare occasion that your artwork is found to be inauthentic, we'll help facilitate a refund."
            icon={CertificateIcon}
            onClick={() => {
              scrollTo("authenticity")
            }}
          />
          <Feature
            title="Money-Back Guarantee"
            text="Our global team of specialists is always here to answer your questions and assist with any purchase-related needs."
            onClick={() => {
              scrollTo("moneyBack")
            }}
            icon={MoneyBackIcon}
          />

          <Flex width="100%" mt={[1, 0]} justifyContent="space-around">
            <Feature
              title="Secure Payment"
              text="Payments made with our secure checkout are protected with trusted industry-leading technology."
              onClick={() => {
                scrollTo("securePayment")
              }}
              icon={LockIcon}
            />
          </Flex>
        </Flex>
      </Flex>
      {/*  Artsy Guarantee Sections desktop */}
      <GridColumns gridColumnGap={0} gridRowGap={[6, 12]} my={[6, 12]}>
        <Column span={6}>
          {authenticityGuaranteeImageURL && (
            <Image
              src={authenticityGuaranteeImageURL}
              alt={authenticityImage?.artist?.name!}
              srcSet={authenticityImage?.image?.resized?.srcSet}
              style={{ objectFit: "cover" }}
              width="100%"
              height="100%"
              lazyLoad
              aria-label={authenticityImage?.imageTitle!}
            />
          )}
        </Column>
        <Column span={6}>
          <Flex
            py={[0, "60px", "80px", 12]}
            px={[0, 4]}
            flexDirection="column"
            id="jump--authenticity"
          >
            <Text variant="lg">Authenticity Guarantee</Text>
            <Text variant="xs" my={2}>
              {authenticityText}
            </Text>
            {learnMoreButton()}
          </Flex>
        </Column>
        <Column span={12}>
          <Flex flexDirection={["column-reverse", "row"]} alignItems="stretch">
            <Flex
              mt={[6, 0]}
              flexBasis="50%"
              flexDirection="column"
              py={[0, "60px", "80px", 12]}
              px={[0, 4]}
              id="jump--moneyBack"
            >
              <Text variant="lg">Money-Back Guarantee</Text>
              <Text variant="xs" my={2}>
                {moneyBackGuaranteeText}
              </Text>
              <Media greaterThanOrEqual="lg">{learnMoreButton()}</Media>
              <Media lessThan="lg">{learnMoreButton()}</Media>
            </Flex>

            <Box flexBasis="50%">
              {moneyBackGuaranteeImageURL && (
                <Image
                  src={moneyBackGuaranteeImageURL}
                  alt={moneyBackGuaranteeImage?.artist?.name!}
                  srcSet={moneyBackGuaranteeImage?.image?.resized?.srcSet}
                  lazyLoad
                  aria-label={moneyBackGuaranteeImage?.imageTitle!}
                  style={{ objectFit: "cover" }}
                  width="100%"
                  height="100%"
                />
              )}
            </Box>
          </Flex>
        </Column>
        <Column span={6}>
          {securePaymentImageURL && (
            <Image
              src={securePaymentImageURL}
              alt={securePaymentImage?.artist?.name!}
              srcSet={securePaymentImage?.image?.resized?.srcSet}
              aria-label={securePaymentImage?.imageTitle!}
              lazyLoad
              style={{ objectFit: "cover" }}
              width="100%"
              height="100%"
            />
          )}
        </Column>
        <Column span={6}>
          <Flex
            flexDirection="column"
            py={[0, "60px", "80px", 12]}
            px={[0, 4]}
            id="jump--securePayment"
          >
            <Text variant="lg">Secure Payment</Text>
            <Text variant="xs" my={2}>
              {securePaymentText}
            </Text>
            <PoweredByStripeIcon width={200} mt="-10px" ml="-25px" />
          </Flex>
        </Column>
      </GridColumns>

      <Box mx="-40px">
        <Flex justifyContent="center" py={6} backgroundColor="black5">
          <Text variant="xl">The Artsy Guarantee</Text>
        </Flex>
        <Box backgroundColor="black5">
          <GridColumns gridColumnGap={0} gridRowGap={0} px={2} pt={0} mb={6}>
            <Column span={[4, 12]}>
              <Flex flexDirection={["column", "row"]}>
                <Box
                  border="1px solid transparent"
                  borderBottomColor={tableColor}
                  borderRightColor={tableColor}
                  flexBasis={["auto", "100%"]}
                  height={90}
                >
                  <Separator border="none">{""}</Separator>
                </Box>
                <Flex
                  flexBasis={["auto", "100%"]}
                  alignItems="center"
                  justifyContent="center"
                  border="solid 1px transparent"
                  borderBottomColor={tableColor}
                  borderRightColor={tableColor}
                  height={90}
                  flexDirection="column"
                >
                  <Text p={1} variant="sm" fontWeight="bold" textAlign="center">
                    Vetted Sellers
                  </Text>
                </Flex>
                <Flex
                  flexBasis={["auto", "100%"]}
                  height={90}
                  alignItems="center"
                  justifyContent="center"
                  border="solid 1px transparent"
                  borderRightColor={tableColor}
                  borderBottomColor={tableColor}
                  flexDirection="column"
                >
                  <Text p={1} variant="sm" fontWeight="bold" textAlign="center">
                    Dedicated Support
                  </Text>
                </Flex>
                <Flex
                  flexBasis={["auto", "100%"]}
                  alignItems="center"
                  justifyContent="center"
                  border="solid 1px transparent"
                  borderRightColor={tableColor}
                  borderBottomColor={tableColor}
                  height={90}
                >
                  <Text p={1} textAlign="center" variant="sm" fontWeight="bold">
                    Authenticity Guarantee
                  </Text>
                </Flex>

                <Flex
                  flexBasis={["auto", "100%"]}
                  alignItems="center"
                  justifyContent="center"
                  border="solid 1px transparent"
                  borderRightColor={tableColor}
                  borderBottomColor={tableColor}
                  height={90}
                >
                  <Text textAlign="center" variant="sm" fontWeight="bold" p={1}>
                    Money-Back Guarantee
                  </Text>
                </Flex>
                <Flex
                  height={90}
                  flexBasis={["auto", "100%"]}
                  alignItems="center"
                  justifyContent="center"
                  border="solid 1px transparent"
                  borderRightColor={tableColor}
                  borderBottomColor={tableColor}
                >
                  <Text textAlign="center" variant="sm" fontWeight="bold" p={1}>
                    Secure Payment
                  </Text>
                </Flex>
              </Flex>
            </Column>
            <Column span={[4, 12]}>
              <Flex flexDirection={["column", "row"]}>
                <Flex
                  border="solid 1px transparent"
                  borderRightColor={tableColor}
                  borderBottomColor={tableColor}
                  flexBasis={["auto", "100%"]}
                  justifyContent="center"
                  alignItems="center"
                  height="90px"
                >
                  <Text
                    variant="sm"
                    fontWeight="bold"
                    textAlign="center"
                    pr={1}
                  >
                    Making an Inquiry
                  </Text>
                </Flex>
                <Flex
                  flexBasis={["auto", "100%"]}
                  justifyContent="space-around"
                  alignItems="center"
                  height="90px"
                  border="1px solid transparent"
                  borderBottomColor={tableColor}
                  borderRightColor={tableColor}
                >
                  <CheckIcon width="40px" height="40px" />
                </Flex>

                <Flex
                  flexBasis={["auto", "100%"]}
                  justifyContent="space-around"
                  alignItems="center"
                  height="90px"
                  border="1px solid transparent"
                  borderBottomColor={tableColor}
                  borderRightColor={tableColor}
                >
                  <CheckIcon width="40px" height="40px" />
                </Flex>
                <Box
                  border="1px solid transparent"
                  borderBottomColor={tableColor}
                  borderRightColor={tableColor}
                  height="90px"
                  flexBasis={["auto", "100%"]}
                >
                  <Separator border="none">{""}</Separator>
                </Box>
                <Box
                  border="1px solid transparent"
                  borderBottomColor={tableColor}
                  borderRightColor={tableColor}
                  height="90px"
                  flexBasis={["auto", "100%"]}
                >
                  <Separator border="none">{""}</Separator>
                </Box>
                <Box
                  border="1px solid transparent"
                  borderBottomColor={tableColor}
                  borderRightColor={tableColor}
                  height="90px"
                  flexBasis={["auto", "100%"]}
                >
                  <Separator border="none">{""}</Separator>
                </Box>
              </Flex>
            </Column>
            <Column span={[4, 12]}>
              <Flex flexDirection={["column", "row"]}>
                <Flex
                  border="1px solid transparent"
                  borderBottomColor={tableColor}
                  borderRightColor={tableColor}
                  borderLeftColor={[tableColor, "transparent"]}
                  flexBasis={["auto", "100%"]}
                  marginLeft={["-1px", 0]}
                  justifyContent="center"
                  alignItems="center"
                  height="90px"
                  backgroundColor="white100"
                >
                  <Text
                    textAlign="center"
                    fontWeight="bold"
                    variant="sm"
                    pr={1}
                  >
                    Purchasing with Artsy’s Secure Checkout
                  </Text>
                </Flex>
                <Flex
                  flexBasis={["auto", "100%"]}
                  justifyContent="space-around"
                  alignItems="center"
                  height="90px"
                  border="1px solid transparent"
                  borderBottomColor={tableColor}
                  borderRightColor={tableColor}
                  backgroundColor="white100"
                >
                  <CheckIcon width="40px" height="40px" />
                </Flex>
                <Flex
                  flexBasis={["auto", "100%"]}
                  justifyContent="space-around"
                  alignItems="center"
                  height="90px"
                  border="1px solid transparent"
                  borderBottomColor={tableColor}
                  borderRightColor={tableColor}
                  backgroundColor="white100"
                >
                  <CheckIcon width="40px" height="40px" />
                </Flex>
                <Flex
                  flexBasis={["auto", "100%"]}
                  justifyContent="space-around"
                  alignItems="center"
                  height="90px"
                  backgroundColor="white100"
                  border="1px solid transparent"
                  borderBottomColor={tableColor}
                  borderRightColor={tableColor}
                >
                  <CheckIcon width="40px" height="40px" />
                </Flex>
                <Flex
                  flexBasis={["auto", "100%"]}
                  justifyContent="space-around"
                  alignItems="center"
                  height="90px"
                  border="1px solid transparent"
                  borderBottomColor={tableColor}
                  borderRightColor={tableColor}
                  backgroundColor="white100"
                >
                  <CheckIcon width="40px" height="40px" />
                </Flex>
                <Flex
                  flexBasis={["auto", "100%"]}
                  justifyContent="space-around"
                  alignItems="center"
                  height="90px"
                  border="1px solid transparent"
                  borderBottomColor={tableColor}
                  borderRightColor={tableColor}
                  backgroundColor="white100"
                >
                  <CheckIcon width="40px" height="40px" />
                </Flex>
              </Flex>
            </Column>
          </GridColumns>
          <Flex justifyContent="center" pb={6} backgroundColor="black5">
            {learnMoreButton("325px")}
          </Flex>
        </Box>
      </Box>
    </>
  )
}
