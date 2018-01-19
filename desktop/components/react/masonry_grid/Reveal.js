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
    isEnabled: true
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

  handleToggleClick = () => {
    if (this.props.isEnabled) {
      this.toggle()
    }
  }

  render () {
    const { coverHeight, isEnabled } = this.props

    return (
      <OuterContainer>
        <InnerContainer coverHeight={coverHeight} onClick={this.handleToggleClick}>
          {this.props.children}
        </InnerContainer>

        {isEnabled &&
          <Revealer>
            <RevealButton>
              <Icon
                name='chevron-down'
                color='black'
                fontSize='25px'
              />
            </RevealButton>
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
  overflow: hidden;
  height: 450px;

  ${props => {
    if (props.coverHeight) {
      return `
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

const RevealButton = styled.div`
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
