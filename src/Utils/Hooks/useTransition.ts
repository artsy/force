import { compact } from "lodash"
import { createRef, RefObject, useCallback, useEffect, useRef } from "react"
import { wait } from "Utils/wait"
import { useMode } from "./useMode"

export interface UseTransition {
  /** Duration of transition in milliseconds */
  duration?: number
  /**
   * If set to `"Out"` all registered elements will
   * initially have their 'data-state' attr set to `"Out"`.
   * */
  initialStatus?: "In" | "Out"
}

export const useTransition = ({
  duration = 500,
  initialStatus = "In",
}: UseTransition = {}) => {
  const [status, setStatus] = useMode<"In" | "Out">(initialStatus)
  const [mode, setMode] = useMode<"Resting" | "Transitioning">("Resting")

  // If the `initialStatus` is `"Out"` make sure els are initially set
  useEffect(() => {
    if (status === "In") return

    const els = compact(refs.current.map(ref => ref.current))

    els.forEach(el => {
      el.dataset.state = "Out"
    })
  }, [status])

  const refs = useRef<RefObject<HTMLElement>[]>([])

  /**
   * @param index The index of the element to register.
   * Transitions will execute in the order specified by the indexes.
   * @returns A ref to the element.
   */
  const register = useCallback((index: number) => {
    const ref = createRef<HTMLElement>()
    refs.current[index] = ref
    return ref as any // Cast as `any` to get around outdated styled-components typing
  }, [])

  /**
   * @returns A promise that resolves when the transition is complete.
   */
  const transition = useCallback(
    async (toStatus?: "In" | "Out") => {
      if (mode === "Transitioning") return

      setMode("Transitioning")

      const fromStatus = toStatus ? { In: "Out", Out: "In" }[toStatus] : null
      const els = compact(refs.current.map(ref => ref.current))

      await els.reduce((promise, el) => {
        return promise.then(() => {
          el.dataset.state = (fromStatus ?? status) === "In" ? "Out" : "In"

          return wait(duration / 3)
        })
      }, Promise.resolve())

      setStatus((fromStatus ?? status) === "In" ? "Out" : "In")
      setMode("Resting")
    },
    [duration, mode, setMode, setStatus, status]
  )

  return {
    refs,
    register,
    transition,
    mode,
    status,
  }
}
