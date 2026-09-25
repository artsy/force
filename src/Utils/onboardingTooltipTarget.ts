type NavItemId = "whatsNew" | "editorial" | "priceDatabase"

interface OnboardingTooltipContent {
  title: string
  body: string
}

interface OnboardingTooltipResult {
  navItemId: NavItemId
  content: OnboardingTooltipContent
}

const WHATS_NEW_TOOLTIP: OnboardingTooltipContent = {
  title: "Explore here",
  body: "Try browsing 'Whats New' to discover new artworks.",
}

const EDITORIAL_TOOLTIP: OnboardingTooltipContent = {
  title: "Read all about it!",
  body: "Explore our editorial for news about art and artists.",
}

const PRICE_DATABASE_TOOLTIP: OnboardingTooltipContent = {
  title: "Browse the database",
  body: "Explore 'Price Database' to view auction history results.",
}

interface PageConditions {
  isOnHomepage: boolean
  isOnEditorialPage: boolean
  isOnPriceDatabasePage: boolean
}

export const getOnboardingTooltipTarget = (
  interests: string[],
  pageConditions: PageConditions,
): OnboardingTooltipResult | null => {
  const hasWhatsNewInterest =
    interests.includes("Buying art") ||
    interests.includes("Browsing art for inspiration")

  if (pageConditions.isOnHomepage && hasWhatsNewInterest) {
    return { navItemId: "whatsNew", content: WHATS_NEW_TOOLTIP }
  }

  if (
    !pageConditions.isOnEditorialPage &&
    interests.includes("Reading about art and artists")
  ) {
    return { navItemId: "editorial", content: EDITORIAL_TOOLTIP }
  }

  if (
    !pageConditions.isOnPriceDatabasePage &&
    interests.includes("Tracking prices and results at auction")
  ) {
    return { navItemId: "priceDatabase", content: PRICE_DATABASE_TOOLTIP }
  }

  return null
}
