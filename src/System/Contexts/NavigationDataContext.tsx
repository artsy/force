import type { buildAppRoutesQuery$data } from "__generated__/buildAppRoutesQuery.graphql"
import { createContext, useContext } from "react"

export type NavigationData = Pick<
  buildAppRoutesQuery$data,
  | "whatsNewNavigation"
  | "artistsNavigation"
  | "artworksNavigation"
  | "whatsNewFeaturedLink"
  | "artistsFeaturedLink"
  | "artworksFeaturedLink"
>

const NavigationDataContext = createContext<NavigationData | null>(null)

export const NavigationDataProvider: React.FC<
  React.PropsWithChildren<{
    navigationData: NavigationData | null
  }>
> = ({ children, navigationData }) => {
  return (
    <NavigationDataContext.Provider value={navigationData}>
      {children}
    </NavigationDataContext.Provider>
  )
}

export const useNavigationData = (): NavigationData | null => {
  return useContext(NavigationDataContext)
}
