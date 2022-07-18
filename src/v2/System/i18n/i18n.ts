import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const translations = require("v2/System/locales/en-US/translation.json")

i18n.use(initReactI18next).init({
  debug: true,
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
})
