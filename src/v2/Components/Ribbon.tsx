import { Flex, Text } from "@artsy/palette"
import * as React from "react"
import { Media } from "v2/Utils/Responsive"

interface RibbonProps {
  ribbonText: string
  ribbonDivider?: string
}

export const Ribbon: React.FC<RibbonProps> = ({
  ribbonText,
  ribbonDivider = "•",
}) => {
  return (
    <>
      <Media lessThan="sm">
        <Flex
          bg="black100"
          justifyContent="space-between"
          alignItems="center"
          px={0.5}
          height={20}
        >
          <Text variant="md" color="white">
            {ribbonDivider}
          </Text>
          <Text variant="xs" color="white">
            {ribbonText}
          </Text>
          <Text variant="md" color="white">
            {ribbonDivider}
          </Text>
          <Text variant="xs" color="white">
            {ribbonText}
          </Text>
          <Text variant="md" color="white">
            {ribbonDivider}
          </Text>
        </Flex>
      </Media>
      <Media greaterThanOrEqual="sm">
        <Flex
          bg="black100"
          justifyContent="space-between"
          alignItems="center"
          height={20}
        >
          <Text variant="xs" color="white">
            {ribbonText}
          </Text>
          <Text variant="md" color="white">
            {ribbonDivider}
          </Text>
          <Text variant="xs" color="white">
            {ribbonText}
          </Text>
          <Text variant="md" color="white">
            {ribbonDivider}
          </Text>
          <Text variant="xs" color="white">
            {ribbonText}
          </Text>
          <Text variant="md" color="white">
            {ribbonDivider}
          </Text>
          <Text variant="xs" color="white">
            {ribbonText}
          </Text>
          <Text variant="md" color="white">
            {ribbonDivider}
          </Text>
          <Text variant="xs" color="white">
            {ribbonText}
          </Text>
          <Text variant="md" color="white">
            {ribbonDivider}
          </Text>
          <Text variant="xs" color="white">
            {ribbonText}
          </Text>
        </Flex>
      </Media>
    </>
  )
}
