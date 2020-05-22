import React, { Component } from "react"

import Checkbox, { CheckboxProps } from "../Checkbox"

import colors from "v2/Assets/Colors"
import { avantgarde } from "v2/Assets/Fonts"
import styled from "styled-components"

export class ForSaleCheckbox extends Component<CheckboxProps, null> {
  render() {
    const { ref, ...remainderProps } = this.props

    return (
      <CheckboxContainer>
        <Checkbox {...remainderProps}>Only for Sale</Checkbox>
      </CheckboxContainer>
    )
  }
}

const CheckboxContainer = styled.div`
  ${avantgarde("s13")};
  border: 1px solid ${colors.grayRegular};
  padding: 15px 18px;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default ForSaleCheckbox
