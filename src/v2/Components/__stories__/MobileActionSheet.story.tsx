import {
  Box,
  Button,
  Flex,
  Sans,
  Spacer,
  StackableBorderBox,
} from "@artsy/palette"
import { MobileTopBar } from "v2/Components/MobileTopBar"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

class ActionSheet extends React.Component {
  state = {
    isOpen: true,
  }

  render() {
    return (
      <>
        {this.state.isOpen ? (
          <>
            <MobileTopBar>
              <Button variant="noOutline" size="small">
                Reset
              </Button>
              <Sans size="2" weight="medium">
                Filter (2)
              </Sans>
              <Button
                variant="primaryBlack"
                size="small"
                onClick={() => this.setState({ isOpen: false })}
              >
                Apply
              </Button>
            </MobileTopBar>
            <StackableBorderBox mt={4}>
              <Flex flexDirection="column">
                hello
                <Spacer mb={100} />
                long
                <Spacer mb={100} />
                content
                <Spacer mb={100} />
                content hello
                <Spacer mb={100} />
                long
                <Spacer mb={100} />
                content
                <Spacer mb={100} />
                content hello
                <Spacer mb={100} />
                long
                <Spacer mb={100} />
                content
                <Spacer mb={100} />
                content
              </Flex>
            </StackableBorderBox>
          </>
        ) : (
            <>
              <Button onClick={() => this.setState({ isOpen: true })}>
                Open ActionSheet
            </Button>
            </>
          )}
      </>
    )
  }
}

storiesOf("Styleguide/Components", module).add("MobileActionSheet", () => {
  return (
    <React.Fragment>
      <Section title="ActionSheet">
        <Box width="100%">
          <ActionSheet />
        </Box>
      </Section>
    </React.Fragment>
  )
})
