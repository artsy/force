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

const FALLBACK_CARDS_TIMEOUT = 1000

const makeContentCard = ({ id }): BrazeContentCard => {
  return {
    aspectRatio: 1.0,
    categories: [],
    clicked: false,
    created: null,
    description: "",
    dismissCard: () => {},
    dismissed: false,
    dismissible: false,
    expiresAt: null,
    id,
    pinned: false,
    removeAllSubscriptions: () => {},
    removeSubscription: () => {},
    subscribeToClickedEvent: () => "",
    subscribeToDismissedEvent: () => "",
    title: "",
    updated: new Date(),
    viewed: false,
  }
}

const fallbackCards: BrazeContentCard[] = [
  makeContentCard({ id: 1 }),
  makeContentCard({ id: 2 }),
]
const sortContentCards = cards => {
  return cards.sort((lhs, rhs) => {
    const lhsPosition = (lhs.extras || {}).position || lhs.id
    const rhsPosition = (rhs.extras || {}).position || rhs.id
    return lhsPosition > rhsPosition ? 1 : -1
  })
}

export const HomeContentCards: React.FC = () => {
  const [cards, setCards] = useState<BrazeContentCard[]>([])

  useEffect(() => {
    window.analytics?.ready(() => {
      const appboy = (window as any).appboy

      if (!appboy) return

      const subscriptionId = appboy.subscribeToContentCardsUpdates(async () => {
        const response = await appboy.getCachedContentCards()
        const sortedCards = sortContentCards(response.cards)
        setCards(sortedCards)
      })

      setTimeout(() => {
        console.log(cards.length)
        if (cards.length > 0) return

        appboy.removeSubscription(subscriptionId)
        setCards(fallbackCards)
      }, FALLBACK_CARDS_TIMEOUT)

      appboy.requestContentCardsRefresh()
    })
  }, [cards.length])

  const placeholderCards = [
    <HomeContentCardPlaceholder key={1} />,
    <HomeContentCardPlaceholder key={2} />,
  ]

  const realCards = cards.map((card, index) => {
    console.log({ id: card.id })
    return <HomeContentCard card={card} key={card.id} index={index} />
  })

  const heroCards = cards.length == 0 ? placeholderCards : realCards

  const handleChange = index => {
    const appboy = (window as any).appboy
    if (!appboy) return

    const card = cards[index]
    appboy.logCardImpressions([card])
  }

  return <HeroCarousel onChange={handleChange}>{heroCards}</HeroCarousel>
}
