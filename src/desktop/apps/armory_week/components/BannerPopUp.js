import React from 'react'
import styled from 'styled-components'

import colors from '@artsy/reaction/dist/Assets/Colors'
import InvertedButton from '@artsy/reaction/dist/Components/Buttons/Inverted'

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

  @media (max-width: 48em) {
    height: 90px;
  }
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

const Button = styled(InvertedButton)`
  margin-right: 30px;
  width: 160px;

  @media (max-width: 48em) {
    margin-right: 0;
    width: 100px;
    padding: 15px;
  }
`

const FullWidthCol = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 26px;

  @media (max-width: 48em) {
    font-size: 17px;
  }
`

const FixedCol = styled.div`
  display: flex;
  align-items: center;
`

const CtaImageContainer = styled(FixedCol)`
  @media (max-width: 48em) {
    display: none;
  }
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

  render() {
    const { ctaTitle, ctaImageUrl } = this.props

    return (
      <StickyFooter>
        <Container onClick={this.openModal.bind(this)}>
          <CtaImageContainer>
            <CtaImage src={ctaImageUrl} />
          </CtaImageContainer>
          <FullWidthCol>{ctaTitle}</FullWidthCol>
          <FixedCol>
            <Button>Sign Up</Button>
          </FixedCol>
        </Container>
      </StickyFooter>
    )
  }
}
