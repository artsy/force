import { ArticleProps } from "v2/Components/Publishing/Article"
import { FeatureLayout } from "v2/Components/Publishing/Layouts/FeatureLayout"
import React from "react"
import { Eoy2018Artists } from "./Components/Eoy2018Artists"
import { Eoy2018Culture } from "./Components/Eoy2018Culture"
import { Vanguard2019 } from "./Components/Vanguard2019"

export interface EditorialFeaturesProps extends ArticleProps {
  isTest?: boolean
}

export const EditorialFeature: React.SFC<EditorialFeaturesProps> = props => {
  switch (props.customEditorial) {
    case "EOY_2018_ARTISTS": {
      return <Eoy2018Artists {...props} />
    }
    case "EOY_2018_CULTURE": {
      return <Eoy2018Culture {...props} />
    }
    case "VANGUARD_2019": {
      return <Vanguard2019 {...props} />
    }
    default: {
      return <FeatureLayout {...props} />
    }
  }
}

EditorialFeature.defaultProps = {
  isTest: false,
}
