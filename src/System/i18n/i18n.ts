import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import config from "System/i18n/config"

i18n.use(initReactI18next).init(config)

export default i18n
