import { useRouter } from "found"
import { createContext, FC, useState, useContext, useEffect } from "react"

export type State = {
  currentNotificationId: string | null
}

export const DEFAULT_STATE: State = {
  currentNotificationId: null,
}

const NotificationsContext = createContext<{
  state: State
  setCurrentNotificationId: (id: string) => void
}>({
  state: DEFAULT_STATE,
  setCurrentNotificationId: () => {},
})

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
