import { Link } from "react-head"
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
  active: boolean
}

const ArticleZoomGalleryFigure: FC<ArticleZoomGalleryFigureProps> = ({
  figure,
  active,
}) => {
  if (
    figure.__typename !== "Artwork" &&
    figure.__typename !== "ArticleImageSection"
  ) {
    return null
  }

  const src = figure.image?.url

  if (!src) return null

  const xl = {
    img: resized(src, { width: 2000, height: 2000 }),
    media: "(min-width: 1720px)",
  }

  const lg = {
    img: resized(src, { width: 1440, height: 1440 }),
    media: "(min-width: 1232px)",
  }

  const md = {
    img: resized(src, { width: 1024, height: 1024 }),
    media: "(min-width: 896px)",
  }

  const sm = {
    img: resized(src, { width: 767, height: 767 }),
    media: "(min-width: 767px)",
  }

  const xs = {
    img: resized(src, { width: 450, height: 450 }),
    media: "(max-width: 766px)",
  }

  const sources = [xl, lg, md, sm, xs]

  if (active) {
    return (
      <ArticleZoomGalleryResponsiveBox
        position="relative"
        aspectWidth={figure.image?.width || 1}
        aspectHeight={figure.image?.height || 1}
      >
        <picture key={src} style={{ width: "100%", height: "100%" }}>
          {sources.map((source, i) => {
            return (
              <source key={i} srcSet={source.img.srcSet} media={source.media} />
            )
          })}

          <Image
            width="100%"
            height="100%"
            src={sm.img.src}
            alt=""
            loading="lazy"
          />
        </picture>
      </ArticleZoomGalleryResponsiveBox>
    )
  }

  return (
    <>
      {sources.map((source, i) => {
        return (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <Link
            key={i}
            rel="preload"
            as="image"
            imagesrcset={source.img.srcSet}
            media={source.media}
          />
        )
      })}
    </>
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
