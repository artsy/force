import React from "react"
import { HTML, Join, Spacer, Text } from "@artsy/palette"
import styled from "styled-components"

const TextWithNewlines = styled(Text)`
  white-space: pre-wrap;
`

const FairInfoSection: React.FC<any> = ({ label, info, isHTML = false }) => (
  <>
    {label && <Text variant="md">{label}</Text>}
    {isHTML ? (
      <HTML variant="md" html={info} />
    ) : (
      <TextWithNewlines variant="md">{info}</TextWithNewlines>
    )}
  </>
)

export const FairOrganizerInfo: React.FC<any> = ({ summary, about }) => {
  return (
    <Join separator={<Spacer mt={2} />}>
      <Text variant="md" textTransform="uppercase">
        About
      </Text>

      {summary && <FairInfoSection isHTML info={summary} />}
      {about && <FairInfoSection isHTML info={about} />}

      <Text variant="md" textTransform="uppercase">
        Follow
      </Text>
    </Join>
  )
}
