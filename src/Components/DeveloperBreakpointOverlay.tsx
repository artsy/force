import { Box, Flex, Text, useTheme } from "@artsy/palette"
import { BREAKPOINTS } from "Utils/Responsive"
import { useCallback, useEffect, useState } from "react"

/**
 * Developer overlay that displays the current breakpoint and viewport dimensions
 * Triggered by pressing Ctrl+Shift+B (or Cmd+Shift+B on Mac)
 * Shows automatically while resizing the viewport, then fades out after 2 seconds
 */
export const DeveloperBreakpointOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  })
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("")
  const { theme } = useTheme()

  // Determine current breakpoint based on width
  const getBreakpoint = useCallback((width: number): string => {
    if (width >= BREAKPOINTS.lg) return "lg"
    if (width >= BREAKPOINTS.md) return "md"
    if (width >= BREAKPOINTS.sm) return "sm"
    return "xs"
  }, [])

  // Update dimensions and breakpoint
  const updateDimensions = useCallback(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    setDimensions({ width, height })
    setCurrentBreakpoint(getBreakpoint(width))
  }, [getBreakpoint])

  useEffect(() => {
    // Initialize dimensions
    updateDimensions()

    let resizeTimeout: NodeJS.Timeout

    // Show overlay on resize, hide after 2 seconds of no resizing
    const handleResize = () => {
      updateDimensions()
      setIsVisible(true)
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        setIsVisible(false)
      }, 2000)
    }

    // Toggle overlay with Ctrl+Shift+B (Cmd+Shift+B on Mac)
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key === "B"
      ) {
        event.preventDefault()
        setIsVisible(prev => !prev)
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("keydown", handleKeyPress)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("keydown", handleKeyPress)
      clearTimeout(resizeTimeout)
    }
  }, [updateDimensions])

  if (!isVisible) return null

  const breakpointColors = {
    xs: "rgba(255, 99, 132, 0.6)", // Red
    sm: "rgba(255, 206, 86, 0.6)", // Yellow
    md: "rgba(54, 162, 235, 0.6)", // Blue
    lg: "rgba(75, 192, 192, 0.6)", // Green
  }

  const breakpointInfo = [
    { name: "xs", min: 0, max: BREAKPOINTS.sm - 1 },
    { name: "sm", min: BREAKPOINTS.sm, max: BREAKPOINTS.md - 1 },
    { name: "md", min: BREAKPOINTS.md, max: BREAKPOINTS.lg - 1 },
    { name: "lg", min: BREAKPOINTS.lg, max: Number.POSITIVE_INFINITY },
  ]

  return (
    <>
      {/* Colored indicators at each breakpoint */}
      {breakpointInfo.map(bp => {
        const isActive = currentBreakpoint === bp.name
        return (
          <Box
            key={bp.name}
            position="fixed"
            left={bp.min}
            top={0}
            bottom={0}
            width="4px"
            bg={breakpointColors[bp.name]}
            style={{
              opacity: isActive ? 1 : 0.7,
              transition: "opacity 0.3s ease",
              boxShadow: isActive
                ? "0 0 8px rgba(0, 0, 0, 0.3)"
                : "0 0 4px rgba(0, 0, 0, 0.2)",
            }}
            zIndex={9998}
          />
        )
      })}

      {/* Breakpoint info overlay */}
      <Flex
        position="fixed"
        bottom={20}
        right={20}
        flexDirection="column"
        alignItems="flex-end"
        gap={1}
        p={3}
        bg={
          theme.name === "light"
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(0, 0, 0, 0.95)"
        }
        style={{
          backdropFilter: "blur(10px)",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          border: `2px solid ${breakpointColors[currentBreakpoint]}`,
        }}
        zIndex={9999}
      >
        {/* Current breakpoint */}
        <Text
          variant="xl"
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: breakpointColors[currentBreakpoint].replace("0.3", "1"),
            textTransform: "uppercase",
          }}
        >
          {currentBreakpoint}
        </Text>

        {/* Dimensions */}
        <Text variant="sm" color="mono60">
          {dimensions.width} × {dimensions.height}
        </Text>

        {/* Breakpoint legend */}
        <Flex
          flexDirection="column"
          gap={0.5}
          mt={2}
          pt={2}
          borderTop="1px solid"
          borderColor="mono20"
        >
          {breakpointInfo.map(bp => {
            const isActive = currentBreakpoint === bp.name
            return (
              <Flex key={bp.name} alignItems="center" gap={1}>
                <Box
                  width={12}
                  height={12}
                  bg={breakpointColors[bp.name]}
                  style={{
                    borderRadius: "2px",
                    opacity: isActive ? 1 : 0.5,
                  }}
                />
                <Text
                  variant="xs"
                  color={isActive ? "mono100" : "mono60"}
                  style={{ fontWeight: isActive ? "bold" : "normal" }}
                >
                  {bp.name}: {bp.min}px
                  {bp.max !== Number.POSITIVE_INFINITY ? `–${bp.max}px` : "+"}
                </Text>
              </Flex>
            )
          })}
        </Flex>

        {/* Help text */}
        <Text variant="xs" color="mono40" mt={1}>
          Ctrl+Shift+B to toggle
        </Text>
      </Flex>
    </>
  )
}
