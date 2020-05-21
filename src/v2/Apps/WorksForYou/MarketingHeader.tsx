import React, { Component } from "react"
import { data as sd } from "sharify"
import styled from "styled-components"

import { track } from "v2/Artsy"
import * as Schema from "v2/Artsy/Analytics/Schema"

import { Box, Button, Flex, Sans, Separator, Spacer } from "@artsy/palette"

const COLLECT_URL = `${sd.APP_URL}/collect?acquireable=true`

@track()
export class MarketingHeader extends Component {
  @track({
    action_type: Schema.ActionType.Link,
    destination_path: COLLECT_URL,
  })
  handleClick() {
    window.location.href = COLLECT_URL
  }

  render() {
    return (
      <Container onClick={this.handleClick.bind(this)}>
        <Spacer mb={1} />

        <Flex justifyContent="space-between" alignItems="center">
          <Box pr={2}>
            <Sans size="3" weight="medium">
              In-demand artworks, available to buy now
            </Sans>
            <Sans size="3" color={"black60"}>
              Collect works by today’s top artists, with transparent pricing,
              easy shipping, and a simple checkout process.
            </Sans>
          </Box>
          <Button onClick={this.handleClick}>Browse works</Button>
        </Flex>

        <Spacer mb={4} />

        <Separator />
      </Container>
    )
  }
}

const Container = styled.div`
  cursor: pointer;
`
