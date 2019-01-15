import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import { Share } from "reaction/Components/Publishing/Byline/Share"
import { Text } from "reaction/Components/Publishing"
import { Flex, Box, Sans, media } from "@artsy/palette"

export const SectionText = props => {
  const { section } = props

  return (
    <SectionTextContainer>
      <Flex
        maxWidth="1200px"
        mx="auto"
        mb={[0, 0, 0, 100]}
        px={20}
        width="100%"
        flexDirection={["column", "column", "column", "row"]}
        justifyContent="space-between"
      >
        <Flex width={[1, 1, 1, 1 / 3]} flexDirection="column" pb={40}>
          <div>
            <Sans size={["3", "3", "3", "4"]} weight="medium">
              Featuring
            </Sans>
            <Sans size={["6", "6", "6", "8"]}>{section.featuring}</Sans>
          </div>

          <ShareContainer pt={["2px", "2px", "2px", 50]} alignItems="center">
            <Sans size={["3", "3", "3", "4"]} weight="medium" mr={20}>
              Share
            </Sans>
            <Share
              url={`${sd.APP_URL}/gender-equality/${section.slug}`}
              title={section.featuring}
            />
          </ShareContainer>
        </Flex>

        <Flex width={[1, 1, 1, 3 / 5]} flexDirection="column">
          <Sans size={["3", "3", "3", "4"]} weight="medium">
            About the Film
          </Sans>
          <Text html={section.about} />
        </Flex>
      </Flex>
    </SectionTextContainer>
  )
}

SectionText.propTypes = {
  section: PropTypes.object,
}

const SectionTextContainer = styled.div`
  position: relative;
`

const ShareContainer = styled(Flex)`
  a:last-child {
    padding-right: 0;
  }

  ${media.sm`
    position: absolute;
    top: 0;
    right: 20px;

    ${Sans} {
      display: none;
    }

    > div {
      margin-top: 0;
    }
  `};
`
