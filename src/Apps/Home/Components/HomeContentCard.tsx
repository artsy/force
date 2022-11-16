import { CaptionedImage as BrazeContentCard } from "@braze/web-sdk"
import * as React from "react"
import {
  Box,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
  Button,
  GridColumns,
  Column,
} from "@artsy/palette"
import { cropped } from "Utils/resized"
import { RouterLink } from "System/Router/RouterLink"
import { Media } from "Utils/Responsive"
import { HomeHeroUnitCredit } from "./HomeHeroUnits/HomeHeroUnitCredit"

interface HomeContentCardProps {
  card: BrazeContentCard
  index: number
}

export const HomeContentCard: React.FC<HomeContentCardProps> = ({
  card,
  index,
}) => {
  const extras = card.extras || {}

  const image = cropped(card.imageUrl!, {
    // 3:2
    width: 910,
    height: 607,
    quality: 75,
  })

  const cardLink = card.url ?? ""

  const handleClick = () => {
    const appboy = (window as any).appboy
    appboy.logCardClick(card)
  }

  return (
    <GridColumns bg="black5" width="100%">
      <Column span={6} bg="white100">
        <RouterLink
          onClick={handleClick}
          style={{ display: "block", height: "100%", width: "100%" }}
          tabIndex={-1}
          to={cardLink}
        >
          <Media at="xs">
            <ResponsiveBox
              aspectWidth={3}
              aspectHeight={2}
              maxWidth="100%"
              bg="black10"
            >
              <Image
                height="100%"
                lazyLoad={index > 0}
                src={image.src}
                srcSet={image.srcSet}
                width="100%"
              />
            </ResponsiveBox>
          </Media>

          <Media greaterThan="xs">
            {className => (
              <Box
                className={className}
                height={[300, 400, 500]}
                position="relative"
              >
                <Image
                  src={image.src}
                  srcSet={image.srcSet}
                  width="100%"
                  height="100%"
                  style={{ objectFit: "cover" }}
                  lazyLoad={index > 0}
                />

                {extras.credit && (
                  <Box
                    position="absolute"
                    px={2}
                    pb={1}
                    pt={6}
                    width="100%"
                    bottom={0}
                    background="linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%);"
                    left={0}
                  >
                    <HomeHeroUnitCredit>{extras.credit}</HomeHeroUnitCredit>
                  </Box>
                )}
              </Box>
            )}
          </Media>
        </RouterLink>
      </Column>
      <Column span={6}>
        <GridColumns height="100%">
          <Column
            start={[2, 3]}
            span={[10, 8]}
            display="flex"
            justifyContent="center"
            flexDirection="column"
            py={4}
          >
            <RouterLink
              onClick={handleClick}
              style={{ display: "block", textDecoration: "none" }}
              tabIndex={-1}
              to={cardLink}
            >
              <Media greaterThan="xs">
                {extras.label && (
                  <>
                    <Text variant="xs" color="black100">
                      {extras.label}
                    </Text>

                    <Spacer mt={2} />
                  </>
                )}
              </Media>

              <Text
                as={index === 0 ? "h1" : "h2"}
                variant={["lg-display", "xl", "xl"]}
                color="black100"
                lineClamp={3}
              >
                {card.title}
              </Text>

              <Spacer mt={[1, 2]} />

              <Text
                variant={["xs", "sm-display", "lg-display"]}
                color="black60"
                lineClamp={4}
              >
                {card.description}
              </Text>
            </RouterLink>

            <Media greaterThan="xs">
              <Spacer
                // Unconventional value here to keep visual rhythm
                mt="30px"
              />

              <GridColumns>
                <Column span={[12, 12, 6]}>
                  <Button
                    // @ts-ignore
                    as={RouterLink}
                    onClick={handleClick}
                    to={cardLink}
                    variant="secondaryBlack"
                    width="100%"
                  >
                    {card.linkText}
                  </Button>
                </Column>
              </GridColumns>
            </Media>

            <Media at="xs">
              <Spacer mt={1} />

              <RouterLink noUnderline onClick={handleClick} to={cardLink}>
                <Text variant="xs" color="black100">
                  {card.linkText}
                </Text>
              </RouterLink>
            </Media>
          </Column>
        </GridColumns>
      </Column>
    </GridColumns>
  )
}
