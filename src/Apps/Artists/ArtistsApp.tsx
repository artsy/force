import type * as React from "react"

type ArtistsAppProps = {}

export const ArtistsApp: React.FC<React.PropsWithChildren<ArtistsAppProps>> = ({
  children,
}) => {
  return <>{children}</>
}
