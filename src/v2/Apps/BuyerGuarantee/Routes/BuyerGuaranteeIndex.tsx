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
  space,
  Text,
  VerifiedIcon,
} from "@artsy/palette"
import { BuyerGuaranteeIndex_authenticityImage } from "v2/__generated__/BuyerGuaranteeIndex_authenticityImage.graphql"
import { BuyerGuaranteeIndex_headerImage } from "v2/__generated__/BuyerGuaranteeIndex_headerImage.graphql"
import { BuyerGuaranteeIndex_moneyBackGuaranteeImage } from "v2/__generated__/BuyerGuaranteeIndex_moneyBackGuaranteeImage.graphql"
import { BuyerGuaranteeIndex_securePaymentImage } from "v2/__generated__/BuyerGuaranteeIndex_securePaymentImage.graphql"
import { graphql, createFragmentContainer } from "react-relay"
import { Media } from "@artsy/reaction/dist/Utils/Responsive"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { useSystemContext } from "v2/Artsy"
import styled from "styled-components"
import { resize } from "v2/Utils/resizer"
import { FullBleedHeader } from "v2/Components/FullBleedHeader"

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

  const securePaymentText = `Purchases completed through our secure checkout are powered by
  Stripe, the leader in online payment processing that’s trusted by
  millions of global businesses.`

  const moneyBackGuaranteeText = `If a work purchased through Artsy’s secure checkout does not arrive, arrives damaged, or is deemed not as described, we will work with you to find the best resolution—including a full refund where applicable.`

  const supportArticleURL =
    "https://support.artsy.net/hc/en-us/articles/360048946973"

  const authenticityGuaranteeImageURL = resize(
    "http://files.artsy.net/authenticityguaranteeartwork.jpg",
    { width: 400, height: 600, convert_to: "jpg" }
  )
  const securePaymentImageURL = resize(
    "http://files.artsy.net/securepaymentartwork.jpg",
    { width: 400, height: 600, convert_to: "jpg" }
  )
  const moneyBackGuaranteeImageURL = resize(
    "http://files.artsy.net/moneybackguaranteeartwork.jpg",
    { width: 400, height: 600, convert_to: "jpg" }
  )
  const heroImageURL = resize(
    "http://files.artsy.net/buyerGuaranteeHeroImage.jpg",
    { width: 1600, height: 800, convert_to: "jpg" }
  )

  const learnMoreIcon = (
    <Flex pt={2} justifyContent="center">
      <Link href={supportArticleURL} mt="-2px" underlineBehavior="none">
        <Flex>
          <Text variant="mediumText">Learn More</Text>
          <ArrowRightIcon height="17px" width="17px" mt="2px" ml="2px" />
        </Flex>
      </Link>
    </Flex>
  )

  const learnMoreButton = (width: string) => (
    <RouterLink to={supportArticleURL}>
      <Button width={width} variant="secondaryOutline">
        Learn More
      </Button>
    </RouterLink>
  )

  return (
    <>
      {heroImageURL && (
        <FullBleedHeader
          {...headerImage?.image?.resized?.srcSet}
          height={[283, 469]}
          src={heroImageURL}
          caption={
            headerImage.imageTitle +
            ". Courtesy of the artist and Kenise Barnes Fine Art. "
          }
          meta="Artsy is the safest place to buy the art you love. Every purchase made exclusively with our Artsy’s secure checkout benefits from our full suite of buyer protections."
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
              color={color("white100")}
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
          <Text variant="title" mt={5}>
            Artsy is the safest place to buy the art you love. Every purchase
            made exclusively with Artsy’s secure checkout benefits from our full
            suite of buyer protections.
          </Text>
        </Flex>

        <Media lessThan="sm">
          <Flex justifyContent="space-around" mt={4} pl={1}>
            <Flex flexDirection="column" alignItems="center">
              <VerifiedIcon height={50} width={50} />
              <Flex>
                <Text
                  variant="mediumText"
                  my={2}
                  style={{ whiteSpace: "nowrap" }}
                >
                  Vetted Sellers
                </Text>
                <ArrowRightIcon height="20px" width="20px" mt={2} />
              </Flex>
            </Flex>

            <Flex flexDirection="column" ml={0} alignItems="center">
              <ChatIcon h={50} w={50} />
              <Flex>
                <Text
                  variant="mediumText"
                  my={2}
                  style={{ whiteSpace: "nowrap" }}
                >
                  Dedicated Support
                </Text>
                <ArrowRightIcon height="20px" width="20px" mt={2} />
              </Flex>
            </Flex>
          </Flex>
          <Flex justifyContent="space-around" mt={2}>
            <Flex flexDirection="column" alignItems="center">
              <CertificateIcon height={50} width={50} />
              <Flex>
                <Text
                  variant="mediumText"
                  my={2}
                  style={{ whiteSpace: "nowrap" }}
                >
                  Authenticity Guarantee
                </Text>
                <ArrowRightIcon height="20px" width="20px" mt={2} />
              </Flex>
            </Flex>

            <Flex flexDirection="column" ml={0} alignItems="center">
              <MoneyBackIcon h={50} w={50} />
              <Flex>
                <Text
                  variant="mediumText"
                  my={2}
                  style={{ whiteSpace: "nowrap" }}
                >
                  Money-Back Guarantee
                </Text>
                <ArrowRightIcon height="20px" width="20px" mt={2} />
              </Flex>
            </Flex>
          </Flex>

          <Flex justifyContent="space-around" mt={2}>
            <Flex flexDirection="column" alignItems="center">
              <LockIcon height={50} width={50} />
              <Flex>
                {" "}
                <Text
                  variant="mediumText"
                  my={2}
                  style={{ whiteSpace: "nowrap" }}
                >
                  Secure Payment
                </Text>
                <ArrowRightIcon height="20px" width="20px" mt={2} />
              </Flex>
            </Flex>
          </Flex>
        </Media>

        <Media greaterThan="xs">
          <Flex justifyContent="center" mt={4} mx="20%">
            <Flex flexDirection="column" mr={5} alignItems="center">
              <VerifiedIcon height={60} width={60} />

              <Text
                variant="mediumText"
                my={2}
                style={{ whiteSpace: "nowrap" }}
              >
                Vetted Sellers
              </Text>
              <Text variant="text" textAlign="center" color={color("black80")}>
                We partner with leading galleries, institutions, and auction
                houses around the world in order to maintain the integrity of
                our listings
              </Text>
            </Flex>

            <Flex flexDirection="column" ml={[0, 5]} alignItems="center">
              <ChatIcon h={60} w={60} />
              <Text
                variant="mediumText"
                my={2}
                style={{ whiteSpace: "nowrap" }}
              >
                Dedicated Support
              </Text>
              <Text variant="text" textAlign="center" color={color("black80")}>
                Our global team of specialists is always here to answer your
                questions and assist with any purchase-related needs.
              </Text>
            </Flex>
          </Flex>

          <Flex
            mb={[0, space(9)]}
            flexWrap={["wrap", "nowrap"]}
            alignItems="flex-start"
          >
            <Flex
              flexDirection="column"
              mt={5}
              height={300}
              width="100%"
              textAlign="center"
              justifyContent="flex-end"
            >
              <Box>
                <CertificateIcon height={60} width={60} />
              </Box>
              <Box>
                <Text my={2} variant="mediumText">
                  Authenticity Guarantee
                </Text>
                <Text variant="text">
                  In the rare occasion that your artwork is found to be
                  inauthentic, we'll help facilitate a refund.
                </Text>
              </Box>
              <Box>{learnMoreIcon}</Box>
            </Flex>
            <Flex
              flexDirection="column"
              mt={5}
              height={300}
              width="100%"
              textAlign="center"
              justifyContent="flex-end"
            >
              <Box>
                <MoneyBackIcon h={60} w={60} />
              </Box>
              <Box>
                <Text my={2} variant="mediumText">
                  Money-Back Guarantee
                </Text>
                <Text variant="text">
                  If an item arrives not as described, we’ll work with you to
                  make it right.
                </Text>
              </Box>
              <Box>{learnMoreIcon}</Box>
            </Flex>
            <Flex
              flexDirection="column"
              mt={5}
              height={300}
              width="100%"
              textAlign="center"
              justifyContent="flex-end"
            >
              <Box>
                <LockIcon height={60} width={60} />
              </Box>

              <Box>
                <Text my={2} variant="mediumText">
                  Secure Payment
                </Text>
                <Text variant="text">
                  Payments made with our secure checkout are protected with
                  trusted industry-leading technology.
                </Text>
              </Box>
              <Box>{learnMoreIcon}</Box>
            </Flex>
          </Flex>
        </Media>
      </Flex>
      {/*  Artsy Guarantee Sections desktop */}
      <Media greaterThanOrEqual="sm">
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
          <Flex flexDirection="column" p={space(9)}>
            <Text variant="title">Authenticity Guarantee</Text>
            <Text variant="text" my={2}>
              {authenticityText}
            </Text>
            {learnMoreButton("40%")}
          </Flex>
          <Flex flexDirection="column" p={space(9)}>
            <Text variant="title">Money-Back Guarantee</Text>
            <Text variant="text" my={2}>
              {moneyBackGuaranteeText}
            </Text>
            {learnMoreButton("40%")}
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
          <Flex flexDirection="column" px={space(9)} pt={space(9)}>
            <Text variant="title">Secure Payment</Text>
            <Text variant="text" my={2}>
              {securePaymentText}
            </Text>
            <PoweredByStripeIcon w={200} mt={"-10px"} ml={"-25px"} />
          </Flex>
        </CSSGrid>
      </Media>
      {/*  Artsy Guarantee Sections mobile */}
      <Media lessThan="sm">
        <Flex flexDirection="column" mt={5} mx={2} mb={4}>
          {authenticityGuaranteeImageURL && (
            <Image
              src={authenticityGuaranteeImageURL}
              alt={authenticityImage?.artist?.name!}
              srcSet={authenticityImage?.image?.resized?.srcSet!}
              lazyLoad
              aria-label={authenticityImage?.imageTitle!}
            />
          )}
          <Text variant="title" mt={4}>
            Authenticity Guarantee
          </Text>
          <Text variant="text" my={2}>
            {authenticityText}
          </Text>
          {learnMoreButton("50%")}
        </Flex>
        <Flex flexDirection="column" mt={5} mx={2} mb={4}>
          {moneyBackGuaranteeImageURL && (
            <Image
              src={moneyBackGuaranteeImageURL}
              alt={moneyBackGuaranteeImage?.artist?.name!}
              srcSet={moneyBackGuaranteeImage?.image?.resized?.srcSet}
              lazyLoad
              aria-label={moneyBackGuaranteeImage?.imageTitle!}
            />
          )}
          <Text variant="title" mt={4}>
            Money-Back Guarantee
          </Text>
          <Text variant="text" my={2}>
            {moneyBackGuaranteeText}
          </Text>
          {learnMoreButton("50%")}
        </Flex>
        <Flex flexDirection="column" mt={5} mx={2} mb={4}>
          {securePaymentImageURL && (
            <Image
              src={securePaymentImageURL}
              alt={securePaymentImage?.artist?.name!}
              srcSet={securePaymentImage?.image?.resized?.srcSet}
              lazyLoad
              aria-label={securePaymentImage?.imageTitle!}
            />
          )}
          <Text variant="title" mt={4}>
            Secure Payment
          </Text>
          <Text variant="text" my={2}>
            {securePaymentText}
          </Text>
          <PoweredByStripeIcon w={200} ml={"-30px"} mt={0} />
        </Flex>
      </Media>
      {/*  Artsy Guarantee Grid block mobile */}
      <Media lessThan="sm">
        <Flex justifyContent="center" mb={4}>
          <Text variant="title">The Artsy Guarantee</Text>
        </Flex>
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
            border={`solid 1px ${color("black10")}`}
            borderLeft="none"
            mt="-1px"
            mr="-1px"
            height="62px"
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
            height="60px"
            borderBottom={`solid 1px ${color("black10")}`}
            backgroundColor={color("white100")}
          >
            <VerifiedIcon width="40px" height="40px" />
          </Flex>
          <Flex
            alignItems="center"
            borderRight={`solid 1px ${color("black10")}`}
            height="61px"
            mr="-1px"
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
            height="62px"
            border={`solid 1px ${color("black10")}`}
            borderLeft="none"
            mt="-1px"
            mr="-1px"
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
            borderBottom={`solid 1px ${color("black10")}`}
            borderRight={`solid 1px ${color("black10")}`}
            height="61px"
            mr="-1px"
            flexDirection="column"
          >
            <Text textAlign="center" variant="mediumText">
              Secure Payment
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
    </>
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
            srcSet
          }
        }
      }
    `,
    authenticityImage: graphql`
      fragment BuyerGuaranteeIndex_authenticityImage on Artwork {
        imageTitle
        imageUrl
        image {
          resized(version: "large_rectangle") {
            srcSet
          }
        }
        artist {
          name
        }
      }
    `,
    moneyBackGuaranteeImage: graphql`
      fragment BuyerGuaranteeIndex_moneyBackGuaranteeImage on Artwork {
        imageTitle
        imageUrl
        image {
          resized(version: "large_rectangle") {
            srcSet
          }
        }
        artist {
          name
        }
      }
    `,
    securePaymentImage: graphql`
      fragment BuyerGuaranteeIndex_securePaymentImage on Artwork {
        imageTitle
        imageUrl
        image {
          resized(version: "large_rectangle") {
            srcSet
          }
        }
        artist {
          name
        }
      }
    `,
  }
)

const PoweredByStripeIcon = ({ w, mt, ml }) => (
  <Box mt={mt} ml={ml}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      viewBox="-17.85 -6.5 154.7 39"
    >
      <path
        d="M113 26H6c-3.314 0-6-2.686-6-6V6c0-3.314 2.686-6 6-6h107c3.314 0 6 2.686 6 6v14c0 3.314-2.686 6-6 6zm5-20c0-2.761-2.239-5-5-5H6C3.239 1 1 3.239 1 6v14c0 2.761 2.239 5 5 5h107c2.761 0 5-2.239 5-5z"
        fill="#424770"
        opacity=".349"
        fillRule="evenodd"
      />
      <path
        d="M60.7 18.437h-1.305l1.01-2.494-2.01-5.072h1.379l1.263 3.452 1.273-3.452h1.379zm-5.01-2.178c-.452 0-.916-.168-1.336-.495v.369h-1.347V8.566h1.347v2.663c.42-.316.884-.484 1.336-.484 1.41 0 2.378 1.136 2.378 2.757 0 1.62-.968 2.757-2.378 2.757zm-.284-4.357c-.368 0-.737.158-1.052.474v2.252c.315.315.684.473 1.052.473.758 0 1.284-.652 1.284-1.599s-.526-1.6-1.284-1.6zm-7.852 3.862c-.41.327-.873.495-1.336.495-1.4 0-2.378-1.137-2.378-2.757 0-1.621.978-2.757 2.378-2.757.463 0 .926.168 1.336.484V8.566h1.358v7.567h-1.358zm0-3.388c-.305-.316-.673-.474-1.041-.474-.769 0-1.295.653-1.295 1.6 0 .947.526 1.599 1.295 1.599.368 0 .736-.158 1.041-.473zm-8.019 1.494c.084.8.716 1.347 1.599 1.347.485 0 1.021-.179 1.568-.495v1.127c-.599.273-1.199.41-1.789.41-1.589 0-2.704-1.158-2.704-2.799 0-1.589 1.094-2.715 2.599-2.715 1.379 0 2.315 1.084 2.315 2.63 0 .148 0 .316-.021.495zm1.221-2.084c-.653 0-1.158.485-1.221 1.211h2.294c-.042-.716-.473-1.211-1.073-1.211zm-4.768.832v3.515h-1.347v-5.262h1.347v.526c.379-.421.842-.652 1.294-.652.148 0 .295.01.442.052v1.2c-.147-.042-.315-.063-.473-.063-.442 0-.916.242-1.263.684zm-6.009 1.252c.084.8.715 1.347 1.599 1.347.484 0 1.021-.179 1.568-.495v1.127c-.6.273-1.2.41-1.789.41-1.589 0-2.704-1.158-2.704-2.799 0-1.589 1.094-2.715 2.599-2.715 1.378 0 2.315 1.084 2.315 2.63 0 .148 0 .316-.021.495zm1.22-2.084c-.652 0-1.157.485-1.22 1.211h2.294c-.042-.716-.474-1.211-1.074-1.211zm-5.925 4.347L24.2 12.555l-1.063 3.578h-1.21l-1.81-5.262h1.347l1.063 3.578 1.063-3.578h1.22l1.063 3.578 1.063-3.578h1.347l-1.799 5.262zm-8.231.126c-1.589 0-2.715-1.147-2.715-2.757 0-1.621 1.126-2.757 2.715-2.757s2.705 1.136 2.705 2.757c0 1.61-1.116 2.757-2.705 2.757zm0-4.388c-.789 0-1.336.663-1.336 1.631s.547 1.631 1.336 1.631c.779 0 1.326-.663 1.326-1.631s-.547-1.631-1.326-1.631zm-5.915 1.662h-1.21v2.6H8.571V8.892h2.557c1.474 0 2.526.958 2.526 2.326s-1.052 2.315-2.526 2.315zm-.189-3.546H9.918v2.452h1.021c.779 0 1.326-.495 1.326-1.221 0-.736-.547-1.231-1.326-1.231zm100.177 4.064h-5.559c.127 1.331 1.102 1.723 2.209 1.723 1.127 0 2.015-.238 2.789-.628v2.287c-.771.428-1.79.736-3.147.736-2.766 0-4.704-1.732-4.704-5.156 0-2.892 1.644-5.188 4.345-5.188 2.697 0 4.105 2.295 4.105 5.203 0 .275-.025.87-.038 1.023zm-4.085-3.911c-.71 0-1.499.536-1.499 1.815h2.936c0-1.278-.74-1.815-1.437-1.815zm-8.923 8.029c-.994 0-1.601-.419-2.009-.718l-.006 3.213-2.839.604-.001-13.254h2.5l.148.701c.392-.366 1.111-.89 2.224-.89 1.994 0 3.872 1.796 3.872 5.102 0 3.608-1.858 5.242-3.889 5.242zm-.662-7.829c-.651 0-1.06.238-1.356.563l.017 4.219c.276.299.673.539 1.339.539 1.05 0 1.754-1.143 1.754-2.672 0-1.485-.715-2.649-1.754-2.649zm-8.297-2.326h2.85v9.952h-2.85zm0-3.178l2.85-.606v2.313l-2.85.606zm-3.039 6.383v6.747h-2.838V8.014h2.455l.178.839c.665-1.222 1.992-.974 2.37-.838v2.61c-.361-.117-1.494-.287-2.165.594zm-6.086 3.256c0 1.673 1.792 1.152 2.155 1.007v2.311c-.378.208-1.064.376-1.992.376-1.685 0-2.95-1.241-2.95-2.922l.013-9.109 2.772-.59.002 2.466h2.156v2.421h-2.156zm-3.539.484c0 2.044-1.627 3.21-3.988 3.21-.979 0-2.049-.19-3.105-.644v-2.711c.953.518 2.167.907 3.108.907.633 0 1.089-.17 1.089-.695 0-1.355-4.316-.845-4.316-3.988 0-2.01 1.535-3.213 3.838-3.213.941 0 1.881.144 2.822.519v2.675c-.864-.467-1.961-.731-2.824-.731-.595 0-.965.172-.965.615 0 1.278 4.341.67 4.341 4.056z"
        fill="#424770"
        opacity=".502"
        fillRule="evenodd"
      />
    </svg>
  </Box>
)

const MoneyBackIcon = ({ h, w }) => (
  <svg
    width={w}
    height={h}
    viewBox="0 0 32 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      d="M31.9367 17.4351L26.235 21.6517L25.4467 14.6117L27.5367 15.5284C27.6158 15.0126 27.6587 14.4919 27.665 13.9701C27.6727 11.7984 27.0738 9.66779 25.9357 7.81823C24.7977 5.96867 23.1657 4.47369 21.2237 3.50173C19.2817 2.52978 17.1068 2.11948 14.9442 2.31707C12.7815 2.51466 10.717 3.31228 8.98333 4.62007L7.60833 2.78673C10.0157 0.969491 12.9521 -0.00928505 15.9683 6.63909e-05C19.6719 0.0049172 23.2224 1.47831 25.8413 4.09714C28.4601 6.71598 29.9335 10.2665 29.9383 13.9701C29.9325 14.8066 29.8528 15.6409 29.7 16.4634L31.9367 17.4351ZM15.9683 25.6667C12.8662 25.6667 9.89109 24.4344 7.69754 22.2409C5.50399 20.0473 4.27167 17.0722 4.27167 13.9701C4.27797 13.4483 4.32086 12.9275 4.4 12.4117L6.49 13.3284L5.70167 6.2884L0 10.5051L2.23667 11.4767C2.08388 12.2992 2.00413 13.1336 1.99833 13.9701C2.00318 17.6737 3.47658 21.2242 6.09541 23.843C8.71424 26.4618 12.2647 27.9352 15.9683 27.9401C18.9846 27.9494 21.9209 26.9706 24.3283 25.1534L22.9533 23.3201C20.9418 24.8403 18.4898 25.6641 15.9683 25.6667Z"
      fill="black"
    />
    <rect x="8" y="6" width="16" height="16" fill="url(#pattern0)" />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0" transform="scale(0.00195312)" />
      </pattern>
      <image
        id="image0"
        width="512"
        height="512"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
)

const ChatIconContainer = styled.svg<{
  height: string | number
  width: string | number
}>`
  height: ${props => props.height};
  width: ${props => props.width};
