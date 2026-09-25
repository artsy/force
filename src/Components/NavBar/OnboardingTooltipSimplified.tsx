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
import type { FC } from "react"

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

  if (!content) {
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
