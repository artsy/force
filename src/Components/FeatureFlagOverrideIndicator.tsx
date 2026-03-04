import { Box, Clickable, Flex, Text } from "@artsy/palette"
import {
  clearOverrides,
  getOverrides,
} from "System/FeatureFlags/featureFlagOverrides"
import { useState } from "react"

export const FeatureFlagOverrideIndicator: React.FC = () => {
  const [overrides, setOverrides] = useState(() => getOverrides())
  const [isExpanded, setIsExpanded] = useState(false)

  const entries = Object.entries(overrides)

  if (entries.length === 0) return null

  const handleClear = () => {
    clearOverrides()
    setOverrides({})
    setIsExpanded(false)
  }

  return (
    <>
      {/* Blue border around the viewport */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        style={{
          boxShadow: "inset 0 0 20px 20px rgba(16, 35, 215, 0.25)",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />

      {/* Badge */}
      <Flex
        position="fixed"
        bottom={20}
        left={20}
        flexDirection="column"
        style={{
          zIndex: 9999,
        }}
      >
        {isExpanded && (
          <Box
            p={2}
            mb={0.5}
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(8px)",
              borderRadius: "8px",
              boxShadow:
                "0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(16, 35, 215, 0.3)",
            }}
          >
            <Text variant="xs" fontWeight="bold" mb={1}>
              Unleash Overrides
            </Text>

            {entries.map(([flag, value]) => {
              return (
                <Flex key={flag} justifyContent="space-between" gap={2} mb={0.5}>
                  <Text variant="xs" color="mono60">
                    {flag}
                  </Text>
                  <Text variant="xs" fontWeight="bold">
                    {value}
                  </Text>
                </Flex>
              )
            })}

            <Clickable
              onClick={handleClear}
              mt={1}
              textDecoration="underline"
            >
              <Text variant="xs" color="red100">
                Clear all
              </Text>
            </Clickable>
          </Box>
        )}

        <Clickable onClick={() => setIsExpanded(prev => !prev)}>
          <Flex
            px={1}
            py={1}
            alignItems="center"
            gap={0.5}
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(8px)",
              borderRadius: "16px",
              boxShadow:
                "0 2px 8px rgba(0, 0, 0, 0.15), 0 0 0 1.5px rgba(16, 35, 215, 0.3)",
            }}
          >
            <Box
              width={8}
              height={8}
              bg="blue100"
              style={{ borderRadius: "50%" }}
            />
            <Text variant="xs">
              {entries.length} override{entries.length !== 1 ? "s" : ""} active
            </Text>
          </Flex>
        </Clickable>
      </Flex>
    </>
  )
}
