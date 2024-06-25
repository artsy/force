import { State } from "Apps/ArtAdvisor/07-Curated-Discovery/App"
import { FC } from "react"

export const StatePreview: FC<{ state: State }> = ({ state }) => {
  return (
    <details>
      <summary>State</summary>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </details>
  )
}
