import * as React from "react";
import styled from "styled-components"
import { block } from "./Helpers"
import { borderedInputMixin } from "./Mixins"

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
  error?: boolean
  block?: boolean
}

/**
 * @deprecated in favor of our Design System TextArea component in @artsy/palette
 * https://palette.artsy.net/elements/inputs/textarea
 */
const TextArea: React.SFC<TextAreaProps> = props => {
  const newProps = { ...props }
  delete newProps.block
  return <textarea {...newProps} />
}

export default styled(TextArea)`
  ${borderedInputMixin}
  ${block(24)}
`
