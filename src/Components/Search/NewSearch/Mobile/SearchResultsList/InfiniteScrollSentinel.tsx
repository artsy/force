import { Box } from "@artsy/palette"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import { FC } from "react"

interface InfiniteScrollSentinelProps {
  onNext: () => void
}

export const InfiniteScrollSentinel: FC<InfiniteScrollSentinelProps> = ({
  onNext,
}) => {
  const { ref } = useIntersectionObserver({
    onIntersection: onNext,
    once: false,
  })

  return <Box ref={ref as any} height={0} />
}
