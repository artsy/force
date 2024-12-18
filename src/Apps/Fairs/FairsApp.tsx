import type * as React from "react"

type FairsAppProps = {}

export const FairsApp: React.FC<React.PropsWithChildren<FairsAppProps>> = ({
  children,
}) => {
  return <>{children}</>
}
