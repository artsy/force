import PropTypes from 'prop-types'
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import colors from 'reaction/Assets/Colors'
import { Row, Col } from 'reaction/Components/Grid'
import Text from 'reaction/Components/Text'
import Title from 'reaction/Components/Title'

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
  margin-bottom: 20px;
  color: ${colors.grayDark};
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

const ResponsiveRow = styled(Row)`
  ${props =>
    props.paddingBottom &&
    `padding-bottom: ${props.paddingBottom}px;`} @media (max-width: 48em) {
    margin-left: -8px;
    margin-right: -8px;
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
      lg: 64,
    },
  },
}

export const FairWeekPageScaffold = ({
  introduction,
  fair_coverage,
  event,
  prepare_for_fairs,
  displayStickyFooter,
}) => (
  <ThemeProvider theme={theme}>
    <Container>
      <ResponsiveRow paddingBottom={50}>
        <Col lg={4} md={4} sm={12} xs={12}>
          <SectionTitle
            titleSize="large"
            dangerouslySetInnerHTML={{ __html: introduction.title }}
          />
        </Col>

        <Col lg={8} md={8} sm={12} xs={12}>
          <ReveredColumnOnMobile>
            <IntroductionText textSize="xlarge">
              {introduction.description}
            </IntroductionText>
            <img
              style={{ marginTop: 30, marginBottom: 20, maxWidth: '100%' }}
              src={introduction.image}
            />
          </ReveredColumnOnMobile>
        </Col>
      </ResponsiveRow>

      <ResponsiveRow paddingBottom={50}>
        <Col lg={4} md={4} sm={12} xs={12}>
          <SectionTitle titleSize="large">{fair_coverage.title}</SectionTitle>
        </Col>
        <Col lg={8} md={8} sm={12} xs={12}>
          <ResponsiveRow paddingBottom={20}>
            {fair_coverage.fairs.map(fair => (
              <Col lg={3} md={3} sm={3} xs={6} key={fair.logo_url}>
                {fair.site_url && fair.site_url.startsWith('http') ? (
                  <a href={fair.site_url} target="_blank">
                    <FairLogo src={fair.logo_url} />
                  </a>
                ) : (
                  <FairLogo src={fair.logo_url} />
                )}
              </Col>
            ))}
          </ResponsiveRow>
        </Col>
      </ResponsiveRow>

      {event && (
        <ResponsiveRow paddingBottom={45}>
          <Col lg={4} md={4} sm={12} xs={12}>
            <SectionTitle titleSize="large">{event.title}</SectionTitle>
          </Col>
          <Col lg={8} md={8} sm={12} xs={12}>
            <img
              style={{ marginBottom: 10, width: '100%' }}
              src={event.banner_image_url}
            />

            <ResponsiveRow>
              <Col lg={7} md={8} sm={12} xs={12} style={{ marginBottom: 25 }}>
                <Text textSize="medium">{event.description}</Text>
              </Col>
              <Col lg={5} md={12} sm={12} xs={12} style={{ marginBottom: 25 }}>
                <Text
                  textSize="medium"
                  color={colors.grayDark}
                  dangerouslySetInnerHTML={{
                    __html: event.public_viewing_date,
                  }}
                />
              </Col>
            </ResponsiveRow>
          </Col>
        </ResponsiveRow>
      )}

      <ResponsiveRow>
        <Col lg={4} md={4} sm={12} xs={12}>
          <SectionTitle titleSize="large">
            {prepare_for_fairs.title}
          </SectionTitle>
        </Col>
        <Col lg={8} md={8} sm={12} xs={12}>
          {prepare_for_fairs.articles.map(article => (
            <ResponsiveRow paddingBottom={25} key={article.title}>
              <Col lg={7} md={7} sm={6} xs={12}>
                <a href={article.article_url} target="_blank">
                  <img
                    style={{ marginBottom: 10, width: '100%' }}
                    src={article.image_url}
                  />
                </a>
              </Col>
              <Col lg={5} md={5} sm={6} xs={12}>
                <a
                  href={article.article_url}
                  style={{ textDecoration: 'none' }}
                  target="_blank"
                >
                  <Title
                    titleSize="small"
                    style={{ margin: '0 0 5px', lineHeight: 1 }}
                  >
                    {article.title}
                  </Title>
                  <Text textStyle="primary" textSize="small">
                    {article.author}
                  </Text>
                </a>
              </Col>
            </ResponsiveRow>
          ))}
        </Col>
      </ResponsiveRow>

      {displayStickyFooter && <div id="react-root-for-cta" />}
    </Container>
  </ThemeProvider>
)

FairWeekPageScaffold.propTypes = {
  introduction: PropTypes.object,
  fair_coverage: PropTypes.object,
  event: PropTypes.object,
  prepare_for_fairs: PropTypes.object,
  displayStickyFooter: PropTypes.bool,
}
