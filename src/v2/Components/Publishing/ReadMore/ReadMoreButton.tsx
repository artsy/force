import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { unica } from "v2/Assets/Fonts"
import { once } from "lodash"
import React from "react"
import Waypoint from "react-waypoint"
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { StandardLayoutParent } from "../Layouts/StandardLayout"

interface ReadMoreProps {
  onClick: () => void
  referrer: string
}

/**
 * @deprecated in favor of our Design System ReadMore component in @artsy/palette
 * https://palette.artsy.net/elements/layout/readmore
 */
@track({
  context_module: Schema.ContextModule.ReadMore,
  subject: Schema.Subject.ReadMore,
})
export class ReadMoreButton extends React.Component<ReadMoreProps> {
  @track({ action_type: Schema.ActionType.Impression })
  trackImpression() {
    // noop
  }

  // maps to force pageview override
  @track({ action_type: Schema.ActionType.ClickedReadMore })
  onClick() {
    this.props.onClick()
  }

  render() {
    return (
      <StandardLayoutParent>
        <ReadMoreContainer onClick={this.onClick.bind(this)}>
          <Button>Read More</Button>
        </ReadMoreContainer>
        <Waypoint onEnter={once(this.trackImpression.bind(this))} />
      </StandardLayoutParent>
    )
  }
}

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  width: 270px;
  height: 40px;
  background-color: black;
  border: 1px solid black;
  border-radius: 2px;
  ${unica("s14", "medium")};
  padding-top: 1px;

  &:hover {
    cursor: pointer;
    background-color: white;
    color: black;
  }

  ${pMedia.md`
    width: 100%;
  `};
`

export const ReadMoreContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 0;
  max-width: 1150px;
  margin: auto;
  margin-bottom: 80px;
  ${pMedia.xl`
    padding: 20px;
    padding-left: 0px;
  `};
  ${pMedia.sm`
    padding: 20px;
  `};
`
