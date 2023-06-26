import {
  CategoryPreferences,
  Destination,
} from "@segment/consent-manager/types/types"

const SEGMENT_CATEGORIES = {
  performance: [
    "A/B Testing",
    "Analytics",
    "Attribution",
    "Email",
    "Enrichment",
    "Heatmaps & Recordings",
    "Raw Data",
    "Realtime Dashboards",
    "Referrals",
    "Surveys",
    "Video",
  ],
  targeting: ["Advertising", "Tag Managers"],
  functional: [
    "CRM",
    "Customer Success",
    "Deep Linking",
    "Helpdesk",
    "Livechat",
    "Performance Monitoring",
    "Personalization",
    "SMS & Push Notifications",
    "Security & Fraud",
  ],
}

export const CATEGORIES = [
  {
    key: "necessary",
    name: "Strictly Necessary Cookies",
    description:
      "These cookies are required to enable core site functionality. They cannot be turned off.",
  },
  {
    key: "functional",
    name: "Functional Cookies",
    description:
      "These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages. If you do not allow these cookies then some or all of these services may not function properly.",
  },
  {
    key: "performance",
    name: "Performance Cookies",
    description:
      "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. If you do not allow these cookies we will not know when you have visited our site, and will not be able to monitor its performance.",
  },
  {
    key: "targeting",
    name: "Targeting Cookies",
    description:
      "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information, but are based on uniquely identifying your browser and internet device. If you do not allow these cookies, you will experience less targeted advertising.",
  },
] as const

export const DEFAULT_OPT_IN_PREFERENCES: CategoryPreferences = {
  necessary: true,
  functional: false,
  performance: false,
  targeting: false,
}

export const DEFAULT_OPT_OUT_PREFERENCES: CategoryPreferences = {
  necessary: true,
  functional: true,
  performance: true,
  targeting: true,
}

export const REJECT_ALL_PREFERENCES = DEFAULT_OPT_IN_PREFERENCES
export const ALLOW_ALL_PREFERENCES = DEFAULT_OPT_OUT_PREFERENCES

export const CUSTOM_DESTINATIONS: Destination[] = [
  {
    category: "targeting",
    description: "Google Ads served on Artsy's article pages",
    id: "Google Ads",
    name: "Google Ads",
    website: "https://ads.google.com/",
    creationName: "Google Ads",
  },
  {
    category: "targeting",
    description: "YouTube videos embedded on Artsy's article pages",
    id: "YouTube",
    name: "YouTube",
    website: "https://www.youtube.com/",
    creationName: "YouTube",
  },
]

export const DEFAULT_CATEGORIZATION = "functional"

// Overwrite Segment's categorization with our own
export const DESTINATION_MAPPING = {
  "Braze Web Mode (Actions)": "necessary",
  "Google Analytics": "performance",
  "Google Ads": "targeting",
  YouTube: "targeting",
  // Add more mappings as needed
} as const

export type DestinationId = keyof typeof DESTINATION_MAPPING

export const mapCustomPreferences = (
  destinations: Destination[],
  preferences: CategoryPreferences
) => {
  const allDestinations = [...destinations, ...CUSTOM_DESTINATIONS]

  const customPreferences = Object.keys(preferences).reduce(
    (acc, preferenceName) => {
      const value = preferences[preferenceName]

      return {
        ...acc,
        [preferenceName]: typeof value === "boolean" ? value : true,
      }
    },
    {}
  )

  const destinationPreferences = allDestinations.reduce((acc, destination) => {
    const customCategory = remapSegmentCategory(destination)

    return customCategory !== undefined
      ? {
          ...acc,
          [destination.id]: customPreferences[customCategory],
        }
      : acc
  }, {})

  return { destinationPreferences, customPreferences }
}

// Map between Segment's categories and our own
export const remapSegmentCategory = (destination: Destination) => {
  switch (true) {
    case !!DESTINATION_MAPPING[destination.id]:
      return DESTINATION_MAPPING[destination.id]
    case SEGMENT_CATEGORIES.performance.includes(destination.category):
      return "performance"
    case SEGMENT_CATEGORIES.targeting.includes(destination.category):
      return "targeting"
    case SEGMENT_CATEGORIES.functional.includes(destination.category):
      return "functional"
    default:
      return DEFAULT_CATEGORIZATION
  }
}
