import { IntlProvider } from "react-intl"
import locale_en_us from "v2/__generated_i18n__/en-us.json"

const localizations = {
  en_US: locale_en_us,
}

export const InternationalizationProvider: React.FC = ({ children }) => {
  // In the future we use the below to get the lang dynamically and pass into the provider
  // const { lang } = useSystemContext()
  return (
    <IntlProvider
      messages={localizations["en_US"]}
      locale="en-us"
      defaultLocale="en-us"
    >
      {children}
    </IntlProvider>
  )
}
