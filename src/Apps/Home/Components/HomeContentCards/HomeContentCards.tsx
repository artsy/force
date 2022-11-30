import React, { useEffect, useRef, useState } from "react"
import Braze from "@braze/web-sdk"
import { BrazeCards } from "./BrazeCards"
import { FallbackCards } from "./FallbackCards"
import { PlaceholderCards } from "./PlaceholderCards"
import { useRouter } from "System/Router/useRouter"
import { paramsToCamelCase } from "Components/ArtworkFilter/Utils/urlBuilder"

const sortCards = (lhs, rhs) => {
  const lhsPosition = (lhs.extras || {}).position || lhs.id
  const rhsPosition = (rhs.extras || {}).position || rhs.id
  return lhsPosition > rhsPosition ? 1 : -1
}

const DEFAULT_TIMEOUT_AMOUNT = 5000

export const HomeContentCards: React.FC = () => {
  const { match } = useRouter()
  const { brazeTimeoutAmount } = paramsToCamelCase(match?.location.query) as {
    brazeTimeoutAmount?: number
  }

  const timeoutAmount = brazeTimeoutAmount ?? DEFAULT_TIMEOUT_AMOUNT

  const [exceededTimeout, setExceededTimeout] = useState(false)
  const [appboy, setAppboy] = useState<typeof Braze | null>(null)
  const [cards, setCards] = useState<Braze.CaptionedImage[]>([])
  const cardsLengthRef = useRef(cards.length)

  useEffect(() => {
    window.analytics?.ready(() => {
      setAppboy(window.appboy)
    })
  })

  useEffect(() => {
    if (!appboy) return

    const subscriptionId = appboy.subscribeToContentCardsUpdates(() => {
      const response = appboy.getCachedContentCards()
      const sortedCards = response.cards.sort(sortCards)
      setCards(sortedCards as Braze.CaptionedImage[])
    })

    const timeout = setTimeout(() => {
      if (cardsLengthRef.current > 0) return

      appboy.removeSubscription(subscriptionId)
      setExceededTimeout(true)
    }, timeoutAmount)

    appboy.requestContentCardsRefresh()

    return () => {
      appboy.removeSubscription(subscriptionId)
      clearTimeout(timeout)
    }
  }, [appboy, timeoutAmount])

  useEffect(() => {
    cardsLengthRef.current = cards.length
  }, [cards])

  const hasBrazeCards = appboy && cardsLengthRef.current > 0

  if (!hasBrazeCards)
    return exceededTimeout ? <FallbackCards /> : <PlaceholderCards />

  return <BrazeCards appboy={appboy} cards={cards} />
}
