import { Text } from "@artsy/palette"
import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { TopContextBar } from "../TopContextBar"

export default {
  title: "Components/TopContextBar",
}
export const Default = () => {
  return (
    <AppContainer>
      <TopContextBar>
        <Text variant="md">Hello World</Text>
      </TopContextBar>
    </AppContainer>
  )
}
