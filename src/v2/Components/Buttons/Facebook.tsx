import React from "react"
import styled from "styled-components"
import { ExtractProps } from "v2/Utils/ExtractProps"
import Icon from "../Icon"
import Button from "./Default"

// TODO: refactor ButtonProps so this isn't necessary
const FacebookButton = (props: ExtractProps<typeof Button>) => {
  const icon = <Icon name="facebook" color={props.color || "white"} />
  return (
    <Button {...(props as any)} icon={icon}>
      {props.children || "Log in with Facebook"}
    </Button>
  )
}

export default styled(FacebookButton)`
  background: #39439c;
  color: white;
  height: 40px;
  padding: 0 30px;
  margin: 10px auto 2px;
  flex-direction: row;

  &:hover:not(:disabled) {
    background: #252c68;
  }
`
