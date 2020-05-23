import React from "react"
import styled from "styled-components"
import { ExtractProps } from "v2/Utils/ExtractProps"
import Icon from "../Icon"
import Button from "./Default"

// TODO: refactor ButtonProps so this isn't necessary
const TwitterButton = (props: ExtractProps<typeof Button>) => {
  const icon = <Icon name="twitter" color="white" />
  return (
    // @ts-ignore
    <Button {...props} icon={icon}>
      Log in with Twitter
    </Button>
  )
}

export default styled(TwitterButton)`
  background: #1d9ef4;
  color: white;
  height: 40px;
  padding: 0 30px;
  margin: 5px auto 5px;
  flex-direction: row;

  &:hover:not(:disabled) {
    background: #0d73b6;
  }
`
