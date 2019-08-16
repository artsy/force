import PropTypes from "prop-types"
import React, { Component } from "react"
import styled, { css } from "styled-components"
import Icon from "reaction/Components/Icon"

export class Reveal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isEnabled: PropTypes.bool,
    isExpanded: PropTypes.bool,
    coverHeight: PropTypes.number,
  }

  static defaultProps = {
    isEnabled: false,
    isExpanded: false,
    coverHeight: 450,
  }

  state = {
    isExpanded: false,
  }

  UNSAFE_componentWillMount() {
    const { isExpanded } = this.props

    this.setState({
      isExpanded,
    })
  }

  toggle() {
    const isExpanded = !this.state.isExpanded

    this.setState({
      isExpanded,
    })
  }

  handleExpandClick = () => {
    if (this.props.isEnabled) {
      this.toggle()
    }
  }

  render() {
    const { coverHeight, isEnabled } = this.props
    const { isExpanded } = this.state
    const maskContent = !isExpanded && isEnabled

    return (
      <OuterContainer>
        <InnerContainer
          isEnabled={maskContent}
          isExpanded={isExpanded}
          coverHeight={coverHeight}
        >
          {this.props.children}
        </InnerContainer>

        {maskContent && (
          <Revealer>
            <Button onClick={this.handleExpandClick}>
              <Icon
                name="chevron-down"
                color="black"
                fontSize="24px"
                style={{
                  fontWeight: "bold",
                }}
              />
            </Button>
          </Revealer>
        )}
      </OuterContainer>
    )
  }
}

const BottomBorder = css`
  content: "";
  border-bottom: 1px solid #e5e5e5;
  bottom: 50%;
  width: 120%;
  right: -20px;
  position: absolute;
`

const OuterContainer = styled.div`
  position: relative;
`

const InnerContainer = styled.div`
  ${props => {
    if (props.isEnabled) {
      return `
        overflow: hidden;
        height: ${props.coverHeight}px;
      `
    } else if (props.isExpanded) {
      return `
        &:after {
          padding-top: 19px;
          ${BottomBorder}
          bottom: inherit;
        }
      `
    }
  }};
`

const Revealer = styled.div`
  width: 100%;
  height: 48px;
  position: absolute;
  bottom: -25px;

  &:before {
    ${BottomBorder};
  }
`

const Button = styled.div`
  cursor: pointer;
  background-color: white;
  border: 1px solid #e5e5e5;
  border-radius: 45px;
  height: 45px;
  left: 50%;
  padding: 12px 5px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 45px;
  z-index: 1;

  > span {
    font-size: 26px;
  }
`

OuterContainer.displayName = "OuterContainer"
InnerContainer.displayName = "InnerContainer"
Revealer.displayName = "Revealer"
Button.displayName = "Button"
