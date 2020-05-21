import { storiesOf } from "@storybook/react"
import React from "react"
import { Contents } from "../Gene"

import { SystemContextProvider } from "v2/Artsy"

storiesOf("Components/Pages/Gene/Contents", module)
  .add("Artists Mode - Minimalism", () => {
    return (
      <div>
        <SystemContextProvider>
          <Contents
            filters={{}}
            geneID="minimalism"
            mode="artists"
            onStateChange={console.log}
          />
        </SystemContextProvider>
      </div>
    )
  })
  .add("Artworks Mode - Animals", () => {
    return (
      <div>
        <SystemContextProvider>
          <Contents
            filters={{ for_sale: true }}
            geneID="animals"
            mode="artworks"
            onStateChange={console.log}
          />
        </SystemContextProvider>
      </div>
    )
  })
  .add("Artworks Mode w/ Pagination Issue - Abstract Painting", () => {
    return (
      <div>
        <SystemContextProvider>
          <Contents
            filters={{ for_sale: false }}
            geneID="abstract-painting"
            mode="artworks"
            onStateChange={console.log}
          />
        </SystemContextProvider>
      </div>
    )
  })
