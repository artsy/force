import { Button, Column, GridColumns, Stack, Text } from "@artsy/palette"
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
      <GridColumns width="100%" gridRowGap={[2, 0]}>
        <Column span={7}>
          <Stack gap={[1, 0]} flex={1}>
            <Text variant="sm" color="mono100" style={{ textWrap: "balance" }}>
              {title}
            </Text>

            {description && (
              <Text variant="sm" color="mono60" style={{ textWrap: "balance" }}>
                {description}
              </Text>
            )}
          </Stack>
        </Column>

        <Column
          span={5}
          display="flex"
          justifyContent={["flex-start", "flex-end"]}
          alignItems="center"
        >
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
        </Column>
      </GridColumns>
    </Stack>
  )
}
