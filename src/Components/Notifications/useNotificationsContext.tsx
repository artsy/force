import { createContext, FC, useState, useContext } from "react"

export type State = {
  currentNotificationId: string | null
}

export const DEFAULT_STATE: State = {
  currentNotificationId: null,
}

const NotificationsContext = createContext<{
  mode: "dropdown" | "page"
  state: State
  setCurrentNotificationId: (id: string) => void
}>({
  mode: "dropdown",
  state: DEFAULT_STATE,
  setCurrentNotificationId: () => {},
})

interface NotificationsContextProviderProps {
  id?: string | null
  mode: "dropdown" | "page"
}

export const NotificationsContextProvider: FC<NotificationsContextProviderProps> = ({
  children,
  id = null,
  mode,
}) => {
  const [currentNotificationId, setCurrentNotificationId] = useState(id)

  return (
    <NotificationsContext.Provider
      value={{
        mode,
        state: { currentNotificationId },
        setCurrentNotificationId,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export const useNotificationsContext = () => {
  return useContext(NotificationsContext)
}
