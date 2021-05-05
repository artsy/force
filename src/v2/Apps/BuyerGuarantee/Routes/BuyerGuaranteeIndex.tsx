import React from "react"
import {
  ArrowRightIcon,
  Box,
  Button,
  CertificateIcon,
  color,
  CSSGrid,
  Flex,
  Image,
  Link,
  LockIcon,
  MessageIcon,
  ReloadIcon,
  space,
  Text,
  VerifiedIcon,
} from "@artsy/palette"
import { BuyerGuaranteeIndex_authenticityImage } from "v2/__generated__/BuyerGuaranteeIndex_authenticityImage.graphql"
import { BuyerGuaranteeIndex_headerImage } from "v2/__generated__/BuyerGuaranteeIndex_headerImage.graphql"
import { BuyerGuaranteeIndex_moneyBackGuaranteeImage } from "v2/__generated__/BuyerGuaranteeIndex_moneyBackGuaranteeImage.graphql"
import { BuyerGuaranteeIndex_securePaymentImage } from "v2/__generated__/BuyerGuaranteeIndex_securePaymentImage.graphql"
import { FullBleed } from "v2/Components/FullBleed"
import { graphql, createFragmentContainer } from "react-relay"
import { Media } from "@artsy/reaction/dist/Utils/Responsive"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { useSystemContext } from "v2/Artsy"
import styled from "styled-components"

interface BuyerGuaranteeIndexProps {
  headerImage: BuyerGuaranteeIndex_headerImage
  authenticityImage: BuyerGuaranteeIndex_authenticityImage
  moneyBackGuaranteeImage: BuyerGuaranteeIndex_moneyBackGuaranteeImage
  securePaymentImage: BuyerGuaranteeIndex_securePaymentImage
}

