import {
  Button,
  Column,
  FullBleed,
  GridColumns,
  Join,
  Spacer,
  Text,
} from "@artsy/palette"
import { MarketingAlternatingStack } from "Apps/Marketing/Components/MarketingAlternatingStack"
import { MarketingHeader } from "Apps/Marketing/Components/MarketingHeader"
import { BRAND_PALETTE } from "Apps/Marketing/Utils/brandPalette"
import { MetaTags } from "Components/MetaTags"
import { FC } from "react"

export const MarketingMeetArtAdvisorRoute: FC = () => {
  return (
    <>
      <MetaTags title="Meet your new art advisor. | Artsy" />

      <Join separator={<Spacer y={6} />}>
        <MarketingHeader
          title="Meet your new art advisor."
          subtitle="Collect what you love confidently on the largest platform for in-demand art."
          src="https://files.artsy.net/images/marketing_meet_header.jpg"
          accentColor={BRAND_PALETTE.blue}
        />

        <MarketingAlternatingStack
          cards={[
            {
              title: "Get the art you want.",
              subtitle:
                "Discover the tools you need to collect art that fits your taste.",
              src:
                "https://files.artsy.net/images/marketing_meet_new-works-for-you.jpg",
              cta: {
                label: "Start Looking",
                href: "/todo",
              },
            },
            {
              title: "Always know the right price.",
              subtitle:
                "Buy and bid confidently with free access to millions of auction results.",
              src:
                "https://files.artsy.net/images/marketing_meet_price-database.jpg",
              cta: {
                label: "Search the Artsy Price Database",
                href: "/todo",
              },
            },
            {
              title: "Get to know your collection better.",
              subtitle:
                "See all the works you own, on your phone—and keep up with market insights.",
              src:
                "https://files.artsy.net/images/marketing_meet_my-collection.jpg",
              cta: {
                label: "View My Collection",
                href: "/todo",
              },
            },
            {
              title: "When you’re ready to sell, we can help.",
              subtitle:
                "Earn more and worry less with our expert guidance, tailored to you.",
              src: "https://files.artsy.net/images/marketing_meet_consign.jpg",
              cta: {
                label: "Learn More",
                href: "/todo",
              },
            },
          ]}
        />

        <FullBleed bg={["black5", "transparent"]} py={[4, 0]} px={[2, 4]}>
          <GridColumns gridRowGap={4}>
            <Column span={12} textAlign="center">
              <Text variant="xl">Meet your new art advisor. It’s Artsy.</Text>
            </Column>

            <Column span={4} start={5}>
              <Button width="100%">Get the App</Button>
            </Column>
          </GridColumns>
        </FullBleed>
      </Join>
    </>
  )
}
