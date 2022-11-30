import React, { useEffect, useState } from "react"
import { HeroCarousel } from "Components/HeroCarousel/HeroCarousel"
import { CaptionedImage as BrazeContentCard } from "@braze/web-sdk"
import { HomeContentCard } from "./HomeContentCard"
import { PlaceholderCards } from "./PlaceholderCards"

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

  if (!hasBrazeCards) return <PlaceholderCards />

  const handleChange = index => {
    const appboy = (window as any).appboy
    if (!appboy) return

    const card = cards[index]
    appboy.logCardImpressions([card])
  }

  return (
    <HeroCarousel onChange={handleChange}>
      {cards.map((card, index) => {
        const handleClick = () => {
          const appboy = (window as any).appboy
          appboy?.logCardClick(card)
        }
        return (
          <HomeContentCard
            card={card}
            index={index}
            key={card.id}
            onClick={handleClick}
          />
        )
      })}
    </HeroCarousel>
  )
}
