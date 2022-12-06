import React, { useEffect, useRef, useState } from "react"
import Braze from "@braze/web-sdk"
import { BrazeCards } from "./BrazeCards"
import { FallbackCards } from "./FallbackCards"
import { PlaceholderCards } from "./PlaceholderCards"
import { useRouter } from "System/Router/useRouter"
import { paramsToCamelCase } from "Components/ArtworkFilter/Utils/urlBuilder"
import { HomeErrorBoundary } from "./HomeErrorBoundary"

const sortCards = (lhs, rhs) => {
  const lhsPosition = (lhs.extras || {}).position || lhs.id
  const rhsPosition = (rhs.extras || {}).position || rhs.id
  return lhsPosition > rhsPosition ? 1 : -1
}

export const DEFAULT_TIMEOUT_AMOUNT = 1000

export const HomeContentCards: React.FC = () => {
  const { match } = useRouter()
  const query = match?.location.query ?? {}
  const { brazeTimeoutAmount } = paramsToCamelCase(query) as {
    brazeTimeoutAmount?: number
  }

  const timeoutAmount = brazeTimeoutAmount ?? DEFAULT_TIMEOUT_AMOUNT

  const [exceededTimeout, setExceededTimeout] = useState(false)
  const [appboy, setAppboy] = useState<typeof Braze | null>(null)
  const [cards, setCards] = useState<Braze.CaptionedImage[]>([])
  const cardsLengthRef = useRef(cards.length)

  useEffect(() => {
    if (appboy) return

    if (window.appboy) {
      setAppboy(window.appboy)
    } else if (window.analytics) {
      window.analytics.ready(() => {
        setAppboy(window.appboy)
      })
    } else {
      setExceededTimeout(true)
    }
  }, [appboy])

  useEffect(() => {
    if (!appboy) return

    const subscriptionId = appboy.subscribeToContentCardsUpdates(() => {
      if (cardsLengthRef.current > 0) return

      const response = appboy.getCachedContentCards()
      const sortedCards = response.cards.sort(sortCards)
      cardsLengthRef.current = sortedCards.length
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

  const hasBrazeCards = appboy && cardsLengthRef.current > 0

  if (!hasBrazeCards)
    return exceededTimeout ? <FallbackCards /> : <PlaceholderCards />

  return <BrazeCards appboy={appboy} cards={cards} />
}

export const SafeHomeContentCards = () => {
  return (
    <HomeErrorBoundary>
      <HomeContentCards />
    </HomeErrorBoundary>
  )
}
