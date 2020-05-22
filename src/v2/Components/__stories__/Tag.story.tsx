import { storiesOf } from "@storybook/react"
import React from "react"
import { Contents } from "../Tag"

import { SystemContextProvider } from "v2/Artsy"

storiesOf("Components/Pages/Tag/Contents", module).add("Butt", () => {
  return (
    <div>
      <SystemContextProvider>
        <Contents
          tagID="butt"
          sort="-year"
          filters={{ for_sale: true }}
          onStateChange={console.log}
        />
      </SystemContextProvider>
    </div>
  )
})
