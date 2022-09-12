import { Box } from "@artsy/palette"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"

interface NotificationsListScrollSentinelProps {
  onNext(): void
}

export const NotificationsListScrollSentinel: React.FC<NotificationsListScrollSentinelProps> = ({
  onNext,
}) => {
  const { ref } = useIntersectionObserver({
    onIntersection: onNext,
    once: false,
  })

  // NOTE: If we set height=0, then `onIntersection` will not be called
  return <Box ref={ref as any} height={1} />
}
