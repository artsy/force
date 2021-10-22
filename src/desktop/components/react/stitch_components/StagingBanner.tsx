import { useState } from "react";
import styled from "styled-components"
import { Banner, Box } from "@artsy/palette"
import { data as sd } from "sharify"

export const StagingBanner = () => {
  const [show, toggleVisible] = useState(true)

  if (!show) {
    return null
  }

  return (
    <Container onClick={() => toggleVisible(false)}>
      <Banner variant="brand">
        {sd.APP_URL.replace("https://", "").replace("http://", "")}
      </Banner>
    </Container>
  )
}

const Container = styled(Box)`
  position: relative;
  z-index: 4;
`
