import { Serif, space } from "@artsy/palette"
import Icon from "v2/Components/Icon"
import React, { SFC } from "react"
import styled from "styled-components"
import { media } from "../Helpers"

export const ModalHeader: SFC<{
  title?: string
  hasLogo?: boolean
}> = props => {
  const { hasLogo, title } = props

  return (
    <Header>
      {hasLogo && <Logo name="logotype" />}
      {title && (
        <Title size="5" weight="semibold">
          {title}
        </Title>
      )}
    </Header>
  )
}

const Logo = styled(Icon).attrs({
  color: "black",
  fontSize: "34px",
})`
  display: block;
  line-height: 1em;
  padding-bottom: ${space(1)}px;
  ${media.sm`
    display: none;
  `};
`

const Title = styled(Serif)`
  padding-bottom: ${space(1)}px;
`

const Header = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
`
