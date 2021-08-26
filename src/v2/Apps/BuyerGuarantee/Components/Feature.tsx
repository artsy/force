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
  forcedSecondLine?: string
  icon: React.FC<IconProps>
  sm?: boolean
  onClick?: () => void
}

export const Feature: React.FC<FeatureProps> = ({
  title,
  text,
  forcedSecondLine,
  icon,
  sm,
  onClick,
}) => {
  const Icon = icon
  const learnMore = (
    <Flex pt={2} justifyContent="center">
      <Button inline variant="noOutline" onClick={onClick} mt="-4px">
        <Flex>
          <Text variant="sm">Learn More</Text>
          <ArrowRightIcon height="17px" width="17px" mt="4px" ml="2px" />
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
          <Text
            fontWeight="bold"
            variant="sm"
            my={2}
            style={{ whiteSpace: "nowrap" }}
          >
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
        <Text fontWeight="bold" my={2} variant="sm">
          {title}
        </Text>
        <Text variant="xs">{text}</Text>
        {!!forcedSecondLine && <Text variant="xs">{forcedSecondLine}</Text>}
      </Box>
      {!!onClick && <Box>{learnMore}</Box>}
    </Flex>
  )
}
