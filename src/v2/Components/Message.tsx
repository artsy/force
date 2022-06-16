import * as React from "react";
import styled from "styled-components"

import colors from "../Assets/Colors"

interface MessageProps extends React.HTMLProps<HTMLDivElement> {
  error?: boolean
}

const Message: React.SFC<MessageProps> = props => {
  return <div {...props}>{props.children}</div>
}

export default styled(Message)`
  color: ${colors.graySemibold};
  width: 100%;
  padding: 15px 30px;
  border: 1px solid
    ${props => (props.error ? colors.redMedium : colors.yellowMedium)};
  box-shadow: none;
  font-size: 15px;
  text-align: center;
  background-color: ${props =>
    props.error ? colors.redRegular : colors.yellowRegular};
  box-sizing: border-box;
`
