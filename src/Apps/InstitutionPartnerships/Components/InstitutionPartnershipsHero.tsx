import { Box, Column, GridColumns, Text, Spacer, Button } from "@artsy/palette"
import { FC } from "react"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { FullBleedHeaderFader } from "Components/FullBleedHeader/FullBleedHeaderFader"

export const InstitutionPartnershipsHero: FC = () => {
  return (
    <FullBleedHeaderFader figures={FIGURES}>
      <Box position="absolute" top={0} left={0} width="100%" height="100%">
        <AppContainer height="100%">
          <HorizontalPadding
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height="100%"
          >
            <GridColumns>
              <Column span={[12, 8, 6, 5]}>
                <Text variant={["xl", "xxl"]} as="h1" color="white100">
                  Artsy for Museums
                </Text>

                <Spacer y={2} />

                <Text variant="sm" color="white100">
                  Promoting the collections and exhibitions of the Musée du
                  Louvre, J. Paul Getty Museum, Robert Rauschenberg Foundation,
                  and over 700 major museums and institutions worldwide.
                </Text>

                <Spacer y={[4, 6]} />

                <Button
                  size={["small", "large"]}
                  variant="primaryWhite"
                  // @ts-ignore
                  as="a"
                  target="_blank"
                  href="https://apply.artsy.net/institutions"
                >
                  Apply to Join
                </Button>
              </Column>
            </GridColumns>
          </HorizontalPadding>
        </AppContainer>
      </Box>
    </FullBleedHeaderFader>
  )
}

const FIGURES = [
  {
    caption:
      "Cour Napoléon et pyramide © 2013 Musée du Louvre / Olivier Ouadah",
    src: "https://files.artsy.net/images/institution-partnerships.jpg",
  },
  {
    caption:
      "Jacques-Louis David: The Farewell of Telemachus and Eucharis, 1818. Getty Trust Content Program",
    src: "https://files.artsy.net/images/institutions-banner-2.jpeg",
  },
  {
    caption:
      "Untitled [Cunningham dancers], 1961 © Robert Rauschenberg Foundation",
    src: "https://files.artsy.net/images/institutions-banner-3.jpeg",
  },
]
