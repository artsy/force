import React, { useEffect, useState } from "react"
import { HeroCarousel } from "Components/HeroCarousel/HeroCarousel"
import { CaptionedImage as BrazeContentCard } from "@braze/web-sdk"
import {
  Box,
  ResponsiveBox,
  GridColumns,
  Column,
  SkeletonBox,
  SkeletonText,
  Spacer,
} from "@artsy/palette"
import { Media } from "Utils/Responsive"
import { HomeContentCard } from "./HomeContentCard"

const HomeContentCardPlaceholder = () => {
  return (
    <GridColumns bg="black5" width="100%">
      <Column span={6} bg="black30">
        <>
          <Media at="xs">
            <ResponsiveBox aspectWidth={3} aspectHeight={2} maxWidth="100%" />
          </Media>
          <Media greaterThan="xs">
            <Box height={[300, 400, 500]} />
          </Media>
        </>
      </Column>
      <Column span={6}>
        <GridColumns height="100%">
          <Column
            start={[2, 3]}
            span={[10, 8]}
            display="flex"
            justifyContent="center"
            flexDirection="column"
            py={4}
          >
            <Media greaterThan="xs">
              <SkeletonText variant="xs">Artsy Auction</SkeletonText>
              <Spacer mt={2} />
            </Media>
            <SkeletonText variant={["lg-display", "xl", "xl"]}>
              Post-War and Contemporary
            </SkeletonText>
            <Spacer mt={[1, 2]} />
            <SkeletonText variant={["xs", "sm-display", "lg-display"]}>
              Bid on works by Alice Neel, Ugo Rondinone, Robert Nava, and
              more—and benefit the Immediate Abortion Access Fund to support
              reproductive justice for all.
            </SkeletonText>
            <Media greaterThan="xs">
              <Spacer
                // Unconventional value here to keep visual rhythm
                mt="30px"
              />
              <SkeletonBox mt={2} width={200} height={50} />
            </Media>
            <Media at="xs">
              <Spacer mt={1} />
              <SkeletonBox mt={2} width={200} height={50} />
            </Media>
          </Column>
        </GridColumns>
      </Column>
    </GridColumns>
  )
}

export const HomeContentCards: React.FC = () => {
  const [cards, setCards] = useState<BrazeContentCard[]>([])

  useEffect(() => {
    window.analytics?.ready(() => {
      const appboy = (window as any).appboy

      if (!appboy) return

      appboy.subscribeToContentCardsUpdates(async () => {
        const response = await appboy.getCachedContentCards()
        const { cards: updatedCards } = response
        const sortedCards = updatedCards.sort((lhs, rhs) => {
          const lhsPosition = (lhs.extras || {}).position || lhs.id
          const rhsPosition = (rhs.extras || {}).position || rhs.id
          return lhsPosition > rhsPosition ? 1 : -1
        })
        setCards(sortedCards)
      })

      appboy.requestContentCardsRefresh()
    })
  }, [])

  const hasBrazeCards = cards.length > 0

  if (!hasBrazeCards) {
    return (
      <HeroCarousel>
        <HomeContentCardPlaceholder />
        <HomeContentCardPlaceholder />
      </HeroCarousel>
    )
  }

  const realCards = cards.map((card, index) => (
    <HomeContentCard card={card} key={card.id} index={index} />
  ))

  const handleChange = index => {
    const appboy = (window as any).appboy
    if (!appboy) return

    const card = cards[index]
    appboy.logCardImpressions([card])
  }

  return <HeroCarousel onChange={handleChange}>{realCards}</HeroCarousel>
}
