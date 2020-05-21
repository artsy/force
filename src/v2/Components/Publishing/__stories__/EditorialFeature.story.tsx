import { storiesOf } from "@storybook/react"
import { SystemContextProvider } from "v2/Artsy"
import { Eoy2018Artists } from "v2/Components/Publishing/EditorialFeature/Fixtures/Eoy2018Artists"
import { Eoy2018Culture } from "v2/Components/Publishing/EditorialFeature/Fixtures/Eoy2018Culture"
import { Vanguard2019Fixture } from "v2/Components/Publishing/EditorialFeature/Fixtures/Vanguard2019"
import React from "react"
import { Article } from "../Article"
import { ArticleData } from "../Typings"

storiesOf("Publishing/Articles/EditorialFeatures", module)
  .add("Artsy Vanguard 2019", () => {
    return (
      <SystemContextProvider>
        <Article
          article={Vanguard2019Fixture as ArticleData}
          customEditorial="VANGUARD_2019"
        />
      </SystemContextProvider>
    )
  })
  .add("2018 Influential Artists", () => {
    return (
      <SystemContextProvider>
        <Article
          article={Eoy2018Artists as ArticleData}
          customEditorial="EOY_2018_ARTISTS"
          showTooltips
        />
      </SystemContextProvider>
    )
  })
  .add("2018 Year in Culture", () => {
    return (
      <SystemContextProvider>
        <Article
          article={Eoy2018Culture as ArticleData}
          customEditorial="EOY_2018_CULTURE"
          showTooltips
        />
      </SystemContextProvider>
    )
  })
