import React from "react"
import styled from "styled-components"

import CircleIcon from "../../CircleIcon"
import { OverlayTrigger } from "../../OverlayTrigger"
import { Popover } from "../../Popover"

const Container = styled.div`
  padding: 50px;
`

export class DisplayPopoverOnHoverExample extends React.Component {
  state = {
    show: false,
  }

  render() {
    const { show } = this.state
    const popover = <Popover>Save</Popover>

    return (
      <Container>
        <OverlayTrigger show={show} placement="bottom" overlay={popover}>
          <CircleIcon
            name="heart-small"
            color="black"
            fontSize="30px"
            ratio={0.5}
            onMouseEnter={() => this.setState({ show: true })}
            onMouseLeave={() => this.setState({ show: false })}
          />
        </OverlayTrigger>
      </Container>
    )
  }
}
