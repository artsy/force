import { Serif } from "@artsy/palette"
import Checkbox from "v2/Components/Checkbox"
import React from "react"
import styled from "styled-components"

interface EmailSubscriptionCheckboxProps {
  checked
  name
  onBlur
  onChange
}

export const EmailSubscriptionCheckbox: React.FC<EmailSubscriptionCheckboxProps> = props => {
  const labelText =
    "Dive deeper into the art market with Artsy emails. Subscribe to hear about our products, services, editorials, and other promotional content. Unsubscribe at any time."

  return (
    <StyledCheckbox {...props}>
      <Serif color="black60" size="3t" ml={0.5}>
        {labelText}
      </Serif>
    </StyledCheckbox>
  )
}

const StyledCheckbox = styled(Checkbox)`
  margin: 5px 0;
  align-items: flex-start;
`
