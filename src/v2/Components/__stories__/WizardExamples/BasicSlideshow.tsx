import React from "react"
import styled from "styled-components"
import colors from "../../../Assets/Colors"
import Button from "../../Buttons/Default"
import Title from "../../Title"
import { Wizard } from "../../Wizard"
import { Step } from "../../Wizard/Step"

export const BasicSlideshow = () => {
  return (
    <Wizard>
      <Step label="Start">{makePage(colors.greenRegular, "Beginning.")}</Step>
      <Step label="Middle.">{makePage(colors.yellowBold, "Middle.")}</Step>
      <Step label="End">{makePage(colors.purpleRegular, "End.", "white")}</Step>
    </Wizard>
  )
}

const makePage: (bg, t, c?) => React.SFC<any> = (
  bgColor,
  text,
  textColor = "black"
) => props => {
  return (
    <Page color={bgColor}>
      <Title color={textColor}>{text}</Title>
      <Button onClick={props.wizard.previous}>Back</Button>
      <Button onClick={props.wizard.next}>Next</Button>
    </Page>
  )
}

const Page = styled.div`
  height: 500px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${p => p.color};
  text-align: center;
`
