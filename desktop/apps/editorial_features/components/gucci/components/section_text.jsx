import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Col, Row } from 'react-styled-flexboxgrid'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'
import { Share } from '@artsy/reaction-force/dist/Components/Publishing/Byline/Share'
import { Text, Video } from '@artsy/reaction-force/dist/Components/Publishing'

export const SectionText = (props) => {
  const { section, curation } = props
  const videoSection = {
    url: 'https://youtu.be/Bv_5Zv5c-Ts',
    cover_image_url: section.cover_image_url
  }

  return (
    <SectionContainer>
      <Video section={videoSection} />
      <Row className='section-text'>
        <Col sm={4} className='col col--first'>
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
        <Col sm={7} className='col col--last'>
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
  ${pMedia.sm`
    margin-bottom: 140px;
    .col--first {
      margin-bottom: 40px;
    } 
  `}
`
const Title = styled.div`
  ${Fonts.unica('s16', 'medium')}
  line-height: 1.85em;
  font-weight: 600;
  margin-bottom: .5em;
  ${pMedia.xs`
    ${Fonts.unica('s14', 'medium')}
  `}
`
const ShareContainer = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  ${Title} {
    margin-right: 20px;
    line-height: 1em;
  }
  ${pMedia.sm`
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 2px;
    ${Title} {
      display: none;
    }
    > div {
      margin-top: 0;
    }
  `}
`
const Featuring = styled.div`
  ${Fonts.unica('s32', 'medium')}
  line-height: 1.25em;
  ${pMedia.xs`
    ${Fonts.unica('s19', 'medium')}
  `}
`
