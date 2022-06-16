import styled from "styled-components"
import colors from "../../Assets/Colors"
import Button, { ButtonState } from "./Default"

const GhostButton = styled(Button)`
  background: white;
  color: ${props => {
    if (props.disabled) return "rgba(0,0,0,0.5)"
    if (props.state === ButtonState.Success) return colors.purpleRegular
    return "black"
  }};

  border: 1px solid ${colors.grayRegular};

  &:hover:not(:disabled) {
    background: white;
    color: ${colors.purpleRegular};
  }
`

export default GhostButton
