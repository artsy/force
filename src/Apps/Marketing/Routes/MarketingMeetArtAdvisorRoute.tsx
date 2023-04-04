import {
  Button,
  Column,
  FullBleed,
  GridColumns,
  Spacer,
  Text,
} from "@artsy/palette"
import { MarketingAlternatingStack } from "Apps/Marketing/Components/MarketingAlternatingStack"
import { MarketingHeader } from "Apps/Marketing/Components/MarketingHeader"
import { MetaTags } from "Components/MetaTags"
import { FC } from "react"

export const MarketingMeetArtAdvisorRoute: FC = () => {
  return (
    <>
      <MetaTags title="Meet your new art advisor. | Artsy" />

      <MarketingHeader
        title="Meet your new art advisor."
        subtitle="Collect what you love confidently on the largest platform for in-demand art."
        src="https://picsum.photos/seed/a/2000/2000"
      />

      <Spacer y={6} />

      <MarketingAlternatingStack
        cards={[
          {
            title: "Get the art you want.",
            subtitle:
              "Discover the tools you need to collect art that fits your taste.",
            src: "https://picsum.photos/seed/b/2000/2000",
            cta: {
              label: "Start Looking",
              href: "/todo",
            },
          },
          {
            title: "Always know the right price.",
            subtitle:
              "Buy and bid confidently with free access to millions of auction results.",
            src: "https://picsum.photos/seed/c/2000/2000",
            cta: {
              label: "Search the Artsy Price Database",
              href: "/todo",
            },
          },
          {
            title: "Get to know your collection better.",
            subtitle:
              "See all the works you own, on your phone—and keep up with market insights.",
            src: "https://picsum.photos/seed/d/2000/2000",
            cta: {
              label: "View My Collection",
              href: "/todo",
            },
          },
          {
            title: "When you’re ready to sell, we can help.",
            subtitle:
              "Earn more and worry less with our expert guidance, tailored to you.",
            src: "https://picsum.photos/seed/e/2000/2000",
            cta: {
              label: "Learn More",
              href: "/todo",
            },
          },
        ]}
      />

      <Spacer y={6} />

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
    </>
  )
}
