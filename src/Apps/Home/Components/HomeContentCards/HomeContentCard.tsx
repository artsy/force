import Braze from "@braze/web-sdk"
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
import { HomeHeroUnitCredit } from "Apps/Home/Components/HomeHeroUnits/HomeHeroUnitCredit"

interface HomeContentCardProps {
  card: Braze.CaptionedImage
  index: number
  onClick?: () => void
}

export const HomeContentCard: React.FC<HomeContentCardProps> = props => {
  return (
    <Box width="100%" height="100%">
      <Media at="xs">
        <HomeContentCardSmall {...props} />
      </Media>

      <Media greaterThan="xs">
        <HomeContentCardLarge {...props} />
      </Media>
    </Box>
  )
}

const HomeContentCardSmall: React.FC<HomeContentCardProps> = ({
  card,
  index,
  onClick,
}) => {
  const image = card.imageUrl
    ? cropped(card.imageUrl, {
        // 3:2
        width: 500,
        height: 333,
      })
    : null

  return (
    <RouterLink
      onClick={onClick}
      display="block"
      width="100%"
      height="100%"
      to={card.url!}
      bg="black5"
      textDecoration="none"
      aria-label={`${card.title} - ${card.description}`}
    >
      <ResponsiveBox
        aspectWidth={3}
        aspectHeight={2}
        maxWidth="100%"
        bg="black30"
      >
        {image && (
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width="100%"
            height="100%"
            lazyLoad={index > 0}
            alt=""
          />
        )}
      </ResponsiveBox>

      <Box p={4}>
        <Text as={index === 0 ? "h1" : "h2"} variant="lg-display" lineClamp={3}>
          {card.title}
        </Text>

        <Spacer y={1} />

        <Text variant="xs" color="black60" lineClamp={4}>
          {card.description}
        </Text>

        <Spacer y={1} />

        <Text variant="xs">{card.linkText}</Text>
      </Box>
    </RouterLink>
  )
}

const HomeContentCardLarge: React.FC<HomeContentCardProps> = ({
  card,
  index,
  onClick,
}) => {
  const image = card.imageUrl
    ? cropped(card.imageUrl, { width: 1270, height: 500 })
    : null

  return (
    <RouterLink
      onClick={onClick}
      display="block"
      textDecoration="none"
      to={card.url!}
      aria-label={`${card.title} - ${card.description}`}
    >
      <GridColumns bg="black5">
        <Column span={6}>
          <Box height={[300, 400, 500]} position="relative" bg="black30">
            {image && (
              <Image
                src={image.src}
                srcSet={image.srcSet}
                width="100%"
                height="100%"
                style={{ objectFit: "cover" }}
                lazyLoad={index > 0}
                alt=""
              />
            )}

            {card.extras?.credit && (
              <Box
                position="absolute"
                bottom={0}
                left={0}
                width="100%"
                px={2}
                pb={1}
                pt={6}
                background="linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%);"
              >
                <HomeHeroUnitCredit>{card.extras.credit}</HomeHeroUnitCredit>
              </Box>
            )}
          </Box>
        </Column>

        <Column span={6}>
          <GridColumns height="100%">
            <Column
              start={3}
              span={8}
              display="flex"
              justifyContent="center"
              flexDirection="column"
              py={4}
            >
              {card.extras?.label && (
                <>
                  <Text variant="xs">{card.extras.label}</Text>

                  <Spacer y={1} />
                </>
              )}

              <Text
                as={index === 0 ? "h1" : "h2"}
                variant={["lg-display", "xl", "xl"]}
                lineClamp={3}
              >
                {card.title}
              </Text>

              <Spacer y={2} />

              <Text
                variant={["xs", "sm-display", "lg-display"]}
                color="black60"
                lineClamp={4}
              >
                {card.description}
              </Text>

              <Spacer y={[2, 2, 4]} />

              <GridColumns>
                <Column span={[12, 12, 6]}>
                  <Button variant="secondaryBlack" width="100%" tabIndex={-1}>
                    {card.linkText}
                  </Button>
                </Column>
              </GridColumns>
            </Column>
          </GridColumns>
        </Column>
      </GridColumns>
    </RouterLink>
  )
}
