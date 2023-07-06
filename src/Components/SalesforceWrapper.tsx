import { getENV } from "Utils/getENV"
import { useLoadScript } from "Utils/Hooks/useLoadScript"
import { useAppendStylesheet } from "Utils/Hooks/useAppendStylesheet"
import { useEffect } from "react"

interface SalesforceWrapperProps {
  isInAuction?: boolean | null
}

export const SalesforceWrapper: React.FC<SalesforceWrapperProps> = ({
  isInAuction = false,
}) => {
  let embeddedService = null
  let buttonId = null
  let ewsLiveAgentDevName = null

  if (isInAuction) {
    embeddedService = getENV("SALESFORCE_CHAT_EMBEDDED_SERVICE_AUCTION_NAME")
    buttonId = getENV("SALESFORCE_CHAT_AUCTION_BUTTON_ID")
    ewsLiveAgentDevName = getENV(
      "SALESFORCE_CHAT_AUCTION_ESW_LIVE_AGENT_DEV_NAME"
    )
  } else {
    embeddedService = getENV("SALESFORCE_CHAT_EMBEDDED_SERVICE_COLLECTOR_NAME")
    buttonId = getENV("SALESFORCE_CHAT_COLLECTOR_BUTTON_ID")
    ewsLiveAgentDevName = getENV(
      "SALESFORCE_CHAT_COLLECTOR_ESW_LIVE_AGENT_DEV_NAME"
    )
  }

  useAppendStylesheet({
    id: "salesforce-chat-styles",
    body: `
      .embeddedServiceHelpButton .helpButton .uiButton {
        background: #000000; /* colors.black100 */
        font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif; /* fonts.sans */
        box-shadow: none;
      }
    
      .embeddedServiceHelpButton .helpButton .uiButton:focus {
        background: #1023D7; /* colors.blue100 */
      }
      
      /* Make sure it doesn't render when loaded on desktop and then the window is resized */
      @media (max-width: 767px) { /* mediaQueries.xs */
        .embeddedServiceHelpButton .helpButton .uiButton {
          display: none;
        }
      }
    `,
  })

  useLoadScript({
    id: "salesforce-chat-script",
    src: `${getENV(
      "SALESFORCE_CHAT_INSTANCE_URL"
    )}/embeddedservice/5.0/esw.min.js`,
    removeOnUnmount: true,
    onReady: () => {
      if (window.embedded_svc?.settings) {
        window.embedded_svc.settings.defaultMinimizedText = "Chat"
        window.embedded_svc.settings.enabledFeatures = ["LiveAgent"]
        window.embedded_svc.settings.entryFeature = "LiveAgent"

        window.embedded_svc.init(
          getENV("SALESFORCE_CHAT_INSTANCE_URL"),
          getENV("SALESFORCE_CHAT_HELP_URL"),
          "https://service.force.com",
          getENV("SALESFORCE_CHAT_ORG_ID"),
          embeddedService,
          {
            baseLiveAgentContentURL: getENV(
              "SALESFORCE_CHAT_LIVE_AGENT_CONTENT_URL"
            ),
            deploymentId: getENV("SALESFORCE_CHAT_DEPLOYMENT_ID"),
            buttonId: buttonId,
            baseLiveAgentURL: getENV("SALESFORCE_CHAT_LIVE_AGENT_URL"),
            eswLiveAgentDevName: ewsLiveAgentDevName,
            isOfflineSupportEnabled: true,
          }
        )
      }
    },
  })

  useEffect(() => {
    window.embedded_svc?.showHelpButton?.()
    return () => {
      window.embedded_svc?.hideHelpButton?.()
    }
  }, [])

  return null
}

SalesforceWrapper.displayName = "SalesforceWrapper"
