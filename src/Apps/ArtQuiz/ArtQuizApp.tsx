import { MetaTags } from "Components/MetaTags"
import type { FC } from "react"

export const ArtQuizApp: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <>
      <MetaTags title="Art Taste Quiz | Artsy" pathname="/art-quiz" />

      {children}
    </>
  )
}
