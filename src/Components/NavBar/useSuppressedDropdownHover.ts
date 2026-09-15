import { useCallback, useEffect, useState } from "react"

export const SUPPRESSED_DROPDOWN_HOVER_KEY = "navbar:suppressedDropdownHover"

/**
 * Clicking a top-level nav dropdown trigger (e.g. “Artists”) performs a full
 * page navigation. On the next page the pointer is still resting on the same
 * trigger, so its first movement fires `mouseenter` and immediately reopens the
 * submenu the user just dismissed by navigating away.
 *
 * To prevent that, the trigger records its label before navigating. On the
 * next page the matching dropdown keeps hover disabled until the pointer has
 * left the trigger.
 */
export const markDropdownHoverSuppressed = (label: string) => {
  try {
    sessionStorage.setItem(SUPPRESSED_DROPDOWN_HOVER_KEY, label)
  } catch {
    // sessionStorage may be unavailable (e.g. privacy mode); ignore
  }
}

const consumeSuppressedDropdownHover = (label: string): boolean => {
  try {
    const stored = sessionStorage.getItem(SUPPRESSED_DROPDOWN_HOVER_KEY)

    if (stored !== label) {
      return false
    }

    sessionStorage.removeItem(SUPPRESSED_DROPDOWN_HOVER_KEY)

    return true
  } catch {
    return false
  }
}

interface UseSuppressedDropdownHoverArgs {
  label: string
  anchorRef: React.RefObject<HTMLElement | null>
}

export const useSuppressedDropdownHover = ({
  label,
  anchorRef,
}: UseSuppressedDropdownHoverArgs) => {
  const [isSuppressed, setIsSuppressed] = useState(false)

  const unsuppress = useCallback(() => {
    setIsSuppressed(false)
  }, [])

  // On mount, check whether this dropdown's trigger was the one just clicked
  useEffect(() => {
    if (!consumeSuppressedDropdownHover(label)) {
      return
    }

    setIsSuppressed(true)
  }, [label])

  // While suppressed, re-enable hover as soon as the pointer is anywhere
  // other than the trigger. Covers the case where the pointer is no longer
  // resting on the trigger when the page loads (and so never leaves it).
  useEffect(() => {
    if (!isSuppressed) {
      return
    }

    const handleMouseMove = (event: MouseEvent) => {
      const anchor = anchorRef.current

      if (
        anchor &&
        event.target instanceof Node &&
        anchor.contains(event.target)
      ) {
        return
      }

      setIsSuppressed(false)
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isSuppressed, anchorRef])

  return { isSuppressed, unsuppress }
}
