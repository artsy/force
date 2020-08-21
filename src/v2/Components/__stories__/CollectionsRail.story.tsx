import { Theme } from "@artsy/palette/dist/Theme"
import { Box } from "@artsy/palette/dist/elements/Box"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import styled from "styled-components"

import { CollectionsRailContent } from "../CollectionsRail"

const RailsContainer = styled(Box)`
  max-width: 1250px;
`

storiesOf("Components/CollectionsRail", module).add(
  "Collections Rail Content",
  () => (
    <Theme>
      <RailsContainer width="100%">
        <CollectionsRailContent articleId="123" />
      </RailsContainer>
    </Theme>
  )
)
