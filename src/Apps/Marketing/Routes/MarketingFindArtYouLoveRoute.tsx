import {
  Column,
  FullBleed,
  GridColumns,
  Join,
  Spacer,
  Text,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { MarketingAlternatingStack } from "Apps/Marketing/Components/MarketingAlternatingStack"
import { MarketingHeader } from "Apps/Marketing/Components/MarketingHeader"
import { MarketingFeaturedArtworksRailQueryRenderer } from "Apps/Marketing/Components/MarketingFeaturedArtworksRail"
import { MarketingTrendingArtistsRailQueryRenderer } from "Apps/Marketing/Components/MarketingTrendingArtistsRail"
import { MetaTags } from "Components/MetaTags"
import { FC } from "react"
import { MarketingCollectionCell } from "Apps/Marketing/Components/MarketingCollectionCell"
import { MarketingQuizCTA } from "Apps/Marketing/Components/MarketingQuizCTA"
import { BRAND_PALETTE } from "Apps/Marketing/Utils/brandPalette"

export const MarketingFindArtYouLoveRoute: FC = () => {
  return (
    <>
      <MetaTags
        title="Find the art you love | Artsy"
        description="Discover the tools you need to collect artworks that fit your taste. Save works, follow artists, and set alerts to get the art you’re looking for."
      />

      <Join separator={<Spacer y={6} />}>
        <MarketingHeader
          title="Find the art you love."
          subtitle="Discover the tools you need to collect artworks that fit your taste."
          src="https://files.artsy.net/images/marketing_find_header_april-14.jpg"
          accentColor={BRAND_PALETTE.green}
        />

        <Text variant={["lg-display", "xl"]}>
          Explore the world’s best art, on Artsy
        </Text>

        <MarketingFeaturedArtworksRailQueryRenderer />

        <MarketingTrendingArtistsRailQueryRenderer />

        <FullBleed bg="black5" py={[6, 12]}>
          <AppContainer>
            <HorizontalPadding>
              <Text variant={["xl", "xxl", "xxl"]}>
                Saves, follows, and alerts
              </Text>

              <Spacer y={4} />

              <Text variant="lg" maxWidth={["100%", "50%"]}>
                Three easy ways to find what you’re looking for and get better
                recommendations.
              </Text>
            </HorizontalPadding>
          </AppContainer>
        </FullBleed>

        <MarketingAlternatingStack
          cards={[
            {
              title: "Save artworks",
              subtitle:
                "Keep track of artworks that catch your eye, and get better recommendations with every save.",
              src:
                "https://files.artsy.net/images/marketing_find_01_april-14.jpg",
            },
            {
              title: "Follow artists",
              subtitle:
                "Get updates on your favorite artists, including new artworks, shows, and more.",
              src:
                "https://files.artsy.net/images/marketing_find_02_april-14.jpg",
            },
            {
              title: "Set alerts",
              subtitle:
                "On the hunt for a particular work? Create an alert and we’ll let you know when there’s a match.",
              src:
                "https://files.artsy.net/images/marketing_find_03_april-14.jpg",
            },
          ]}
        />

        <Text variant={["lg-display", "xl"]}>
          Explore our most popular collections
        </Text>

        <GridColumns gridRowGap={4}>
          <Column span={4}>
            <MarketingCollectionCell
              title="Trending Now"
              href="/collection/trending-now"
              src="https://files.artsy.net/images/marketing_trending-now_april-14.jpg"
            />
          </Column>

          <Column span={4}>
            <MarketingCollectionCell
              title="Curators’ Picks: Emerging"
              href="/collection/curators-picks-emerging"
              src="https://files.artsy.net/images/marketing_emerging_april-14.jpg"
            />
          </Column>

          <Column span={4}>
            <MarketingCollectionCell
              title="Top Auction Lots"
              href="/collection/top-auction-lots"
              src="https://files.artsy.net/images/marketing_top-lots_april-14.jpg"
            />
          </Column>
        </GridColumns>

        <MarketingQuizCTA />
      </Join>
    </>
  )
}
