import { ArtworkTopContextBarFairQueryRenderer } from "Apps/Artwork/Components/ArtworkTopContextBar/ArtworkTopContextBarFair"
import { ArtworkTopContextBarSaleQueryRenderer } from "Apps/Artwork/Components/ArtworkTopContextBar/ArtworkTopContextBarSale"
import { ArtworkTopContextBarShowQueryRenderer } from "Apps/Artwork/Components/ArtworkTopContextBar/ArtworkTopContextBarShow"
import { useNavigationHistory } from "System/Contexts/NavigationHistoryContext"
import type * as React from "react"

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

interface ArtworkTopContextBarDynamicBreadcrumbQueryRendererProps {
  id: string
  children: React.ReactNode
  contextMatchId: string
  contextMatchType: "SALE" | "FAIR" | "SHOW"
}

export const ArtworkTopContextBarDynamicBreadcrumbQueryRenderer: React.FC<
  ArtworkTopContextBarDynamicBreadcrumbQueryRendererProps
> = ({ contextMatchId, contextMatchType, children }) => {
  switch (contextMatchType) {
    case "SALE":
      return (
        <ArtworkTopContextBarSaleQueryRenderer id={contextMatchId}>
          {children}
        </ArtworkTopContextBarSaleQueryRenderer>
      )

    case "FAIR":
      return (
        <ArtworkTopContextBarFairQueryRenderer id={contextMatchId}>
          {children}
        </ArtworkTopContextBarFairQueryRenderer>
      )

    case "SHOW":
      return (
        <ArtworkTopContextBarShowQueryRenderer id={contextMatchId}>
          {children}
        </ArtworkTopContextBarShowQueryRenderer>
      )

    default:
      return <>{children}</>
  }
}
