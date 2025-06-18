import { MetaTags } from "Components/MetaTags"

export const DESCRIPTION =
  "Artsy’s mission is to expand the art market to support more artists and art in the world."

export const About2App: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <>
      <MetaTags
        title="About | Artsy"
        description={DESCRIPTION}
        imageURL="https://files.artsy.net/images/00_CVP_About_Hero_og.png"
        pathname="/about"
      />
    </>
  )
}
