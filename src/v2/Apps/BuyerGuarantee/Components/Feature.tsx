import React from "react"
import {
  ArrowRightIcon,
  Box,
  Button,
  Flex,
  IconProps,
  Text,
} from "@artsy/palette"

interface FeatureProps {
  title: string
  text?: string
  icon: React.FC<IconProps>
  sm?: boolean
  onClick?: () => void
}

export const Feature: React.FC<FeatureProps> = ({
  title,
  text,
  icon,
  sm,
  onClick,
}) => {
  const Icon = icon
  const learnMore = (
    <Flex pt={2} justifyContent="center">
      <Button inline variant="noOutline" onClick={onClick} mt="-4px">
        <Flex>
          <Text variant="mediumText">Learn More</Text>
          <ArrowRightIcon height="17px" width="17px" mt="2px" ml="2px" />
        </Flex>
      </Button>
    </Flex>
  )
  // MOBILE
  if (sm) {
    return (
      <Flex flexDirection="column" alignItems="center" onClick={onClick}>
        <Icon height={50} width={50} />
        <Flex>
          <Text variant="mediumText" my={2} style={{ whiteSpace: "nowrap" }}>
            {title}
          </Text>
          {!!onClick && <ArrowRightIcon height="20px" width="20px" mt={2} />}
        </Flex>
      </Flex>
    )
  }
  // DESKTOP
  return (
    <Flex
      flexDirection="column"
      width="100%"
      textAlign="center"
      alignItems="center"
      ml={[0, 2]}
    >
      <Box>
        <Icon height={60} width={60} />
      </Box>
      <Box>
        <Text my={2} variant="mediumText">
          {title}
        </Text>
        <Text variant="text">{text}</Text>
      </Box>
      {!!onClick && <Box>{learnMore}</Box>}
    </Flex>
  )
}
