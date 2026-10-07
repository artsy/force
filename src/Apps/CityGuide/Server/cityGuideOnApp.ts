import fs from "fs"
import path from "path"
import { COOKIE_CONSENT_MANAGER_COOKIE_NAME } from "Components/CookieConsentManager/CookieConsentManager"
import {
  CUSTOM_DESTINATIONS,
  DEFAULT_CATEGORIZATION,
  DEFAULT_OPT_IN_PREFERENCES,
  DEFAULT_OPT_OUT_PREFERENCES,
  DESTINATION_MAPPING,
  SEGMENT_CATEGORIES,
} from "Components/CookieConsentManager/categories"
import { SEGMENT_WRITE_KEY, WEBFONT_URL } from "Server/config"

// Not in a `public` folder, so express.static can't serve it with the placeholders unfilled
const TEMPLATE_PATH = path.resolve(__dirname, "cityGuideOnApp.html")

let template: string | undefined

// Escape "<" so the JSON can't close the inline script
const toInlineJSON = (value: unknown): string => {
  return JSON.stringify(value).replace(/</g, "\\u003c")
}

export const renderCityGuideOnApp = (): string => {
  template = template ?? fs.readFileSync(TEMPLATE_PATH, "utf8")

  const consentConfig = {
    cookieName: COOKIE_CONSENT_MANAGER_COOKIE_NAME,
    optIn: DEFAULT_OPT_IN_PREFERENCES,
    optOut: DEFAULT_OPT_OUT_PREFERENCES,
    segmentCategories: SEGMENT_CATEGORIES,
    destinationMapping: DESTINATION_MAPPING,
    defaultCategory: DEFAULT_CATEGORIZATION,
    customDestinations: CUSTOM_DESTINATIONS.map(({ id, category }) => {
      return { id, category }
    }),
  }

  return template
    .replace(/__WEBFONT_URL__/g, () => WEBFONT_URL)
    .replace('"__SEGMENT_WRITE_KEY__"', () =>
      toInlineJSON(SEGMENT_WRITE_KEY ?? ""),
    )
    .replace("__CONSENT_CONFIG__", () => toInlineJSON(consentConfig))
}
