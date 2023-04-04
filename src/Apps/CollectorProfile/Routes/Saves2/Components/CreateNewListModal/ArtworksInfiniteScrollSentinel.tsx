import { Box } from "@artsy/palette"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import { FC } from "react"

interface ArtworksInfiniteScrollSentinelProps {
  onNext: () => void
}

export const ArtworksInfiniteScrollSentinel: FC<ArtworksInfiniteScrollSentinelProps> = ({
  onNext,
}) => {
  const { ref } = useIntersectionObserver({
    onIntersection: onNext,
    once: false,
  })

  return <Box ref={ref as any} height={0} />
}
