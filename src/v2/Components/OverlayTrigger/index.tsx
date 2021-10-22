import { Component, ReactInstance, cloneElement } from "react";
import { findDOMNode } from "react-dom"
import { Overlay } from "react-overlays"
import styled from "styled-components"

import { OverlayTriggerProps } from "./types"

export class OverlayTrigger extends Component<OverlayTriggerProps> {
  private target: ReactInstance

  render() {
    const { overlay, children, ...props } = this.props

    return (
      <Container>
        <Container ref={element => (this.target = element)}>
          {children}
        </Container>

        <Overlay {...props} target={() => findDOMNode(this.target)}>
          {cloneElement(overlay, {
            ...overlay.props,
            style: {
              ...overlay.props.style,
              position: "absolute",
            },
          })}
        </Overlay>
      </Container>
    )
  }
}

const Container = styled.div`
  display: inline-block;
`
