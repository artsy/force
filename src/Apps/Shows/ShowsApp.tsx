import * as React from "react";

interface ShowsAppProps {}

export const ShowsApp: React.FC<React.PropsWithChildren<ShowsAppProps>> = ({ children }) => {
  return <>{children}</>
}
