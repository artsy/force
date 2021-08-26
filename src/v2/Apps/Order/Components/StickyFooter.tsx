import { Flex, Spacer, Text, Clickable } from "@artsy/palette"
import { SystemContextConsumer } from "v2/System"
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import React, { Component } from "react"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

interface StickyFooterProps {
  artworkId: string | null
  orderType: string | null
}

@track()
export class StickyFooter extends Component<StickyFooterProps> {
  @track<StickyFooterProps>(props => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.BNMOReadFAQ,
    type: "button",
    flow: props.orderType === "OFFER" ? "make offer" : "buy now",
  }))
  onClickReadFAQ() {
    window.open(
      "https://support.artsy.net/hc/en-us/sections/360008203114-Buy-Now-and-Make-Offer",
      "_blank"
    )
  }

  @track<StickyFooterProps>(props => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.BNMOAskSpecialist,
    type: "button",
    flow: props.orderType === "OFFER" ? "make offer" : "buy now",
  }))
  onClickAskSpecialist(mediator) {
    mediator.trigger("openOrdersContactArtsyModal", {
      artworkId: this.props.artworkId,
    })
  }

  render() {
    return (
      <FooterContainer>
        <SystemContextConsumer>
          {({ mediator }) => (
            <>
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
                  onClick={this.onClickAskSpecialist.bind(this, mediator)}
                >
                  <Text variant="xs">ask a question</Text>
                </Clickable>
                .
              </Text>
              <Spacer mb={2} />
            </>
          )}
        </SystemContextConsumer>
      </FooterContainer>
    )
  }
}

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
