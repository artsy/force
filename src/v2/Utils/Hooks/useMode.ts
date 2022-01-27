import { useState } from "react"

/**
 * This is basically just a wrapper around `useState` for intent signaling.
 *
 * @example
 *
 * type Mode = "Start" | "End"
 *
 * const [mode, setMode] = useMode<Mode>('Start')
 *
 * if (mode === 'Start') {
 *   doSomething()
 * }
 */
export const useMode = useState
