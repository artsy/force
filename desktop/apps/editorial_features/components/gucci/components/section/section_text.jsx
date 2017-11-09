import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { data as sd } from 'sharify'
import { slugify } from 'underscore.string'
import { Col, Row } from 'react-styled-flexboxgrid'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'
import { Share } from '@artsy/reaction-force/dist/Components/Publishing/Byline/Share'
import { Text } from '@artsy/reaction-force/dist/Components/Publishing'

export const SectionText = (props) => {
  const { section, curation } = props
  const slug = slugify(section.title.replace(/I/g, ''))

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
              url={`${sd.APP_URL}/gender-equality/${slug}`}
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
