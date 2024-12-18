import { FC } from "react"
import { MetaTags } from "Components/MetaTags"

export const ArtQuizApp: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <>
      <MetaTags title="Art Taste Quiz | Artsy" />

      {children}
    </>
  )
}
