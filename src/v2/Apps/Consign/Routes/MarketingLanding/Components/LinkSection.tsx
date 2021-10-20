import * as React from "react";
import { Button, Flex, Link, Text } from "@artsy/palette"
import { SectionContainer } from "./SectionContainer"
import { Media } from "v2/Utils/Responsive"

interface LinkSectionProps {
  title: string
  buttonText: string
  link: string
  text: string | React.FC<{}>
  darkVariant?: boolean
}

export const LinkSection: React.FC<LinkSectionProps> = ({
  darkVariant = false,
  title,
  text,
  buttonText,
  link,
}) => {
  // Used if text contains html tags
  const TextElement = text

  return (
    <SectionContainer background={darkVariant ? "black100" : "black5"}>
      <Text
        width="100%"
        textAlign="left"
        mb={3}
        variant="largeTitle"
        color={darkVariant ? "white100" : "black100"}
      >
        {title}
      </Text>
      <Flex flexDirection="row" flexWrap="wrap" mb={3}>
        <Text variant="text" color={darkVariant ? "black5" : "black60"}>
          {typeof text === "string" ? <>{text}</> : <TextElement />}
        </Text>
      </Flex>
      <Media greaterThanOrEqual="sm">
        <Link href={link}>
          <Button variant="secondaryOutline">{buttonText}</Button>
        </Link>
      </Media>
      <Media lessThan="sm">
        <Link href={link}>
          <Button variant="secondaryOutline" size="large" width="100%">
            {buttonText}
          </Button>
        </Link>
      </Media>
    </SectionContainer>
  )
}
