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

  return <Box ref={ref as any} height={0} />
}
