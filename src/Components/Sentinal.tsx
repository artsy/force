import { Box } from "@artsy/palette"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"

interface SentinalProps {
  onEnterView(): void
  onExitView?(): void
  testId?: string
}

export const Sentinel: React.FC<SentinalProps> = ({
  onEnterView,
  onExitView,
  testId,
}) => {
  const { ref } = useIntersectionObserver({
    once: false,
    options: {
      threshold: 0.2,
    },
    onIntersection: onEnterView,
    onOffIntersection: onExitView,
  })

  return <Box ref={ref as any} data-testid={testId} height={0} />
}
