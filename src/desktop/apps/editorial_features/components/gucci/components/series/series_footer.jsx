import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import { pMedia } from 'reaction/Components/Helpers'
import { Col, Row } from 'reaction/Components/Grid'
import { unica } from 'reaction/Assets/Fonts'
import { Text, PartnerBlock } from 'reaction/Components/Publishing'

export const SeriesFooter = props => {
  const { curation, isMobile } = props
  const logoSrc = curation.partner_logo_footer || curation.partner_logo_primary
  const logoUrl = curation.partner_link_url || ''

  return (
    <SeriesFooterContainer>
      <Row className="SeriesFooter">
        <Col sm={4} className="col col--first">
          <Title>About the Series</Title>
          {!isMobile && (
            <PartnerBlock
              logo={logoSrc}
              url={logoUrl}
              trackingData={{
                type: 'external link',
                destination_path: logoUrl,
              }}
            />
          )}
        </Col>
        <Col sm={7} className="col col--last">
          <Text html={curation.about} />
          {isMobile && (
            <PartnerBlock
              logo={logoSrc}
              url={logoUrl}
              trackingData={{
                type: 'external link',
                destination_path: logoUrl,
              }}
            />
          )}
        </Col>
      </Row>
    </SeriesFooterContainer>
  )
}

SeriesFooter.propTypes = {
  curation: PropTypes.object,
  isMobile: PropTypes.bool,
}

const SeriesFooterContainer = styled.div`
  margin-bottom: 100px;
  .SeriesFooter {
    justify-content: space-between;
  }
  .PartnerBlock {
    margin-bottom: 10px;
  }
  .col {
    &--first {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  ${pMedia.sm`
    padding: 0 20px;
    .PartnerBlock {
      margin-top: 80px;
    }
  `};
`
const Title = styled.div`
  ${unica('s80')} line-height: .95em;
  ${pMedia.sm`
    ${unica('s40')}
    margin-bottom: 20px;
    margin-top: 140px;
  `};
`
