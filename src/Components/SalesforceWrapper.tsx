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
    src: "https://service.force.com/embeddedservice/5.0/esw.min.js",
    removeOnUnmount: true,
    onReady: () => {
      window.embedded_svc.settings.enabledFeatures = ["LiveAgent"]
      window.embedded_svc.settings.entryFeature = "LiveAgent"

      window.embedded_svc.init(
        `${getENV("SALESFORCE_CHAT_SUBDOMAIN")}.my.salesforce.com`,
        `${getENV("SALESFORCE_CHAT_SUBDOMAIN")}.my.site.com/help`,
        "https://service.force.com",
        getENV("SALESFORCE_CHAT_ID"),
        "Collector_Support_Chat",
        {
          baseLiveAgentContentURL:
            "https://c.la3-c1cs-ia2.salesforceliveagent.com/content",
          deploymentId: getENV("SALESFORCE_CHAT_DEPLOYMENT_ID"),
          buttonId: "5730r0000009kUG",
          baseLiveAgentURL:
            "https://d.la3-c1cs-ia2.salesforceliveagent.com/chat",
          eswLiveAgentDevName: "Support",
          isOfflineSupportEnabled: true,
        }
      )
    },
  })

  return null
}

SalesforceWrapper.displayName = "SalesforceWrapper"
