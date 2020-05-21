import { Col, Row } from "@artsy/palette"
import React from "react"
import styled from "styled-components"

import Button from "../../Buttons/Default"
import { OverlayTrigger } from "../../OverlayTrigger"
import { Popover } from "../../Popover"

const Container = styled.div`
  padding: 10px;
  background-color: #fafafa;
`

// The <OverlayTrigger> component doesn't like components with margins.
const ButtonWithoutMargin = styled(Button)`
  margin: 0;
`

const RowWithMargin = styled(Row)`
  margin: 100px 0;
`

const CenteringCol = styled(Col)`
  text-align: center;
`

const WrapContentCol = styled(Col)`
  flexgrow: 0;
`

export class DisplayPopoverOnClickExample extends React.Component {
  state = {
    show: false,
  }

  render() {
    const { show } = this.state
    const popover = <Popover>Post to Facebook</Popover>
    const oneLiner = (
      <Popover>
        Popover will stay inside of the page if positioned at the edge of the
        page
      </Popover>
    )
    const multiLines = (
      <Popover>
        Popover will stay inside
        <br />
        of the page if positioned
        <br />
        at the edge of the page
      </Popover>
    )

    return (
      <Container>
        <Row>
          <CenteringCol xs sm md lg>
            <OverlayTrigger
              container={this}
              show={show}
              placement="right"
              overlay={multiLines}
            >
              <ButtonWithoutMargin
                onClick={() => this.setState({ show: !show })}
              >
                Button
              </ButtonWithoutMargin>
            </OverlayTrigger>
          </CenteringCol>
        </Row>

        <RowWithMargin>
          <WrapContentCol>
            <OverlayTrigger show={show} placement="top" overlay={oneLiner}>
              <ButtonWithoutMargin
                onClick={() => this.setState({ show: !show })}
              >
                Button
              </ButtonWithoutMargin>
            </OverlayTrigger>
          </WrapContentCol>

          <CenteringCol xs sm md lg>
            <OverlayTrigger show={show} placement="left" overlay={popover}>
              <ButtonWithoutMargin
                onClick={() => this.setState({ show: !show })}
              >
                Button
              </ButtonWithoutMargin>
            </OverlayTrigger>
          </CenteringCol>

          <WrapContentCol>
            <OverlayTrigger show={show} placement="bottom" overlay={oneLiner}>
              <ButtonWithoutMargin
                onClick={() => this.setState({ show: !show })}
              >
                Button
              </ButtonWithoutMargin>
            </OverlayTrigger>
          </WrapContentCol>
        </RowWithMargin>

        <Row>
          <CenteringCol xs sm md lg>
            <OverlayTrigger
              container={this}
              show={show}
              placement="left"
              overlay={multiLines}
            >
              <ButtonWithoutMargin
                onClick={() => this.setState({ show: !show })}
              >
                Button
              </ButtonWithoutMargin>
            </OverlayTrigger>
          </CenteringCol>
        </Row>
      </Container>
    )
  }
}
