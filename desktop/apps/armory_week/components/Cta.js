import React from "react"
import styled from "styled-components"

import { Row, Col } from '@artsy/reaction-force/dist/Components/Grid'
import colors from "@artsy/reaction-force/dist/Assets/Colors"
import InvertedButton from "@artsy/reaction-force/dist/Components/Buttons/Inverted"
import Text from '@artsy/reaction-force/dist/Components/Text'
import Title from "@artsy/reaction-force/dist/Components/Title"
import FacebookButton from "@artsy/reaction-force/dist/Components/Buttons/Facebook"

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

const OverlayModalContainer = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: white;
  align-items: center;
  justify-content: center;
`

const ContentContainer = styled.div`
  width: 710px;
`
const Close = styled.span`
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 40px;
  color: ${colors.grayMedium};
  cursor: pointer;
`

const Separator = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid ${colors.grayRegular};
  line-height: .1em;
  margin: 20px 0 10px;
`

const SeparatorText = styled(Text)`
  color: ${colors.graySemibold};
  background: white;
  letter-spacing: normal;
  display: inline;
  padding: 0 10px;
`

const FooterLink = styled.a`
  color: ${colors.graySemibold};
  text-decoration: underline;
`

// Use the interface below once https://github.com/artsy/force/pull/2145 is merged:
// interface CtaProps {
//   ctaTitle: string
//   ctaImageUrl: string
//   ovrlayModalTitle: string
//   overlayModalImageUrl: string
// }

export class Cta extends React.Component {
  state = {
    isModalOpen: false,
  }

  openModal() {
    document.querySelector('body').style.overflow = 'hidden'
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    document.querySelector('body').style.overflow = ''
    this.setState({ isModalOpen: false })
  }

  render () {
    const { ctaTitle, ctaImageUrl, overlayModalTitle, overlayModalImageUrl } = this.props

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

        {this.state.isModalOpen && <OverlayModalContainer>
          <ContentContainer>
            <Title
              align="center"
              titleSize="large"
              style={{ lineHeight: 'normal' }}
              dangerouslySetInnerHTML={{ __html: overlayModalTitle }} />

            <Row>
              <Col xs sm md lg>
                <div style={{ background: `url(${overlayModalImageUrl})`, width: '100%', height: '100%' }} />
              </Col>
              <Col xs sm md lg>
                <form action="/log_in?modal_id=artist_page_cta" method="POST" className="auth-form" style={{ marginTop: 0 }}>
                  <div className="auth-errors" />
                  <input name="name" type="text" placeholder="Your full name" autoFocus required className="bordered-input is-block" style={{ marginTop: 0 }} />
                  <input id="js-mailcheck-input-modal" name="email" type="email" placeholder="Your email address" required className="bordered-input is-block"/>
                  <div id="js-mailcheck-hint-modal" />
                  <input name="password" type="password" placeholder="Create a password" autoComplete="on"
                         pattern=".{6,}"
                         title="6 characters minimum" required className="bordered-input is-block"/>

                  <button id="auth-submit" className="avant-garde-button-black is-block">
                    Sign Up
                  </button>
                </form>

                <Separator>
                  <SeparatorText textStyle='primary' align='center' textSize='xsmall'>
                    Or
                  </SeparatorText>
                </Separator>

                <FacebookButton block />

                <footer style={{ marginTop: '10px' }}>
                  <Text align="center" color={colors.graySemibold}
                        style={{fontSize: '13px', marginBottom: '25px', lineHeight: 'normal'}}>
                    By signing up, you agree to our&nbsp;
                    <FooterLink href="/terms">
                      Terms of Use
                    </FooterLink>
                    &nbsp;and&nbsp;
                    <FooterLink href="/privacy">
                      Privacy Policy
                    </FooterLink>
                    .
                  </Text>

                  <Text textSize="medium" align="center" color={colors.graySemibold} style={{lineHeight: 'normal'}}>
                    Already have an account?&nbsp;
                    <FooterLink>
                      Sign in.
                    </FooterLink>
                  </Text>
                </footer>
              </Col>
            </Row>
          </ContentContainer>
          <Close onClick={this.closeModal.bind(this)}>
            ×
          </Close>
        </OverlayModalContainer>}
      </StickyFooter>
    )
  }
}
