import { Box } from "@artsy/palette"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import { FC } from "react"

interface InfiniteScrollSentinelProps {
  onNext: () => void
  once?: boolean
}

export const InfiniteScrollSentinel: FC<InfiniteScrollSentinelProps> = ({
  onNext,
  once = true,
}) => {
  const { ref } = useIntersectionObserver({
    onIntersection: onNext,
    once: once,
  })

  return <Box ref={ref as any} height={0} />
}
