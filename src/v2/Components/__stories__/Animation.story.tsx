import { storiesOf } from "@storybook/react"
import React from "react"
import ReplaceTransition from "../Animation/ReplaceTransition"
import ItemLink, { LinkContainer } from "../Onboarding/ItemLink"

class Animator extends React.Component {
  state = { count: 0 }

  render() {
    return (
      <LinkContainer>
        <ReplaceTransition
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={400}
          onClick={() => this.setState({ count: this.state.count + 1 })}
        >
          {
            [
              <ItemLink
                id="3141"
                key="0"
                name="PABLO PICASSO"
                image_url="https://www.artsy.net/images/icon-70.png"
              />,
              <ItemLink
                id="2718"
                key="1"
                name="ANDY WARHOL"
                image_url="https://www.artsy.net/images/icon-70.png"
              />,
            ][this.state.count % 2]
          }
        </ReplaceTransition>
      </LinkContainer>
    )
  }
}

storiesOf("Components/Animations", module).add("All Animations", () => (
  <div style={{ margin: "40px" }}>
    <Animator />
  </div>
))
