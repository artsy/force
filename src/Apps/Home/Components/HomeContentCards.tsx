import React, { useEffect, useState } from "react"
import { HeroCarousel } from "Components/HeroCarousel/HeroCarousel"
import {
  HomeHeroUnit,
  StaticHeroUnit,
} from "Apps/Home/Components/HomeHeroUnits/HomeHeroUnit"

interface ContentCardProps {
  card: any
  index: any
}

const ContentCard: React.FC<ContentCardProps> = ({ card, index }) => {
  const extras = card.extras || {}

  const heroUnit = {
    backgroundImageURL: card.imageUrl,
    creditLine: extras.credit,
    heading: extras.label,
    href: card.url,
    linkText: card.linkText,
    subtitle: card.description,
    title: card.title,
  } as StaticHeroUnit

  return <HomeHeroUnit heroUnit={heroUnit} index={index} layout="a" />
}

export const HomeContentCards: React.FC = () => {
  const [cards, setCards] = useState([] as any)

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

  if (cards.length < 1) {
    return <h1>placeholder</h1>
  }

  return (
    <HeroCarousel>
      {cards.map((card, index) => (
        <ContentCard card={card} key={card.id} index={index} />
      ))}
    </HeroCarousel>
  )
}
