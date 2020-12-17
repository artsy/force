import React, { useContext, useState } from "react"

interface NavigatorContextProps {
  path?: string[]
  push?: (entry: string) => void
  pop?: () => void
}

export const NavigatorContext = React.createContext<NavigatorContextProps>({})

export const NavigatorContextProvider: React.FC<NavigatorContextProps> = ({
  children,
}) => {
  const [path, setPath] = useState([])
  const initialNavigatorContextValue = {
    path,
    pop: () => {
      setPath(prevState => {
        return prevState.slice(0, prevState.length - 1)
      })
    },
    push: entry => {
      setPath(prevState => {
        return [...prevState, entry]
      })
    },
  }

  return (
    <NavigatorContext.Provider value={initialNavigatorContextValue}>
      {children}
    </NavigatorContext.Provider>
  )
}

export const useNavigation = () => {
  return useContext(NavigatorContext)
}
