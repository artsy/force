import { CareerHighlightKind } from "Apps/Settings/Routes/Insights/Utils/getCareerHighlight"
import { useRef, useState } from "react"

export type CareerHighlightKindWithPromo = CareerHighlightKind | "PROMO"

interface Params {
  availableCareerHighlights: CareerHighlightKindWithPromo[]
  onClose(): void
  pageIndex?: number
}

export const useCareerHighlightConfig = ({
  availableCareerHighlights,
  onClose,
  pageIndex,
}: Params) => {
  const flow = useRef(availableCareerHighlights)
  const [currentIndex, setCurrentIndex] = useState(pageIndex ?? 0)
  const [current, setCurrent] = useState(flow.current[currentIndex])

  const atStart = () => {
    return currentIndex === 0
  }

  const atEnd = () => {
    return currentIndex >= flow.current.length - 1
  }

  const next = () => {
    if (atEnd()) {
      onClose()
      return
    }

    setCurrentIndex(currentIndex + 1)
    setCurrent(flow.current[currentIndex + 1])
  }

  const back = () => {
    if (atStart()) {
      return
    }

    setCurrentIndex(currentIndex - 1)
    setCurrent(flow.current[currentIndex - 1])
  }

  const index = () => {
    return currentIndex
  }

  const total = () => {
    return flow.current.length
  }

  return { back, current, next, index, total }
}
