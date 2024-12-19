import { Box } from "@artsy/palette"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import type { FC } from "react"

interface InfiniteScrollSentinelProps {
  onNext: () => void
  once?: boolean
}

export const InfiniteScrollSentinel: FC<
  React.PropsWithChildren<InfiniteScrollSentinelProps>
> = ({ onNext, once = true }) => {
  const { ref } = useIntersectionObserver({
    onIntersection: onNext,
    once: once,
  })

  return <Box ref={ref as any} height={0} />
}
