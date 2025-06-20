import { Spacer } from "@artsy/palette"
import { About2Header } from "Apps/About2/Components/About2Header"
import { About2Hero } from "Apps/About2/Components/About2Hero"
import { About2Nav } from "Apps/About2/Components/About2Nav"
import { About2Stats } from "Apps/About2/Components/About2Stats"
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

      <About2Nav />

      <Spacer y={4} />

      <About2Header />

      <Spacer y={4} />

      <About2Hero />

      <Spacer y={[4, 6]} />

      <About2Stats />
    </>
  )
}
