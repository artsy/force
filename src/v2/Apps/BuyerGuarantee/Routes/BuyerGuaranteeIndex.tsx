import React from "react"
import {
  Box,
  Button,
  CertificateIcon,
  CheckIcon,
  CSSGrid,
  Flex,
  Image,
  LockIcon,
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

  const learnMoreButton = (width: string) => (
    <RouterLink to={supportArticleURL} target="_blank">
      <Button width={width} variant="secondaryOutline">
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
              color={"white100"}
              position="relative"
              as="h1"
            >
              The Artsy Guarantee
            </Text>
          </Flex>
        </FullBleedHeader>
      )}
      <Flex justifyContent="center" flexDirection="column">
        <Flex justifyContent="center" mx={["10%", "20%"]} textAlign="center">
          <Text variant="lg" mt={6}>
            Artsy is the safest place to buy the art you love.
            <br />
            Every purchase made exclusively with Artsy’s secure checkout
            benefits from our full suite of buyer protections.
          </Text>
        </Flex>

        <Media lessThan="sm">
          <Flex justifyContent="space-around" mt={4} pl={1}>
            <Feature title="Vetted Sellers" icon={VerifiedIcon} sm />
            <Feature title="Dedicated Support" icon={ChatIcon} sm />
          </Flex>
          <Flex justifyContent="space-around" mt={2}>
            <Feature
              title="Authenticity Guarantee"
              icon={CertificateIcon}
              onClick={() => {
                scrollTo("authenticityMobile")
              }}
              sm
            />
            <Feature
              title="Money-Back Guarantee"
              onClick={() => {
                scrollTo("moneyBackMobile")
              }}
              icon={MoneyBackIcon}
              sm
            />
          </Flex>

          <Flex justifyContent="space-around" mt={2}>
            <Feature
              title="Secure Payment"
              onClick={() => {
                scrollTo("securePaymentMobile")
              }}
              icon={LockIcon}
              sm
            />
          </Flex>
        </Media>

        <Media greaterThan="xs">
          <Flex justifyContent="center" mt={4} mx="20%">
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
            mb={[0, 6]}
            flexWrap={["wrap", "nowrap"]}
            alignItems="flex-start"
            mt={12}
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
              text="If an item arrives not as described,"
              forcedSecondLine="we’ll work with you to make it right."
              icon={MoneyBackIcon}
              onClick={() => {
                scrollTo("moneyBack")
              }}
            />
            <Feature
              title="Secure Payment"
              text="Payments made with our secure checkout are protected with trusted industry-leading technology."
              icon={LockIcon}
              onClick={() => {
                scrollTo("securePayment")
              }}
            />
          </Flex>
        </Media>
      </Flex>
      {/*  Artsy Guarantee Sections desktop */}
      <Media greaterThanOrEqual="md">
        <CSSGrid gridTemplateColumns="repeat(2, 1fr)">
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
          <Flex flexDirection="column" p={12} id="jump--authenticity">
            <Text variant="lg">Authenticity Guarantee</Text>
            <Text variant="xs" my={2}>
              {authenticityText}
            </Text>
            <Media greaterThanOrEqual="lg">{learnMoreButton("40%")}</Media>
            <Media lessThan="lg">{learnMoreButton("80%")}</Media>
          </Flex>
          <Flex flexDirection="column" p={12} id="jump--moneyBack">
            <Text variant="lg">Money-Back Guarantee</Text>
            <Text variant="xs" my={2}>
              {moneyBackGuaranteeText}
            </Text>
            <Media greaterThanOrEqual="lg">{learnMoreButton("40%")}</Media>
            <Media lessThan="lg">{learnMoreButton("80%")}</Media>
          </Flex>
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
          <Flex flexDirection="column" px={12} pt={12} id="jump--securePayment">
            <Text variant="lg">Secure Payment</Text>
            <Text variant="xs" my={2}>
              {securePaymentText}
            </Text>
            <PoweredByStripeIcon width={200} mt={"-10px"} ml={"-25px"} />
          </Flex>
        </CSSGrid>
      </Media>
      {/*  Artsy Guarantee Sections mobile */}
      <Media lessThan="sm">
        <Flex
          flexDirection="column"
          mt={4}
          mx={2}
          mb={4}
          id="jump--authenticityMobile"
        >
          {authenticityGuaranteeImageURL && (
            <Image
              src={authenticityGuaranteeImageURL}
              alt={authenticityImage?.artist?.name!}
              srcSet={authenticityImage?.image?.resized?.srcSet!}
              lazyLoad
              aria-label={authenticityImage?.imageTitle!}
            />
          )}
          <Text variant="lg" mt={4}>
            Authenticity Guarantee
          </Text>
          <Text variant="xs" my={2}>
            {authenticityText}
          </Text>
          {learnMoreButton("50%")}
        </Flex>
        <Flex
          flexDirection="column"
          mt={4}
          mx={2}
          mb={4}
          id="jump--moneyBackMobile"
        >
          {moneyBackGuaranteeImageURL && (
            <Image
              src={moneyBackGuaranteeImageURL}
              alt={moneyBackGuaranteeImage?.artist?.name!}
              srcSet={moneyBackGuaranteeImage?.image?.resized?.srcSet}
              lazyLoad
              aria-label={moneyBackGuaranteeImage?.imageTitle!}
            />
          )}
          <Text variant="lg" mt={4}>
            Money-Back Guarantee
          </Text>
          <Text variant="xs" my={2}>
            {moneyBackGuaranteeText}
          </Text>
          {learnMoreButton("50%")}
        </Flex>
        <Flex
          flexDirection="column"
          mt={4}
          mx={2}
          mb={4}
          id="jump--securePaymentMobile"
        >
          {securePaymentImageURL && (
            <Image
              src={securePaymentImageURL}
              alt={securePaymentImage?.artist?.name!}
              srcSet={securePaymentImage?.image?.resized?.srcSet}
              lazyLoad
              aria-label={securePaymentImage?.imageTitle!}
            />
          )}
          <Text variant="lg" mt={4}>
            Secure Payment
          </Text>
          <Text variant="xs" my={2}>
            {securePaymentText}
          </Text>
          <PoweredByStripeIcon width={200} ml={"-30px"} mt={0} />
        </Flex>
      </Media>
      {/*  Artsy Guarantee Grid block mobile */}
      <Media lessThan="sm">
        <Box backgroundColor={"black5"} mx="-20px">
          <Flex
            justifyContent="center"
            py={4}
            mb="-20px"
            backgroundColor={"black5"}
          >
            <Text variant="lg">The Artsy Guarantee</Text>
          </Flex>
          <CSSGrid
            backgroundColor={"black5"}
            gridTemplateColumns="repeat(3, 1fr)"
            mt={2}
            px={2}
          >
            <Box borderBottom={`solid 1px black10`}>{""}</Box>
            <Text
              border={`solid 1px `}
              borderColor="black10"
              borderTop="none"
              pt={4}
              px={2}
              textAlign="center"
              variant="sm"
              fontWeight="bold"
            >
              Making an Inquiry
            </Text>
            <Text
              p={2}
              textAlign="center"
              variant="sm"
              fontWeight="bold"
              borderBottom="solid 1px "
              borderColor="black10"
              backgroundColor={"white100"}
            >
              Purchasing with Artsy’s Secure Checkout
            </Text>
            <Flex
              height="60px"
              borderTop="none"
              flex-flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Text textAlign="center" variant="sm" fontWeight="bold">
                Vetted Sellers
              </Text>
            </Flex>
            <Flex
              justifyContent="space-around"
              alignItems="center"
              border="solid 1px"
              borderColor="black10"
              borderTop="none"
              height="60px"
            >
              <CheckIcon width="40px" height="40px" />
            </Flex>
            <Flex
              justifyContent="space-around"
              alignItems="center"
              height="60px"
              borderBottom="solid 1px"
              borderColor="black10"
              backgroundColor={"white100"}
            >
              <CheckIcon width="40px" height="40px" />
            </Flex>
            <Flex
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
              border="solid 1px"
              borderColor="black10"
              borderLeft="none"
              mt="-1px"
              mr="-1px"
              height="62px"
            >
              <Text textAlign="center" variant="sm" fontWeight="bold">
                Dedicated Support
              </Text>
            </Flex>
            <Flex
              justifyContent="space-around"
              alignItems="center"
              height="61px"
              borderBottom="solid 1px"
              borderColor="black10"
              borderRight="solid 1px"
            >
              <CheckIcon width="40px" height="40px" />
            </Flex>
            <Flex
              justifyContent="space-around"
              alignItems="center"
              height="60px"
              borderBottom="solid 1px"
              borderColor="black10"
              backgroundColor={"white100"}
            >
              <CheckIcon width="40px" height="40px" />
            </Flex>
            <Flex
              alignItems="center"
              borderRight="solid 1px"
              borderColor="black10"
              height="61px"
              mr="-1px"
            >
              <Text textAlign="center" variant="sm" fontWeight="bold">
                Authenticity Guarantee
              </Text>
            </Flex>
            <Flex
              justifyContent="space-around"
              alignItems="center"
              height="61px"
              borderBottom="solid 1px"
              borderRight="solid 1px"
              borderColor="black10"
            >
              {""}
            </Flex>
            <Flex
              justifyContent="space-around"
              alignItems="center"
              height="61px"
              borderBottom="solid 1px"
              backgroundColor={"white100"}
              borderColor="black10"
            >
              <CheckIcon width="40px" height="40px" />
            </Flex>
            <Flex
              alignItems="center"
              height="62px"
              border="solid 1px"
              borderLeft="none"
              borderColor="black10"
              mt="-1px"
              mr="-1px"
            >
              <Text textAlign="center" variant="sm" fontWeight="bold">
                Money-Back Guarantee
              </Text>
            </Flex>
            <Flex
              justifyContent="space-around"
              alignItems="center"
              height="61px"
              borderBottom="solid 1px"
              borderRight="solid 1px"
              borderColor="black10"
            >
              {""}
            </Flex>
            <Flex
              justifyContent="space-around"
              alignItems="center"
              height="61px"
              borderBottom="solid 1px"
              borderColor="black10"
              backgroundColor={"white100"}
            >
              <CheckIcon width="40px" height="40px" />
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="center"
              borderBottom="solid 1px"
              borderRight="solid 1px"
              borderColor="black10"
              height="61px"
              mr="-1px"
              flexDirection="column"
            >
              <Text textAlign="center" variant="sm" fontWeight="bold">
                Secure Payment
              </Text>
            </Flex>
            <Flex
              justifyContent="space-around"
              alignItems="center"
              height="61px"
              borderBottom="solid 1px"
              borderRight="solid 1px"
              borderColor="black10"
            >
              {""}
            </Flex>
            <Flex
              justifyContent="space-around"
              alignItems="center"
              height="61px"
              borderBottom="solid 1px"
              backgroundColor={"white100"}
              borderColor="black10"
            >
              <CheckIcon width="40px" height="40px" />
            </Flex>
          </CSSGrid>
          <Flex backgroundColor={"black5"} p={4} justifyContent="center">
            {learnMoreButton("100%")}
          </Flex>
        </Box>
      </Media>
      {/*  Artsy Guarantee Grid block iPad & desktop */}
      <Media greaterThanOrEqual="sm">
        <Flex justifyContent="center" py={12} backgroundColor={"black5"}>
          <Text variant="xl">The Artsy Guarantee</Text>
        </Flex>
        <CSSGrid
          backgroundColor={"black5"}
          gridTemplateColumns="repeat(6, 1fr)"
          px={2}
          pt={0}
          pb={6}
        >
          <Flex borderColor="black100" borderBottom="solid 1px">
            {""}
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="center"
            borderBottom="solid 1px"
            borderLeft="solid 1px"
            borderColor="black100"
            height="50px"
            flexDirection="column"
          >
            <Text p={1} variant="sm" fontWeight="bold" textAlign="center">
              Vetted Sellers
            </Text>
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="center"
            borderBottom="solid 1px"
            borderLeft="solid 1px"
            borderColor="black100"
            height="50px"
            flexDirection="column"
          >
            <Text p={1} variant="sm" fontWeight="bold" textAlign="center">
              Dedicated Support
            </Text>
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="center"
            border="solid 1px"
            borderTop="none"
            borderColor="black100"
            height="50px"
            ml="-1px"
          >
            <Text p={1} textAlign="center" variant="sm" fontWeight="bold">
              Authenticity Guarantee
            </Text>
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="center"
            borderBottom="solid 1px"
            borderRight="solid 1px"
            borderColor="black100"
            height="50px"
          >
            <Text textAlign="center" variant="sm" fontWeight="bold" p={1}>
              Money-Back Guarantee
            </Text>
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="center"
            borderBottom="solid 1px"
            borderColor="black100"
            height="50px"
            flexDirection="column"
          >
            <Text p={1} variant="sm" fontWeight="bold" textAlign="center">
              Secure Payment
            </Text>
          </Flex>
          <Flex justifyContent="space-around" alignItems="center" height="91px">
            <Text variant="sm" fontWeight="bold" textAlign="center" pr={1}>
              Making an Inquiry
            </Text>
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            border="solid 1px"
            borderColor="black100"
            borderTop="none"
            marginRight="-1px"
          >
            <CheckIcon width="40px" height="40px" />
          </Flex>

          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            borderBottom="solid 1px"
            borderRight="solid 1px"
            borderColor="black100"
          >
            <CheckIcon width="40px" height="40px" />
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            borderBottom="solid 1px"
            borderRight="solid 1px"
            borderColor="black100"
          >
            {""}
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            borderBottom="solid 1px"
            borderRight="solid 1px"
            borderColor="black100"
          >
            {""}
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            borderBottom="solid 1px"
            borderColor="black100"
          >
            {""}
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            mt="-1px"
            borderTop="solid 1px"
            borderColor="black100"
            backgroundColor={"white100"}
          >
            <Text textAlign="center" fontWeight="bold" variant="sm" pr={1}>
              Purchasing with Artsy’s Secure Checkout
            </Text>
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            mr="-1px"
            zIndex={1}
            borderLeft="solid 1px"
            borderRight="solid 1px"
            borderColor="black100"
            backgroundColor={"white100"}
          >
            <CheckIcon width="40px" height="40px" />
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            backgroundColor={"white100"}
          >
            <CheckIcon width="40px" height="40px" />
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            borderLeft="solid 1px"
            borderColor="black100"
            borderRight="solid 1px"
            ml="-1px"
            backgroundColor={"white100"}
          >
            <CheckIcon width="40px" height="40px" />
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            borderRight="solid 1px"
            borderColor="black100"
            backgroundColor={"white100"}
          >
            <CheckIcon width="40px" height="40px" />
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            backgroundColor={"white100"}
          >
            <CheckIcon width="40px" height="40px" />
          </Flex>
        </CSSGrid>
        <Flex justifyContent="center" pb={6} backgroundColor={"black5"}>
          {learnMoreButton("200px")}
        </Flex>
      </Media>
    </>
  )
}
