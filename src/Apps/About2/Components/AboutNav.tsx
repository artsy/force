import { Pill, Stack, useTheme } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import { useJump } from "Utils/Hooks/useJump"
import { createContext, useContext, useState } from "react"

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

  return (
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
      display={["none", "flex"]}
    >
      {SECTIONS.map(section => (
        <Pill
          key={section.id}
          selected={active === section.id}
          onClick={() => {
            activate(section.id)
            jumpTo(section.id)
          }}
        >
          {section.label}
        </Pill>
      ))}
    </Stack>
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

export const AboutNavExit = () => {
  const { show, hide } = useAboutNav()

  const { ref } = useIntersectionObserver({
    once: false,
    options: {
      threshold: 0,
    },
    onIntersection: hide,
    onOffIntersection: show,
  })

  return <div ref={ref as any} />
}
