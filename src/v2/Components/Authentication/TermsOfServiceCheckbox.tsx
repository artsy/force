import { Link, Serif } from "@artsy/palette"
import Checkbox from "v2/Components/Checkbox"
import React from "react"
import styled from "styled-components"

export const TermsOfServiceCheckbox = ({
  error,
  name,
  onChange,
  onBlur,
  value,
  ...props
}) => {
  const color = error && !value ? "red100" : "black60"
  return (
    <StyledCheckbox {...{ checked: value, error, onChange, onBlur, name }}>
      <Serif color={color} size="3t" ml={0.5}>
        {"By checking this box, you consent to our "}
        <Link
          href="https://www.artsy.net/privacy"
          target="_blank"
          color={color}
        >
          privacy policy
        </Link>
        {"."}
      </Serif>
    </StyledCheckbox>
  )
}

const StyledCheckbox = styled(Checkbox)`
  margin: 5px 0;
  align-items: flex-start;
`
