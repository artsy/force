import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { data as sd } from 'sharify'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { Col, Row } from '@artsy/reaction-force/dist/Components/Grid'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'
import { Share } from '@artsy/reaction-force/dist/Components/Publishing/Byline/Share'
import { Text } from '@artsy/reaction-force/dist/Components/Publishing'

export const SectionText = (props) => {
  const { section } = props

  return (
    <SectionTextContainer>
      <Row className='SectionText'>
        <Col sm={4} className='col col--first'>
          <div>
            <Title>Featuring</Title>
            <Featuring>{section.featuring}</Featuring>
          </div>
          <ShareContainer>
            <Title>Share</Title>
            <Share
              url={`${sd.APP_URL}/gender-equality/${section.slug}`}
              title={section.featuring} />
          </ShareContainer>
        </Col>
        <Col sm={7} className='col col--last'>
          <Title>About the Film</Title>
          <Text html={section.about} />
        </Col>
      </Row>
    </SectionTextContainer>
  )
}

SectionText.propTypes = {
  section: PropTypes.object
}

const SectionTextContainer = styled.div`
  ${pMedia.md`  
    .article__text-section {
      min-width: 100%;
    }
  `}
`

const Title = styled.div`
  ${Fonts.unica('s16', 'medium')}
  line-height: 1.85em;
  font-weight: 600;
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
  }
  a:last-child {
    padding-right: 0;
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
