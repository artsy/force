import { Box, HorizontalOverflow, Pill, Stack, useTheme } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import { useJump } from "Utils/Hooks/useJump"
import { Media } from "Utils/Responsive"
import {
  createContext,
  createRef,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

export const SECTIONS = [
  { id: "mission-and-vision", label: "Mission and vision" },
  { id: "our-story", label: "Our story" },
  { id: "what-we-do", label: "What we do" },
  { id: "our-team", label: "Our team" },
  { id: "press", label: "Press" },
  { id: "contact", label: "Contact" },
] as const

export type Section = (typeof SECTIONS)[number]["id"]

export const AboutNav = () => {
  const { theme } = useTheme()

  const { active, activate, visible } = useAboutNav()

  const { jumpTo } = useJump()

  const [isScrolling, setIsScrolling] = useState(false)

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
              setIsScrolling(true)
              activate(section.id)
              jumpTo(section.id, {
                onComplete: () => {
                  setIsScrolling(false)
                },
              })
            }}
          >
            {section.label}
          </Pill>
        ),
      }
    })
  }, [active, activate, jumpTo, isScrolling])

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
