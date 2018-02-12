import React from "react"
import styled from "styled-components"

import colors from "@artsy/reaction-force/dist/Assets/Colors"
import InvertedButton from "@artsy/reaction-force/dist/Components/Buttons/Inverted"

import MarketingModal from '../../../components/marketing_signup_modal/index.coffee'

const StickyFooter = styled.div`
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
  cursor: pointer;
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

const FixedCol = styled.div`
  display: flex;
  align-items: center;
`

// Use the interface below once https://github.com/artsy/force/pull/2145 is merged:
// interface CtaProps {
//   ctaTitle: string
//   ctaImageUrl: string
// }

export class BannerPopUp extends React.Component {
  state = {
    isModalOpen: false,
  }

  openModal() {
    new MarketingModal().open()
  }

  render () {
    const { ctaTitle, ctaImageUrl } = this.props

    return (
      <StickyFooter>
        <Container onClick={this.openModal.bind(this)}>
          <FixedCol>
            <CtaImage src={ctaImageUrl} />
          </FixedCol>
          <FullWidthCol style={{fontSize: "26px"}}>
            {ctaTitle}
          </FullWidthCol>
          <FixedCol>
            <InvertedButton style={{marginRight: "30px", width: "160px"}}>
              Sign Up
            </InvertedButton>
          </FixedCol>
        </Container>
      </StickyFooter>
    )
  }
}
