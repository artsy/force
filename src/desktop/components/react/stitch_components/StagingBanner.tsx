import React from "react"
import styled from "styled-components"
import { Banner, Box } from "@artsy/palette"
import { data as sd } from "sharify"

export const StagingBanner = () => {
  return (
    <Container>
      <Banner
        backgroundColor="purple100"
        message={sd.APP_URL.replace("https://", "").replace("http://", "")}
      />
    </Container>
  )
}

const Container = styled(Box)`
  position: relative;
  z-index: 2;
`
