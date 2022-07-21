import { useContext, useState } from "react";
import * as React from "react";

export const NavBarMobileMenuNavigationContext = React.createContext<{
  path: string[]
  push: (entry: string) => void
  pop: () => void
}>({
  path: [],
  push: () => {},
  pop: () => {},
})

export const NavBarMobileMenuNavigationProvider: React.FC = ({ children }) => {
  const [path, setPath] = useState<string[]>([])

  const push = (entry: string) => {
    setPath(prevState => {
      return [...prevState, entry]
    })
  }

  const pop = () => {
    setPath(prevState => {
      return prevState.slice(0, prevState.length - 1)
    })
  }

  return (
    <NavBarMobileMenuNavigationContext.Provider value={{ path, push, pop }}>
      {children}
    </NavBarMobileMenuNavigationContext.Provider>
  )
}

export const useNavBarMobileMenuNavigation = () => {
  return useContext(NavBarMobileMenuNavigationContext)
}
