import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'
import { Video } from '@artsy/reaction-force/dist/Components/Publishing'

export const SectionVideo = (props) => {
  const { section, curation } = props

  return (
    <SectionVideoContainer className='SectionVideo'>
      {renderVideo(section)}
    </SectionVideoContainer>
  )
}

function renderVideo (section) {
  const videoSection = {
    url: section.video_url,
    cover_image_url: section.cover_image_url
  }

  if (section.published && videoSection.url) {
    return (
      <Video section={videoSection} trackingData={{label: section.featuring}} />
    )
  } else {
    return (
      <VideoPreview backgroundSrc={videoSection.cover_image_url || ''}>
        <ReleaseDate>
          Available {moment(section.release_date).format('MMM. D') || 'Soon'}
        </ReleaseDate>
      </VideoPreview>
    )
  }
}

SectionVideo.propTypes = {
  section: PropTypes.object
}

const SectionVideoContainer = styled.div`
  margin-bottom: 50px;
  ${pMedia.sm`
    margin-bottom: 40px;  
  `}
  .VideoCover {
    justify-content: flex-start;
    align-items: flex-end;
    padding: 15px 30px;
  }
  .PlayButton {
    background: none;
    ${Fonts.unica('s80', 'medium')}
    width: auto;
    height: auto;
    &:after {
      color: white;
      content: 'Play';
    }
    &__PlayButtonCaret {
      border-left: 45px solid white;
      border-top: 35px solid transparent;
      border-bottom: 35px solid transparent;
      margin-right 20px;
    }
  }
  ${pMedia.sm`
    .PlayButton {
      &:after {
        ${Fonts.unica('s40', 'medium')}
      }
      &__PlayButtonCaret {
        border-left: 30px solid white;
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
        margin-right 10px;
      }
    }
    .VideoCover {
      padding: 10px 20px;
    }
  `}
`

const VideoPreview = styled.div`
  height: 59vw;
  max-height: 668px;
  position: relative;
  background-image: ${props => 'url(' + props.backgroundSrc + ')'};
  background-color: black;
  background-position: 50%;
  background-size: cover;
  filter: grayscale(100%);
`

const ReleaseDate = styled.div`
  ${Fonts.unica('s80', 'medium')}
  color: white;
  display: flex;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 15px 30px;
  background: rgba(0,0,0,.5);
  ${pMedia.sm`
    ${Fonts.unica('s40', 'medium')}
    padding: 10px 20px;
  `}
`
