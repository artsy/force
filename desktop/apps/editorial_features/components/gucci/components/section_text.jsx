import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Text } from '@artsy/reaction-force/dist/Components/Publishing'
import { Col, Row } from 'react-styled-flexboxgrid'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'
import { Share } from '@artsy/reaction-force/dist/Components/Publishing/Byline/Share'

export const SectionText = (props) => {
  const { section, curation } = props
  return (
    <SectionContainer>
      <Row className='section-text'>
        <Col lg={4}>
          <div>
            <Title>Featuring</Title>
            <Featuring>{section.featuring}</Featuring>
          </div>
          <ShareContainer>
            <Title>Share</Title>
            <Share
              url='http://artsy.net/gender-equality'
              title={section.featuring} />
          </ShareContainer>
        </Col>
        <Col lg={7}>
          <Title>About the Film</Title>
          <Text html={section.about} />
        </Col>
      </Row>
    </SectionContainer>
  )
}

SectionText.propTypes = {
  section: PropTypes.object
}

const SectionContainer = styled.div`
  margin-bottom: 180px;
  .section-text {
    justify-content: space-between;
  }
`
const Title = styled.div`
  ${Fonts.unica('s16', 'medium')}
  line-height: 1.85em;
`
const ShareContainer = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  ${Title} {
    margin-right: 20px;
    line-height: 1em;
  }
`
const Featuring = styled.div`
  ${Fonts.unica('s32', 'medium')}
  line-height: 1.25em;
`
