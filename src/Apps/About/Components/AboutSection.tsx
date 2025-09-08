import { type Section, useAboutNav } from "Apps/About/Components/AboutNav"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import { Jump } from "Utils/Hooks/useJump"

interface AboutSectionProps {
  id: Section
  children: React.ReactNode
}

export const AboutSection = ({ id, children }: AboutSectionProps) => {
  const { activate } = useAboutNav()

  const { ref } = useIntersectionObserver({
    once: false,
    options: {
      threshold: 0,
      rootMargin: "-50% 0px",
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
