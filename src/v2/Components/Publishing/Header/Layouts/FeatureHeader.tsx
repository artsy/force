import React, { ReactElement } from "react"
import styled from "styled-components"
import { ArticleData } from "../../Typings"
import { FeatureBasicHeader } from "./Components/FeatureBasicHeader"
import { FeatureFullscreenHeader } from "./Components/FeatureFullscreenHeader"
import { FeatureSplitHeader } from "./Components/FeatureSplitHeader"
import { FeatureTextHeader } from "./Components/FeatureTextHeader"

export interface FeatureHeaderProps {
  article?: ArticleData
  textColor?: string
  date?: string
  editDeck?: ReactElement<any>
  editImage?: ReactElement<any>
  editTitle?: ReactElement<any>
  editVertical?: ReactElement<any>
}

export const FeatureHeader: React.SFC<FeatureHeaderProps> = props => {
  const {
    article: { hero_section },
  } = props
  const type = hero_section && hero_section.type

  switch (type) {
    case "basic": {
      return <FeatureBasicHeader {...props} />
    }
    case "fullscreen": {
      return <FeatureFullscreenHeader {...props} />
    }
    case "split": {
      return <FeatureSplitHeader {...props} />
    }
    default: {
      return <FeatureTextHeader {...props} />
    }
  }
}

export const EditImage = styled.div`
  position: absolute;
`
