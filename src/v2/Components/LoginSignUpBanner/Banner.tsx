import React from "react"
import { Flex, color } from "@artsy/palette"
import { BannerButton } from "./Button"
import styled from "styled-components"

const Container = styled(Flex)`
  width: 100%;
  padding: 12px;
  background-color: ${color("black100")};
`

export const Banner: React.FC<{}> = () => {
  return (
    <Container>
      <BannerButton href="/sign_up" marginRight="12px">
        Sign up
      </BannerButton>
      <BannerButton href="/log_in">Log in</BannerButton>
    </Container>
  )
}
