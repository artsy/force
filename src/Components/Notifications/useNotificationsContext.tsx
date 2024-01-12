import { useRouter } from "System/Router/useRouter"
import { createContext, FC, useState, useContext, useEffect } from "react"

export type State = {
  currentNotificationId: string | null
}

export const DEFAULT_STATE: State = {
  currentNotificationId: null,
}

type NotificationsContextType = {
  state: State
  setCurrentNotificationId: (id: string) => void
}

const NotificationsContext = createContext<NotificationsContextType>(({
  state: DEFAULT_STATE,
} as unknown) as NotificationsContextType)

interface NotificationsContextProviderProps {
  id?: string | null
}

export const NotificationsContextProvider: FC<NotificationsContextProviderProps> = ({
  children,
  id = null,
}) => {
  const { match } = useRouter()
  const [currentNotificationId, setCurrentNotificationId] = useState(id)

  useEffect(() => {
    setCurrentNotificationId(match.params.notificationId)
  }, [match.params.notificationId, setCurrentNotificationId])

  return (
    <NotificationsContext.Provider
      value={{
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
