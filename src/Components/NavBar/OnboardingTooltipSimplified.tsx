import { Text } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { useIsRouteActive } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import {
  clearOnboardingInterestsPending,
  useOnboardingInterestsPending,
} from "Utils/onboardingInterestsPending"
import { getOnboardingTooltipTarget } from "Utils/onboardingTooltipTarget"
import { type FC, useEffect, useState } from "react"

const TOOLTIP_APPEAR_DELAY_MS = 300

interface OnboardingTooltipSimplifiedProps {
  navItemId: "whatsNew" | "editorial" | "priceDatabase"
}

export const OnboardingTooltipSimplified: FC<
  React.PropsWithChildren<OnboardingTooltipSimplifiedProps>
> = ({ children, navItemId }) => {
  const { isLoggedIn } = useSystemContext()

  const pendingInterests = useOnboardingInterestsPending()

  const isOnHomepage = useIsRouteActive("/", { exact: true })

  const isOnEditorialPage =
    useIsRouteActive("/article", { exact: false }) ||
    useIsRouteActive("/articles", { exact: false })

  const isOnPriceDatabasePage = useIsRouteActive("/price-database", {
    exact: false,
  })

  const target = isLoggedIn
    ? getOnboardingTooltipTarget(pendingInterests, {
        isOnHomepage,
        isOnEditorialPage,
        isOnPriceDatabasePage,
      })
    : null

  const content = target?.navItemId === navItemId ? target.content : null

  const [isDelayElapsed, setIsDelayElapsed] = useState(false)

  useEffect(() => {
    if (!content) {
      return
    }

    const timeout = setTimeout(() => {
      setIsDelayElapsed(true)
    }, TOOLTIP_APPEAR_DELAY_MS)

    return () => clearTimeout(timeout)
  }, [content])

  if (!content || !isDelayElapsed) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name="onboarding-interests-simplified"
      placement="bottom"
      zIndex={Z.onboardingPopover}
      onClose={clearOnboardingInterestsPending}
      popover={
        <>
          <Text variant="xs" fontWeight="bold">
            {content.title}
          </Text>
          <Text variant="xs">{content.body}</Text>
        </>
      }
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}
