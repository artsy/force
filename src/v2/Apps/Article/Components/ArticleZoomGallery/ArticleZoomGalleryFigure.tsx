import { CloseIcon, Spinner } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { FC, ImgHTMLAttributes, useEffect, useRef } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { useMode } from "v2/Utils/Hooks/useMode"
import { resized } from "v2/Utils/resized"
import { ArticleZoomGalleryFigure_figure } from "v2/__generated__/ArticleZoomGalleryFigure_figure.graphql"
import { ArticleZoomGalleryResponsiveBox } from "./ArticleZoomGalleryResponsiveBox"

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

  const src = figure.image?.url

  if (!src) return null

  const xs = resized(src, { width: 450, height: 450 })
  const sm = resized(src, { width: 767, height: 767 })
  const md = resized(src, { width: 1024, height: 1024 })
  const lg = resized(src, { width: 1440, height: 1440 })
  const xl = resized(src, { width: 2000, height: 2000 })

  return (
    <ArticleZoomGalleryResponsiveBox
      position="relative"
      aspectWidth={figure.image?.width || 1}
      aspectHeight={figure.image?.height || 1}
    >
      <picture key={src} style={{ width: "100%", height: "100%" }}>
        <source srcSet={xl.srcSet} media="(min-width: 1720px)" />
        <source srcSet={lg.srcSet} media="(min-width: 1232px)" />
        <source srcSet={md.srcSet} media="(min-width: 896px)" />
        <source srcSet={sm.srcSet} media="(min-width: 767px)" />
        <source srcSet={xs.srcSet} media="(max-width: 766px)" />

        <Image width="100%" height="100%" src={sm.src} alt="" loading="lazy" />
      </picture>
    </ArticleZoomGalleryResponsiveBox>
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
            width
            height
            url(version: ["normalized", "larger", "large"])
          }
        }
        ... on ArticleImageSection {
          image {
            width
            height
            url(version: ["normalized", "larger", "large"])
          }
        }
      }
    `,
  }
)

const Img = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
  min-height: 0;
`

type Mode = "Loading" | "Ready" | "Error"

const Image: FC<ImgHTMLAttributes<HTMLImageElement>> = props => {
  const [mode, setMode] = useMode<Mode>("Loading")

  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (ref.current?.complete) {
      setMode("Ready")
    }
  }, [ref, setMode])

  return (
    <>
      {mode === "Loading" && <Spinner />}
      {mode === "Error" && <ImgError />}

      <Img
        ref={ref as any}
        alt=""
        onLoad={() => setMode("Ready")}
        onError={() => setMode("Error")}
        style={{ display: mode === "Error" ? "none" : "block" }}
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
