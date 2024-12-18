import type * as React from "react"

type ShowsAppProps = {}

export const ShowsApp: React.FC<React.PropsWithChildren<ShowsAppProps>> = ({
  children,
}) => {
  return <>{children}</>
}
