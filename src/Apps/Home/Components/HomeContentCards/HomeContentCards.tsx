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

  const [renderFallback, setRenderFallback] = useState(false)
  const [appboy, setAppboy] = useState<typeof Braze | null>(null)
  const [cards, setCards] = useState<Braze.CaptionedImage[]>([])
  const cardsLengthRef = useRef(cards.length)

  useEffect(() => {
    const overallTimeout = setTimeout(() => {
      if (cardsLengthRef.current > 0) return

      setRenderFallback(true)
    }, timeoutAmount)

    return () => {
      clearTimeout(overallTimeout)
    }
  }, [timeoutAmount])

  useEffect(() => {
    if (appboy) return

    if (window.appboy) {
      setAppboy(window.appboy)
    } else if (window.analytics) {
      window.analytics.ready(() => {
        !window.appboy && setRenderFallback(true)
        setAppboy(window.appboy)
      })
    } else {
      setRenderFallback(true)
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

    const brazeTimeout = setTimeout(() => {
      if (cardsLengthRef.current > 0) return

      appboy.removeSubscription(subscriptionId)
      setRenderFallback(true)
    }, timeoutAmount)

    appboy.requestContentCardsRefresh()

    return () => {
      appboy.removeSubscription(subscriptionId)
      clearTimeout(brazeTimeout)
    }
  }, [appboy, timeoutAmount])

  const hasBrazeCards = appboy && cardsLengthRef.current > 0

  if (renderFallback) return <FallbackCards />
  if (!hasBrazeCards) return <PlaceholderCards />

  return <BrazeCards appboy={appboy} cards={cards} />
}

export const SafeHomeContentCards = () => {
  return (
    <HomeErrorBoundary>
      <HomeContentCards />
    </HomeErrorBoundary>
  )
}
