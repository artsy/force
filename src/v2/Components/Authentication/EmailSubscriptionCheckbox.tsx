import { Serif } from "@artsy/palette"
import Checkbox from "v2/Components/Checkbox"
import React from "react"
import styled from "styled-components"

export const EmailSubscriptionCheckbox = ({
  name,
  onChange,
  onBlur,
  value,
  ...props
}) => {
  const color = "black60"
  return (
    <StyledCheckbox {...{ checked: value, onChange, onBlur, name }}>
      <Serif color={color} size="3t" ml={0.5}>
        {
          "Subscribe to Artsy emails and dive deeper into the art market with insights, auction alerts, and personalized updates."
        }
      </Serif>
    </StyledCheckbox>
  )
}

const StyledCheckbox = styled(Checkbox)`
  margin: 5px 0;
  align-items: flex-start;
`
