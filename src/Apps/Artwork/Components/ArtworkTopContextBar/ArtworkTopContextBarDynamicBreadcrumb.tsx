import { ArtworkTopContextBarFair } from "Apps/Artwork/Components/ArtworkTopContextBar/ArtworkTopContextBarFair"
import { ArtworkTopContextBarSale } from "Apps/Artwork/Components/ArtworkTopContextBar/ArtworkTopContextBarSale"
import { ArtworkTopContextBarShow } from "Apps/Artwork/Components/ArtworkTopContextBar/ArtworkTopContextBarShow"
import { useNavigationHistory } from "System/Contexts/NavigationHistoryContext"
import type * as React from "react"
import { Suspense } from "react"

export const useDynamicBreadcrumb = ():
  | { isEnabled: true; type: "SALE" | "FAIR" | "SHOW"; id: string }
  | { isEnabled: false; type: null; id: null } => {
  const { previousPath } = useNavigationHistory()

  const [_, type, id] = (previousPath || "").split("/")

  switch (type) {
    case "fair":
      return { isEnabled: true, type: "FAIR" as const, id }
    case "auction":
      return { isEnabled: true, type: "SALE" as const, id }
    case "show":
      return { isEnabled: true, type: "SHOW" as const, id }
    default:
      return { isEnabled: false, type: null, id: null }
  }
}

interface ArtworkTopContextBarDynamicBreadcrumbProps {
  id: string
  children: React.ReactNode
  contextMatchId: string
  contextMatchType: "SALE" | "FAIR" | "SHOW"
}

export const ArtworkTopContextBarDynamicBreadcrumb: React.FC<
  ArtworkTopContextBarDynamicBreadcrumbProps
> = ({ contextMatchId, contextMatchType, children }) => {
  return (
    <Suspense fallback={<>{children}</>}>
      {(() => {
        switch (contextMatchType) {
          case "SALE":
            return <ArtworkTopContextBarSale id={contextMatchId} />

          case "FAIR":
            return <ArtworkTopContextBarFair id={contextMatchId} />

          case "SHOW":
            return <ArtworkTopContextBarShow id={contextMatchId} />

          default:
            return <>{children}</>
        }
      })()}
    </Suspense>
  )
}
