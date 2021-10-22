import * as React from "react";
import styled, { ThemeProvider } from "styled-components"

import colors from "v2/Assets/Colors"
import { Col, Row } from "@artsy/palette"
import Text from "v2/Components/Text"
import Title from "v2/Components/Title"

const Container = styled.div`
  margin: 0 auto;
  max-width: 1192px;
  padding-top: 25px;
  @media (max-width: 48em) {
    padding: 10px 20px 0;
  }
`

const SectionTitle = styled(Title)`
  margin-top: 0;
  line-height: 1;
`

const IntroductionText = styled(Text)`
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
      lg: 64,
    },
  },
}

interface MiamiFairWeekPageProps {
  introduction: any
  fair_coverage: any
  artsy_in_miami: any
  prepare_for_fairs: any
}

export const MiamiFairWeekPage: React.SFC<MiamiFairWeekPageProps> = ({
  introduction,
  fair_coverage,
  artsy_in_miami,
  prepare_for_fairs,
}) => (
  <ThemeProvider theme={theme}>
    <Container>
      <Row style={{ paddingBottom: 50 }}>
        <Col lg={4} md={4} sm={12} xs={12}>
          <SectionTitle
            titleSize="large"
            dangerouslySetInnerHTML={{ __html: introduction.title }}
          />
        </Col>
        <Col lg={8} md={8} sm={12} xs={12}>
          <ReveredColumnOnMobile>
            <IntroductionText
              textSize="xlarge"
              color={colors.grayDark}
              style={{ marginBottom: 20 }}
            >
              {introduction.description}
            </IntroductionText>
            <div>
              <img
                style={{ marginTop: 30, marginBottom: 20, maxWidth: "100%" }}
                src={introduction.image}
              />
            </div>
          </ReveredColumnOnMobile>
        </Col>
      </Row>

      <Row style={{ paddingBottom: 50 }}>
        <Col lg={4} md={4} sm={12} xs={12}>
          <SectionTitle titleSize="large">{fair_coverage.title}</SectionTitle>
        </Col>
        <Col lg={8} md={8} sm={12} xs={12}>
          <Row style={{ marginBottom: 20 }}>
            {fair_coverage.fairs.map(fair => (
              <Col lg={3} md={3} sm={3} xs={6} key={fair.logo_url}>
                {fair.site_url && fair.site_url.startsWith("http") ? (
                  <a href={fair.site_url} target="_blank">
                    <FairLogo src={fair.logo_url} />
                  </a>
                ) : (
                  <FairLogo src={fair.logo_url} />
                )}
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Row style={{ paddingBottom: 45 }}>
        <Col lg={4} md={4} sm={12} xs={12}>
          <SectionTitle titleSize="large">{artsy_in_miami.title}</SectionTitle>
        </Col>
        <Col lg={8} md={8} sm={12} xs={12}>
          <img
            style={{ marginBottom: 10, width: "100%" }}
            src={artsy_in_miami.banner_image_url}
          />

          <Row>
            <Col lg={7} md={12} sm={12} xs={12} style={{ marginBottom: 25 }}>
              <Text textSize="medium">{artsy_in_miami.description}</Text>
            </Col>
            <Col lg={5} md={12} sm={12} xs={12} style={{ marginBottom: 25 }}>
              <Text
                textSize="medium"
                color={colors.grayDark}
                dangerouslySetInnerHTML={{
                  __html: artsy_in_miami.public_viewing_date,
                }}
              />
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
    </Container>
  </ThemeProvider>
)
