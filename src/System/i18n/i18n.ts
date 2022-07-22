import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { getENV } from "Utils/getENV"

const translations = require("System/i18n/locales/en-US/translation.json")

i18n.use(initReactI18next).init({
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
  supportedLngs: ["en", "en-US"],
  fallbackLng: "en-US",
  defaultNS: "translation",
  fallbackNS: "translation",
  interpolation: {
    escapeValue: false,
  },
})
