import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import { Col, Row } from 'react-styled-flexboxgrid'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'
import { Text } from '@artsy/reaction-force/dist/Components/Publishing'
import { PartnerFooter } from '../partner_footer.jsx'

export const SeriesFooter = (props) => {
  const { curation } = props
  const logoSrc = curation.partner_logo_footer || curation.partner_logo_header

  return (
    <FooterContainer>
      <Row className='series-footer'>
        <Col sm={4} className='col col--first'>
          <Title>About the Series</Title>
          <PartnerFooter
            logo={logoSrc}
            url={curation.partner_link_url}
          />
        </Col>
        <Col sm={7} className='col col--last'>
          <Text html={curation.about} />
          <PartnerFooter
            logo={logoSrc}
            url={curation.partner_link_url}
          />
        </Col>
      </Row>
    </FooterContainer>
  )
}

SeriesFooter.propTypes = {
  curation: PropTypes.object
}

const FooterContainer = styled.div`
  margin-bottom: 100px;
  .series-footer {
    justify-content: space-between;
  }
  .col {
    &--first {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &--last .partner-footer {
      display: none;
    }
  }
  ${pMedia.sm`
    padding: 0 20px;
    .col--first .partner-footer {
      display: none;
    }
    .col--last .partner-footer {
      display: block;
      margin-top: 80px;
    }
  `}

`
const Title = styled.div`
  ${Fonts.unica('s80', 'medium')}
  line-height: .95em;
  ${pMedia.sm`
    ${Fonts.unica('s40', 'medium')}
    margin-bottom: 20px;
  `}
`
