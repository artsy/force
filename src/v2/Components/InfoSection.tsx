import React from "react"
import styled from "styled-components"
import { HTML, Join, Spacer, Text } from "@artsy/palette"

const TextWithNewlines = styled(Text)`
  white-space: pre-wrap;
`
TextWithNewlines.displayName = "TextWithNewlines"

interface InfoSectionProps {
  label?: string
  info: string | JSX.Element
  type?: "html" | "text"
}

export const InfoSection: React.FC<InfoSectionProps> = ({
  label,
  info,
  type,
}) => {
  const Info = () => {
    switch (type) {
      case "html": {
        return <HTML variant="md" html={info as string} lineHeight="24px" />
      }
      case "text": {
        return (
          <TextWithNewlines variant="md" lineHeight="24px">
            {info}
          </TextWithNewlines>
        )
      }
      default: {
        return <Join separator={<Spacer mt={1} />}>{info}</Join>
      }
    }
  }

  return (
    <Join separator={<Spacer mt={1} />}>
      {label && (
        <Text variant="xs" textTransform="uppercase">
          {label}
        </Text>
      )}
      <Info />
    </Join>
  )
}
