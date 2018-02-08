import React from "react"
import styled from "styled-components"

import colors from "@artsy/reaction-force/dist/Assets/Colors"
import InvertedButton from "@artsy/reaction-force/dist/Components/Buttons/Inverted"

const StickyFooter = styled.div`
  cursor: pointer;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100px;
  width: 100%;
  background-color: #fff;
  z-index: 999;
  border-top: 2px solid ${colors.purpleRegular};
`

const Container = styled.div`
  margin: 0 auto;
  max-width: 1192px;
  padding-top: 25px;
  padding: 20px 0;
  display: flex;

  @media (max-width: 48em) {
    padding: 10px 20px 0;
  }
`

const CtaImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  margin: 0 20px 0;
`

const FullWidthCol = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const Col = styled.div`
  display: flex;
  align-items: center;
`

export const Cta = () =>
  <StickyFooter>
    <Container>
      <Col>
        <CtaImage src="https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&width=150&height=149&quality=95&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FE-k-uLoQADM8AjadsSKHrA%2Fsquare.jpg" />
      </Col>
      <FullWidthCol style={{ fontSize: "26px" }}>
        A better way to experience Armory Week 2018
      </FullWidthCol>
      <Col>
        <InvertedButton
          style={{ marginRight: "30px", width: "160px" }}
        >
          Sign Up
        </InvertedButton>
      </Col>
    </Container>
  </StickyFooter>
