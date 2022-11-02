import { getENV } from "Utils/getENV"

// TODO: Serve static assets on the server-side
const translations = require("System/i18n/locales/en-US/translation.json")

export default {
  debug: getENV("ENABLE_I18N_DEBUG") === "true",
  resources: {
    ["en-US"]: {
      translation: translations,
    },
  },
  detection: {
    order: ["querystring"],
    lookupQuerystring: "locale",
  },
  supportedLngs: ["en-US"],
  fallbackLng: "en-US",
  defaultNS: "translation",
  fallbackNS: "translation",
  interpolation: {
    escapeValue: false,
  },
}
