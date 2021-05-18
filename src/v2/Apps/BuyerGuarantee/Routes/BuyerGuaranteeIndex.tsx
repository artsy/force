import React from "react"
import {
  ArrowRightIcon,
  Box,
  Button,
  CertificateIcon,
  CheckIcon,
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
import { resize } from "v2/Utils/resizer"
import { FullBleedHeader } from "v2/Components/FullBleedHeader"
import {
  ChatIcon,
  MoneyBackIcon,
  PoweredByStripeIcon,
} from "../Components/Icons"

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
              <ChatIcon height={50} width={50} />
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
              <MoneyBackIcon height={50} width={50} />
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
              <ChatIcon height={60} width={60} />
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
                <MoneyBackIcon height={60} width={60} />
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
            <PoweredByStripeIcon width={200} mt={"-10px"} ml={"-25px"} />
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
          <PoweredByStripeIcon width={200} ml={"-30px"} mt={0} />
        </Flex>
      </Media>
      {/*  Artsy Guarantee Grid block mobile */}
      <Media lessThan="sm">
        <Box backgroundColor={color("black5")} mx="-20px">
          <Flex
            justifyContent="center"
            py={4}
            mb="-20px"
            backgroundColor={color("black5")}
          >
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
              <CheckIcon width="40px" height="40px" />
            </Flex>
            <Flex
              justifyContent="space-around"
              alignItems="center"
              height="60px"
              borderBottom={`solid 1px ${color("black10")}`}
              backgroundColor={color("white100")}
            >
              <CheckIcon width="40px" height="40px" />
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
              <CheckIcon width="40px" height="40px" />
            </Flex>
            <Flex
              justifyContent="space-around"
              alignItems="center"
              height="60px"
              borderBottom={`solid 1px ${color("black10")}`}
              backgroundColor={color("white100")}
            >
              <CheckIcon width="40px" height="40px" />
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
              <CheckIcon width="40px" height="40px" />
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
              <CheckIcon width="40px" height="40px" />
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
              <CheckIcon width="40px" height="40px" />
            </Flex>
          </CSSGrid>
          <Flex backgroundColor={color("black5")} p={4} justifyContent="center">
            {learnMoreButton("100%")}
          </Flex>
        </Box>
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
            <CheckIcon width="40px" height="40px" />
          </Flex>

          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            borderBottom={`solid 1px ${color("black100")}`}
            borderRight={`solid 1px ${color("black100")}`}
          >
            <CheckIcon width="40px" height="40px" />
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
            <CheckIcon width="40px" height="40px" />
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            backgroundColor={color("white100")}
          >
            <CheckIcon width="40px" height="40px" />
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
            <CheckIcon width="40px" height="40px" />
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            borderRight={`solid 1px ${color("black100")}`}
            backgroundColor={color("white100")}
          >
            <CheckIcon width="40px" height="40px" />
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="91px"
            backgroundColor={color("white100")}
          >
            <CheckIcon width="40px" height="40px" />
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
