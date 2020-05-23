import { Box, Button, Sans } from "@artsy/palette"
import { MobileTopBar } from "v2/Components/MobileTopBar"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

storiesOf("Styleguide/Components", module).add("MobileTopBar", () => {
  return (
    <React.Fragment>
      <Section title="Mobile Top Bar">
        <Box width="100%">
          <MobileTopBar>
            <Button variant="noOutline" size="small">
              Reset
            </Button>
            <Sans size="2" weight="medium">
              Filter (2)
            </Sans>
            <Button variant="primaryBlack" size="small">
              Apply
            </Button>
          </MobileTopBar>
        </Box>
      </Section>
    </React.Fragment>
  )
})
