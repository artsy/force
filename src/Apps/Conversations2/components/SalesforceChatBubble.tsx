import Script from "next/script"
import { themeGet } from "@styled-system/theme-get"
import { Box } from "@artsy/palette"
import getConfig from "next/config"

export const SalesforceChatBubble: React.FC = () => {
  const { publicRuntimeConfig } = getConfig()

  return (
    <Box data-testid="salesforce-chat-bubble">
      <style jsx global>{`
        .embeddedServiceHelpButton .helpButton .uiButton {
          background: ${themeGet("colors.black100")};
          font-family: ${themeGet("fonts.sans")};
        }

        .embeddedServiceHelpButton .helpButton .uiButton:focus {
          background: ${themeGet("colors.blue100")};
        }
      `}</style>

      <Script
        src="https://service.force.com/embeddedservice/5.0/esw.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          window.embedded_svc.settings.enabledFeatures = ["LiveAgent"]
          window.embedded_svc.settings.entryFeature = "LiveAgent"

          window.embedded_svc.init(
            `${publicRuntimeConfig.NEXT_PUBLIC_SALESFORCE_CHAT_SUBDOMAIN}.my.salesforce.com`,
            `${publicRuntimeConfig.NEXT_PUBLIC_SALESFORCE_CHAT_SUBDOMAIN}.my.site.com/help`,
            "https://service.force.com",
            publicRuntimeConfig.NEXT_PUBLIC_SALESFORCE_CHAT_ID,
            "Partner_Support_Chat",
            {
              baseLiveAgentContentURL:
                "https://c.la3-c1cs-ia2.salesforceliveagent.com/content",
              deploymentId:
                publicRuntimeConfig.NEXT_PUBLIC_SALESFORCE_CHAT_DEPLOYMENT_ID,
              buttonId: "5730r0000009kUL",
              baseLiveAgentURL:
                "https://d.la3-c1cs-ia2.salesforceliveagent.com/chat",
              eswLiveAgentDevName: "Partner_Support_Chat",
              isOfflineSupportEnabled: true,
            }
          )
        }}
      />
    </Box>
  )
}
