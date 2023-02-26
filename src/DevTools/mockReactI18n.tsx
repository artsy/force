import i18n from "i18next"
import config from "System/i18n/config"

i18n.init(config)

// ts-prune-ignore-next
export const useTranslation = () => {
  return {
    t: i18n.t,
  }
}

// ts-prune-ignore-next
export const initReactI18next = {
  type: "3rdParty",
  init: () => {},
}
