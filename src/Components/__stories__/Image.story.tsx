import {
  Box,
  Clickable,
  HorizontalOverflow,
  Join,
  ModalDialog,
  Spacer,
  Text,
  useTheme,
} from "@artsy/palette"
import { useState } from "react"
import styled from "styled-components"
import { resized } from "Utils/resized"

export default {
  title: "Temp/Images",
}

const QUALITIES = [1, 10, 20, 30, 40, 50, 55, 60, 65, 70, 75, 80, 85, 90, 100]

const MAX_DIMENSIONS = { width: 600, height: 600 }

const IMAGES = [
  {
    src:
      "https://d32dm0rphc51dk.cloudfront.net/OS1wdHd6B9g_JMSH-iL5og/normalized.jpg",
    width: 600,
    height: 456.5,
  },
  {
    src:
      "https://d32dm0rphc51dk.cloudfront.net/3zr41Kid4jba5PLiBNaXLg/normalized.jpg",
    width: 433,
    height: 600,
  },
  {
    src:
      "https://d32dm0rphc51dk.cloudfront.net/A5jM8w6hQQtGN-i7MTnl7w/normalized.jpg",
    width: 399,
    height: 600,
  },
  {
    src:
      "https://d32dm0rphc51dk.cloudfront.net/2YIFhcqGdH3vpZzZIFpeEg/normalized.jpg",
    width: 430,
    height: 599,
  },
  {
    src:
      "https://d32dm0rphc51dk.cloudfront.net/3YymHBmJkVa0LrKciF4TAg/normalized.jpg",
    width: 400,
    height: 600,
  },
]

export const Compression = () => {
  return (
    <Join separator={<Spacer y={6} />}>
      {IMAGES.map(image => {
        return (
          <HorizontalOverflow key={image.src}>
            <Box>
              {QUALITIES.map(quality => (
                <Detail key={quality} {...image} quality={quality} />
              ))}
            </Box>
          </HorizontalOverflow>
        )
      })}
    </Join>
  )
}

const Detail = ({
  src,
  quality,
  width,
  height,
}: typeof IMAGES[number] & { quality: number }) => {
  const [show, setShow] = useState(false)

  const { theme } = useTheme()

  return (
    <>
      {show && (
        <ModalDialog
          title={`${quality}% (hover to compare with 100%)`}
          onClose={() => setShow(false)}
          dialogProps={{ width: width + 80 }}
        >
          <Compare width={width} height={height}>
            <Box>
              <img
                {...resized(src, { ...MAX_DIMENSIONS, quality: 100 })}
                alt=""
              />

              <Text
                variant="xs"
                position="absolute"
                top={1}
                right={1}
                color="black100"
                bg="white100"
                px={1}
                py={0.5}
                borderRadius={2}
                style={{ boxShadow: theme.effects.dropShadow }}
              >
                100%
              </Text>
            </Box>

            <Box>
              <img {...resized(src, { ...MAX_DIMENSIONS, quality })} alt="" />

              <Text
                variant="xs"
                position="absolute"
                top={1}
                left={1}
                color="black100"
                bg="white100"
                px={1}
                py={0.5}
                borderRadius={2}
                style={{ boxShadow: theme.effects.dropShadow }}
              >
                {quality}%
              </Text>
            </Box>
          </Compare>
        </ModalDialog>
      )}

      <Clickable onClick={() => setShow(true)}>
        <img
          {...resized(src, { ...MAX_DIMENSIONS, quality })}
          alt=""
          style={{ display: "block" }}
          width={width}
          height={height}
        />

        <Text variant="xs" mt={0.5} pl={2} borderLeft="1px solid">
          {quality}%
        </Text>
      </Clickable>
    </>
  )
}

const Compare = styled(Box)`
  position: relative;

  &:hover {
    > div:last-child {
      opacity: 0;
    }
  }

  > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
