import { Box, Flex, Sans } from "@artsy/palette"
import React from "react"
import styled from "styled-components"

import { ShareDate } from "v2/Components/Publishing/Byline/ShareDate"
import { StyledText } from "v2/Components/Publishing/Sections/StyledText"
import { Text } from "v2/Components/Publishing/Sections/Text"
import { ArticleData } from "v2/Components/Publishing/Typings"
import { Media } from "v2/Utils/Responsive"

export interface VideoAboutProps {
  article: ArticleData
  color?: string
  editDescription?: any
  editCredits?: any
}

export const VideoAbout: React.SFC<VideoAboutProps> = ({
  article,
  color = "black",
  editCredits,
  editDescription,
}) => {
  const {
    media: { credits, description },
  } = article

  return (
    <VideoAboutContainer
      maxWidth={1200}
      mx="auto"
      flexDirection={["column-reverse", "column-reverse", "row", "row"]}
    >
      <Credits
        width={[1, 1, 1 / 3, 1 / 3]}
        flexDirection="column"
        pt={["80px", "80px", 0, 0]}
      >
        <Sans size="8" color={color} pb={10}>
          Credits
        </Sans>

        {editCredits ? (
          <Text layout="standard" color={color}>
            {editCredits}
          </Text>
        ) : (
            <Text layout="standard" html={credits} color={color} />
          )}

        <Media greaterThanOrEqual="md">
          <Box mt={40}>
            <ShareDate color={color} article={article} />
          </Box>
        </Media>
      </Credits>

      <Box width={[1, 1, 2 / 3, 2 / 3]}>
        <Sans size="8" color={color} pb={10}>
          About the Film
        </Sans>

        {editDescription ? (
          <Text color={color} layout="standard">
            {editDescription}
          </Text>
        ) : (
            <Text color={color} layout="standard" html={description} />
          )}

        <Media lessThan="md">
          <Box mt={40}>
            <ShareDate color={color} article={article} />
          </Box>
        </Media>
      </Box>
    </VideoAboutContainer>
  )
}

export const Credits = styled(Flex)`
  ${StyledText} {
    p {
      padding: 0;
    }
  }
`

export const VideoAboutContainer = styled(Flex)``
