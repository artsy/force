import React, { useEffect, useState } from "react"
import { CaptionedImage as BrazeContentCard } from "@braze/web-sdk"
import { BrazeCards } from "./BrazeCards"
import { PlaceholderCards } from "./PlaceholderCards"

export const HomeContentCards: React.FC = () => {
  const [appboy, setAppboy] = useState<any>(null)
  const [cards, setCards] = useState<BrazeContentCard[]>([])

  useEffect(() => {
    window.analytics?.ready(() => {
      const appboy = (window as any).appboy
      setAppboy(appboy)
    })
  })

  useEffect(() => {
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
  }, [appboy])

  const hasBrazeCards = appboy && cards.length > 0

  if (!hasBrazeCards) return <PlaceholderCards />

  return <BrazeCards appboy={appboy} cards={cards} />
}
