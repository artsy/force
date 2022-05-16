import { FC } from "react"
import {
  Button,
  CertificateIcon,
  ChevronIcon,
  Column,
  Flex,
  FullBleed,
  GridColumns,
  Image,
  LockIcon,
  ResponsiveBox,
  Spacer,
  Text,
  VerifiedIcon,
} from "@artsy/palette"
import { FullBleedHeader } from "v2/Components/FullBleedHeader"
import {
  ChatIcon,
  MoneyBackIcon,
  PoweredByStripeIcon,
} from "../Components/BuyerGuaranteeIcons"
import { __internal__useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import { MetaTags } from "v2/Components/MetaTags"
import { cropped } from "v2/Utils/resized"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import {
  BuyerGuaranteeTableDesktop,
  BuyerGuaranteeTableMobile,
} from "../Components/BuyerGuaranteeTables"
import { Media } from "v2/Utils/Responsive"
import { useScrollTo } from "v2/Utils/Hooks/useScrollTo"

const SUPPORT_ARTICLE_URL =
  "https://support.artsy.net/hc/en-us/articles/360048946973"

export const BuyerGuaranteeIndex: FC = () => {
  const { scrollTo } = useScrollTo({ behavior: "smooth", offset: 10 })

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
        <Text
          variant="xxl"
          color="white100"
          as="h1"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
        >
          The Artsy Guarantee
        </Text>
      </FullBleedHeader>

      <Spacer mt={6} />

      <GridColumns gridRowGap={4}>
        <Column span={6} start={4} textAlign="center">
          <Text variant="lg-display">
            Artsy is the safest place to buy the art you love.
            <br />
            Every purchase made exclusively with Artsy’s secure checkout
            benefits from our full suite of buyer protections.
          </Text>
        </Column>

        <Column span={4} start={3} textAlign="center">
          <VerifiedIcon width={60} height={60} />

          <Text variant="sm-display" fontWeight="bold" mt={2}>
            Vetted Sellers
          </Text>

          <Text variant="sm" mt={2}>
            We partner with leading galleries, institutions, and auction houses
            around the world in order to maintain the integrity of our listings.
          </Text>
        </Column>

        <Column span={4} textAlign="center" wrap>
          <ChatIcon width={60} height={60} />

          <Text variant="sm-display" fontWeight="bold" mt={2}>
            Dedicated Support
          </Text>

          <Text variant="sm" mt={2}>
            Our global team of specialists is always here to answer your
            questions and assist with any purchase-related needs.
          </Text>
        </Column>

        <Column span={4} textAlign="center">
          <CertificateIcon width={60} height={60} />

          <Text variant="sm-display" fontWeight="bold" mt={2}>
            Authenticity Guarantee
          </Text>

          <Text variant="sm" mt={2}>
            In the rare occasion that your artwork is found to be inauthentic,
            we'll help facilitate a refund.
          </Text>

          <Button
            mt={2}
            variant="noOutline"
            onClick={() => {
              scrollTo("#jump--authenticityGuarantee")
            }}
          >
            Learn More
            <ChevronIcon ml={0.5} width={12} height={12} fill="currentColor" />
          </Button>
        </Column>

        <Column span={4} textAlign="center">
          <MoneyBackIcon width={60} height={60} />

          <Text variant="sm-display" fontWeight="bold" mt={2}>
            Money-Back Guarantee
          </Text>

          <Text variant="sm" mt={2}>
            Our global team of specialists is always here to answer your
            questions and assist with any purchase-related needs.
          </Text>

          <Button
            mt={2}
            variant="noOutline"
            onClick={() => {
              scrollTo("#jump--moneyBackGuarantee")
            }}
          >
            Learn More
            <ChevronIcon ml={0.5} width={12} height={12} fill="currentColor" />
          </Button>
        </Column>

        <Column span={4} textAlign="center">
          <LockIcon width={60} height={60} />

          <Text variant="sm-display" fontWeight="bold" mt={2}>
            Secure Payment
          </Text>

          <Text variant="sm" mt={2}>
            Payments made with our secure checkout are protected with trusted
            industry-leading technology.
          </Text>

          <Button
            mt={2}
            variant="noOutline"
            onClick={() => {
              scrollTo("#jump--securePayment")
            }}
          >
            Learn More
            <ChevronIcon ml={0.5} width={12} height={12} fill="currentColor" />
          </Button>
        </Column>
      </GridColumns>

      <Spacer mt={12} />

      <GridColumns gridRowGap={4}>
        <Column span={6} order={1}>
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

        <Column
          span={6}
          pt={[0, 6]}
          order={2}
          // @ts-ignore
          id="jump--authenticityGuarantee"
        >
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
            variant="secondaryOutline"
            // @ts-ignore
            as="a"
            href={SUPPORT_ARTICLE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </Button>
        </Column>

        <Column
          span={6}
          pt={[0, 6]}
          order={[4, 3]}
          // @ts-ignore
          id="jump--moneyBackGuarantee"
        >
          <Text variant="lg-display">Money-Back Guarantee</Text>

          <Text variant="sm" mt={2}>
            If a work purchased through Artsy’s secure checkout does not arrive,
            arrives damaged, or is deemed not as described, we'll work with you
            to find the best resolution—including a full refund where
            applicable.
          </Text>

          <Button
            mt={2}
            variant="secondaryOutline"
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

        <Column
          span={6}
          pt={[0, 6]}
          order={6}
          // @ts-ignore
          id="jump--securePayment"
        >
          <Text variant="lg-display">Secure Payment</Text>

          <Text variant="sm" mt={2}>
            Purchases completed through our secure checkout are powered by
            Stripe, the leader in online payment processing that’s trusted by
            millions of global businesses.
          </Text>

          <PoweredByStripeIcon width={150} height={34} mt={2} />
        </Column>
      </GridColumns>

      <Spacer mt={12} />

      <FullBleed bg="black5">
        <AppContainer>
          <HorizontalPadding py={4}>
            <Text variant="xl" textAlign="center">
              The Artsy Guarantee
            </Text>

            <Spacer mt={4} />

            <Media greaterThanOrEqual="sm">
              <BuyerGuaranteeTableDesktop />
            </Media>

            <Media lessThan="sm">
              <BuyerGuaranteeTableMobile />
            </Media>

            <Spacer mt={4} />

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
