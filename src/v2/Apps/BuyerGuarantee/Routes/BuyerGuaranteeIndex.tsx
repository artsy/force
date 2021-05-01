import { FullBleed } from "v2/Components/FullBleed"
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
  LockIcon,
  MessageIcon,
  ReloadIcon,
  space,
  Text,
  VerifiedIcon,
} from "@artsy/palette"
import { graphql, createFragmentContainer } from "react-relay"
import { BuyerGuaranteeIndex_headerImage } from "v2/__generated__/BuyerGuaranteeIndex_headerImage.graphql"
import { BuyerGuaranteeIndex_moneyBackGuaranteeImage } from "v2/__generated__/BuyerGuaranteeIndex_moneyBackGuaranteeImage.graphql"
import { BuyerGuaranteeIndex_securePaymentImage } from "v2/__generated__/BuyerGuaranteeIndex_securePaymentImage.graphql"
import { BuyerGuaranteeIndex_authenticityImage } from "v2/__generated__/BuyerGuaranteeIndex_authenticityImage.graphql"
import { useSystemContext } from "v2/Artsy"
import { Media } from "@artsy/reaction/dist/Utils/Responsive"
import PoweredByStripeIcon from "../../../../desktop/components/main_layout/public/icons/PoweredbyStripe-black.svg"

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
      <Text variant="mediumText" mt="-2px">
        Learn More
      </Text>
      <ArrowRightIcon height="15px" width="15px" />
    </Flex>
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
        <Flex mt={[2, 3]} flexWrap={["wrap", "nowrap"]}>
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
            <Text variant="mediumText">Authenticity Guarantee</Text>
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
            <Text variant="mediumText"> Money-Back Guarantee</Text>
            <Media greaterThan="xs">
              <Text variant="text">
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
            <Text variant="mediumText">Secure Payment</Text>
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
          <Button width="50%" variant="secondaryOutline">
            Learn More
          </Button>
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
            <Button width="40%" variant="secondaryOutline">
              Learn More
            </Button>
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
          <Button width="50%" variant="secondaryOutline">
            Learn More
          </Button>
        </Flex>
      </Media>
      <Media greaterThanOrEqual="sm">
        <Flex justifyContent="space-evenly">
          <Flex flexDirection="column" p={space(9)}>
            <Text variant="title">Money-Back Guarantee</Text>
            <Text variant="text" my={2}>
              {moneyBackGuaranteeText}
            </Text>
            <Button width="40%" variant="secondaryOutline">
              Learn More
            </Button>
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
          <PoweredByStripeIcon width="50%" />
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
            <PoweredByStripeIcon width="40%" />
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
          >
            Purchasing with Artsy’s secure checkout
          </Text>
          <Text
            py={2}
            style={{ outline: `solid 1px ${color("black10")}` }}
            textAlign="center"
            height="90px"
            variant="mediumText"
          >
            Vetted Sellers
          </Text>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="61px"
            border={`solid 1px ${color("black10")}`}
            borderTop="none"
          >
            <VerifiedIcon width="40px" height="40px" />
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            height="61px"
            borderBottom={`solid 1px ${color("black10")}`}
          >
            <VerifiedIcon width="40px" height="40px" />
          </Flex>
          <Flex
            alignItems="center"
            style={{ outline: `solid 1px ${color("black10")}` }}
            height="90px"
            py={2}
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
          >
            <VerifiedIcon width="40px" height="40px" />
          </Flex>
          <Flex
            alignItems="center"
            style={{ outline: `solid 1px ${color("black10")}` }}
            height="90px"
            py={2}
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
          >
            <VerifiedIcon width="40px" height="40px" />
          </Flex>
          <Flex
            alignItems="center"
            style={{ outline: `solid 1px ${color("black10")}` }}
            height="90px"
            py={2}
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
          >
            <VerifiedIcon width="40px" height="40px" />
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="center"
            style={{ outline: `solid 1px ${color("black10")}` }}
            height="90px"
            py={2}
            flexDirection="column"
          >
            <Text variant="mediumText">Secure</Text>
            <Text variant="mediumText">Payment</Text>
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
          >
            <VerifiedIcon width="40px" height="40px" />
          </Flex>
        </CSSGrid>
        <Flex backgroundColor={color("black5")} p={4} justifyContent="center">
          <Button width="100%" variant="secondaryOutline">
            Learn More
          </Button>
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
          <Button width="25%" variant="secondaryOutline">
            Learn More
          </Button>
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
