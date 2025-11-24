import { Box, THEME } from "@artsy/palette"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import styled from "styled-components"
import { type TSticky, useSticky } from "./StickyProvider"

type StickyProps = {
  bottomBoundary?: number | string
  id?: string
  /** Avoid offsetting for the global nav (rarely used). */
  withoutHeaderOffset?: boolean
  /** Retract the global nav while this sticky is fixed. */
  retractGlobalNav?: boolean
  children: ReactNode | (({ stuck }: { stuck: boolean }) => ReactNode)
}

const StickyContainer = styled(Box)<{ $top: number; $shift: number }>`
  position: sticky;
  position: -webkit-sticky;
  top: ${({ $top }) => `${$top}px`};
  z-index: 1;
  transform: translateY(${({ $shift }) => -$shift}px);
  transition:
    transform 200ms ease,
    top 200ms ease;
  will-change: transform, top;
`

export const Sticky = ({
  children,
  bottomBoundary,
  withoutHeaderOffset,
  retractGlobalNav,
  id,
}: StickyProps) => {
  const {
    offsetTop,
    registerSticky,
    deregisterSticky,
    updateSticky,
    isNavBarRetracted,
  } = useSticky({
    id,
  })

  const { desktop, mobile } = useNavBarHeight()
  const isMobile = __internal__useMatchMedia(THEME.mediaQueries.xs)

  const baseHeaderOffset = withoutHeaderOffset ? 0 : isMobile ? mobile : desktop
  const stickTriggerOffset = baseHeaderOffset + offsetTop

  const stickyTop = useMemo(
    () => baseHeaderOffset + offsetTop,
    [baseHeaderOffset, offsetTop],
  )

  const [status, setStatus] = useState<TSticky["status"]>("ORIGINAL")
  const containerRef = useRef<HTMLDivElement | null>(null)
  const lastHeightRef = useRef<number | null>(null)

  useEffect(() => {
    const height = containerRef.current?.getBoundingClientRect().height ?? 0
    registerSticky(height, { retractsNav: retractGlobalNav })

    return deregisterSticky
  }, [registerSticky, deregisterSticky, retractGlobalNav])

  const resolveBottomBoundary = useCallback(() => {
    if (typeof window === "undefined") return null
    if (!bottomBoundary) return null

    if (typeof bottomBoundary === "number") {
      return bottomBoundary
    }

    const target =
      typeof bottomBoundary === "string"
        ? document.querySelector(bottomBoundary)
        : null

    if (target) {
      const rect = target.getBoundingClientRect()
      return rect.bottom + window.scrollY
    }

    return null
  }, [bottomBoundary])

  const recomputeStickyState = useCallback(() => {
    if (typeof window === "undefined") return

    const node = containerRef.current
    if (!node) return

    const rect = node.getBoundingClientRect()
    const height = rect.height
    const boundaryBottom = resolveBottomBoundary()
    const stuckBottom = window.scrollY + stickyTop + height

    let nextStatus: TSticky["status"] = "ORIGINAL"

    if (boundaryBottom !== null && stuckBottom >= boundaryBottom) {
      nextStatus = "RELEASED"
    } else if (rect.top <= stickTriggerOffset) {
      nextStatus = "FIXED"
    }

    const hasStatusChanged = status !== nextStatus
    const hasHeightChanged = lastHeightRef.current !== height

    if (hasStatusChanged) {
      setStatus(nextStatus)
    }

    if (hasStatusChanged || hasHeightChanged) {
      lastHeightRef.current = height
      updateSticky({ status: nextStatus, height })
    }
  }, [
    resolveBottomBoundary,
    status,
    stickTriggerOffset,
    stickyTop,
    updateSticky,
  ])

  useEffect(() => {
    if (typeof window === "undefined") return

    let frame: number | null = null

    const handleScroll = () => {
      if (frame !== null) return
      frame = window.requestAnimationFrame(() => {
        frame = null
        recomputeStickyState()
      })
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame)
      }
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [recomputeStickyState])

  const stuck = status === "FIXED"
  const retractShift = stuck && isNavBarRetracted ? baseHeaderOffset : 0

  return (
    <StickyContainer ref={containerRef} $top={stickyTop} $shift={retractShift}>
      {typeof children === "function" ? children({ stuck }) : children}
    </StickyContainer>
  )
}
