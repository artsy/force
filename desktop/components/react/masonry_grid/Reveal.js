import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import Icon from '@artsy/reaction-force/dist/Components/Icon'

export class Reveal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isEnabled: PropTypes.bool,
    coverHeight: PropTypes.number
  }

  static defaultProps = {
    isEnabled: false,
    coverHeight: 450
  }

  state = {
    isExpanded: false
  }

  toggle () {
    const isExpanded = !this.state.isExpanded

    this.setState({
      isExpanded
    })
  }

  handleExpandClick = () => {
    if (this.props.isEnabled) {
      this.toggle()
    }
  }

  render () {
    const { coverHeight, isEnabled } = this.props
    const { isExpanded } = this.state
    const maskContent = !isExpanded && isEnabled

    return (
      <OuterContainer>
        <InnerContainer
          isEnabled={maskContent}
          coverHeight={coverHeight}
        >
          {this.props.children}
        </InnerContainer>

        {maskContent &&
          <Revealer>
            <Button onClick={this.handleExpandClick}>
              <Icon
                name='chevron-down'
                color='black'
                fontSize='25px'
              />
            </Button>
          </Revealer>
        }
      </OuterContainer>
    )
  }
}

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
    }
  }}
`

const Revealer = styled.div`
  width: 100%;
  height: 48px;
  position: absolute;
  bottom: -25px;

  &:before {
    content: '';
    border-bottom: 1px solid #e5e5e5;
    bottom: 50%;
    position: absolute;
    width: 120%;
    right: -20px;
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

OuterContainer.displayName = 'OuterContainer'
InnerContainer.displayName = 'InnerContainer'
Revealer.displayName = 'Revealer'
Button.displayName = 'Button'
