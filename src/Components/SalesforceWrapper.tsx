import { getENV } from "Utils/getENV"
import { useLoadScript } from "Utils/Hooks/useLoadScript"
import { useAppendStylesheet } from "Utils/Hooks/useAppendStylesheet"
import { themeGet } from "@styled-system/theme-get"

export const SalesforceWrapper: React.FC = () => {
  useAppendStylesheet({
    id: "salesforce-chat-styles",
    body: `
    .embeddedServiceHelpButton .helpButton .uiButton {
      background: ${themeGet("colors.black100")};
      font-family: ${themeGet("fonts.sans")};
      box-shadow: none;
    }
  
    .embeddedServiceHelpButton .helpButton .uiButton:focus {
      background: ${themeGet("colors.blue100")};
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
      window.embedded_svc.settings.enabledFeatures = ["LiveAgent"]
      window.embedded_svc.settings.entryFeature = "LiveAgent"

      window.embedded_svc.init(
        getENV("SALESFORCE_CHAT_INSTANCE_URL"),
        getENV("SALESFORCE_CHAT_HELP_URL"),
        "https://service.force.com",
        getENV("SALESFORCE_CHAT_ORG_ID"),
        getENV("SALESFORCE_CHAT_EMBEDDED_SERVICE_NAME"),
        {
          baseLiveAgentContentURL: getENV(
            "SALESFORCE_CHAT_LIVE_AGENT_CONTENT_URL"
          ),
          deploymentId: getENV("SALESFORCE_CHAT_DEPLOYMENT_ID"),
          buttonId: getENV("SALESFORCE_CHAT_BUTTON_ID"),
          baseLiveAgentURL: getENV("SALESFORCE_CHAT_LIVE_AGENT_URL"),
          eswLiveAgentDevName: getENV(
            "SALESFORCE_CHAT_ESW_LIVE_AGENT_DEV_NAME"
          ),
          isOfflineSupportEnabled: true,
        }
      )
    },
  })

  return null
}

SalesforceWrapper.displayName = "SalesforceWrapper"
