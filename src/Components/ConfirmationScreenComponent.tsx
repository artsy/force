import { RouterLink } from "System/Components/RouterLink"
import { Button, Flex, Text } from "@artsy/palette"
import type React from "react"
import type { ReactElement } from "react"

export const ConfirmationScreenComponent: React.FC<
  React.PropsWithChildren<{
    title: string
    subtitle?: string
    customSubtitle?: ReactElement
    buttonText?: string
    routerLink?: string
  }>
> = ({ title, subtitle, customSubtitle, buttonText, routerLink }) => {
  return (
    <>
      <Text variant="lg" mt={4}>
        {title}
      </Text>

      {!!subtitle && (
        <Text variant="sm-display" color="mono60" mt={1} mb={6}>
          {subtitle}
        </Text>
      )}
      {!!customSubtitle && (
        <Text variant="sm-display" color="mono60" mt={1} mb={6} maxWidth={720}>
          {customSubtitle}
        </Text>
      )}

      {!!routerLink && (
        <Flex
          flexDirection={["column", "row"]}
          alignItems={["stretch", "center"]}
        >
          <RouterLink to={routerLink}>
            <Button
              width={["100%", "auto"]}
              size="large"
              variant="primaryBlack"
            >
              {buttonText}
            </Button>
          </RouterLink>
        </Flex>
      )}
    </>
  )
}
