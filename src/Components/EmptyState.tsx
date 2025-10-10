import { Button, Stack, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import React from "react"

interface EmptyStateProps {
  title: string
  description?: string | JSX.Element
  action?:
    | ({ label: string } & ({ href: string } | { onClick: () => void }))
    | JSX.Element
}

const isElement = (value: unknown): value is JSX.Element =>
  React.isValidElement(value)

export const EmptyState: React.FC<React.PropsWithChildren<EmptyStateProps>> = ({
  title,
  description,
  action,
}) => {
  return (
    <Stack
      gap={2}
      flexDirection={["column", "row"]}
      bg="mono5"
      p={2}
      alignItems={["flex-start", "center"]}
    >
      <Stack gap={[1, 0]} flex={1}>
        <Text variant="md" color="mono100">
          {title}
        </Text>

        {description && (
          <Text variant="md" color="mono60">
            {description}
          </Text>
        )}
      </Stack>

      {action &&
        (isElement(action) ? (
          action
        ) : (
          <Button
            variant="secondaryNeutral"
            {...("href" in action
              ? { href: action.href, as: RouterLink }
              : { onClick: action.onClick })}
          >
            {action.label}
          </Button>
        ))}
    </Stack>
  )
}
