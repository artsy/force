import { getENV } from "Utils/getENV"
import { useAppendStylesheet } from "Utils/Hooks/useAppendStylesheet"
import { useLoadScript } from "Utils/Hooks/useLoadScript"
import { useEffect } from "react"

export const SalesforceWrapper: React.FC<{}> = _props => {
  const chatURL = getENV("SALESFORCE_MESSAGE_INSTANCE_URL")

  useAppendStylesheet({
    id: "salesforce-chat-styles",
    body: `
      /* Make sure it doesn't render when loaded on desktop and then the window is resized */
      @media (max-width: 767px) { /* mediaQueries.xs */
        .embeddedMessagingConversationButton {
          display: none !important;
        }
      }
    `,
  })

  useLoadScript({
    id: "salesforce-chat-script",
    src: `${chatURL}/assets/js/bootstrap.min.js`,
    removeOnUnmount: true,
    onReady: () => {
      if (window.embeddedservice_bootstrap?.settings) {
        window.embeddedservice_bootstrap.settings.language = "en_US"
        window.embeddedservice_bootstrap.init(
          getENV("SALESFORCE_MESSAGE_ORG_ID"),
          getENV("SALESFORCE_MESSAGE_SERVICE_NAME"),
          getENV("SALESFORCE_MESSAGE_INSTANCE_URL"),
          {
            scrt2URL: getENV("SALESFORCE_MESSAGE_SCRT2_URL"),
          }
        )
      }
    },
  })

  useEffect(() => {
    window.embeddedservice_bootstrap?.showHelpButton?.()
    return () => {
      window.embeddedservice_bootstrap?.hideHelpButton?.()
    }
  }, [])

  return null
}

SalesforceWrapper.displayName = "SalesforceWrapper"
