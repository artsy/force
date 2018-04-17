import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { data as sd } from 'sharify'
import { pMedia } from 'reaction/Components/Helpers'
import { Col, Row } from 'reaction/Components/Grid'
import { unica } from 'reaction/Assets/Fonts'
import { Share } from 'reaction/Components/Publishing/Byline/Share'
import { Text } from 'reaction/Components/Publishing'

export const SectionText = (props) => {
  const { section } = props

  return (
    <SectionTextContainer>
      <Row className="SectionText">
        <Col sm={4} className="col col--first">
          <div>
            <Title>Featuring</Title>
            <Featuring>{section.featuring}</Featuring>
          </div>
          <ShareContainer>
            <Title>Share</Title>
            <Share
              url={`${sd.APP_URL}/gender-equality/${section.slug}`}
              title={section.featuring}
            />
          </ShareContainer>
        </Col>
        <Col sm={7} className="col col--last">
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
  `};
`

const Title = styled.div`
  ${unica('s16', 'medium')};
  line-height: 1.85em;
  ${pMedia.xs`
    ${unica('s14', 'medium')}
  `};
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
  `};
`
const Featuring = styled.div`
  ${unica('s32')};
  line-height: 1.25em;
  ${pMedia.xs`
    ${unica('s19')}
  `};
`