export const BuyerGuaranteeIndex: React.FC<BuyerGuaranteeIndexProps> = ({
  headerImage,
  authenticityImage,
  moneyBackGuaranteeImage,
  securePaymentImage,
}) => {
  const { user } = useSystemContext()
  const isAdmin = Boolean(user?.roles?.includes("admin"))
  if (!isAdmin) {
    return null
  }

  const authenticityText = `We are dedicated to being the world’s most trustworthy marketplace
  to buy and sell art. In the rare case that a work purchased
  through Artsy’s secure checkout is found to be inauthentic, report
  the issue within 180 days from delivery arrival and we’ll help
  facilitate a refund for the sale.`

  const moneyBackGuaranteeText = `If a work purchased through Artsy’s secure checkout does not arrive, arrives damaged, or is deemed not as described, we will work with you to find the best resolution—including a full refund where applicable.`

  const securePaymentText = `Purchases completed through our secure checkout are powered by
  Stripe, the leader in online payment processing that’s trusted by
  millions of global businesses.`

  const learnMoreIcon = (
    <Flex pt={2} justifyContent="center">
      <Link
        href="https://support.artsy.net/hc/en-us/articles/360048946973"
        mt="-2px"
        underlineBehavior="none"
      >
        <Flex>
          <Text variant="mediumText">Learn More</Text>
          <ArrowRightIcon height="15px" width="15px" mt="2px" ml="2px" />
        </Flex>
      </Link>
    </Flex>
  )

  const navigateTo = "https://support.artsy.net/hc/en-us/articles/360048946973"

  const learnMoreButton = (width: string) => (
    <RouterLink to={navigateTo}>
      <Button width={width} variant="secondaryOutline">
        Learn More
      </Button>
    </RouterLink>
  )

  return (
    <FullBleed>
      {/* Header Block */}
      <Flex justifyContent="center" alignContent="center">
        <Image
          src={headerImage.image.resized.url}
          alt={headerImage.artist.name}
          aria-label={headerImage.imageTitle}
          lazyLoad
          width={1600}
          height={350}
        />
        <Box position="absolute">
          <Text
            variant="largeTitle"
            color={color("white100")}
            position="relative"
            mt={["60%", "50%"]}
            as="h1"
          >
            The Artsy Guarantee
          </Text>
        </Box>
      </Flex>
      <Flex justifyContent="flex-end" mt={["-40px", "-30px"]} mr={1}>
        <Text
          variant={["small", "text"]}
          color={color("white100")}
          textAlign="right"
        >
          {headerImage.imageTitle +
            ". Courtesy of the artist and Kenise Barnes Fine Art. "}
        </Text>
      </Flex>

      {/* First Row */}
      <Flex justifyContent="center" flexDirection="column">
        <Flex justifyContent="center" mx={["10%", "25%"]} textAlign="center">
          <Text variant="title" mt={5}>
            Artsy is the safest place to buy the art you love. Every purchase
            made exclusively with our Artsy’s secure checkout benefits from our
            full suite of buyer protections.
          </Text>
        </Flex>

        {/* Second Row */}
        <Flex justifyContent="center" mt={4} mx="20%">
          <Flex flexDirection="column" mr={5} alignItems="center">
            <Media greaterThanOrEqual="md">
              <VerifiedIcon height={60} width={60} />
            </Media>
            <Media lessThan="md">
              <VerifiedIcon height={50} width={50} />
            </Media>
            <Text
              variant="mediumText"
              my={[0, 2]}
              style={{ whiteSpace: "nowrap" }}
            >
              Vetted Sellers
            </Text>
            <Media greaterThan="xs">
              <Text variant="text" textAlign="center" color={color("black80")}>
                We partner with leading galleries, institutions, and auction
                houses around the world in order to maintain the integrity of
                our listings
              </Text>
            </Media>
          </Flex>
          <Flex flexDirection="column" ml={[0, 5]} alignItems="center">
            <Media greaterThanOrEqual="sm">
              <MessageIcon height={60} width={60} />
            </Media>
            <Media lessThan="sm">
              <MessageIcon height={50} width={50} />
            </Media>
            <Text
              variant="mediumText"
              my={[0, 2]}
              style={{ whiteSpace: "nowrap" }}
            >
              Dedicated Support
            </Text>
            <Media greaterThan="xs">
              <Text variant="text" textAlign="center" color={color("black80")}>
                Our global team of specialists is always here to answer your
                questions and assist with any purchase-related needs.
              </Text>
            </Media>
          </Flex>
        </Flex>

        {/* Third Row */}
        <Flex mt={[2, 3]} flexWrap={["wrap", "nowrap"]} alignItems="flex-end">
          <Flex
            flexDirection="column"
            mt={5}
            mx={[4, 9]}
            width="30%"
            textAlign="center"
          >
            <Media greaterThanOrEqual="sm">
              <CertificateIcon height={60} width={60} />
            </Media>
            <Media lessThan="sm">
              <CertificateIcon height={50} width={50} />
            </Media>
            <Text my={2} variant="mediumText">
              Authenticity Guarantee
            </Text>
            <Media greaterThan="xs">
              <Text variant="text">
                In the rare occasion that your artwork is found to be
                inauthentic, we'll help facilitate a refund.
              </Text>
              {learnMoreIcon}
            </Media>
          </Flex>
          <Flex
            flexDirection="column"
            mt={5}
            mx={[1, 9]}
            width="30%"
            textAlign="center"
          >
            <Media greaterThanOrEqual="sm">
              <ReloadIcon height={60} width={60} />
            </Media>
            <Media lessThan="sm">
              <ReloadIcon height={50} width={50} />
            </Media>
            <Text my={2} variant="mediumText">
              Money-Back Guarantee
            </Text>
            <Media greaterThan="xs">
              <Text variant="text" mb={2}>
                If an item arrives not as described, we’ll work with you to make
                it right.
              </Text>
              {learnMoreIcon}
            </Media>
          </Flex>
          <Flex
            flexDirection="column"
            mt={5}
            mx={[4, 9]}
            width="30%"
            textAlign="center"
          >
            <Media greaterThanOrEqual="sm">
              <LockIcon height={60} width={60} />
            </Media>
            <Media lessThan="sm">
              <LockIcon height={50} width={50} />
            </Media>
            <Text my={2} variant="mediumText">
              Secure Payment
            </Text>
            <Media greaterThan="xs">
              <Text variant="text">
                Payments made through our secure checkout are protected with
                trusted, industry-leading technology.
              </Text>
              {learnMoreIcon}
            </Media>
          </Flex>
        </Flex>
      </Flex>

      {/*  Authenticity Guarantee block */}
      <Media lessThan="sm">
        <Flex flexDirection="column" mt={5} mx={2} mb={4}>
          <Image
            src={authenticityImage.image.resized.url}
            alt={authenticityImage.artist.name}
            lazyLoad
            aria-label={authenticityImage.imageTitle}
          />
          <Text variant="title" mt={4}>
            Authenticity Guarantee
          </Text>
          <Text variant="text" my={2}>
            {authenticityText}
          </Text>
          {learnMoreButton("50%")}
        </Flex>
      </Media>
      <Media greaterThanOrEqual="sm">
        <Flex justifyContent="space-evenly" mt={space(9)}>
          <Image
            src={authenticityImage.image.resized.url}
            alt={authenticityImage.artist.name}
            lazyLoad
            width={2250}
            height={400}
            aria-label={authenticityImage.imageTitle}
          />
          <Flex flexDirection="column" p={space(9)}>
            <Text variant="title">Authenticity Guarantee</Text>
            <Text variant="text" my={2}>
              {authenticityText}
            </Text>
            {learnMoreButton("40%")}
          </Flex>
        </Flex>
      </Media>

      {/*  Money-Back Guarantee block */}
      <Media lessThan="sm">
        <Flex flexDirection="column" mt={5} mx={2} mb={4}>
          <Image
            src={moneyBackGuaranteeImage.image.resized.url}
            alt={moneyBackGuaranteeImage.artist.name}
            lazyLoad
            aria-label={moneyBackGuaranteeImage.imageTitle}
          />
          <Text variant="title" mt={4}>
            Money-Back Guarantee
          </Text>
          <Text variant="text" my={2}>
            {moneyBackGuaranteeText}
          </Text>
          {learnMoreButton("50%")}
        </Flex>
      </Media>
      <Media greaterThanOrEqual="sm">
        <Flex justifyContent="space-evenly">
          <Flex flexDirection="column" p={space(9)}>
            <Text variant="title">Money-Back Guarantee</Text>
            <Text variant="text" my={2}>
              {moneyBackGuaranteeText}
            </Text>
            {learnMoreButton("40%")}
          </Flex>
          <Image
            src={moneyBackGuaranteeImage.image.resized.url}
            alt={moneyBackGuaranteeImage.artist.name}
            lazyLoad
            width={2000}
            height={400}
            aria-label={moneyBackGuaranteeImage.imageTitle}
          />
        </Flex>
      </Media>

      {/*  Secure Payment block */}
      <Media lessThan="sm">
        <Flex flexDirection="column" mt={5} mx={2} mb={4}>
          <Image
            src={securePaymentImage.image.resized.url}
            alt={securePaymentImage.artist.name}
            lazyLoad
            aria-label={securePaymentImage.imageTitle}
          />
          <Text variant="title" mt={4}>
            Secure Payment
          </Text>
          <Text variant="text" my={2}>
            {securePaymentText}
          </Text>
          <PoweredByStripeIcon h="40%" w="40%" />
        </Flex>
      </Media>
      <Media greaterThanOrEqual="sm">
        <Flex justifyContent="space-evenly">
          <Image
            src={securePaymentImage.image.resized.url}
            alt={securePaymentImage.artist.name}
            aria-label={securePaymentImage.imageTitle}
            lazyLoad
            width={1300}
            height={400}
          />
          <Flex flexDirection="column" p={space(9)}>
            <Text variant="title">Secure Payment</Text>
            <Text variant="text" my={2}>
              {securePaymentText}
            </Text>
            <PoweredByStripeIcon h="40%" w="40%" />
          </Flex>
        </Flex>
      </Media>

      {/*  Artsy Guarantee Grid block mobile */}
      <Media lessThan="sm">
        <CSSGrid
          backgroundColor={color("black5")}
          gridTemplateColumns="repeat(3, 1fr)"
          mt={2}
        >
          <Box borderBottom={`solid 1px ${color("black10")}`}>{""}</Box>
          <Text
            border={`solid 1px ${color("black10")}`}
            borderTop="none"
            pt={4}
            px={2}
            textAlign="center"
            variant="mediumText"
          >
            Making an Inquiry
          </Text>
          <Text
            p={2}
            textAlign="center"
            variant="mediumText"
            borderBottom={`solid 1px ${color("black10")}`}
            backgroundColor={color("white100")}
          >
            Purchasing with Artsy’s secure checkout
          </Text>
          <Flex
            height="60px"
            borderTop="none"
            flex-flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text textAlign="center" variant="mediumText">
              Vetted Sellers
            </Text>
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            border={`solid 1px ${color("black10")}`}
            borderTop="none"
            height="60px"
          >
            <VerifiedIcon width="40px" height="40px" />
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="60px"
            borderBottom={`solid 1px ${color("black10")}`}
            backgroundColor={color("white100")}
          >
            <VerifiedIcon width="40px" height="40px" />
          </Flex>
          <Flex
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            style={{ outline: `solid 1px ${color("black10")}` }}
            height="60px"
          >
            <Text textAlign="center" variant="mediumText">
              Dedicated Support
            </Text>
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="61px"
            borderBottom={`solid 1px ${color("black10")}`}
            borderRight={`solid 1px ${color("black10")}`}
          >
            <VerifiedIcon width="40px" height="40px" />
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="61px"
            borderBottom={`solid 1px ${color("black10")}`}
            backgroundColor={color("white100")}
          >
            <VerifiedIcon width="40px" height="40px" />
          </Flex>
          <Flex
            alignItems="center"
            style={{ outline: `solid 1px ${color("black10")}` }}
            height="60px"
          >
            <Text textAlign="center" variant="mediumText">
              Authenticity Guarantee
            </Text>
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="61px"
            borderBottom={`solid 1px ${color("black10")}`}
            borderRight={`solid 1px ${color("black10")}`}
          >
            {""}
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="61px"
            borderBottom={`solid 1px ${color("black10")}`}
            backgroundColor={color("white100")}
          >
            <VerifiedIcon width="40px" height="40px" />
          </Flex>
          <Flex
            alignItems="center"
            style={{ outline: `solid 1px ${color("black10")}` }}
            height="60px"
          >
            <Text textAlign="center" variant="mediumText">
              Money-Back Guarantee
            </Text>
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="61px"
            borderBottom={`solid 1px ${color("black10")}`}
            borderRight={`solid 1px ${color("black10")}`}
          >
            {""}
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="61px"
            borderBottom={`solid 1px ${color("black10")}`}
            backgroundColor={color("white100")}
          >
            <VerifiedIcon width="40px" height="40px" />
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="center"
            style={{ outline: `solid 1px ${color("black10")}` }}
            height="60px"
            flexDirection="column"
          >
            <Text variant="mediumText">Secure Payment</Text>
          </Flex>

          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="61px"
            borderBottom={`solid 1px ${color("black10")}`}
            borderRight={`solid 1px ${color("black10")}`}
          >
            {""}
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="61px"
            borderBottom={`solid 1px ${color("black10")}`}
            backgroundColor={color("white100")}
          >
            <VerifiedIcon width="40px" height="40px" />
          </Flex>
        </CSSGrid>
        <Flex backgroundColor={color("black5")} p={4} justifyContent="center">
          {learnMoreButton("100%")}
        </Flex>
      </Media>

      {/*  Artsy Guarantee Grid block desktop */}
      <Media greaterThanOrEqual="sm">
        <Flex
          justifyContent="center"
          py={space(9)}
          backgroundColor={color("black5")}
        >
          <Text variant="largeTitle">The Artsy Guarantee</Text>
        </Flex>
        <CSSGrid
          backgroundColor={color("black5")}
          gridTemplateColumns="repeat(6, 1fr)"
          px={space(18)}
          pt={0}
          pb={space(9)}
        >
          <Flex borderBottom={`solid 1px ${color("black100")}`}>{""}</Flex>
          <Text
            p={1}
            textAlign="center"
            variant="mediumText"
            height="50px"
            borderBottom={`solid 1px ${color("black100")}`}
            borderLeft={`solid 1px ${color("black100")}`}
          >
            Vetted Sellers
          </Text>
          <Flex flexDirection="column">
            <Text
              p={1}
              textAlign="center"
              variant="mediumText"
              height="50px"
              borderBottom={`solid 1px ${color("black100")}`}
              borderLeft={`solid 1px ${color("black100")}`}
            >
              Dedicated Support
            </Text>
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="center"
            border={`solid 1px ${color("black100")}`}
            borderTop="none"
            height="50px"
            ml="-1px"
          >
            <Text p={1} textAlign="center" variant="mediumText">
              Authenticity Guarantee
            </Text>
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="center"
            borderBottom={`solid 1px ${color("black100")}`}
            borderRight={`solid 1px ${color("black100")}`}
            height="50px"
          >
            <Text textAlign="center" variant="mediumText" p={1}>
              Money-Back Guarantee
            </Text>
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="center"
            borderBottom={`solid 1px ${color("black100")}`}
            height="50px"
            flexDirection="column"
          >
            <Text p={1} variant="mediumText">
              Secure Payment
            </Text>
          </Flex>
          <Flex justifyContent="space-around" alignItems="center" height="91px">
            <Text variant="mediumText">Making an Inquiry</Text>
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            border={`solid 1px ${color("black100")}`}
            borderTop="none"
            marginRight="-1px"
          >
            <VerifiedIcon width="40px" height="40px" />
          </Flex>

          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            borderBottom={`solid 1px ${color("black100")}`}
            borderRight={`solid 1px ${color("black100")}`}
          >
            <VerifiedIcon width="40px" height="40px" />
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            borderBottom={`solid 1px ${color("black100")}`}
            borderRight={`solid 1px ${color("black100")}`}
          >
            {""}
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            borderBottom={`solid 1px ${color("black100")}`}
            borderRight={`solid 1px ${color("black100")}`}
          >
            {""}
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            borderBottom={`solid 1px ${color("black100")}`}
          >
            {""}
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            mt="-1px"
            borderTop={`solid 1px ${color("black100")}`}
            backgroundColor={color("white100")}
          >
            <Text textAlign="center" variant="mediumText">
              Purchasing with Artsy’s secure checkout
            </Text>
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            mr="-1px"
            zIndex={1}
            borderLeft={`solid 1px ${color("black100")}`}
            borderRight={`solid 1px ${color("black100")}`}
            backgroundColor={color("white100")}
          >
            <VerifiedIcon width="40px" height="40px" />
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            backgroundColor={color("white100")}
          >
            <VerifiedIcon width="40px" height="40px" />
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            borderLeft={`solid 1px ${color("black100")}`}
            borderRight={`solid 1px ${color("black100")}`}
            ml="-1px"
            backgroundColor={color("white100")}
          >
            <VerifiedIcon width="40px" height="40px" />
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            borderRight={`solid 1px ${color("black100")}`}
            backgroundColor={color("white100")}
          >
            <VerifiedIcon width="40px" height="40px" />
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            backgroundColor={color("white100")}
          >
            <VerifiedIcon width="40px" height="40px" />
          </Flex>
        </CSSGrid>
        <Flex
          justifyContent="center"
          pb={space(9)}
          backgroundColor={color("black5")}
        >
          {learnMoreButton("200px")}
        </Flex>
      </Media>
    </FullBleed>
  )
}

