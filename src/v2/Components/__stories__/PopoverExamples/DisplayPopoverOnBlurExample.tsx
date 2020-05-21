import React from "react"
import styled from "styled-components"

import Input from "../../Input"
import { OverlayTrigger } from "../../OverlayTrigger"
import { Popover } from "../../Popover"

const Container = styled.div`
  padding: 50px;
`

export class DisplayPopoverOnBlurExample extends React.Component {
  state = {
    value: "",
    show: false,
  }

  render() {
    const { show } = this.state
    const popover = <Popover>Is your email {this.state.value}?</Popover>

    return (
      <Container>
        <OverlayTrigger show={show} placement="bottom" overlay={popover}>
          <Input
            placeholder="Email"
            onChange={e =>
              this.setState({ show: false, value: e.currentTarget.value })
            }
            onBlur={() => this.setState({ show: true })}
          />
        </OverlayTrigger>
      </Container>
    )
  }
}
