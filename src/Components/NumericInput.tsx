import { LabeledInput } from "@artsy/palette"
import styled from "styled-components"

// Disables arrows in numeric inputs
export const NumericInput = styled(LabeledInput).attrs({
  type: "number",
  // HACK: Work around sizing issue in Drawer component by removing padding
  // to accommodate labels. Extremely unlikely to cause an issue in practice
  // because you'd have to insert prices into the quadrillions to encounter overlap.
  style: {},
})`
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`
