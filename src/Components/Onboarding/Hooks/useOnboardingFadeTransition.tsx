import { useFadeTransition } from "Utils/Hooks/useFadeTransition"
import { wait } from "Utils/wait"
import { useEffect } from "react"

interface UseOnboardingFadeTransition {
  next(): void
}

export const useOnboardingFadeTransition = ({
  next,
}: UseOnboardingFadeTransition) => {
  const { register, transition, mode, status } = useFadeTransition({
    initialStatus: "Out",
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: Effect should only run on mount for initialization
  useEffect(() => {
    const init = async () => {
      await wait(100)
      transition("In")
    }

    init()
  }, [])

  const handleNext = async () => {
    await transition("Out")
    await wait(100)
    next()
  }

  return {
    register,
    handleNext,
    loading: status === "In" && mode === "Transitioning",
  }
}
