import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import { Box } from "@artsy/palette"

interface NotificationsListScrollSentinelProps {
  onNext(): void
}

export const NotificationsListScrollSentinel: React.FC<
  React.PropsWithChildren<NotificationsListScrollSentinelProps>
> = ({ onNext }) => {
  const { ref } = useIntersectionObserver({
    onIntersection: onNext,
    once: false,
  })

  // NOTE: If we set height=0, then `onIntersection` will not be called
  return <Box ref={ref as any} height={1} />
}
