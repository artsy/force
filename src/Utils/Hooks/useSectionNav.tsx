/**
 * ```tsx
 * // 1. Wrap your route with SectionNavProvider
 * <SectionNavProvider>
 *   <MyNav />
 *   <Section id="section1">Content 1</Section>
 *   <Section id="section2">Content 2</Section>
 * </SectionNavProvider>
 *
 * // 2. In your nav component, use useSectionNav to get the active section
 * const MyNav = () => {
 *   const { active } = useSectionNav()
 *   return (
 *     <nav>
 *       <a active={active === "section1"}>Section 1</a>
 *       <a active={active === "section2"}>Section 2</a>
 *     </nav>
 *   )
 * }
 * ```
 */

import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import { Jump } from "Utils/Hooks/useJump"
import { createContext, useContext, useState } from "react"

interface SectionNavContextValue {
  active: string | null
  activate: (section: string | null) => void
}

const SectionNavContext = createContext<SectionNavContextValue>({
  active: null,
  activate: () => {},
})

export const SectionNavProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [active, activate] = useState<string | null>(null)

  return (
    <SectionNavContext.Provider value={{ active, activate }}>
      {children}
    </SectionNavContext.Provider>
  )
}

export const useSectionNav = () => {
  const context = useContext(SectionNavContext)

  if (!context) {
    throw new Error("useSectionNav must be used within a SectionNavProvider")
  }

  return context
}

interface SectionProps {
  id: string
  children: React.ReactNode
  /**
   * Threshold for when section becomes active.
   * Default uses "-50% 0px" which activates when section crosses the middle of viewport
   */
  rootMargin?: string
}

/**
 * Wraps a section and automatically updates the active section in SectionNavContext
 * when it enters the viewport (at the specified threshold).
 *
 * ```tsx
 * <Section id="artworks">
 *   <Text>Artworks content</Text>
 * </Section>
 * ```
 */
export const Section = ({
  id,
  children,
  rootMargin = "-50% 0px",
}: SectionProps) => {
  const { activate } = useSectionNav()

  const { ref } = useIntersectionObserver({
    once: false,
    options: {
      threshold: 0,
      rootMargin,
    },
    onIntersection: () => {
      activate(id)
    },
  })

  return (
    <div ref={ref as any}>
      <Jump id={id}>{children}</Jump>
    </div>
  )
}
