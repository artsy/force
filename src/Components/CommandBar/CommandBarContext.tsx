import {
  type FC,
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

interface CommandBarContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const CommandBarContext = createContext<CommandBarContextValue | null>(null)

/**
 * Provides open/close state for the ⌘K command bar and registers the global
 * keyboard listener (⌘K / Ctrl+K to toggle, Escape to close).
 */
export const CommandBarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggle = useCallback(() => {
    setIsOpen(prev => {
      return !prev
    })
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCommandK =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k"

      if (isCommandK) {
        event.preventDefault()
        toggle()
        return
      }

      if (event.key === "Escape") {
        close()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [toggle, close])

  const value = useMemo(() => {
    return { isOpen, open, close, toggle }
  }, [isOpen, open, close, toggle])

  return (
    <CommandBarContext.Provider value={value}>
      {children}
    </CommandBarContext.Provider>
  )
}

export const useCommandBar = (): CommandBarContextValue => {
  const context = useContext(CommandBarContext)

  if (context === null) {
    throw new Error("useCommandBar must be used within a CommandBarProvider")
  }

  return context
}
