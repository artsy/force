import * as React from "react";

interface ArtistsAppProps {}

export const ArtistsApp: React.FC<React.PropsWithChildren<ArtistsAppProps>> = ({ children }) => {
  return <>{children}</>
}
