import { Flex, Spacer, Text, Clickable } from "@artsy/palette"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { FC } from "react"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import { withInquiry, WithInquiryProps } from "Components/Inquiry/useInquiry"
import { useTracking } from "react-tracking"

interface StickyFooterProps extends WithInquiryProps {
  artworkID: string
  orderType: string | null | undefined
  orderSource: string | null | undefined
}

export const StickyFooter: FC<StickyFooterProps> = ({
  showInquiry,
  inquiryComponent,
  orderType,
  orderSource,
}) => {
  const { trackEvent } = useTracking()

  const onClickReadFAQ = () => {
    trackEvent({
      action_type: DeprecatedSchema.ActionType.Click,
      subject: DeprecatedSchema.Subject.BNMOReadFAQ,
      type: "button",
      flow: orderType === "OFFER" ? "make offer" : "buy now",
    })

    window.open(
      "https://support.artsy.net/s/topic/0TO3b000000UessGAC/buy",
      "_blank"
    )
  }

  const onClickAskSpecialist = () => {
    trackEvent({
      action_type: DeprecatedSchema.ActionType.Click,
      subject: DeprecatedSchema.Subject.BNMOAskSpecialist,
      type: "button",
      flow: orderType === "OFFER" ? "make offer" : "buy now",
    })
    showInquiry({ askSpecialist: true })
  }

  return (
    <>
      {inquiryComponent}
      <FooterContainer>
        <Text variant="xs" color="black60">
          Need help?{" "}
          {orderSource === "private_sale" ? (
            <>
              {" "}
              Email{" "}
              <Clickable
                data-test="private-sales-email-link"
                textDecoration="underline"
              >
                <Text variant="xs">privatesales@artsy.net</Text>
              </Clickable>
              .
            </>
          ) : (
            <>
              <Clickable
                data-test="help-center-link"
                textDecoration="underline"
                onClick={onClickReadFAQ}
              >
                <Text variant="xs">Visit our help center</Text>
              </Clickable>{" "}
              or{" "}
              <Clickable
                data-test="ask-question-link"
                textDecoration="underline"
                onClick={onClickAskSpecialist}
              >
                <Text variant="xs">ask a question</Text>
              </Clickable>
              .
            </>
          )}
        </Text>
        <Spacer y={2} />
      </FooterContainer>
    </>
  )
}

export const StickyFooterWithInquiry = withInquiry(StickyFooter)

const FooterContainer = styled(Flex)`
  height: calc(46px + env(safe-area-inset-bottom));
  background-color: ${themeGet("colors.white100")};
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  border-top: 1px solid ${themeGet("colors.black10")};
  align-items: center;
  justify-content: center;
  padding-bottom: env(safe-area-inset-bottom);
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left);
`
