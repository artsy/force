type NavItemId = "editorial" | "priceDatabase" // will grow to | "whatsNew" later

interface OnboardingTooltipContent {
  title: string
  body: string
}

const EDITORIAL_TOOLTIP: OnboardingTooltipContent = {
  title: "Read all about it!",
  body: "Explore our editorial for news about art and artists.",
}

const PRICE_DATABASE_TOOLTIP: OnboardingTooltipContent = {
  title: "Browse the database",
  body: "Explore 'Price Database' to view auction history results.",
}

export const getOnboardingTooltipContent = (
  navItemId: NavItemId,
  interests: string[],
  isOnCurrentPage: boolean,
): OnboardingTooltipContent | null => {
  if (navItemId === "editorial") {
    if (isOnCurrentPage) {
      return null
    }

    if (!interests.includes("Reading about art and artists")) {
      return null
    }

    return EDITORIAL_TOOLTIP
  }

  if (navItemId === "priceDatabase") {
    if (isOnCurrentPage) {
      return null
    }

    if (!interests.includes("Tracking prices and results at auction")) {
      return null
    }

    return PRICE_DATABASE_TOOLTIP
  }

  return null
}
