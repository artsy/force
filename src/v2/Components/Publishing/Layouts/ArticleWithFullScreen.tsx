import { ArticleProps } from "v2/Components/Publishing/Article"
import { FullscreenViewer } from "v2/Components/Publishing/Sections/FullscreenViewer/FullscreenViewer"
import { withFullScreen } from "v2/Components/Publishing/Sections/FullscreenViewer/withFullScreen"
import { ArticleData } from "v2/Components/Publishing/Typings"
import React from "react"
import track from "react-tracking"

interface ArticleState {
  fullscreenImages: any
}

@withFullScreen
export class ArticleWithFullScreen extends React.Component<
ArticleProps,
ArticleState
> {
  static defaultProps = {
    isMobile: false,
    isSuper: false,
    article: {},
    isTruncated: false,
    showTooltips: false,
  }

  constructor(props) {
    super(props)
    const fullscreenImages = getSlideshowImagesFromArticle(props.article)
    this.state = {
      fullscreenImages,
    }
  }

  render() {
    const { fullscreenImages } = this.state
    const { closeViewer, slideIndex, viewerIsOpen } = this.props

    return (
      <div>
        {this.props.children}
        <FullscreenViewer
          onClose={closeViewer}
          show={viewerIsOpen}
          slideIndex={slideIndex}
          images={fullscreenImages}
        />
      </div>
    )
  }
}

export default track()(ArticleWithFullScreen)

export const getSlideshowImagesFromArticle = (article: ArticleData) => {
  const fullscreenImages = []
  let sectionIndex = 0

  article.sections.map(section => {
    if (["image_collection", "image_set"].includes(section.type)) {
      section.images.map(image => {
        const img = {
          ...image,
          setTitle: section.title,
          index: sectionIndex,
        }
        fullscreenImages.push(img)
        sectionIndex = sectionIndex + 1
      })
    }
  })
  return fullscreenImages
}
