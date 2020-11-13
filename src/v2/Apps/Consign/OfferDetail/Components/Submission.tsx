import { Box, Image, StackableBorderBox, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { get } from "v2/Utils/get"

import { Submission_offer } from "v2/__generated__/Submission_offer.graphql"

interface SubmissionProps {
  offer: Submission_offer
}

const Submission: React.FC<SubmissionProps> = ({ offer }) => {
  const { submission } = offer

  return (
    <StackableBorderBox flexDirection="row">
      <Box height="auto">{renderImage(submission)}</Box>
      <Box>
        <TruncatedLine>
          <Text variant="mediumText">{submission.artist.name}</Text>
          {renderTitleLine(submission)}
        </TruncatedLine>
        <TruncatedLine></TruncatedLine>
      </Box>
    </StackableBorderBox>
  )
}

export const SubmissionFragmentContainer = createFragmentContainer(Submission, {
  offer: graphql`
    fragment Submission_offer on ConsignmentOffer {
      submission {
        artist {
          name
        }
        title
        year
        assets {
          imageUrls
        }
        primaryImage {
          imageUrls
        }
      }
    }
  `,
})

function renderImage(submission: Submission_offer["submission"]) {
  const imageURL =
    get(submission, s => (s.primaryImage.imageUrls as any).thumbnail) ||
    get(submission, s => (s.assets[0].imageUrls as any).thumbnail)

  if (!imageURL) {
    return null
  }

  return <Image src={imageURL} alt={submission.title} width={55} mr={1} />
}

function renderTitleLine(submission: Submission_offer["submission"]) {
  return (
    <TruncatedLine>
      <Text variant="text" color="black60">
        {submission.year
          ? submission.title + ", " + submission.year
          : submission.title}
      </Text>
    </TruncatedLine>
  )
}

const TruncatedLine = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`
