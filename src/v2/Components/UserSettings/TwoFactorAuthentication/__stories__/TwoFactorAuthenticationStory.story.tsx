import { Theme } from "@artsy/palette/dist/Theme"
import { Box } from "@artsy/palette/dist/elements/Box"
import { storiesOf } from "@storybook/react"
import React from "react"

import { SystemContextProvider } from "v2/Artsy"
import { TwoFactorAuthenticationQueryRenderer } from "../"

storiesOf("Components/UserSettings/TwoFactorAuthentication", module).add(
  "Live",
  () => {
    return (
      <SystemContextProvider>
        <Theme>
          <Box maxWidth="800px">
            <TwoFactorAuthenticationQueryRenderer />
          </Box>
        </Theme>
      </SystemContextProvider>
    )
  }
)
