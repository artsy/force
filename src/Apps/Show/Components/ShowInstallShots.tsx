import { FC, useState } from "react"
import {
  Box,
  Clickable,
  Image,
  ModalBase,
  Shelf,
  Text,
  useTheme,
} from "@artsy/palette"
import { compact } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"
import { maxDimensionsByArea, resized } from "Utils/resized"
import { ShowInstallShots_show$data } from "__generated__/ShowInstallShots_show.graphql"
import { themeGet } from "@styled-system/theme-get"
import { useCursor } from "use-cursor"
import { useNextPrevious } from "Utils/Hooks/useNextPrevious"
import styled from "styled-components"
import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import { FullscreenBox } from "Components/FullscreenBox"

interface ShowInstallShotsProps {
  show: ShowInstallShots_show$data
}

export const ShowInstallShots: FC<ShowInstallShotsProps> = ({
  show,
  ...rest
}) => {
  const { theme } = useTheme()

  const [mode, setMode] = useState<"Idle" | "Zoom">("Idle")

  const images = compact(show.images)

  const { handleNext, handlePrev, index, setCursor } = useCursor({
    max: images.length,
  })

  const { containerRef } = useNextPrevious({
    onNext: handleNext,
    onPrevious: handlePrev,
  })

  const selected = images[index]

  if (images.length === 0) return null

  return (
    <>
      <Shelf alignItems="flex-end" {...rest}>
        {images.map((image, i) => {
          if (!image.internalID || !image.src || !image.width || !image.height)
            return <></>

          const { width, height } = maxDimensionsByArea({
            area: 300 * 300,
            height: image.height,
            width: image.width,
          })

          const thumb = resized(image.src, { width, height })

          return (
            <Clickable
              key={image.internalID}
              display="block"
              width={width}
              height={height}
              bg="black10"
              onClick={() => {
                setCursor(i)
                setMode("Zoom")
              }}
            >
              <Image
                src={thumb.src}
                srcSet={thumb.srcSet}
                width="100%"
                height="100%"
                alt={`${show.name}, installation view`}
                lazyLoad={i > 2}
                placeHolderURL={image.blurhashDataURL ?? undefined}
                style={{
                  display: "block",
                  objectFit: "contain",
                }}
              />

              {image.caption && (
                <Text
                  variant="xs"
                  mt={1}
                  color="black60"
                  width={width}
                  title={image.caption}
                  overflowEllipsis
                >
                  {image.caption}
                </Text>
              )}
            </Clickable>
          )
        })}
      </Shelf>

      {mode === "Zoom" && selected.zoom && (
        <ModalBase
          onClose={() => {
            setMode("Idle")
          }}
          dialogProps={{
            background: theme.effects.backdrop,
            height: "100%",
            width: "100%",
          }}
        >
          <Box
            ref={containerRef as any}
            width="100%"
            height="100%"
            display="flex"
          >
            <Clickable
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              overflowY="auto"
              onClick={() => {
                setMode("Idle")
              }}
            >
              <FullscreenBox
                maxWidth={selected.zoom.width ?? 1}
                maxHeight={selected.zoom.height ?? 1}
                aspectWidth={selected.zoom.width ?? 1}
                aspectHeight={selected.zoom.height ?? 1}
                bg="black10"
              >
                <Image
                  key={selected.zoom.src}
                  src={selected.zoom.src}
                  srcSet={selected.zoom.srcSet}
                  width="100%"
                  height="100%"
                  placeHolderURL={selected.blurhashDataURL ?? undefined}
                  alt={`${show.name}, installation view`}
                />
              </FullscreenBox>
            </Clickable>

            {images.length > 1 && (
              <>
                <NextPrevious
                  onClick={handlePrev}
                  left={0}
                  aria-label="Previous"
                >
                  <ChevronLeftIcon fill="currentColor" width={30} height={30} />
                </NextPrevious>

                <NextPrevious onClick={handleNext} right={0} aria-label="Next">
                  <ChevronRightIcon
                    fill="currentColor"
                    width={30}
                    height={30}
                  />
                </NextPrevious>
              </>
            )}
          </Box>
        </ModalBase>
      )}
    </>
  )
}

export const ShowInstallShotsFragmentContainer = createFragmentContainer(
  ShowInstallShots,
  {
    show: graphql`
      fragment ShowInstallShots_show on Show {
        name
        images(default: false, size: 100) {
          internalID
          caption
          src: url(version: ["larger", "large"])
          width
          height
          versions
          blurhashDataURL
          zoom: resized(
            quality: 85
            width: 900
            height: 900
            version: ["main", "normalized", "larger", "large"]
          ) {
            src
            srcSet
            width
            height
          }
        }
      }
    `,
  }
)

const NextPrevious = styled(Clickable).attrs({
  p: 2,
})`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  transition: color 250ms;
  color: ${themeGet("colors.black60")};

  &:hover,
  &:focus,
  &.focus-visible {
    outline: none;
    color: ${themeGet("colors.black100")};
  }
`
