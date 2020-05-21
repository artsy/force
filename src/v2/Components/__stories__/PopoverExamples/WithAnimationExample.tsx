import React, { Children, cloneElement, ReactElement } from "react"
import Transition, { TransitionProps } from "react-transition-group/Transition"
import styled from "styled-components"
import { createGlobalStyle } from "styled-components"

import CircleIcon from "../../CircleIcon"
import { OverlayTrigger } from "../../OverlayTrigger"
import { Popover } from "../../Popover"

// FIXME: Remove and import the following two once
//        https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24778 is
//        merged.
const ENTERED = "entered"
const ENTERING = "entering"

const FADE_DURATION = 200

const GlobalStyle = createGlobalStyle<{ suppressMultiMountWarning: boolean }>`
  .fade {
    opacity: 0;
    transition: opacity ${FADE_DURATION}ms linear;
  }

  .in {
    opacity: 1;
  }
`

class Fade extends React.Component<TransitionProps> {
  private readonly fadeStyles = {
    [ENTERING]: "in",
    [ENTERED]: "in",
  }

  render() {
    const { children, ...newProps } = this.props

    return (
      <Transition {...newProps} timeout={FADE_DURATION}>
        {(status, innerProps) =>
          cloneElement(Children.only(children) as ReactElement, {
            ...innerProps,
            className: `fade ${this.fadeStyles[status]}`,
          })
        }
      </Transition>
    )
  }
}

const Container = styled.div`
  padding: 50px;
`

export class WithAnimationExample extends React.Component {
  state = {
    show: false,
  }

  render() {
    const { show } = this.state
    const popover = <Popover>Save Artwork</Popover>

    return (
      <Container>
        <GlobalStyle suppressMultiMountWarning />
        <OverlayTrigger
          show={show}
          placement="bottom"
          overlay={popover}
          transition={Fade}
        >
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
