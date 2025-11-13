import { Z } from "Apps/Components/constants"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import { useJump } from "Utils/Hooks/useJump"
import { Media } from "Utils/Responsive"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Box, HorizontalOverflow, Pill, Stack, useTheme } from "@artsy/palette"
import {
  createContext,
  createRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useTracking } from "react-tracking"

export const SECTIONS = [
  { id: "mission-and-vision", label: "Mission and Vision", offset: 0 },
  { id: "our-story", label: "Our Story", offset: 0 },
  { id: "what-we-do", label: "What We Do", offset: 20 },
  { id: "our-team", label: "Our Team", offset: 0 },
  { id: "press", label: "Press", offset: 20 },
  { id: "contact", label: "Contact", offset: 20 },
] as const

export const INDEXED_SECTIONS = SECTIONS.reduce(
  (acc, section) => {
    acc[section.id] = section
    return acc
  },
  {} as Record<string, (typeof SECTIONS)[number]>
)

export type Section = (typeof SECTIONS)[number]["id"]

export const AboutNav = () => {
  const { trackEvent } = useTracking()

  const { theme } = useTheme()

  const { active, activate, visible } = useAboutNav()

  const { jumpTo } = useJump()

  const [isScrolling, setIsScrolling] = useState(false)

  const handleClick = useCallback(
    (key: Section) => {
      const section = INDEXED_SECTIONS[key]

      setIsScrolling(true)

      activate(section.id)

      jumpTo(section.id, {
        offset: section.offset,
        onComplete: () => {
          setIsScrolling(false)
        },
      })

      trackEvent({
        action_type: DeprecatedAnalyticsSchema.ActionType.Click,
        subject: section.label,
      })
    },
    [activate, jumpTo, trackEvent]
  )

  const items = useMemo(() => {
    return SECTIONS.map(section => {
      const ref = createRef<HTMLDivElement>()

      return {
        id: section.id,
        ref,
        node: (
          <Pill
            key={section.id}
            ref={ref as any}
            selected={active === section.id && !isScrolling}
            onClick={() => {
              handleClick(section.id)
            }}
          >
            {section.label}
          </Pill>
        ),
      }
    })
  }, [active, handleClick, isScrolling])

  useEffect(() => {
    if (!active || isScrolling) return

    const item = items.find(item => item.id === active)

    if (!item) return

    item.ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    })
  }, [active, items, isScrolling])

  return (
    <>
      <Media at="xs">
        <Box
          bg="mono0"
          width="100%"
          position="fixed"
          bottom={0}
          left={0}
          zIndex={Z.globalNav}
          pb="env(safe-area-inset-bottom)"
          style={{
            boxShadow: theme.effects.dropShadow,
            transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
            ...(visible
              ? { opacity: 1, transform: "translateY(0)" }
              : {
                  opacity: 0,
                  transform: "translateY(10%)",
                }),
          }}
        >
          <HorizontalOverflow>
            <Stack gap={1} p={1} flexDirection="row">
              {items.map(item => item.node)}
            </Stack>
          </HorizontalOverflow>
        </Box>
      </Media>

      <Media greaterThan="xs">
        <Stack
          gap={1}
          p={1}
          borderRadius={999}
          flexDirection="row"
          bg="mono0"
          width="fit-content"
          position="fixed"
          bottom={2}
          left="50%"
          zIndex={Z.globalNav}
          style={{
            boxShadow: theme.effects.dropShadow,
            transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
            ...(visible
              ? { opacity: 1, transform: "translateX(-50%) translateY(0)" }
              : {
                  opacity: 0,
                  transform: "translateX(-50%) translateY(10%)",
                }),
          }}
        >
          {items.map(item => item.node)}
        </Stack>
      </Media>
    </>
  )
}

export const AboutNavContext = createContext<{
  active: Section | null
  activate: (section: Section | null) => void
  hide: () => void
  show: () => void
  visible: boolean
}>({
  active: null,
  activate: () => {},
  hide: () => {},
  show: () => {},
  visible: true,
})

export const AboutNavProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [visible, setVisible] = useState(true)
  const [active, activate] = useState<Section | null>(null)

  const hide = () => {
    setVisible(false)
  }

  const show = () => {
    setVisible(true)
  }

  return (
    <AboutNavContext.Provider value={{ active, activate, hide, show, visible }}>
      {children}
    </AboutNavContext.Provider>
  )
}

export const useAboutNav = () => {
  const context = useContext(AboutNavContext)

  if (!context) {
    throw new Error("useAboutNav must be used within an AboutSectionProvider")
  }

  return context
}

export const AboutNavEntry = () => {
  const { activate } = useAboutNav()

  const { ref } = useIntersectionObserver({
    once: false,
    options: {
      threshold: 0,
    },
    onIntersection: () => {
      activate(null)
    },
  })

  return <div ref={ref as any} />
}

export const AboutNavExit = ({ children }: { children: React.ReactNode }) => {
  const { show, hide } = useAboutNav()

  const { ref } = useIntersectionObserver({
    once: false,
    options: {
      threshold: 0,
    },
    onIntersection: hide,
    onOffIntersection: show,
  })

  return <div ref={ref as any}>{children}</div>
}
