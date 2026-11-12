import {
  Box,
  Button,
  Column,
  Flex,
  GridColumns,
  Input,
  Join,
  Label,
  Link,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import {
  useFlag,
  useFlags,
  useFlagsStatus,
  useVariant,
} from "@unleash/proxy-client-react"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useDidMount } from "Utils/Hooks/useDidMount"
import { getENV } from "Utils/getENV"
import { userIsTeam } from "Utils/user"
import { useState } from "react"
import { Title } from "react-head"

const DEFAULT_FLAG = "onyx_art-assistant-web"

/**
 * Checks that a feature flag renders the same on the server and in the
 * browser. Pass `?flag=<name>` to inspect a specific flag.
 *
 * The inspector evaluates whatever flag name it's given with the server key,
 * which can see flags the frontend key can't, and the result (including any
 * variant payload) ships in the page. So in production it's limited to team
 * members. The list of enabled flags shows only what the browser already has,
 * so it's open to everyone.
 */
export const DebugFeatureFlagsRoute = () => {
  const { match } = useRouter()
  const { user } = useSystemContext()

  const flag = (match?.location?.query?.flag as string) || DEFAULT_FLAG
  const isProduction = getENV("NODE_ENV") === "production"
  const canInspect = !isProduction || userIsTeam(user)

  return (
    <>
      <Title>Feature Flags | Artsy</Title>

      <Spacer y={4} />

      <Text as="h1" variant="xl">
        Feature flags
      </Text>

      <Spacer y={1} />

      <Text variant="sm-display" color="mono60">
        Check that a flag renders the same on the server and in the browser.
      </Text>

      <Spacer y={4} />

      {canInspect ? (
        <DebugFeatureFlagsInspector flag={flag} />
      ) : (
        <Text variant="sm" color="mono60">
          Inspecting a flag is limited to team members in production.
        </Text>
      )}

      <Spacer y={6} />

      <DebugFeatureFlagsEnabledList />

      <Spacer y={6} />
    </>
  )
}

interface DebugFeatureFlagsInspectorProps {
  flag: string
}

/**
 * Each row shows the value from the first render (in the browser, the
 * hydration render, which must match the server HTML) next to its current
 * value. A value that changes after load came from the browser's first fetch
 * to the Unleash Frontend API.
 */
const DebugFeatureFlagsInspector: React.FC<DebugFeatureFlagsInspectorProps> = ({
  flag,
}) => {
  const { featureFlags } = useSystemContext()
  const isEnabled = useFlag(flag)
  const variant = useVariant(flag)
  const { flagsReady } = useFlagsStatus()
  const isEnabledInRouterContext = !!featureFlags?.isEnabled(flag)

  const variantName = variant?.name ?? "disabled"

  return (
    <>
      <DebugFeatureFlagsForm flag={flag} />

      <Spacer y={6} />

      <Flex alignItems="center" flexWrap="wrap">
        <Text variant="lg-display" mr={1}>
          {flag}
        </Text>

        <Label variant={isEnabled ? "brand" : "light"}>
          {isEnabled ? "Enabled" : "Disabled"}
        </Label>
      </Flex>

      <Text variant="sm" color="mono60">
        Variant: {variantName}
      </Text>

      <Spacer y={4} />

      <DebugFeatureFlagsTableRow
        source="Source"
        first="First render"
        now="Now"
        status="Status"
        isHeader
      />

      <Separator />

      <Join separator={<Separator />}>
        <DebugFeatureFlagsValueRow
          label="useFlag"
          value={String(isEnabled)}
          testId="useFlag"
        />

        <DebugFeatureFlagsValueRow
          label="useVariant"
          value={variantName}
          testId="useVariant"
        />

        <DebugFeatureFlagsValueRow
          label="useFlagsStatus().flagsReady"
          value={String(flagsReady)}
          testId="flagsReady"
        />

        <DebugFeatureFlagsValueRow
          label="Router context featureFlags.isEnabled"
          value={String(isEnabledInRouterContext)}
          testId="routerContext"
        />
      </Join>
    </>
  )
}

interface DebugFeatureFlagsFormProps {
  flag: string
}

/**
 * A plain GET form, so inspecting another flag loads the page from the
 * server. A client-side navigation would skip the server render, which is
 * the thing this page checks.
 */
const DebugFeatureFlagsForm: React.FC<DebugFeatureFlagsFormProps> = ({
  flag,
}) => {
  return (
    <form method="get">
      <Flex alignItems="flex-end">
        <Box flex={1} mr={1}>
          <Input
            title="Flag name"
            name="flag"
            defaultValue={flag}
            placeholder="team_feature-name"
          />
        </Box>

        <Button type="submit" variant="secondaryBlack">
          Inspect
        </Button>
      </Flex>
    </form>
  )
}

interface DebugFeatureFlagsValueRowProps {
  label: string
  value: string
  testId: string
}

