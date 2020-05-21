import { Box } from "@artsy/palette"
import { SystemContextProvider } from "v2/Artsy"
import { RecentlyViewedQueryRenderer } from "v2/Components/RecentlyViewed"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

storiesOf("Styleguide/Components", module).add("Recently Viewed", () => {
  return (
    <React.Fragment>
      <Section title="Recently Viewed">
        <Box width="70%">
          <SystemContextProvider>
            <RecentlyViewedQueryRenderer />
          </SystemContextProvider>
        </Box>
      </Section>
    </React.Fragment>
  )
})
