import * as React from "react"
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
        return <HTML variant="sm" html={info as string} />
      }
      case "text": {
        return <TextWithNewlines variant="sm">{info}</TextWithNewlines>
      }
      default: {
        return <Join separator={<Spacer y={1} />}>{info}</Join>
      }
    }
  }

  return (
    <Join separator={<Spacer y={1} />}>
      {label && <Text variant="xs">{label}</Text>}
      <Info />
    </Join>
  )
}
