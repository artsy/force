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
import { useSystemContext } from "System/Hooks/useSystemContext"
import { FC } from "react"

export const MarketingMeetArtAdvisorRoute: FC = () => {
  const { isEigen } = useSystemContext()

  return (
    <>
      <MetaTags
        title="Meet your new art advisor | Artsy"
        description="See what you can do on Artsy—the best tool for art collectors. In-demand artworks, free auction results, collection management, expert sales advice, and more."
      />

      <Join separator={<Spacer y={6} />}>
        <MarketingHeader
          title="Meet your new art advisor."
          subtitle="See what you can do on Artsy—the best tool for art collectors."
          src="https://files.artsy.net/images/marketing_meet_header_april-14.jpg"
          accentColor={BRAND_PALETTE.blue}
        />

        <MarketingAlternatingStack
          cards={[
            {
              title: "Find the art you love.",
              subtitle:
                "Discover the tools you need to collect artworks that fit your taste.",
              src:
                "https://files.artsy.net/images/marketing_meet_01_april-14.jpg",
              cta: {
                label: "Start Looking",
                href: "/find-the-art-you-love",
              },
            },
            {
              title: "Always know the right price.",
              subtitle:
                "Buy and bid confidently with free access to millions of auction results.",
              src:
                "https://files.artsy.net/images/marketing_meet_02_april-25_2.jpg",
              cta: {
                label: "Search the Artsy Price Database",
                href: "/price-database",
              },
            },
            {
              title: "Know your collection better.",
              subtitle:
                "See all the works you own, on your phone—and keep up with market insights.",
              src:
                "https://files.artsy.net/images/marketing_meet_03_april-14.jpg",
              cta: {
                label: "View My Collection",
                href: "/collector-profile/my-collection",
              },
            },
            {
              title: "When you’re ready to sell, we can help.",
              subtitle:
                "Earn more and worry less with our expert guidance, tailored to you.",
              src:
                "https://files.artsy.net/images/marketing_meet_04_april-14.jpg",
              cta: {
                label: "Learn More",
                href: "/sell",
              },
            },
          ]}
        />

        {!isEigen && (
          <FullBleed bg={["black5", "transparent"]} py={[4, 0]} px={[2, 4]}>
            <GridColumns gridRowGap={4}>
              <Column span={12} textAlign="center">
                <Text variant="xl">Meet your new art advisor. It’s Artsy.</Text>
              </Column>

              <Column span={4} start={5}>
                <Button
                  width="100%"
                  // @ts-ignore
                  as="a"
                  href="https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get the App
                </Button>
              </Column>
            </GridColumns>
          </FullBleed>
        )}
      </Join>
    </>
  )
}
