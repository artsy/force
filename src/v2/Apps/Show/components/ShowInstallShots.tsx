import React, { useState } from "react"
import { Clickable, Image, ModalBase, ResponsiveBox } from "@artsy/palette"
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
                src={image._1x.src}
                srcSet={`${image._1x.src} 1x, ${image._2x.src} 2x`}
                width={[image.mobile1x.width, image._1x.width]}
                height={[image.mobile1x.height, image._1x.height]}
                alt={`${show.name}, installation view`}
                lazyLoad={i > 2}
              />
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
              maxWidth={selectedImage.zoom1x.width}
              maxHeight={selectedImage.zoom1x.width}
              aspectWidth={selectedImage.zoom1x.width}
              aspectHeight={selectedImage.zoom1x.height}
            >
              <Image
                src={selectedImage.zoom1x.src}
                srcSet={`${selectedImage.zoom1x.src} 1x, ${selectedImage.zoom2x.src} 2x`}
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
        images {
          internalID
          mobile1x: resized(height: 300) {
            width
            height
          }
          _1x: resized(height: 400) {
            src: url
            width
            height
          }
          _2x: resized(height: 400) {
            src: url
          }
          zoom1x: resized(width: 900, height: 900) {
            src: url
            width
            height
          }
          zoom2x: resized(width: 1800, height: 1800) {
            src: url
          }
        }
      }
    `,
  }
)
