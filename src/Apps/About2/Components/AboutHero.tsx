import { Column, GridColumns, Image, ResponsiveBox } from "@artsy/palette"
import { resized } from "Utils/resized"

export const AboutHero = () => {
  return (
    <GridColumns gridColumnGap={0}>
      <Column span={[6, 4]}>
        <ResponsiveBox
          bg="mono10"
          aspectWidth={1280}
          aspectHeight={1500}
          maxWidth="100%"
        >
          <Image
            {...resized("https://files.artsy.net/images/about2-header-1.jpg", {
              width: 500,
            })}
            width="100%"
            height="100%"
            alt=""
          />
        </ResponsiveBox>
      </Column>

      <Column span={[6, 4]} pt={[40, 100]}>
        <ResponsiveBox
          bg="mono15"
          aspectWidth={1280}
          aspectHeight={1500}
          maxWidth="100%"
        >
          <Image
            {...resized(
              "https://files.artsy.net/images/about2-header-2-2.jpg",
              {
                width: 500,
              },
            )}
            width="100%"
            height="100%"
            alt=""
          />
        </ResponsiveBox>
      </Column>

      <Column span={[6, 4]} display={["none", "block"]}>
        <ResponsiveBox
          bg="mono10"
          aspectWidth={1280}
          aspectHeight={1500}
          maxWidth="100%"
        >
          <Image
            {...resized(
              "https://files.artsy.net/images/about2-header-3-2.jpg",
              { width: 500 },
            )}
            width="100%"
            height="100%"
            alt=""
          />
        </ResponsiveBox>
      </Column>
    </GridColumns>
  )
}
