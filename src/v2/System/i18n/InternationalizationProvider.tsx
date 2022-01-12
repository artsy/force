import { IntlProvider } from "react-intl"

const localizations = {
  en_US: {
    message: "",
  },
}

export const InternationalizationProvider: React.FC = ({ children }) => {
  // In the future we use the below to get the lang dynamically and pass into the provider
  // const { lang } = useSystemContext()
  return (
    <IntlProvider
      messages={localizations["en_US"]}
      locale="en-us"
      defaultLocale="en-us" >
      {children}
    </IntlProvider>
  )
}
