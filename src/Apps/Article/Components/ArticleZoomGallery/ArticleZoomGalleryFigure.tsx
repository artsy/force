import { Link } from "react-head"
import { Spinner } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { FC, ImgHTMLAttributes, useEffect, useRef } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { useMode } from "Utils/Hooks/useMode"
import { resized } from "Utils/resized"
import { ArticleZoomGalleryFigure_figure$data } from "__generated__/ArticleZoomGalleryFigure_figure.graphql"
import { FullscreenBox } from "Components/FullscreenBox"
import CloseIcon from "@artsy/icons/CloseIcon"

interface ArticleZoomGalleryFigureProps {
  figure: ArticleZoomGalleryFigure_figure$data
  /* Should display the image? */
  active: boolean
  /* Should only preload the image? */
  preload: boolean
}

const ArticleZoomGalleryFigure: FC<ArticleZoomGalleryFigureProps> = ({
  figure,
  active,
  preload,
}) => {
  if (
    figure.__typename !== "Artwork" &&
    figure.__typename !== "ArticleImageSection" &&
    figure.__typename !== "ArticleUnpublishedArtwork"
  ) {
    return null
  }

  const src = figure.image?.url

  if (!src) return null

  const xl = {
    img: resized(src, { width: 2000, height: 2000 }),
    media: {
      query: "(min-width: 1720px)",
      preload: "(min-width: 1720px)",
    },
  }

  const lg = {
    img: resized(src, { width: 1440, height: 1440 }),
    media: {
      query: "(min-width: 1232px)",
      preload: "(min-width: 1232px) and (max-width: 1719px)",
    },
  }

  const md = {
    img: resized(src, { width: 1024, height: 1024 }),
    media: {
      query: "(min-width: 896px)",
      preload: "(min-width: 896px) and (max-width: 1231px)",
    },
  }

  const sm = {
    img: resized(src, { width: 767, height: 767 }),
    media: {
      query: "(min-width: 767px)",
      preload: "(min-width: 767px) and (max-width: 895px)",
    },
  }

  const xs = {
    img: resized(src, { width: 450, height: 450 }),
    media: {
      query: "(max-width: 766px)",
      preload: "(max-width: 766px)",
    },
  }

  const sources = [xl, lg, md, sm, xs]

  if (active) {
    return (
      <FullscreenBox
        position="relative"
        bg="black10"
        aspectWidth={figure.image?.width || 1}
        aspectHeight={figure.image?.height || 1}
      >
        <picture key={src} style={{ width: "100%", height: "100%" }}>
          {sources.map((source, i) => {
            return (
              <source
                key={i}
                srcSet={source.img.srcSet}
                media={source.media.query}
              />
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
      </FullscreenBox>
    )
  }

  // See: https://web.dev/preload-responsive-images/#preload-and-lesspicturegreater
  if (preload)
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
              media={source.media.preload}
            />
          )
        })}
      </>
    )

  return null
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
            url(version: ["main", "normalized", "larger", "large"])
          }
        }
        ... on ArticleImageSection {
          image {
            width
            height
            url(version: ["main", "normalized", "larger", "large"])
          }
        }
        ... on ArticleUnpublishedArtwork {
          image {
            width
            height
            url(version: ["main", "normalized", "larger", "large"])
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
