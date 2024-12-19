import type * as React from "react"

type GeneAppProps = {}

export const GeneApp: React.FC<React.PropsWithChildren<GeneAppProps>> = ({
  children,
}) => {
  return <>{children}</>
}
