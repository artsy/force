import React from "react"
import {
  GridColumns,
  Text,
  Flex,
  Image,
  LockIcon,
  VerifiedIcon,
  CertificateIcon,
  ReloadIcon,
  ArrowRightIcon,
  MessageIcon,
  Button,
  color,
  space,
  Column,
} from "@artsy/palette"
import styled from "styled-components"
import { graphql, createFragmentContainer } from "react-relay"
import { BuyerGuaranteeIndex_headerImage } from "v2/__generated__/BuyerGuaranteeIndex_headerImage.graphql"
import { BuyerGuaranteeIndex_moneyBackGuaranteeImage } from "v2/__generated__/BuyerGuaranteeIndex_moneyBackGuaranteeImage.graphql"
import { BuyerGuaranteeIndex_securePaymentImage } from "v2/__generated__/BuyerGuaranteeIndex_securePaymentImage.graphql"
import { BuyerGuaranteeIndex_authenticityImage } from "v2/__generated__/BuyerGuaranteeIndex_authenticityImage.graphql"
import { useSystemContext } from "v2/Artsy"
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
  console.log(
    "🚀 ~ file: BuyerGuaranteeIndex.tsx ~ line 14 ~ buyerGuarantee",
    authenticityImage
  )
  const { user } = useSystemContext()
  const isAdmin = Boolean(user?.roles?.includes("admin"))
  // const image = buyerGuarantee
  if (!isAdmin) {
    return null
  }

  // const secondRowContent = [
  //   {
  //     icon: <VerifiedIcon />,
  //     title: "Vetted Sellers",
  //     text:
  //       "We partner with leading galleries, institutions, and auction houses around the world in order to maintain the integrity of our listings",
  //   },
  //   {
  //     icon: <WeChatIcon />, //TODO: Replace with correct asset
  //     title: "Dedicated Support",
  //     text:
  //       "Our global team of specialists is always here to answer your questions and assist with any purchase-related needs.",
  //   },
  // ]

  const thirdRowContent = [
    {
      icon: <CertificateIcon />,
      title: "Authenticity Guarantee",
      text:
        "In the rare occasion that your artwork is found to be inauthentic, we'll help facilitate a refund.",
    },
    {
      icon: <ReloadIcon />,
      title: "Money-Back Guarantee",
      text:
        "If an item arrives not as described, we’ll work with you to make it right.",
    },
    {
      icon: <LockIcon />,
      title: "Secure Paymment",
      text:
        "Payments made through our secure checkout are protected with trusted, industry-leading technology.",
    },
  ]
  return (
    <>
      <Flex justifyContent="center" flexDirection="column">
        <Image
          src={headerImage.image.resized.url}
          alt={headerImage.artist.name}
          lazyLoad
          width="100%"
          height={250}
        />
        <Text
          variant="largeTitle"
          color={color("white100")}
          style={{
            position: "absolute",
            left: "40%",
          }}
        >
          The Artsy Guarantee
        </Text>
      </Flex>
      <Flex justifyContent="center" flexDirection="column">
        <Flex justifyContent="center" mx="30%" textAlign="center">
          <Text variant="subtitle" mt={4}>
            Artsy is the safest place to buy the art you love. Every purchase is
            made exclusively through Artsy's secure checkout benefits from our
            full suite of buyer protections.
          </Text>
        </Flex>
        <Flex justifyContent="center" mt={4} mx="30%">
          <Flex flexDirection="column" mr={5} width="300%">
            <VerifiedIcon />
            <Text variant="mediumText">Vetted Sellers</Text>
            <Text variant="text">
              We partner with leading galleries, institutions, and auction
              houses around the world in order to maintain the integrity of our
              listings
            </Text>
          </Flex>
          <Flex flexDirection="column" ml={5} width="300%">
            <MessageIcon />
            <Text variant="mediumText">Dedicated Support</Text>
            <Text variant="text">
              Our global team of specialists is always here to answer your
              questions and assist with any purchase-related needs.
            </Text>
          </Flex>
        </Flex>
        <Flex mt={3}>
          {thirdRowContent.map(content => (
            <Flex flexDirection="column" mx={4} width="30%">
              {content.icon}
              <Text variant="mediumText">{content.title}</Text>
              <Text variant="text">{content.text}</Text>
              <Flex>
                <Text variant="mediumText">Learn More</Text>
                <ArrowRightIcon />
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Flex justifyContent="space-evenly">
        <Image
          src={authenticityImage.image.resized.url}
          alt={authenticityImage.artist.name}
          lazyLoad
          width="100%"
          height={250}
        />
        <Flex flexDirection="column">
          <Text width="50%" variant="title">
            Authenticity Guarantee
          </Text>
          <Text width="50%" variant="text">
            We are dedicated to being the world’s most trustworthy marketplace
            to buy and sell art. In the rare case that a work purchased through
            Artsy’s secure checkout is found to be inauthentic, report the issue
            within 180 days from delivery arrival / from purchase date and we’ll
            help facilitate a refund for the sale.
          </Text>
          <Button variant="secondaryOutline">Learn More</Button>
        </Flex>
      </Flex>
      <Flex justifyContent="space-evenly">
        <Flex flexDirection="column">
          <Text width="50%" variant="title">
            Money-Back Guarantee
          </Text>
          <Text width="50%" variant="text">
            If a work purchased through Artsy’s secure checkout does not arrive,
            arrives damaged, or is deemed not as described, we will work with
            you to find the best resolution—including a refund.
          </Text>
          <Button variant="secondaryOutline">Learn More</Button>
        </Flex>
        <Image
          src={moneyBackGuaranteeImage.image.resized.url}
          alt={moneyBackGuaranteeImage.artist.name}
          lazyLoad
          width="100%"
          height={250}
        />
      </Flex>
      <Flex justifyContent="space-evenly">
        <Image
          src={securePaymentImage.image.resized.url}
          alt={securePaymentImage.artist.name}
          lazyLoad
          width="100%"
          height={250}
        />
        <Flex flexDirection="column">
          <Text width="50%" variant="title">
            Secure Payment
          </Text>
          <Text width="50%" variant="text">
            Purchases completed through our secure checkout are powered by
            Stripe, the leader in online payment processing that’s trusted by
            millions of global businesses.
          </Text>
          <PoweredByStripeIcon />
        </Flex>
      </Flex>
      <Flex>
        <Text variant="title">The Artsy Guarantee </Text>
        <Button variant="secondaryOutline">Learn More</Button>
      </Flex>
      <Flex p={space(18)}>
        <GridColumns>
          <Column span={2} mr={-2}>
            <Text
              height={50}
              borderBottom={`solid 1px ${color("black100")}`}
              borderRight={`solid 1px ${color("black100")}`}
            >
              {"    "}
            </Text>
          </Column>
          <Column span={2} borderTop="none" borderX="none" mr={-2}>
            <Text
              height={25}
              variant="mediumText"
              textAlign="center"
              style={{
                marginRight: "-1px",
              }}
              borderRight={`solid 1px ${color("black100")}`}
            >
              Vetted
            </Text>
            <Text
              height={25}
              variant="mediumText"
              textAlign="center"
              borderBottom={`solid 1px ${color("black100")}`}
            >
              Sellers
            </Text>
          </Column>
          <Column span={2} mr={-2}>
            <Text
              height={25}
              variant="mediumText"
              textAlign="center"
              style={{
                marginRight: "0.5px",
              }}
              borderRight={`solid 1px ${color("black100")}`}
            >
              Dedicated
            </Text>
            <Text
              height={25}
              border={`solid 1px ${color("black100")}`}
              borderTop="none"
              variant="mediumText"
              textAlign="center"
            >
              Support
            </Text>
          </Column>
          <Column span={2} mr={-2}>
            <Text
              height={50}
              borderBottom={`solid 1px ${color("black100")}`}
              variant="mediumText"
              textAlign="center"
            >
              Authenticity Guarantee
            </Text>
          </Column>
          <Column span={2} mr={-2}>
            <Text
              height={50}
              border={`solid 1px ${color("black100")}`}
              borderTop="none"
              variant="mediumText"
              textAlign="center"
            >
              Money-Back Guarantee
            </Text>
          </Column>
          <Column span={2}>
            <Text height={25} variant="mediumText" textAlign="center">
              Secure
            </Text>
            <Text
              height={25}
              borderBottom={`solid 1px ${color("black100")}`}
              variant="mediumText"
              textAlign="center"
            >
              Payment
            </Text>
          </Column>
          <Column span={2} mt={-2} mr={-2}>
            <Text
              height={100}
              borderX={`solid 1px ${color("black100")}`}
              borderLeft="none"
              variant="mediumText"
              textAlign="center"
              paddingY="30%"
            >
              Making an Inquiry{" "}
            </Text>
          </Column>
          <Column span={2} mt={-2} mr={-2}>
            <Flex height={100} justifyContent="center" alignItems="center">
              <VerifiedIcon width="30%" height="30%" />
            </Flex>
          </Column>
          <Column span={2} mt={-2} mr={-2}>
            <Flex
              height={100}
              justifyContent="center"
              alignItems="center"
              border={`solid 1px ${color("black100")}`}
              borderY="none"
            >
              <VerifiedIcon width="30%" height="30%" />
            </Flex>
          </Column>
          <Column span={2} mt={-2} mr={-2}>
            <Text height={100}>{"    "}</Text>
          </Column>
          <Column span={2} mt={-2} mr={-2}>
            <Text
              height={100}
              border={`solid 1px ${color("black100")}`}
              borderY="none"
            >
              {"    "}
            </Text>
          </Column>
          <Column span={2} mt={-2}>
            <Text height={100} border="none">
              {"    "}
            </Text>
          </Column>
          <Column span={2} mt={-2} mr={-2}>
            <Text
              height={100}
              borderTop={`solid 1px ${color("black100")}`}
              borderRight={`solid 1px ${color("black100")}`}
              variant="mediumText"
              textAlign="center"
              paddingY="10%"
            >
              Purchasing through Artsy’s secure checkout{" "}
            </Text>
          </Column>
          <Column span={2} mt={-2} mr={-2}>
            <Flex
              height={100}
              justifyContent="center"
              alignItems="center"
              borderTop={`solid 1px ${color("black100")}`}
            >
              <VerifiedIcon width="30%" height="30%" />
            </Flex>
          </Column>
          <Column span={2} mt={-2} mr={-2}>
            <Flex
              height={100}
              justifyContent="center"
              alignItems="center"
              border={`solid 1px ${color("black100")}`}
              borderBottom="none"
            >
              <VerifiedIcon width="30%" height="30%" />
            </Flex>
          </Column>
          <Column span={2} mt={-2} mr={-2}>
            <Flex
              height={100}
              justifyContent="center"
              alignItems="center"
              borderTop={`solid 1px ${color("black100")}`}
            >
              <VerifiedIcon width="30%" height="30%" />
            </Flex>
          </Column>
          <Column span={2} mt={-2} mr={-2}>
            <Flex
              height={100}
              justifyContent="center"
              alignItems="center"
              border={`solid 1px ${color("black100")}`}
              borderBottom="none"
            >
              <VerifiedIcon width="30%" height="30%" />
            </Flex>
          </Column>
          <Column span={2} mt={-2}>
            <Flex
              height={100}
              justifyContent="center"
              alignItems="center"
              borderTop={`solid 1px ${color("black100")}`}
            >
              <VerifiedIcon width="30%" height="30%" />
            </Flex>
          </Column>
        </GridColumns>
      </Flex>
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
          resized(version: "larger") {
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
          resized(version: "larger") {
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
          resized(version: "larger") {
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
          resized(version: "larger") {
            url
          }
        }
      }
    `,
  }
)
