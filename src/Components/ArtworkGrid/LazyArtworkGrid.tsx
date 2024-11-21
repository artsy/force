import StaticContainer from "found/StaticContainer"
import { useRouter } from "found"

/**
 * When loading artwork grids / filter lazily we need to ensure that rerenders
 * don't occur when the route changes, which then triggers the skeleton loading
 * state. This component will prevent rerenders when the route changes, signalled
 * by `match.elements` being undefined per the router.
 */
export const LazyArtworkGrid: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const { match } = useRouter()

  return (
    <StaticContainer shouldUpdate={!!match.elements}>
      {children}
    </StaticContainer>
  )
}
