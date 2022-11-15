import {
  checkAndSyncIndicatorsCount,
  Counts,
  IndicatorsCountState,
} from "Components/NavBar/helpers"
import { useEffect, useState } from "react"

export const useIndicators = (counts: Counts) => {
  const [state, setState] = useState<IndicatorsCountState | null>(null)
  const { conversations, notifications } = counts

  useEffect(() => {
    const result = checkAndSyncIndicatorsCount({
      notifications,
      conversations,
    })

    setState(result)
  }, [conversations, notifications])

  return state
}
