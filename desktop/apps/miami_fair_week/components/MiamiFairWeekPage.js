import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import colors from '@artsy/reaction-force/dist/Assets/Colors'
import { Row, Col } from '@artsy/reaction-force/dist/Components/Grid'
import Text from '@artsy/reaction-force/dist/Components/Text'
import Title from '@artsy/reaction-force/dist/Components/Title'

const Container = styled.div`
  max-width: 1192px;
  padding-top: 25px;
  @media (max-width: 48em) {
    padding: 10px 20px 0;
  }
`

const SectionTitle = Title.extend`
  margin-top: 0;
  line-height: 1;
`

const FairLogo = styled.img`
  width: 100%;
  display: inline;
  @media (min-width: 48em) {
    max-width: 160px;
  }
`

const ReveredColumnOnMobile = styled.div`
  @media (max-width: 48em) {
    display: flex;
    flex-direction: column-reverse;
  }
`

const theme = {
  flexboxgrid: {
    breakpoints: {
      // em, not pixels
      xs: 0,
      sm: 24,
      md: 48,
      lg: 64
    }
  }
}

export default (props) =>
  <ThemeProvider theme={theme}>
    <Container>
      <Row style={{ paddingBottom: 50 }}>
        <Col lg={4} md={4} sm={12} xs={12}>
          <SectionTitle titleSize="large">
            Miami Week<br />
            Dec 4-10, 2017
          </SectionTitle>
        </Col>
        <Col lg={8} md={8} sm={12} xs={12}>
          <ReveredColumnOnMobile>
            <Text textSize='large' color={colors.graySemibold} style={{ marginBottom: 20 }}>
              For one week a year, Miami becomes a global destination for art, design, music and all things visual culture. Each fair brings together the most influential collectors, gallerists, designers, curators and critics from around the world in celebration of design culture and commerce.
            </Text>
            <div>
              <img style={{ marginTop: 30, marginBottom: 20, maxWidth: '100%' }} src='https://d3vpvtm3t56z1n.cloudfront.net/images/hero.jpg' />
            </div>
          </ReveredColumnOnMobile>
        </Col>
      </Row>

      <Row style={{ paddingBottom: 50 }}>
        <Col lg={4} md={4} sm={12} xs={12}>
          <SectionTitle titleSize="large">
            Visit the fairs
          </SectionTitle>
        </Col>
        <Col lg={8} md={8} sm={12} xs={12}>
          <Row style={{ marginBottom: 20 }}>
            <Col lg={3} md={3} sm={3} xs={6}>
              <FairLogo src='https://d3vpvtm3t56z1n.cloudfront.net/images/artb.jpg' />
            </Col>
            <Col lg={3} md={3} sm={3} xs={6}>
              <FairLogo src='https://d3vpvtm3t56z1n.cloudfront.net/images/designmiami.jpg' />
            </Col>
            <Col lg={3} md={3} sm={3} xs={6}>
              <FairLogo src='https://d3vpvtm3t56z1n.cloudfront.net/images/ink.jpg' />
            </Col>
            <Col lg={3} md={3} sm={3} xs={6}>
              <FairLogo src='https://d3vpvtm3t56z1n.cloudfront.net/images/artmiami.jpg' />
            </Col>
            <Col lg={3} md={3} sm={3} xs={6}>
              <FairLogo src='https://d3vpvtm3t56z1n.cloudfront.net/images/context.jpg' />
            </Col>
            <Col lg={3} md={3} sm={3} xs={6}>
              <FairLogo src='https://d3vpvtm3t56z1n.cloudfront.net/images/aqua.jpg' />
            </Col>
            <Col lg={3} md={3} sm={3} xs={6}>
              <FairLogo src='https://d3vpvtm3t56z1n.cloudfront.net/images/pulse.jpg' />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row style={{ paddingBottom: 45 }}>
        <Col lg={4} md={4} sm={12} xs={12}>
          <SectionTitle titleSize="large">
            Artsy in Miami
          </SectionTitle>
        </Col>
        <Col lg={8} md={8} sm={12} xs={12}>
          <img style={{ marginBottom: 10, width: '100%' }} src='https://d3vpvtm3t56z1n.cloudfront.net/images/artsyinmiami.jpg' />

          <Row>
            <Col lg={7} md={12} sm={12} xs={12} style={{ marginBottom: 25 }}>
              <Text textSize='medium'>
                Collective Structures explores the relationship between individual artists and their mental landscape through a series of spatial installations. It will unfold in multiple chapters, across distinct spaces of the Bath Club, drawing on the historic building. The physical and sensory experiences strive to place viewers at a crossroads between current reality and imagined narrative.
              </Text>
            </Col>
            <Col lg={5} md={12} sm={12} xs={12} style={{ marginBottom: 25 }}>
              <Text textSize='medium' color={colors.graySemibold}>
                Public Viewing<br />
                December 7 12:00pm–6:00pm<br />
                The Bath Club<br />
                5937 Collins Ave, Miami Beach<br />
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col lg={4} md={4} sm={12} xs={12}>
          <SectionTitle titleSize="large">
            Stories from Miami
          </SectionTitle>
        </Col>
        <Col lg={8} md={8} sm={12} xs={12}>
          <Row style={{ marginBottom: 25 }}>
            <Col lg={7} md={7} sm={6} xs={12}>
              <img style={{ marginBottom: 10, width: '100%' }} src='https://d7hftxdivxxvm.cloudfront.net/?resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2FlhQti2pXrsXDLlS8jJEIDg%252F_AR_3443.jpg&width=1100&quality=95' />
            </Col>
            <Col lg={5} md={5} sm={6} xs={12}>
              <Title titleSize='small' style={{ margin: '0 0 5px', lineHeight: 1 }}>
                The 20 Best Booths at Art Basel in Miami Beach
              </Title>
              <Text textStyle='primary' textSize='small'>
                ANNA LOUIE SUSSMAN
              </Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: 25 }}>
            <Col lg={7} md={7} sm={6} xs={12}>
              <img style={{ marginBottom: 10, width: '100%' }} src='https://d7hftxdivxxvm.cloudfront.net/?resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2FvClMRePyeu9nCashzAgEeA%252F_AR_3326.jpg&width=1100&quality=95' />
            </Col>
            <Col lg={5} md={5} sm={6} xs={12}>
              <Title titleSize='small' style={{ margin: '0 0 5px', lineHeight: 1 }}>
                50 Must-See Artworks at Miami Art Week’s Satellite Fairs
              </Title>
              <Text textStyle='primary' textSize='small'>
                Artsy Editorial
              </Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: 25 }}>
            <Col lg={7} md={7} sm={6} xs={12}>
              <img style={{ marginBottom: 10, width: '100%' }} src='https://d7hftxdivxxvm.cloudfront.net/?resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2FOX8QZ5TCXVt8szczr7oWZQ%252Fammann.jpg&width=1100&quality=95' />
            </Col>
            <Col lg={5} md={5} sm={6} xs={12}>
              <Title titleSize='small' style={{ margin: '0 0 5px', lineHeight: 1 }}>
                The 10 Best Booths at Design Miami/
              </Title>
              <Text textStyle='primary' textSize='small'>
                Artsy Editorial
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </ThemeProvider>