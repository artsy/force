import { MetaTags } from "Components/MetaTags"
import { FC } from "react"

export const ArtQuizApp: FC = ({ children }) => {
  return (
    <>
      <MetaTags title="Art Taste Quiz | Artsy" />

      {children}
    </>
  )
}
