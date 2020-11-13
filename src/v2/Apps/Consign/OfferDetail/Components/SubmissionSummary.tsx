import { Box, Image, StackableBorderBox, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

import { SubmissionSummary_offer } from "v2/__generated__/SubmissionSummary_offer.graphql"

interface SubmissionSummaryProps {
  offer: SubmissionSummary_offer
}

const SubmissionSummary: React.FC<SubmissionSummaryProps> = ({ offer }) => {
  const { submission } = offer

  return (
    <StackableBorderBox>
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

export const SubmissionSummaryFragmentContainer = createFragmentContainer(
  SubmissionSummary,
  {
    offer: graphql`
      fragment SubmissionSummary_offer on ConsignmentOffer {
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
  }
)

function renderImage(submission: SubmissionSummary_offer["submission"]) {
  const imageURL =
    (submission.primaryImage?.imageUrls as any)?.thumbnail ||
    (submission.assets?.[0]?.imageUrls as any)?.thumbnail

  if (!imageURL) {
    return null
  }

  return <Image src={imageURL} alt={submission.title} width={55} mr={1} />
}

function renderTitleLine(submission: SubmissionSummary_offer["submission"]) {
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
