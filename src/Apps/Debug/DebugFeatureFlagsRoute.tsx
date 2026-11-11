import { Box, Column, GridColumns, Separator, Text } from "@artsy/palette"
import {
  useFlag,
  useFlagsStatus,
  useVariant,
} from "@unleash/proxy-client-react"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useState } from "react"
import { Title } from "react-head"

const DEFAULT_FLAG = "onyx_art-assistant-web"

/**
 * Harness for checking that feature flags render identically on the server and
 * during hydration. Pass `?flag=<name>` to inspect a specific flag.
 *
 * Each row shows the value captured on the first render (which, on the client,
 * is the hydration render and so must match the server HTML) alongside the
 * current value. A mismatch between server and hydration surfaces as a React
 * hydration error; a difference between the two columns after load is a flash
 * of incorrect content.
 */
export const DebugFeatureFlagsRoute = () => {
  const { match } = useRouter()
  const flag = (match?.location?.query?.flag as string) || DEFAULT_FLAG

  const { featureFlags } = useSystemContext()
  const isEnabled = useFlag(flag)
  const variant = useVariant(flag)
  const { flagsReady } = useFlagsStatus()
  const isEnabledInRouterContext = !!featureFlags?.isEnabled(flag)

  return (
    <>
      <Title>Feature Flags</Title>

      <Text variant="lg-display">Feature flags</Text>

      <Text variant="sm" color="mono60">
        Inspecting <code>{flag}</code>. Pass <code>?flag=name</code> to inspect
        another.
      </Text>

      <Separator my={2} />

      <GridColumns>
        <Column span={6}>
          <Text variant="xs" color="mono60">
            Source
          </Text>
        </Column>

        <Column span={3}>
          <Text variant="xs" color="mono60">
            First render
          </Text>
        </Column>

        <Column span={3}>
          <Text variant="xs" color="mono60">
            Now
          </Text>
        </Column>
      </GridColumns>

      <DebugFeatureFlagsRow
        label="useFlag"
        value={String(isEnabled)}
        testId="useFlag"
      />

      <DebugFeatureFlagsRow
        label="useVariant"
        value={variant?.name ?? "undefined"}
        testId="useVariant"
      />

      <DebugFeatureFlagsRow
        label="useFlagsStatus().flagsReady"
        value={String(flagsReady)}
        testId="flagsReady"
      />

      <DebugFeatureFlagsRow
        label="SystemContext featureFlags.isEnabled"
        value={String(isEnabledInRouterContext)}
        testId="routerContext"
      />
    </>
  )
}

interface DebugFeatureFlagsRowProps {
  label: string
  value: string
  testId: string
}

const DebugFeatureFlagsRow: React.FC<DebugFeatureFlagsRowProps> = ({
  label,
  value,
  testId,
}) => {
  const [firstRenderValue] = useState(value)

  return (
    <Box py={1} data-testid={testId}>
      <GridColumns>
        <Column span={6}>
          <Text variant="sm">{label}</Text>
        </Column>

        <Column span={3}>
          <Text variant="sm" data-testid={`${testId}-first`}>
            {firstRenderValue}
          </Text>
        </Column>

        <Column span={3}>
          <Text
            variant="sm"
            data-testid={`${testId}-now`}
            color={value === firstRenderValue ? "mono100" : "red100"}
          >
            {value}
          </Text>
        </Column>
      </GridColumns>
    </Box>
  )
}
