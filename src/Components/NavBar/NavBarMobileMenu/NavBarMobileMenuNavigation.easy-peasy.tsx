import { createContextStore, Action, action } from "easy-peasy"
import { useContext, createContext } from "react"
import * as React from "react"

// Easy-peasy store model interface
interface NavBarMobileMenuNavigationStoreModel {
  // State
  path: string[]

  // Actions
  push: Action<NavBarMobileMenuNavigationStoreModel, string>
  pop: Action<NavBarMobileMenuNavigationStoreModel>
}

// Create the context store
export const NavBarMobileMenuNavigationStore =
  createContextStore<NavBarMobileMenuNavigationStoreModel>(runtimeModel => ({
    // State
    path: runtimeModel?.path || [],

    // Actions
    push: action((state, entry) => {
      state.path.push(entry)
    }),

    pop: action(state => {
      state.path.pop()
    }),
  }))

// Legacy context for backward compatibility
export const NavBarMobileMenuNavigationContext = React.createContext<{
  path: string[]
  push: (entry: string) => void
  pop: () => void
}>({
  path: [],
  push: () => {},
  pop: () => {},
})

export const NavBarMobileMenuNavigationProvider: React.FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  return (
    <NavBarMobileMenuNavigationStore.Provider>
      <NavBarMobileMenuNavigationProviderWrapper>
        {children}
      </NavBarMobileMenuNavigationProviderWrapper>
    </NavBarMobileMenuNavigationStore.Provider>
  )
}

// Internal wrapper to provide backward compatible context
const NavBarMobileMenuNavigationProviderWrapper: React.FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  const path = NavBarMobileMenuNavigationStore.useStoreState(
    state => state.path,
  )
  const { push, pop } = NavBarMobileMenuNavigationStore.useStoreActions(
    actions => actions,
  )

  return (
    <NavBarMobileMenuNavigationContext.Provider value={{ path, push, pop }}>
      {children}
    </NavBarMobileMenuNavigationContext.Provider>
  )
}

// Backward compatible hook
export const useNavBarMobileMenuNavigation = () => {
  return useContext(NavBarMobileMenuNavigationContext)
}
