import { Box, Flex, Serif } from "@artsy/palette"
import React from "react"

interface NewsHeadlineProps {
  article: any
  editTitle?: any
}

export const NewsHeadline: React.SFC<NewsHeadlineProps> = props => {
  const { article, editTitle } = props
  const { title } = article

  return (
    <Box>
      <Flex flexDirection="column" maxWidth="780" mx="auto" mt="1" mb="3">
        <Serif
          size={["6", "8"]}
          lineHeight={["1.1", "initial"]}
          weight="semibold"
          element="h1"
        >
          {editTitle ? editTitle : title}
        </Serif>
      </Flex>
    </Box>
  )
}