const DebugFeatureFlagsValueRow: React.FC<DebugFeatureFlagsValueRowProps> = ({
  label,
  value,
  testId,
}) => {
  const [firstRenderValue] = useState(value)
  const isChanged = value !== firstRenderValue

  return (
    <Box data-testid={testId}>
      <DebugFeatureFlagsTableRow
        source={label}
        first={<span data-testid={`${testId}-first`}>{firstRenderValue}</span>}
        now={<span data-testid={`${testId}-now`}>{value}</span>}
        status={
          <Text variant="sm" color={isChanged ? "red100" : "green100"}>
            {isChanged ? "Changed after load" : "Same"}
          </Text>
        }
      />
    </Box>
  )
}

interface DebugFeatureFlagsTableRowProps {
  source: React.ReactNode
  first: React.ReactNode
  now: React.ReactNode
  status: React.ReactNode
  isHeader?: boolean
}

const DebugFeatureFlagsTableRow: React.FC<DebugFeatureFlagsTableRowProps> = ({
  source,
  first,
  now,
  status,
  isHeader = false,
}) => {
  const variant = isHeader ? "xs" : "sm"
  const color = isHeader ? "mono60" : "mono100"

  return (
    <GridColumns py={1}>
      <Column span={[12, 5]}>
        <Text variant={variant} color={color}>
          {source}
        </Text>
      </Column>

      <Column span={[4, 2]}>
        <Text variant={variant} color={color}>
          {first}
        </Text>
      </Column>

      <Column span={[4, 2]}>
        <Text variant={variant} color={color}>
          {now}
        </Text>
      </Column>

      <Column span={[4, 3]}>
        {isHeader ? (
          <Text variant={variant} color={color}>
            {status}
          </Text>
        ) : (
          status
        )}
      </Column>
    </GridColumns>
  )
}

/**
 * Every flag the browser client has enabled. Rendered only after mount: the
 * browser's list grows when its first fetch arrives, so it can't be part of
 * the server HTML.
 */
const DebugFeatureFlagsEnabledList: React.FC = () => {
  const isMounted = useDidMount()
  const toggles = useFlags()
  const [query, setQuery] = useState("")

  if (!isMounted) {
    return (
      <Text variant="sm" color="mono60">
        Loading enabled flags…
      </Text>
    )
  }

  const serverFlagNames = new Set(
    (getENV("UNLEASH_TOGGLES") ?? []).map(({ name }) => {
      return name
    }),
  )

  // Flags the server sent first, then the rest, each alphabetically
  const sortedToggles = [...toggles]
    .filter(({ name }) => {
      return name.toLowerCase().includes(query.trim().toLowerCase())
    })
    .sort((a, b) => {
      const serverOrder =
        Number(serverFlagNames.has(b.name)) -
        Number(serverFlagNames.has(a.name))

      return serverOrder || a.name.localeCompare(b.name)
    })

  return (
    <>
      <Text variant="lg-display">Enabled for you</Text>

      <Text variant="sm" color="mono60">
        {toggles.length} enabled. The server sent {serverFlagNames.size}: the
        flags it read while rendering this page. The rest arrived from the
        browser’s fetch after load.
      </Text>

      <Spacer y={2} />

      <Input
        title="Filter"
        placeholder="Flag name"
        value={query}
        onChange={({ target: { value } }) => {
          setQuery(value)
        }}
      />

      <Spacer y={2} />

      <GridColumns py={1}>
        <Column span={[12, 7]}>
          <Text variant="xs" color="mono60">
            Flag
          </Text>
        </Column>

        <Column span={[6, 3]}>
          <Text variant="xs" color="mono60">
            Variant
          </Text>
        </Column>

        <Column span={[6, 2]}>
          <Text variant="xs" color="mono60">
            Source
          </Text>
        </Column>
      </GridColumns>

      <Separator />

      <Join separator={<Separator />}>
        {sortedToggles.map(toggle => {
          return (
            <GridColumns key={toggle.name} py={1}>
              <Column span={[12, 7]}>
                <Text variant="sm">
                  <Link
                    href={`?flag=${encodeURIComponent(toggle.name)}`}
                    color="mono100"
                  >
                    {toggle.name}
                  </Link>
                </Text>
              </Column>

              <Column span={[6, 3]}>
                <Text variant="sm" color="mono60">
                  {getVariantLabel(toggle.variant?.name)}
                </Text>
              </Column>

              <Column span={[6, 2]}>
                <Text variant="sm" color="mono60">
                  {serverFlagNames.has(toggle.name) ? "Server" : "Browser"}
                </Text>
              </Column>
            </GridColumns>
          )
        })}
      </Join>

      {sortedToggles.length === 0 && (
        <Text variant="sm" color="mono60" py={1}>
          No enabled flags match “{query}”.
        </Text>
      )}
    </>
  )
}

// A flag with no variants reports the variant "disabled" even when it's on
const getVariantLabel = (name?: string) => {
  if (!name || name === "disabled") return "None"

  return name
}
