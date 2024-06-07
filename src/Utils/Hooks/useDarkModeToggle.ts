import { useAppPreferences } from "Apps/AppPreferences/useAppPreferences"
import { useCallback, useEffect } from "react"

interface UseDarkModeToggleProps {
  attachKeyListeners?: boolean
}

export const useDarkModeToggle = ({
  attachKeyListeners = true,
}: UseDarkModeToggleProps = {}) => {
  const { updatePreferences, preferences } = useAppPreferences()

  const isDarkModeActive = preferences.theme === "dark"

  const toggleDarkMode = useCallback(() => {
    updatePreferences({
      theme: isDarkModeActive ? "light" : "dark",
    })
  }, [updatePreferences, isDarkModeActive])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "i") {
        toggleDarkMode()
      }
    },
    [toggleDarkMode]
  )

  useEffect(() => {
    if (attachKeyListeners) {
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [preferences.theme, updatePreferences, handleKeyDown, attachKeyListeners])

  return {
    toggleDarkMode,
    isDarkModeActive,
    updatePreferences,
    preferences,
  }
}
