import * as React from "react"

interface FairsAppProps {}

export const FairsApp: React.FC<React.PropsWithChildren<FairsAppProps>> = ({
  children,
}) => {
  return <>{children}</>
}
