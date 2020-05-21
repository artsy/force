import styled from "styled-components"
import colors from "../../Assets/Colors"
import Button from "./Default"

const InvertedButton = styled(Button)`
  background: ${props => (props.disabled ? colors.graySemibold : "black")};
  color: ${props => (props.disabled ? "rgba(255,255,255,0.7)" : "white")};

  &:hover:not(:disabled) {
    background: ${colors.purpleRegular};
  }
`

export default InvertedButton
