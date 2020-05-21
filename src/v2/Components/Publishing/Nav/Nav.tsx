import { Flex, Serif } from "@artsy/palette"
import { PartnerInline } from "v2/Components/Publishing/Partner/PartnerInline"
import React, { ReactNode } from "react"
import Waypoint from "react-waypoint"
import styled from "styled-components"
import { Media } from "v2/Utils/Responsive"

interface Props extends React.HTMLProps<HTMLDivElement> {
  backgroundColor?: string
  canFix?: boolean
  children?: ReactNode
  color?: string
  sponsor?: any
  title?: string
  transparent?: boolean
  isSlideOpen?: boolean
}

interface State {
  isFixed: boolean
}

export class Nav extends React.Component<Props, State> {
  static defaultProps = {
    backgroundColor: "black",
    canFix: true,
    color: "white",
    transparent: false,
  }

  state = {
    isFixed: false,
  }

  setPosition = (isFixed: boolean) => {
    const { canFix } = this.props
    const currentPosition = this.state.isFixed

    if (canFix && isFixed !== currentPosition) {
      this.setState({ isFixed })
    }
  }

  render() {
    const {
      backgroundColor,
      children,
      color,
      sponsor,
      className,
      canFix,
      transparent,
      title,
      isSlideOpen,
    } = this.props
    const { isFixed } = this.state

    return (
      <div>
        <NavContainer
          backgroundColor={backgroundColor}
          className={className}
          color={color}
          isFixed={canFix && isFixed}
          transparent={!isFixed && transparent}
          isSlideOpen={isSlideOpen}
        >
          <PartnerInline
            url={sponsor && sponsor.partner_logo_link}
            logo={sponsor && sponsor.partner_condensed_logo}
            color={color}
            margin="0 10px"
          />

          <Media greaterThan="xs">
            <Title size="5" color={color} weight="semibold" textAlign="center">
              {title ? title : <a href="/articles">Artsy Editorial</a>}
            </Title>
          </Media>
          {children}
        </NavContainer>

        <Waypoint
          onEnter={() => this.setPosition(false)}
          onLeave={() => this.setPosition(true)}
        />
      </div>
    )
  }
}

export const NavContainer = styled(Flex) <{
  backgroundColor: string
  color: string
  transparent: boolean
  isFixed: boolean
  isSlideOpen: boolean
}>`
  background-color: ${props =>
    props.transparent ? "transparent" : props.backgroundColor};
  border-bottom: 1px solid ${props => props.color};
  position: relative;
  height: 52px;
  width: 100%;
  z-index: ${props => (props.isSlideOpen ? -1 : 10)};

  ${props =>
    props.transparent &&
    !props.isFixed &&
    `
    position: absolute;
    top: 0;
  `};

  ${props =>
    props.isFixed &&
    `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  `};
`

const Title = styled(Serif) <{ color: string }>`
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  display: flex;
  justify-content: center;
  color: ${props => props.color};

  a {
    color: ${props => props.color};
    text-decoration: none;
    z-index: 10;
  }
`