export const BuyerGuaranteeIndexFragmentContainer = createFragmentContainer(
  BuyerGuaranteeIndex,
  {
    headerImage: graphql`
      fragment BuyerGuaranteeIndex_headerImage on Artwork {
        imageTitle
        imageUrl
        artist {
          name
        }
        image {
          resized(version: "normalized") {
            url
          }
        }
      }
    `,
    authenticityImage: graphql`
      fragment BuyerGuaranteeIndex_authenticityImage on Artwork {
        imageTitle
        imageUrl
        artist {
          name
        }
        image {
          resized(version: "large_rectangle") {
            url
          }
        }
      }
    `,
    moneyBackGuaranteeImage: graphql`
      fragment BuyerGuaranteeIndex_moneyBackGuaranteeImage on Artwork {
        imageTitle
        imageUrl
        artist {
          name
        }
        image {
          resized(version: "large_rectangle") {
            url
          }
        }
      }
    `,
    securePaymentImage: graphql`
      fragment BuyerGuaranteeIndex_securePaymentImage on Artwork {
        imageTitle
        imageUrl
        artist {
          name
        }
        image {
          resized(version: "large_rectangle") {
            url
          }
        }
      }
    `,
  }
)

const PoweredByStripeIconContainer = styled.svg<{
  height: string
  width: string
}>`
  height: ${props => props.height}};
  width: ${props => props.width}};
`

