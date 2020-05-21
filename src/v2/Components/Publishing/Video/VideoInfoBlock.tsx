import { Flex, Sans } from "@artsy/palette"
import { formatTime } from "v2/Components/Publishing/Constants"
import { MediaData } from "v2/Components/Publishing/Typings"
import React from "react"
import styled from "styled-components"

interface Props {
  editTitle?: any
  media?: MediaData
  subTitleLink?: string
  subTitle?: string
  title?: string
}

export const VideoInfoBlock: React.SFC<Props> = props => {
  const { editTitle, media, subTitle, subTitleLink, title } = props

  return (
    <div>
      <Flex>
        {subTitle && (
          <SubTitle size="3" mr={20}>
            {subTitleLink ? <a href={subTitleLink}>{subTitle}</a> : subTitle}
          </SubTitle>
        )}
        {media.duration && <Sans size="3">{formatTime(media.duration)}</Sans>}
      </Flex>

      <Sans size="10" element="h1">
        {editTitle || title}
      </Sans>
    </div>
  )
}

const SubTitle = styled(Sans)`
  a {
    color: white;
    text-decoration: none;
  }
`
