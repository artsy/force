import { useEffect } from "react"
import { useFadeTransition } from "v2/Utils/Hooks/useFadeTransition"
import { wait } from "v2/Utils/wait"

interface UseOnboardingFadeTransition {
  next(): void
}

export const useOnboardingFadeTransition = ({
  next,
}: UseOnboardingFadeTransition) => {
  const { register, transition, mode, status } = useFadeTransition({
    initialStatus: "Out",
  })

  useEffect(() => {
    const init = async () => {
      await wait(100)
      transition("In")
    }

    init()

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
