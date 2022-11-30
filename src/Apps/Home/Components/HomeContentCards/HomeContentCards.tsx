import React, { useEffect, useRef, useState } from "react"
import { CaptionedImage as BrazeContentCard } from "@braze/web-sdk"
import { BrazeCards } from "./BrazeCards"
import { PlaceholderCards } from "./PlaceholderCards"

const sortCards = (lhs, rhs) => {
  const lhsPosition = (lhs.extras || {}).position || lhs.id
  const rhsPosition = (rhs.extras || {}).position || rhs.id
  return lhsPosition > rhsPosition ? 1 : -1
}

export const HomeContentCards: React.FC = () => {
  const [appboy, setAppboy] = useState<any>(null)
  const [cards, setCards] = useState<BrazeContentCard[]>([])
  const cardsLengthRef = useRef(cards.length)

  useEffect(() => {
    window.analytics?.ready(() => {
      const appboy = (window as any).appboy
      setAppboy(appboy)
    })
  })

  useEffect(() => {
    if (!appboy) return

    const subscriptionId = appboy.subscribeToContentCardsUpdates(async () => {
      const response = await appboy.getCachedContentCards()
      const sortedCards = response.cards.sort(sortCards)
      setCards(sortedCards)
    })

    appboy.requestContentCardsRefresh()

    return () => {
      appboy.removeSubscription(subscriptionId)
    }
  }, [appboy])

  useEffect(() => {
    cardsLengthRef.current = cards.length
  }, [cards])

  const hasBrazeCards = appboy && cardsLengthRef.current > 0

  if (!hasBrazeCards) return <PlaceholderCards />

  return <BrazeCards appboy={appboy} cards={cards} />
}
