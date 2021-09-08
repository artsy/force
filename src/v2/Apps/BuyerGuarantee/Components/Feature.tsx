import React from "react"
import {
  ArrowRightIcon,
  Box,
  Button,
  Flex,
  IconProps,
  Text,
} from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"

interface FeatureProps {
  title: string
  text?: string
  forcedSecondLine?: string
  icon: React.FC<IconProps>
  onClick?: () => void
}

export const Feature: React.FC<FeatureProps> = ({
  title,
  text,
  forcedSecondLine,
  icon,
  onClick,
}) => {
  const Icon = icon
  const learnMore = (
    <Flex pt={2} justifyContent="center">
      <Button inline variant="noOutline" onClick={onClick}>
        <Flex alignItems="center">
          <Text variant="sm">Learn More</Text>
          <ArrowRightIcon height="17px" width="17px" ml="2px" />
        </Flex>
      </Button>
    </Flex>
  )

  return (
    <Flex
      px={1}
      flexDirection="column"
      width={["50%", "100%"]}
      textAlign="center"
      alignItems="center"
    >
      <Box>
        <Icon height={60} width={60} />
      </Box>
      <Flex flexDirection={["row", "column"]} alignItems="center">
        <Text fontWeight="bold" my={2} variant="sm">
          {title}
        </Text>
        <Media greaterThan="xs">
          <Text variant="xs">{text}</Text>
          {!!forcedSecondLine && <Text variant="xs">{forcedSecondLine}</Text>}
          {!!onClick && <Box>{learnMore}</Box>}
        </Media>
        <Media lessThan="sm">
          {!!onClick && <ArrowRightIcon height="20px" width="20px" my={2} />}
        </Media>
      </Flex>
    </Flex>
  )
}
