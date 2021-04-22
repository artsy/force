import React from "react"
import {
  Box,
  Text,
  Flex,
  Image,
  LockIcon,
  VerifiedIcon,
  CertificateIcon,
  MoneyFillIcon,
  ArrowRightIcon,
  WeChatIcon,
} from "@artsy/palette"
import { graphql, createFragmentContainer } from "react-relay"
import { BuyerGuaranteeIndex_headerImage } from "v2/__generated__/BuyerGuaranteeIndex_headerImage.graphql"
import { BuyerGuaranteeIndex_authenticityImage } from "v2/__generated__/BuyerGuaranteeIndex_authenticityImage.graphql"
import { useSystemContext } from "v2/Artsy"

interface BuyerGuaranteeIndexProps {
  headerImage: BuyerGuaranteeIndex_headerImage
  authenticityImage: BuyerGuaranteeIndex_authenticityImage
}

export const BuyerGuaranteeIndex: React.FC<BuyerGuaranteeIndexProps> = ({
  headerImage,
  authenticityImage,
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

  const secondRowContent = [
    {
      icon: <VerifiedIcon />,
      title: "Vetted Sellers",
      text:
        "We partner with leading galleries, institutions, and auction houses around the world in order to maintain the integrity of our listings",
    },
    {
      icon: <WeChatIcon />, //TODO: Replace with correct asset
      title: "Dedicated Support",
      text:
        "Our global team of specialists is always here to answer your questions and assist with any purchase-related needs.",
    },
  ]

  const thirdRowContent = [
    {
      icon: <CertificateIcon />,
      title: "Authenticity Guarantee",
      text:
        "In the rare occasion that your artwork is found to be inauthentic, we'll help facilitate a refund.",
    },
    {
      icon: <MoneyFillIcon />, //TODO: Replace with correct asset
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
      <Box>
        <Image
          src={headerImage.image.resized.url}
          alt={headerImage.artist.name}
          lazyLoad
          width="100%"
          height={250}
        />
      </Box>
      <Flex justifyContent="center" flexDirection="column">
        <Flex justifyContent="center">
          <Text variant="subtitle">
            Artsy is the safest place to buy the art you love. Every purchase is
            made exclusively through Arts's secure checkout benefits from our
            full suite of buyer protections.
          </Text>
        </Flex>
        <Flex>
          {secondRowContent.map(content => (
            <Flex flexDirection="column">
              {content.icon}
              <Text variant="mediumText">{content.title}</Text>
              <Text variant="text">{content.text}</Text>
            </Flex>
          ))}
        </Flex>
        <Flex>
          {thirdRowContent.map(content => (
            <Flex flexDirection="column">
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
  }
)
