import { CloseIcon, Spinner } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { FC, ImgHTMLAttributes, useEffect, useRef, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { ArticleZoomGalleryFigure_figure } from "v2/__generated__/ArticleZoomGalleryFigure_figure.graphql"

interface ArticleZoomGalleryFigureProps {
  figure: ArticleZoomGalleryFigure_figure
}

const ArticleZoomGalleryFigure: FC<ArticleZoomGalleryFigureProps> = ({
  figure,
}) => {
  if (
    figure.__typename !== "Artwork" &&
    figure.__typename !== "ArticleImageSection"
  ) {
    return null
  }

  const img = figure.image?.resized

  if (!img) return null

  return (
    <Image
      key={img.src}
      src={img.src}
      srcSet={img.srcSet}
      alt=""
      loading="lazy"
    />
  )
}

export const ArticleZoomGalleryFigureFragmentContainer = createFragmentContainer(
  ArticleZoomGalleryFigure,
  {
    figure: graphql`
      fragment ArticleZoomGalleryFigure_figure on ArticleSectionImageCollectionFigure {
        __typename
        ... on Artwork {
          image {
            resized(
              width: 900
              height: 900
              version: ["normalized", "larger", "large"]
            ) {
              src
              srcSet
              height
              width
            }
          }
        }
        ... on ArticleImageSection {
          image {
            resized(
              width: 900
              height: 900
              version: ["normalized", "larger", "large"]
            ) {
              src
              srcSet
              height
              width
            }
          }
        }
      }
    `,
  }
)

const Img = styled.img`
  display: block;
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
  min-height: 0;
  transition: opacity 250ms;
`

enum Mode {
  Loading,
  Ready,
  Error,
}

const Image: FC<ImgHTMLAttributes<HTMLImageElement>> = props => {
  const [mode, setMode] = useState<Mode>(Mode.Loading)

  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (ref.current?.complete) {
      setMode(Mode.Ready)
    }
  }, [ref])

  return (
    <>
      {mode === Mode.Loading && <Spinner />}
      {mode === Mode.Error && <ImgError />}

      <Img
        ref={ref as any}
        alt=""
        onLoad={() => setMode(Mode.Ready)}
        onError={() => setMode(Mode.Error)}
        {...props}
      />
    </>
  )
}

const ImgError = styled(CloseIcon).attrs({
  fill: "red100",
  width: 30,
  height: 30,
})`
  border: 1px solid ${themeGet("colors.red100")};
`
