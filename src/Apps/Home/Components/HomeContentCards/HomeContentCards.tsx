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
  const [braze, setBraze] = useState<typeof Braze | undefined>(undefined)
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
    if (braze) return

    if (window.braze) {
      setBraze(window.braze)
    } else if (window.analytics) {
      window.analytics.ready(() => {
        !window.braze && setRenderFallback(true)
        setBraze(window.braze)
      })
    } else {
      setRenderFallback(true)
    }
  }, [braze])

  useEffect(() => {
    if (!braze) return

    const subscriptionId = braze.subscribeToContentCardsUpdates(() => {
      if (cardsLengthRef.current > 0) return

      const response = braze.getCachedContentCards()
      const sortedCards = response.cards.sort(sortCards)
      cardsLengthRef.current = sortedCards.length
      setCards(sortedCards as Braze.CaptionedImage[])
    })

    const brazeTimeout = setTimeout(() => {
      if (cardsLengthRef.current > 0) return

      braze.removeSubscription(subscriptionId)
      setRenderFallback(true)
    }, timeoutAmount)

    braze.requestContentCardsRefresh()

    return () => {
      braze.removeSubscription(subscriptionId)
      clearTimeout(brazeTimeout)
    }
  }, [braze, timeoutAmount])

  const hasBrazeCards = braze && cardsLengthRef.current > 0

  if (renderFallback) return <FallbackCards />
  if (!hasBrazeCards) return <PlaceholderCards />

  return <BrazeCards braze={braze} cards={cards} />
}

export const SafeHomeContentCards = () => {
  return (
    <HomeErrorBoundary>
      <HomeContentCards />
    </HomeErrorBoundary>
  )
}
