import { Link, Serif } from "@artsy/palette"
import Checkbox from "v2/Components/Checkbox"
import React from "react"
import styled from "styled-components"

interface TermsOfServiceCheckboxProps {
  checked
  error
  name
  onBlur
  onChange
  setEmailSubscribe
  setFieldValue
}

const GdprLabel = color => {
  return (
    <>
      {"By checking this box, you consent to our "}
      <Link href="https://www.artsy.net/terms" target="_blank" color={color}>
        Terms of Use
      </Link>
      {", "}
      <Link href="https://www.artsy.net/privacy" target="_blank" color={color}>
        Privacy Policy
      </Link>
      {", and "}
      <Link
        href="https://www.artsy.net/conditions-of-sale"
        target="_blank"
        color={color}
      >
        Conditions of Sale
      </Link>
      {"."}
    </>
  )
}

const FallbackLabel = color => {
  return (
    <>
      {"I agree to the "}
      <Link href="https://www.artsy.net/terms" target="_blank" color={color}>
        Terms of Use
      </Link>
      {", "}
      <Link href="https://www.artsy.net/privacy" target="_blank" color={color}>
        Privacy Policy
      </Link>
      {", and "}
      <Link
        href="https://www.artsy.net/conditions-of-sale"
        target="_blank"
        color={color}
      >
        Conditions of Sale
      </Link>
      {" and to receiving emails from Artsy."}
    </>
  )
}

export const TermsOfServiceCheckbox: React.FC<TermsOfServiceCheckboxProps> = props => {
  const { error, onChange, setEmailSubscribe, setFieldValue } = props

  const color = error ? "red100" : "black60"

  const handleChange = event => {
    if (setEmailSubscribe) {
      const checked = event.currentTarget.checked
      setFieldValue("agreed_to_receive_emails", checked)
    }

    onChange(event)
  }

  const Label = setEmailSubscribe ? FallbackLabel : GdprLabel

  return (
    <StyledCheckbox {...props} onChange={handleChange}>
      <Serif color={color} size="3t" ml={0.5}>
        <Label color={color} />
      </Serif>
    </StyledCheckbox>
  )
}

const StyledCheckbox = styled(Checkbox)`
  margin: 5px 0;
  align-items: flex-start;
`
