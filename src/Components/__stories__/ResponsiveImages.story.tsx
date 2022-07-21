import { ResponsiveBox, Image } from "@artsy/palette"
import { cropped, resized } from "Utils/resized"

export default {
  title: "Examples/ResponsiveImages",
}

const IMAGE = {
  src:
    "https://d32dm0rphc51dk.cloudfront.net/A5jM8w6hQQtGN-i7MTnl7w/normalized.jpg",
  width: 5139,
  height: 7709,
}

export const ResponsiveImageWithMaxWidth = () => {
  const image = resized(IMAGE.src, { width: 600, height: 600 })

  return (
    <ResponsiveBox
      aspectWidth={IMAGE.width}
      aspectHeight={IMAGE.height}
      maxWidth={600}
      bg="black10"
    >
      <Image
        src={image.src}
        srcSet={image.srcSet}
        width="100%"
        height="100%"
        alt=""
        lazyLoad
      />
    </ResponsiveBox>
  )
}

/**
 * Max dimensions here are kind of arbitrary. Look at your layout and
 * determine the answer to the question:
 * "What is the maximum width this image will display at?"
 * Use that answer to set the width argument here.
 */
export const ResponsiveImageWidthOfParent = () => {
  const image = resized(IMAGE.src, { width: 900 })

  return (
    <ResponsiveBox
      aspectWidth={IMAGE.width}
      aspectHeight={IMAGE.height}
      maxWidth="100%"
      bg="black10"
    >
      <Image
        src={image.src}
        srcSet={image.srcSet}
        width="100%"
        height="100%"
        alt=""
        lazyLoad
      />
    </ResponsiveBox>
  )
}

/**
 * Max dimensions here are kind of arbitrary. Look at your layout and
 * determine the answer to the question:
 * "What is the maximum width this image will display at?"
 * Use that answer to set the width/height arguments here.
 */
export const ResponsiveCrop = () => {
  const image = cropped(IMAGE.src, { width: 900, height: 900 })

  return (
    <ResponsiveBox
      aspectWidth={900}
      aspectHeight={900}
      maxWidth="100%"
      bg="black10"
    >
      <Image
        src={image.src}
        srcSet={image.srcSet}
        width="100%"
        height="100%"
        alt=""
        lazyLoad
      />
    </ResponsiveBox>
  )
}

/**
 * We can't use Palette's `Image` component here because `picture` requires
 * the immediate child to be an `img` tag. Note the use of the native `loading="lazy"`.
 */
export const PictureExample = () => {
  const xl = {
    img: resized(IMAGE.src, { width: 2000, height: 2000 }),
    media: "(min-width: 1720px)",
  }

  const lg = {
    img: resized(IMAGE.src, { width: 1440, height: 1440 }),
    media: "(min-width: 1232px)",
  }

  const md = {
    img: resized(IMAGE.src, { width: 1024, height: 1024 }),
    media: "(min-width: 896px)",
  }

  const sm = {
    img: resized(IMAGE.src, { width: 767, height: 767 }),
    media: "(min-width: 767px)",
  }

  const xs = {
    img: resized(IMAGE.src, { width: 450, height: 450 }),
    media: "(max-width: 766px)",
  }

  const sources = [xl, lg, md, sm, xs]

  return (
    <ResponsiveBox
      aspectWidth={IMAGE.width}
      aspectHeight={IMAGE.height}
      maxWidth="100%"
      bg="black10"
    >
      <picture style={{ width: "100%", height: "100%" }}>
        {sources.map((source, i) => {
          return (
            <source key={i} srcSet={source.img.srcSet} media={source.media} />
          )
        })}

        <img
          width="100%"
          height="100%"
          src={sm.img.src}
          alt=""
          loading="lazy"
        />
      </picture>
    </ResponsiveBox>
  )
}
