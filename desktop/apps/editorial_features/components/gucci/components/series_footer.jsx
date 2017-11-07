import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { PartnerFooter } from './partner_footer.jsx'
import { Text } from '@artsy/reaction-force/dist/Components/Publishing'
import { Col, Row } from 'react-styled-flexboxgrid'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'

export const SeriesFooter = (props) => {
  const { curation } = props
  return (
    <FooterContainer>
      <Row className='series-footer'>
        <Col lg={4} className='col__first'>
          <Title>About the Series</Title>
          <PartnerFooter curation={curation} />
        </Col>
        <Col lg={7} className='col__last'>
          <Text html={curation.about} />
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
  .col__first {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`
const Title = styled.div`
  ${Fonts.unica('s80', 'medium')}
  line-height: .95em;
`
