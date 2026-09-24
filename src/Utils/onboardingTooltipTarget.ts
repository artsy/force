type NavItemId = "editorial" // will grow to "priceDatabase" | "whatsNew" later

interface OnboardingTooltipContent {
  title: string
  body: string
}

const EDITORIAL_TOOLTIP: OnboardingTooltipContent = {
  title: "Read all about it!",
  body: "Explore our editorial for news about art and artists.",
}

export const getOnboardingTooltipContent = (
  navItemId: NavItemId,
  interests: string[],
  isOnEditorialPage: boolean,
): OnboardingTooltipContent | null => {
  if (navItemId === "editorial") {
    if (isOnEditorialPage) {
      return null
    }

    if (!interests.includes("Reading about art and artists")) {
      return null
    }

    return EDITORIAL_TOOLTIP
  }

  return null
}
