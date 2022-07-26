import { Flex, Spacer, Text, Clickable } from "@artsy/palette"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Component } from "react"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import { withInquiry, WithInquiryProps } from "Components/Inquiry/useInquiry"
import track from "react-tracking"

interface StickyFooterProps extends WithInquiryProps {
  artworkID: string
  orderType: string | null
}

@track()
export class StickyFooter extends Component<StickyFooterProps> {
  @track(props => ({
    action_type: DeprecatedSchema.ActionType.Click,
    subject: DeprecatedSchema.Subject.BNMOReadFAQ,
    type: "button",
    flow: props.orderType === "OFFER" ? "make offer" : "buy now",
  }))
  onClickReadFAQ() {
    window.open(
      "https://support.artsy.net/hc/en-us/sections/360008203114-Buy-Now-and-Make-Offer",
      "_blank"
    )
  }

  @track(props => ({
    action_type: DeprecatedSchema.ActionType.Click,
    subject: DeprecatedSchema.Subject.BNMOAskSpecialist,
    type: "button",
    flow: props.orderType === "OFFER" ? "make offer" : "buy now",
  }))
  onClickAskSpecialist() {
    this.props.showInquiry({ askSpecialist: true })
  }

  render() {
    return (
      <>
        {this.props.inquiryComponent}

        <FooterContainer>
          <Text variant="xs" color="black60">
            Need help?{" "}
            <Clickable
              data-test="help-center-link"
              textDecoration="underline"
              onClick={this.onClickReadFAQ.bind(this)}
            >
              <Text variant="xs">Visit our help center</Text>
            </Clickable>{" "}
            or{" "}
            <Clickable
              data-test="ask-question-link"
              textDecoration="underline"
              onClick={this.onClickAskSpecialist.bind(this)}
            >
              <Text variant="xs">ask a question</Text>
            </Clickable>
            .
          </Text>
          <Spacer mb={2} />
        </FooterContainer>
      </>
    )
  }
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
