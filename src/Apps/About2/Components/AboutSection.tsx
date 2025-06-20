import {
  SECTIONS,
  type Section,
  useAboutNav,
} from "Apps/About2/Components/AboutNav"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import { Jump } from "Utils/Hooks/useJump"

interface AboutSectionProps {
  id: Section
  children: React.ReactNode
}

export const AboutSection = ({ id, children }: AboutSectionProps) => {
  const { activate, hide, show } = useAboutNav()

  const { ref } = useIntersectionObserver({
    once: false,
    options: {
      threshold: 0.5,
    },
    onIntersection: () => {
      activate(id)
    },
    onOffIntersection: entries => {
      const entry = entries[entries.length - 1]

      if (!entry.rootBounds) return

      // If the element's bottom is above the viewport's bottom, it's leaving at the top.
      const isScrollingDown =
        entry.boundingClientRect.bottom < entry.rootBounds.bottom
      const direction = isScrollingDown ? "down" : "up"

      // Deactivate when scrolled up past the first section
      if (id === SECTIONS[0].id && direction === "up") {
        activate(null)
      }

      // Deactivate and hide when scrolled down past the last section
      if (id === SECTIONS[SECTIONS.length - 1].id && direction === "down") {
        activate(null)
        hide()
      }

      // Show when scrolled up past the last section
      if (id === SECTIONS[SECTIONS.length - 1].id && direction === "up") {
        show()
      }
    },
  })

  return (
    <div ref={ref as any}>
      <Jump id={id}>{children}</Jump>
    </div>
  )
}
