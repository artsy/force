import React from "react"
import styled, { createGlobalStyle } from "styled-components"
import colors from "../Assets/Colors"
import Icon from "./Icon"

const Nav = styled.div`
  border-bottom: 1px solid ${colors.grayRegular};
  display: flex;
  height: 70px;
  align-content: center;
`

const NavIcon = styled.a`
  display: inline-block;
  font-size: 32px;
  padding: 15px 0 15px 22px;
  margin-right: 10px;
  flex: 0;
`

/* stylelint-disable-next-line */
const GlobalStyle = createGlobalStyle<{ suppressMultiMountWarning: boolean }>`
  body {
    margin: 0;
  }
`

export interface NavBarProps extends React.Props<HTMLDivElement> {
  logoLink?: string
}

const NavBar: React.SFC<NavBarProps> = props => (
  <Nav>
    <GlobalStyle suppressMultiMountWarning />
    <NavIcon href={props.logoLink}>
      <Icon name="logotype" color="black" fontSize="40px" />
    </NavIcon>
    {props.children}
  </Nav>
)

export default NavBar
