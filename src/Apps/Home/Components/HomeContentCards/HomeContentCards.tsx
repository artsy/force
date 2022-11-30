import React, { useEffect, useState } from "react"
import { HeroCarousel } from "Components/HeroCarousel/HeroCarousel"
import { CaptionedImage as BrazeContentCard } from "@braze/web-sdk"
import { HomeContentCard } from "./HomeContentCard"
import { PlaceholderCards } from "./PlaceholderCards"

export const HomeContentCards: React.FC = () => {
  const [appboy, setAppboy] = useState<any>(null)
  const [cards, setCards] = useState<BrazeContentCard[]>([])

  useEffect(() => {
    window.analytics?.ready(() => {
      const appboy = (window as any).appboy
      setAppboy(appboy)

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

  const hasBrazeCards = appboy && cards.length > 0

  if (!hasBrazeCards) return <PlaceholderCards />

  const handleChange = index => {
    const card = cards[index]
    appboy.logCardImpressions([card])
  }

  return (
    <HeroCarousel onChange={handleChange}>
      {cards.map((card, index) => {
        const handleClick = () => {
          appboy.logCardClick(card)
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