const PoweredByStripeIcon = ({ h, w }) => (
  <PoweredByStripeIconContainer height={h} width={w}>
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 150 34"
    >
      <title>Powered by Stripe - black</title>
      <path d="M146,0H3.73A3.73,3.73,0,0,0,0,3.73V30.27A3.73,3.73,0,0,0,3.73,34H146a4,4,0,0,0,4-4V4A4,4,0,0,0,146,0Zm3,30a3,3,0,0,1-3,3H3.73A2.74,2.74,0,0,1,1,30.27V3.73A2.74,2.74,0,0,1,3.73,1H146a3,3,0,0,1,3,3Z" />
      <path d="M17.07,11.24h-4.3V22h1.92V17.84h2.38c2.4,0,3.9-1.16,3.9-3.3S19.47,11.24,17.07,11.24Zm-.1,5H14.69v-3.3H17c1.38,0,2.11.59,2.11,1.65S18.35,16.19,17,16.19Z" />
      <path d="M25.1,14a3.77,3.77,0,0,0-3.8,4.09,3.81,3.81,0,1,0,7.59,0A3.76,3.76,0,0,0,25.1,14Zm0,6.67c-1.22,0-2-1-2-2.58s.76-2.58,2-2.58,2,1,2,2.58S26.31,20.66,25.1,20.66Z" />
      <polygon points="36.78 19.35 35.37 14.13 33.89 14.13 32.49 19.35 31.07 14.13 29.22 14.13 31.59 22.01 33.15 22.01 34.59 16.85 36.03 22.01 37.59 22.01 39.96 14.13 38.18 14.13 36.78 19.35" />
      <path d="M44,14a3.83,3.83,0,0,0-3.75,4.09,3.79,3.79,0,0,0,3.83,4.09A3.47,3.47,0,0,0,47.49,20L46,19.38a1.78,1.78,0,0,1-1.83,1.26A2.12,2.12,0,0,1,42,18.47h5.52v-.6C47.54,15.71,46.32,14,44,14Zm-1.93,3.13A1.92,1.92,0,0,1,44,15.5a1.56,1.56,0,0,1,1.69,1.62Z" />
      <path d="M50.69,15.3V14.13h-1.8V22h1.8V17.87a1.89,1.89,0,0,1,2-2,4.68,4.68,0,0,1,.66,0v-1.8c-.14,0-.3,0-.51,0A2.29,2.29,0,0,0,50.69,15.3Z" />
      <path d="M57.48,14a3.83,3.83,0,0,0-3.75,4.09,3.79,3.79,0,0,0,3.83,4.09A3.47,3.47,0,0,0,60.93,20l-1.54-.59a1.78,1.78,0,0,1-1.83,1.26,2.12,2.12,0,0,1-2.1-2.17H61v-.6C61,15.71,59.76,14,57.48,14Zm-1.93,3.13a1.92,1.92,0,0,1,1.92-1.62,1.56,1.56,0,0,1,1.69,1.62Z" />
      <path d="M67.56,15a2.85,2.85,0,0,0-2.26-1c-2.21,0-3.47,1.85-3.47,4.09s1.26,4.09,3.47,4.09a2.82,2.82,0,0,0,2.26-1V22h1.8V11.24h-1.8Zm0,3.35a2,2,0,0,1-2,2.28c-1.31,0-2-1-2-2.52s.7-2.52,2-2.52c1.11,0,2,.81,2,2.29Z" />
      <path d="M79.31,14A2.88,2.88,0,0,0,77,15V11.24h-1.8V22H77v-.83a2.86,2.86,0,0,0,2.27,1c2.2,0,3.46-1.86,3.46-4.09S81.51,14,79.31,14ZM79,20.6a2,2,0,0,1-2-2.28v-.47c0-1.48.84-2.29,2-2.29,1.3,0,2,1,2,2.52S80.25,20.6,79,20.6Z" />
      <path d="M86.93,19.66,85,14.13H83.1L86,21.72l-.3.74a1,1,0,0,1-1.14.79,4.12,4.12,0,0,1-.6,0v1.51a4.62,4.62,0,0,0,.73.05,2.67,2.67,0,0,0,2.78-2l3.24-8.62H88.82Z" />
      <path d="M125,12.43a3,3,0,0,0-2.13.87l-.14-.69h-2.39V25.53l2.72-.59V21.81a3,3,0,0,0,1.93.7c1.94,0,3.72-1.59,3.72-5.11C128.71,14.18,126.91,12.43,125,12.43Zm-.65,7.63a1.61,1.61,0,0,1-1.28-.52l0-4.11a1.64,1.64,0,0,1,1.3-.55c1,0,1.68,1.13,1.68,2.58S125.36,20.06,124.35,20.06Z" />
      <path d="M133.73,12.43c-2.62,0-4.21,2.26-4.21,5.11,0,3.37,1.88,5.08,4.56,5.08a6.12,6.12,0,0,0,3-.73V19.64a5.79,5.79,0,0,1-2.7.62c-1.08,0-2-.39-2.14-1.7h5.38c0-.15,0-.74,0-1C137.71,14.69,136.35,12.43,133.73,12.43Zm-1.47,4.07c0-1.26.77-1.79,1.45-1.79s1.4.53,1.4,1.79Z" />
      <path d="M113,13.36l-.17-.82h-2.32v9.71h2.68V15.67a1.87,1.87,0,0,1,2.05-.58V12.54A1.8,1.8,0,0,0,113,13.36Z" />
      <path d="M99.46,15.46c0-.44.36-.61.93-.61a5.9,5.9,0,0,1,2.7.72V12.94a7,7,0,0,0-2.7-.51c-2.21,0-3.68,1.18-3.68,3.16,0,3.1,4.14,2.6,4.14,3.93,0,.52-.44.69-1,.69a6.78,6.78,0,0,1-3-.9V22a7.38,7.38,0,0,0,3,.64c2.26,0,3.82-1.15,3.82-3.16C103.62,16.12,99.46,16.72,99.46,15.46Z" />
      <path d="M107.28,10.24l-2.65.58v8.93a2.77,2.77,0,0,0,2.82,2.87,4.16,4.16,0,0,0,1.91-.37V20c-.35.15-2.06.66-2.06-1V15h2.06V12.66h-2.06Z" />
      <polygon points="116.25 11.7 118.98 11.13 118.98 8.97 116.25 9.54 116.25 11.7" />
      <rect x="116.25" y="12.61" width="2.73" height="9.64" />
    </svg>
  </PoweredByStripeIconContainer>
)
