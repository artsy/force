import React, { useState } from "react"
import {
  Clickable,
  Image,
  ModalBase,
  ResponsiveBox,
  Shelf,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { CarouselProps } from "v2/Components/Carousel"
import { ShowInstallShots_show } from "v2/__generated__/ShowInstallShots_show.graphql"

// @ts-expect-error STRICT_NULL_CHECK
type InstallShot = ShowInstallShots_show["images"][number]

interface ShowInstallShotsProps extends Omit<CarouselProps, "children"> {
  show: ShowInstallShots_show
}

export const ShowInstallShots: React.FC<ShowInstallShotsProps> = ({
  show,
  ...rest
}) => {
  const [selectedImage, selectImage] = useState<InstallShot | null>(null)

  const handleOpen = (image: InstallShot) => () => {
    selectImage(image)
  }

  const handleClose = () => {
    selectImage(null)
  }

  // @ts-expect-error STRICT_NULL_CHECK
  if (show.images.length === 0) return null

  return (
    <>
      <Shelf showProgress={false} alignItems="flex-end">
        {/* @ts-expect-error STRICT_NULL_CHECK */}
        {show.images.map((image, i) => {
          return (
            <Clickable
              // @ts-expect-error STRICT_NULL_CHECK
              key={image.internalID}
              onClick={handleOpen(image)}
              display="block"
            >
              <Image
                // @ts-expect-error STRICT_NULL_CHECK
                src={image.desktop.src}
                // @ts-expect-error STRICT_NULL_CHECK
                srcSet={image.desktop.srcSet}
                // @ts-expect-error STRICT_NULL_CHECK
                width={[image.mobile.width, image.desktop.width]}
                maxHeight={[300, 480]}
                style={{ objectFit: "contain" }}
                alt={`${show.name}, installation view`}
              />

              {/* @ts-expect-error STRICT_NULL_CHECK */}
              {image.caption && (
                <Text
                  variant="xs"
                  mt={1}
                  color="black60"
                  textAlign="left"
                  // @ts-expect-error STRICT_NULL_CHECK
                  width={image.desktop.width}
                  // @ts-expect-error STRICT_NULL_CHECK
                  title={image.caption}
                  overflowEllipsis
                >
                  {/* @ts-expect-error STRICT_NULL_CHECK */}
                  {image.caption}
                </Text>
              )}
            </Clickable>
          )
        })}
      </Shelf>
      {selectedImage !== null && (
        <ModalBase
          onClose={handleClose}
          dialogProps={{
            background: "rgba(0, 0, 0, 0.6)",
            height: "100%",
            width: "100%",
          }}
        >
          <Clickable
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            overflowY="auto"
            onClick={handleClose}
          >
            <ResponsiveBox
              maxWidth={selectedImage.zoom.width}
              maxHeight={selectedImage.zoom.width}
              aspectWidth={selectedImage.zoom.width}
              aspectHeight={selectedImage.zoom.height}
            >
              <Image
                src={selectedImage.zoom.src}
                srcSet={selectedImage.zoom.srcSet}
                width="100%"
                height="100%"
                alt={`${show.name}, installation view`}
                style={{ position: "absolute", top: 0, left: 0 }}
              />
            </ResponsiveBox>
          </Clickable>
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
          mobile: resized(width: 200) {
            width
            height
          }
          desktop: resized(width: 325) {
            src
            srcSet
            width
            height
          }
          zoom: resized(width: 900, height: 900, version: ["larger", "large"]) {
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
