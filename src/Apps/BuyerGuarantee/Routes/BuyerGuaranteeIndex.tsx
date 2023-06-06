import { FC } from "react"
import {
  Button,
  Column,
  Flex,
  FullBleed,
  GridColumns,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import {
  FullBleedHeader,
  FullBleedHeaderOverlay,
} from "Components/FullBleedHeader/FullBleedHeader"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { MetaTags } from "Components/MetaTags"
import { cropped } from "Utils/resized"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import {
  BuyerGuaranteeTableDesktop,
  BuyerGuaranteeTableMobile,
} from "Apps/BuyerGuarantee/Components/BuyerGuaranteeTables"
import { Media } from "Utils/Responsive"
import { Jump, useJump } from "Utils/Hooks/useJump"
import LockIcon from "@artsy/icons/LockIcon"
import VerifiedIcon from "@artsy/icons/VerifiedIcon"
import CertificateIcon from "@artsy/icons/CertificateIcon"
import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import MoneyBackIcon from "@artsy/icons/MoneyBackIcon"
import MessageIcon from "@artsy/icons/MessageIcon"

const SUPPORT_ARTICLE_URL =
  "https://support.artsy.net/s/article/The-Artsy-Guarantee"

export const BuyerGuaranteeIndex: FC = () => {
  const { jumpTo } = useJump({ behavior: "smooth" })

  return (
    <>
      <MetaTags
        title="The Artsy Guarantee - Authenticity and Secure Payment"
        description="Artsy is the safest place to buy the art you love. Every purchase made exclusively with Artsy’s secure checkout benefits from our full suite of buyer protections."
        pathname="buyer-guarantee"
        imageURL="https://files.artsy.net/images/normalizedheaderimage.jpeg"
      />

      <FullBleedHeader
        src="https://files.artsy.net/images/normalizedheaderimage.jpeg"
        caption="Sophie Treppendahl, Swimming Hole, 2019. Courtesy of the artist and Kenise Barnes Fine Art."
      >
        <FullBleedHeaderOverlay
          alignItems="center"
          justifyContent={["center", "flex-start"]}
          p={4}
        >
          <Text
            variant={["xl", "xxl"]}
            as="h1"
            color="white100"
            textAlign={["center", "left"]}
          >
            The Artsy Guarantee
          </Text>
        </FullBleedHeaderOverlay>
      </FullBleedHeader>

      <Spacer y={6} />

      <GridColumns gridRowGap={4}>
        <Column span={6} start={4} textAlign="center">
          <Text variant="lg-display">
            Artsy is the safest place to buy the art you love.
          </Text>

          <Spacer y={1} />

          <Text variant="lg-display">
            Every purchase made exclusively with Artsy’s secure checkout
            benefits from our full suite of buyer protections.
          </Text>
        </Column>

        <Column span={4} start={3} textAlign="center">
          <VerifiedIcon width={60} height={60} mx="auto" />

          <Text variant="sm-display" fontWeight="bold" mt={2}>
            Vetted Sellers
          </Text>

          <Text variant="sm" mt={2}>
            We partner with leading galleries, institutions, and auction houses
            around the world in order to maintain the integrity of our listings.
          </Text>
        </Column>

        <Column span={4} textAlign="center" wrap>
          <MessageIcon width={60} height={60} mx="auto" />

          <Text variant="sm-display" fontWeight="bold" mt={2}>
            Dedicated Support
          </Text>

          <Text variant="sm" mt={2}>
            Our global team of specialists is always here to answer your
            questions and assist with any purchase-related needs.
          </Text>
        </Column>

        <Column span={4} textAlign="center">
          <CertificateIcon width={60} height={60} mx="auto" />

          <Text variant="sm-display" fontWeight="bold" mt={2}>
            Authenticity Guarantee
          </Text>

          <Text variant="sm" mt={2}>
            In the rare occasion that your artwork is found to be inauthentic,
            we'll help facilitate a refund.
          </Text>

          <Button
            mt={2}
            variant="tertiary"
            onClick={() => {
              jumpTo("authenticityGuarantee")
            }}
          >
            Learn More
            <ChevronRightIcon
              ml={0.5}
              width={12}
              height={12}
              fill="currentColor"
            />
          </Button>
        </Column>

        <Column span={4} textAlign="center">
          <MoneyBackIcon width={60} height={60} mx="auto" />

          <Text variant="sm-display" fontWeight="bold" mt={2}>
            Money-Back Guarantee
          </Text>

          <Text variant="sm" mt={2}>
            Our global team of specialists is always here to answer your
            questions and assist with any purchase-related needs.
          </Text>

          <Button
            mt={2}
            variant="tertiary"
            onClick={() => {
              jumpTo("moneyBackGuarantee")
            }}
          >
            Learn More
            <ChevronRightIcon
              ml={0.5}
              width={12}
              height={12}
              fill="currentColor"
            />
          </Button>
        </Column>

        <Column span={4} textAlign="center">
          <LockIcon width={60} height={60} mx="auto" />

          <Text variant="sm-display" fontWeight="bold" mt={2}>
            Secure Payment
          </Text>

          <Text variant="sm" mt={2}>
            Payments made with our secure checkout are protected with trusted
            industry-leading technology.
          </Text>

          <Button
            mt={2}
            variant="tertiary"
            onClick={() => {
              jumpTo("securePayment")
            }}
          >
            Learn More
            <ChevronRightIcon
              ml={0.5}
              width={12}
              height={12}
              fill="currentColor"
            />
          </Button>
        </Column>
      </GridColumns>

      <Spacer y={12} />

      <GridColumns gridRowGap={4}>
        <Column span={6} order={1}>
          <Jump id="authenticityGuarantee" />

          <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
            <Image
              {...cropped(
                "https://files.artsy.net/authenticityguaranteeartwork.jpg",
                { width: 900, height: 675 }
              )}
              alt="Paul Wackers, Constructing Planets, 2018"
              width="100%"
              height="100%"
              lazyLoad
            />
          </ResponsiveBox>
        </Column>

        <Column span={6} pt={[0, 6]} order={2}>
          <Text variant="lg-display">Authenticity Guarantee</Text>

          <Text variant="sm" mt={2}>
            We are dedicated to being the world’s most trustworthy marketplace
            to buy and sell art. In the rare case that a work purchased through
            Artsy’s secure checkout is found to be inauthentic, report the issue
            within 180 days from delivery arrival and we’ll help facilitate a
            refund for the sale.
          </Text>

          <Button
            mt={2}
            variant="secondaryBlack"
            // @ts-ignore
            as="a"
            href={SUPPORT_ARTICLE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </Button>
        </Column>

        <Column span={6} pt={[0, 6]} order={[4, 3]}>
          <Text variant="lg-display">Money-Back Guarantee</Text>

          <Text variant="sm" mt={2}>
            If a work purchased through Artsy’s secure checkout does not arrive,
            arrives damaged, or is deemed not as described, we'll work with you
            to find the best resolution—including a full refund where
            applicable.
          </Text>

          <Button
            mt={2}
            variant="secondaryBlack"
            // @ts-ignore
            as="a"
            href={SUPPORT_ARTICLE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </Button>
        </Column>

        <Column span={6} order={[3, 4]}>
          <Jump id="moneyBackGuarantee" />

          <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
            <Image
              {...cropped(
                "https://files.artsy.net/moneybackguaranteeartwork.jpg",
                { width: 900, height: 675 }
              )}
              alt="Alex Katz, Blue Umbrella 2, 2020"
              width="100%"
              height="100%"
              lazyLoad
            />
          </ResponsiveBox>
        </Column>

        <Column span={6} order={5}>
          <Jump id="securePayment" />

          <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
            <Image
              {...cropped("https://files.artsy.net/securepaymentartwork.jpg", {
                width: 900,
                height: 675,
              })}
              alt="Louise Belcourt, Mound #26, 2014–15"
              width="100%"
              height="100%"
              lazyLoad
            />
          </ResponsiveBox>
        </Column>

        <Column span={6} pt={[0, 6]} order={6}>
          <Text variant="lg-display">Secure Payment</Text>

          <Text variant="sm" mt={2}>
            Purchases completed through our secure checkout are powered by
            Stripe, the leader in online payment processing that’s trusted by
            millions of global businesses.
          </Text>

          <Spacer y={2} />

          <img
            src="https://files.artsy.net/images/PoweredByStripe_1.svg"
            alt="Powered by Stripe"
            width={150}
            height={34}
            loading="lazy"
          />
        </Column>
      </GridColumns>

      <Spacer y={12} />

      <FullBleed bg="black5">
        <AppContainer>
          <HorizontalPadding py={4}>
            <Text variant="xl" textAlign="center">
              The Artsy Guarantee
            </Text>

            <Spacer y={4} />

            <Media greaterThanOrEqual="sm">
              <BuyerGuaranteeTableDesktop />
            </Media>

            <Media lessThan="sm">
              <BuyerGuaranteeTableMobile />
            </Media>

            <Spacer y={4} />

            <Flex justifyContent="center">
              <Button
                // @ts-ignore
                as="a"
                href={SUPPORT_ARTICLE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </Button>
            </Flex>
          </HorizontalPadding>
        </AppContainer>
      </FullBleed>
    </>
  )
}
