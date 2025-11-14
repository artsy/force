import { MarketingAlternatingStack } from "Apps/Marketing/Components/MarketingAlternatingStack"
import { MarketingHeaderPrimary } from "Apps/Marketing/Components/MarketingHeaderPrimary"
import { MetaTags } from "Components/MetaTags"
import { useSystemContext } from "System/Hooks/useSystemContext"
import {
  Button,
  Column,
  FullBleed,
  GridColumns,
  Join,
  Spacer,
  Text,
} from "@artsy/palette"
import type { FC } from "react"

export const MarketingMeetArtAdvisorRoute: FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { isEigen } = useSystemContext()

  return (
    <>
      <MetaTags
        title="Meet your new art advisor | Artsy"
        description="See what you can do on Artsy—the best tool for art collectors. In-demand artworks, free auction results, collection management, expert sales advice, and more."
      />

      <Join separator={<Spacer y={6} />}>
        <MarketingHeaderPrimary />

        <MarketingAlternatingStack
          cards={[
            {
              title: "Find the art you love.",
              subtitle:
                "Discover the tools you need to collect artworks that fit your taste.",
              src: "https://files.artsy.net/images/marketing_meet_01_april-14.jpg",
              cta: {
                label: "Start Looking",
                href: "/find-the-art-you-love",
              },
            },
            {
              title: "Always know the right price.",
              subtitle:
                "Buy and bid confidently with free access to millions of auction results.",
              src: "https://files.artsy.net/images/marketing_meet_02_april-25_2.jpg",
              cta: {
                label: "Search the Artsy Price Database",
                href: "/price-database",
              },
            },
            {
              title: "Know your collection better.",
              subtitle:
                "See all the works you own, on your phone—and keep up with market insights.",
              src: "https://files.artsy.net/images/marketing_meet_03_april-14.jpg",
              cta: {
                label: "View My Collection",
                href: "/collector-profile/my-collection",
              },
            },
          ]}
        />

        {!isEigen && (
          <FullBleed bg={["mono5", "transparent"]} py={[4, 0]} px={[2, 4]}>
            <GridColumns gridRowGap={4}>
              <Column span={12} textAlign="center">
                <Text variant="xl">Meet your new art advisor. It’s Artsy.</Text>
              </Column>

              <Column span={4} start={5}>
                <Button
                  width="100%"
                  // @ts-expect-error
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
