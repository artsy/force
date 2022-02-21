import { useState } from "react"
import * as React from "react"
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
import { ShowInstallShots_show$data } from "v2/__generated__/ShowInstallShots_show.graphql"
import { compact } from "lodash"

type InstallShot = NonNullable<ShowInstallShots_show$data["images"]>[number]

interface ShowInstallShotsProps extends Omit<CarouselProps, "children"> {
  show: ShowInstallShots_show$data
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

  if (show.images?.length === 0) return null

  const images = compact(show.images)

  return (
    <>
      <Shelf alignItems="flex-end">
        {images.map((image, i) => {
          if (!image.desktop || !image.mobile) return <></>

          return (
            <Clickable
              key={image.internalID ?? i}
              onClick={handleOpen(image)}
              display="block"
            >
              <Image
                src={image.desktop.src}
                srcSet={image.desktop.srcSet}
                width={[image.mobile.width, image.desktop.width]}
                height={[image.mobile.height, image.desktop.height]}
                style={{
                  display: "block",
                  objectFit: "contain",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                }}
                alt={`${show.name}, installation view`}
                lazyLoad={i > 2}
              />

              {image.caption && (
                <Text
                  variant="xs"
                  mt={1}
                  color="black60"
                  textAlign="left"
                  width={[image.mobile.width, image.desktop.width]}
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

      {selectedImage !== null && !!selectedImage.zoom && (
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
              maxWidth={selectedImage.zoom.width!}
              maxHeight={selectedImage.zoom.height!}
              aspectWidth={selectedImage.zoom.width!}
              aspectHeight={selectedImage.zoom.height!}
            >
              <Image
                src={selectedImage.zoom.src}
                srcSet={selectedImage.zoom.srcSet}
                width="100%"
                height="100%"
                alt={`${show.name}, installation view`}
                lazyLoad
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
