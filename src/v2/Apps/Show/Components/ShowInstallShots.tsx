import React, { useState } from "react"
import {
  Clickable,
  Image,
  ModalBase,
  ResponsiveBox,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { Carousel, CarouselProps } from "v2/Components/Carousel"
import { ShowInstallShots_show } from "v2/__generated__/ShowInstallShots_show.graphql"

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

  if (show.images.length === 0) return null

  return (
    <>
      <Carousel {...rest}>
        {show.images.map((image, i) => {
          return (
            <Clickable
              key={image.internalID}
              onClick={handleOpen(image)}
              display="block"
            >
              <Image
                src={image.desktop.src}
                srcSet={image.desktop.srcSet}
                width={[image.mobile.width, image.desktop.width]}
                height={[image.mobile.height, image.desktop.height]}
                alt={`${show.name}, installation view`}
                lazyLoad={i > 2}
              />

              {image.caption && (
                <Text
                  mt={1}
                  color="black60"
                  textAlign="left"
                  maxWidth={image.desktop.width}
                  title={image.caption}
                  overflowEllipsis
                >
                  {image.caption}
                </Text>
              )}
            </Clickable>
          )
        })}
      </Carousel>
      {selectedImage !== null && (
        <ModalBase
          onClose={handleClose}
          dialogProps={{
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.6)",
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
                style={{ position: "absolute" }}
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
        images(default: false) {
          internalID
          caption
          mobile: resized(height: 300) {
            width
            height
          }
          desktop: resized(height: 400, version: ["larger", "large"]) {
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
