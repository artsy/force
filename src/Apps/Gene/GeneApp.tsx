import * as React from "react"

interface GeneAppProps {}

export const GeneApp: React.FC<React.PropsWithChildren<GeneAppProps>> = ({
  children,
}) => {
  return <>{children}</>
}