`

const ChatIcon = ({ h, w }) => (
  <ChatIconContainer height={h} width={w}>
    <svg
      width="39"
      height="40"
      viewBox="0 0 39 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.0976 12.093H22.8881V4.56965C22.8881 3.34272 22.4262 2.19449 21.5908 1.34024C20.7541 0.475913 19.6438 0 18.4641 0H4.42406C1.98473 0 0 2.05033 0 4.57028V14.2396C0 16.7596 1.98473 18.8099 4.42406 18.8099H4.68V21.4916C4.68 22.3742 5.19005 23.158 5.97858 23.4878C6.23269 23.5936 6.49655 23.6452 6.75797 23.6452C7.30397 23.6452 7.83595 23.4217 8.22534 23.0044L11.1979 19.9506V28.9356C11.1979 31.8472 13.491 34.216 16.3093 34.216H23.7382L28.6638 39.2767C29.1068 39.7488 29.7009 40 30.3085 40C30.5985 40 30.891 39.9427 31.1714 39.8256C32.047 39.4599 32.6119 38.5886 32.6119 37.6078V34.216H33.097C35.9153 34.216 38.2084 31.8472 38.2084 28.9356V17.3734C38.209 14.4618 35.916 12.093 33.0976 12.093ZM11.2021 17.2833L6.92372 21.678C6.84937 21.7579 6.76223 21.7787 6.66412 21.7365C6.59283 21.7069 6.50812 21.6402 6.50812 21.491V17.865C6.50812 17.3431 6.09923 16.9207 5.59406 16.9207H4.42406C2.99264 16.9207 1.82812 15.7177 1.82812 14.239V4.56965C1.82812 3.09092 2.99264 1.88792 4.42406 1.88792H18.4641C19.1551 1.88792 19.8065 2.16742 20.3013 2.67859C20.7907 3.17905 21.06 3.85074 21.06 4.56965V12.093H16.3093C14.9467 12.093 13.664 12.6432 12.6969 13.6416C11.7512 14.6186 11.2247 15.9091 11.2021 17.2833ZM36.3809 28.935C36.3809 30.8053 34.908 32.3268 33.0976 32.3268H31.6985C31.1939 32.3268 30.7844 32.7499 30.7844 33.2711V37.6072C30.7844 37.9163 30.5754 38.0378 30.4858 38.0749C30.3987 38.1108 30.1744 38.1725 29.9654 37.9497L24.7607 32.6019C24.5895 32.4263 24.3579 32.3268 24.116 32.3268H16.3093C14.4989 32.3268 13.026 30.8053 13.026 28.935V17.3734C13.026 16.4694 13.3685 15.6189 13.9894 14.9774C14.611 14.3353 15.4349 13.9815 16.3093 13.9815H33.0976C34.908 13.9815 36.3809 15.5031 36.3809 17.3734V28.935Z"
        fill="black"
      />
      <path
        d="M19.0448 21.7762C18.3014 21.7762 17.6963 22.4019 17.6963 23.1693C17.6963 23.9367 18.302 24.5624 19.0448 24.5624C19.7889 24.5624 20.3946 23.9367 20.3946 23.1693C20.3946 22.4019 19.7889 21.7762 19.0448 21.7762Z"
        fill="black"
      />
      <path
        d="M24.7026 21.7762C23.9591 21.7762 23.354 22.4019 23.354 23.1693C23.354 23.9367 23.9597 24.5624 24.7026 24.5624C25.4466 24.5624 26.0523 23.9367 26.0523 23.1693C26.0523 22.4019 25.4472 21.7762 24.7026 21.7762Z"
        fill="black"
      />
      <path
        d="M30.3612 21.7762C29.6178 21.7762 29.0127 22.4019 29.0127 23.1693C29.0127 23.9367 29.6184 24.5624 30.3612 24.5624C31.1053 24.5624 31.711 23.9367 31.711 23.1693C31.711 22.4019 31.1053 21.7762 30.3612 21.7762Z"
        fill="black"
      />
    </svg>
  </ChatIconContainer>
)
