import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import colors from '@artsy/reaction-force/dist/Assets/Colors'
import { Row, Col } from '@artsy/reaction-force/dist/Components/Grid'
import Text from '@artsy/reaction-force/dist/Components/Text'
import Title from "@artsy/reaction-force/dist/Components/Title"
import InvertedButton from "@artsy/reaction-force/dist/Components/Buttons/Inverted"

const Container = styled.div`
  margin: 0 auto;
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

const IntroductionText = Text.extend`
  line-height: 31px;
  @media (max-width: 24em) {
    font-size: 20px;
    line-height: 26px;
  }
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
    img {
      margin-left: auto;
      margin-right: auto;
    }
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

const Cta = styled.div`
  cursor: pointer;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100px;
  width: 100%;
  background-color: #fff;
  z-index: 999;
  border-top: 2px solid #6e1fff;
`

const CtaImage = styled.img`
  box-flex: 1;
  flex: 0 0 60px;
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

const FlexCol = styled.div`
  display: flex;
  align-items: center;
`

export default ({ introduction, fair_coverage, event, prepare_for_fairs }) => (
  <ThemeProvider theme={theme}>
    <Container>
      <Row style={{ paddingBottom: 50 }}>
        <Col lg={4} md={4} sm={12} xs={12}>
          <SectionTitle titleSize="large" dangerouslySetInnerHTML={{ __html: introduction.title }} />
        </Col>
        <Col lg={8} md={8} sm={12} xs={12}>
          <ReveredColumnOnMobile>
            <IntroductionText textSize='xlarge' color={colors.grayDark} style={{ marginBottom: 20 }}>
              {introduction.description}
            </IntroductionText>
            <div>
              <img style={{ marginTop: 30, marginBottom: 20, maxWidth: '100%' }} src='https://d3vpvtm3t56z1n.cloudfront.net/images/hero.jpg' />
            </div>
          </ReveredColumnOnMobile>
        </Col>
      </Row>

      <Row style={{ paddingBottom: 50 }}>
        <Col lg={4} md={4} sm={12} xs={12}>
          <SectionTitle titleSize="large">
            {fair_coverage.title}
          </SectionTitle>
        </Col>
        <Col lg={8} md={8} sm={12} xs={12}>
          <Row style={{ marginBottom: 20 }}>
            {fair_coverage.fairs.map(fair =>
              <Col lg={3} md={3} sm={3} xs={6} key={fair.logo_url}>
                {(fair.site_url && fair.site_url.startsWith('http') ?
                  <a href={fair.site_url} target='_blank'>
                    <FairLogo src={fair.logo_url} />
                  </a>
                :
                  <FairLogo src={fair.logo_url} />
                )}
              </Col>
            )}
          </Row>
        </Col>
      </Row>

      <Row style={{ paddingBottom: 45 }}>
        <Col lg={4} md={4} sm={12} xs={12}>
          <SectionTitle titleSize="large">
            {event.title}
          </SectionTitle>
        </Col>
        <Col lg={8} md={8} sm={12} xs={12}>
          <img style={{ marginBottom: 10, width: '100%' }} src={event.banner_image_url} />

          <Row>
            <Col lg={7} md={12} sm={12} xs={12} style={{ marginBottom: 25 }}>
              <Text textSize='medium'>
                {event.description}
              </Text>
            </Col>
            <Col lg={5} md={12} sm={12} xs={12} style={{ marginBottom: 25 }}>
              <Text textSize='medium' color={colors.grayDark} dangerouslySetInnerHTML={{ __html: event.public_viewing_date }} />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col lg={4} md={4} sm={12} xs={12}>
          <SectionTitle titleSize="large">
            {prepare_for_fairs.title}
          </SectionTitle>
        </Col>
        <Col lg={8} md={8} sm={12} xs={12}>
          {prepare_for_fairs.articles.map(article => (
            <Row style={{ marginBottom: 25 }} key={article.title}>
              <Col lg={7} md={7} sm={6} xs={12}>
                <a href={article.article_url} target="_blank">
                  <img
                    style={{ marginBottom: 10, width: "100%" }}
                    src={article.image_url}
                  />
                </a>
              </Col>
              <Col lg={5} md={5} sm={6} xs={12}>
                <a
                  href={article.article_url}
                  style={{ textDecoration: "none" }}
                  target="_blank"
                >
                  <Title
                    titleSize="small"
                    style={{ margin: "0 0 5px", lineHeight: 1 }}
                  >
                    {article.title}
                  </Title>
                  <Text textStyle="primary" textSize="small">
                    {article.author}
                  </Text>
                </a>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
      <Cta>
        <Container style={{ padding: "20px 0", display: "flex" }}>
          <FlexCol>
            <CtaImage src="https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&width=150&height=149&quality=95&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FE-k-uLoQADM8AjadsSKHrA%2Fsquare.jpg" />
          </FlexCol>
          <FullWidthCol style={{ fontSize: "26px" }}>
            A better way to experience Armory Week 2018
          </FullWidthCol>
          <FlexCol>
            <InvertedButton style={{ marginRight: "30px", width: "160px" }}>
              Sign Up
            </InvertedButton>
          </FlexCol>
        </Container>
      </Cta>
    </Container>
  </ThemeProvider>
);