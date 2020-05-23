import { storiesOf } from "@storybook/react"
import reduce from "lodash/reduce"
import React from "react"
import styled from "styled-components"
import { StepMarker } from "../StepMarker"
const steps = [
  {
    label: "Shipping",
  },
  {
    label: "Payment",
  },
  {
    label: "Review",
  },
]
storiesOf("Components/StepMarker", module)
  .add("Basic - Start", () => {
    return (
      <Container>
        <StepMarker steps={steps} currentStepIndex={0} />
      </Container>
    )
  })
  .add("Basic - Midway", () => {
    return (
      <Container>
        <StepMarker steps={steps} currentStepIndex={1} />
      </Container>
    )
  })
  .add("Basic - end", () => {
    return (
      <Container>
        <StepMarker steps={steps} currentStepIndex={2} />
      </Container>
    )
  })
  .add("Space Constrained", () => {
    return (
      <Container width="300px">
        <StepMarker steps={steps} currentStepIndex={1} />
      </Container>
    )
  })
  .add("Tight Space", () => {
    return (
      <Container width="80px">
        <StepMarker steps={steps} currentStepIndex={1} />
      </Container>
    )
  })
  .add("Many Steps", () => {
    return (
      <Container>
        <StepMarker
          steps={reduce(new Array(5), prev => prev.concat(steps), [])}
          currentStepIndex={4}
        />
      </Container>
    )
  })

const Container = styled.div`
  min-width: ${(p: { width?: string }) => (p.width ? p.width : "100%")};
`
