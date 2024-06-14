import {
  Avatar,
  Box,
  Button,
  Column,
  GridColumns,
  Image,
  Join,
  ResponsiveBox,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { FC } from "react"
import { MetaTags } from "Components/MetaTags"
import { RouterLink } from "System/Components/RouterLink"
import { cropped, resized } from "Utils/resized"
import { InstitutionPartnershipsHero } from "./Components/InstitutionPartnershipsHero"
import { InstitutionPartnershipsProfilesQueryRenderer } from "./Components/InstitutionPartnershipsProfiles"
import { InstitutionPartnershipsShowsQueryRenderer } from "./Components/InstitutionPartnershipsShows"

export const InstitutionPartnershipsApp: FC = () => {
  return (
    <>
      <MetaTags
        title="Institution Partnerships | Artsy"
        pathname="/institution-partnerships"
      />

      <Join separator={<Spacer y={6} />}>
        <InstitutionPartnershipsHero />

        <GridColumns>
          <Column span={6}>
            <Text variant="xs">Shows</Text>

            <Text variant="xl" mt={1}>
              Showcasing Exciting Exhibitions Every Day
            </Text>
          </Column>

          <Column span={6}>
            <Text variant="sm">
              Make sure art lovers discover your shows alongside thousands of
              spectacular museum and gallery exhibitions in New York, Paris,
              London, Tokyo, Hong Kong, Istanbul, Mexico City, and more in our
              searchable shows listing.
            </Text>
          </Column>
        </GridColumns>

        <InstitutionPartnershipsShowsQueryRenderer />

        <Separator />

        <GridColumns>
          <Column span={6}>
            <Text variant="xs">Education</Text>

            <Text variant="xl" mt={1}>
              Share Images for Learning with The Art Genome Project
            </Text>
          </Column>

          <Column span={6}>
            <Text variant="sm">
              Collaborate with us to share 800,000+ images of world art with the
              public. The Art Genome Project creates associations between
              artists and artworks so that experts and non-experts alike can
              easily discover your collections with over 1,000 categories
              ("genes") like "Abstract Expressionism," "Splattered/Dripped,"
              "Portrait," and "Eye Contact."
            </Text>
          </Column>
        </GridColumns>

        <InstitutionPartnershipsProfilesQueryRenderer />

        <GridColumns>
          <Column span={4} start={5}>
            <Button
              width="100%"
              // @ts-ignore
              as={RouterLink}
              to="/institutions"
            >
              See All Museums
            </Button>
          </Column>
        </GridColumns>

        <Separator />

        <GridColumns>
          <Column span={6}>
            <Text variant="xs">Audience</Text>

            <Text variant="xl" mt={1}>
              Reach a Global Audience of More Than 2.2 Million Unique Art Lovers
              Per Month
            </Text>

            <Text variant="sm" mt={1}>
              <Box as="p">
                “Artsy's reach into the worldwide art market resulted in the
                participation of students from 78 cities in 13 countries and 5
                continents in the Robert Rauschenberg Foundation's Emerging
                Curator Competition-evidence of Artsy's tremendous educational
                impact.“
              </Box>

              <Box as="p" mt={2} color="black60">
                —Christy MacLear, Executive Director, Robert Rauschenberg
                Foundation
              </Box>
            </Text>
          </Column>

          <Column span={6}>
            <ResponsiveBox
              aspectWidth={2680}
              aspectHeight={1393}
              maxWidth="100%"
              bg="black10"
            >
              <Image
                {...resized(
                  "https://files.artsy.net/images/institutions-density-map.png",
                  { width: 910, height: 473 }
                )}
                width="100%"
                height="100%"
                alt="Density map depicting locations of Artsy institutional partners"
                lazyLoad
              />
            </ResponsiveBox>
          </Column>
        </GridColumns>

        <Separator />

        <GridColumns>
          <Column span={6}>
            <ResponsiveBox
              aspectWidth={2680}
              aspectHeight={1601}
              maxWidth="100%"
              bg="black10"
              border="1px solid"
              borderColor="black10"
            >
              <Image
                {...resized(
                  "https://files.artsy.net/images/institutions-page-screenshot.png",
                  { width: 910, height: 543 }
                )}
                width="100%"
                height="100%"
                alt="Screenshot of a partner page on Artsy.net"
                lazyLoad
              />
            </ResponsiveBox>
          </Column>

          <Column span={6}>
            <Text variant="xs">Design</Text>

            <Text variant="xl" mt={1}>
              Promote Shows and Collections on Your Dedicated Page
            </Text>

            <Text variant="sm" mt={1}>
              Create an elegant page for your institution so that users can
              follow you and be automatically notified of any new shows and
              works you upload. High-resolution images are right-click disabled,
              and download disabled.
            </Text>
          </Column>
        </GridColumns>

        <Separator />

        <GridColumns>
          <Column span={6}>
            <Text variant="xs">Tools</Text>

            <Text variant="xl" mt={1}>
              Directly Manage Your Page on Artsy
            </Text>

            <Text variant="sm" mt={1}>
              It is free for nonprofits to promote your Shows and Collections.
              Use our cloud-based Content Management System (CMS) to update your
              page 24/7 and receive analytics via email each month. You may also
              opt to use our “Shop” feature to list limited editions and
              original artworks for sale to benefit your organization. Contact
              us about our special plans for nonprofit sellers.
            </Text>
          </Column>

          <Column span={6}>
            <ResponsiveBox
              aspectWidth={2680}
              aspectHeight={1601}
              maxWidth="100%"
              bg="black10"
              border="1px solid"
              borderColor="black10"
            >
              <Image
                {...resized(
                  "https://files.artsy.net/images/institutions-cms-screenshot.png",
                  { width: 910, height: 543 }
                )}
                width="100%"
                height="100%"
                alt="Screenshot of the Artsy.net CMS"
                lazyLoad
              />
            </ResponsiveBox>
          </Column>
        </GridColumns>

        <Separator />

        <GridColumns>
          <Column span={6}>
            <Join separator={<Separator my={2} />}>
              {PROFILES.map(profile => {
                return (
                  <Box key={profile.name} display="flex">
                    <Avatar
                      {...cropped(profile.src, { width: 100, height: 100 })}
                      size="md"
                    />

                    <Box ml={2}>
                      <Text variant="lg">{profile.name}</Text>
                      <Text variant="md">{profile.title}</Text>
                    </Box>
                  </Box>
                )
              })}
            </Join>
          </Column>

          <Column span={6}>
            <Text variant="xs">Team</Text>

            <Text variant="xl" mt={1}>
              Passionate Museum Experts Dedicated to Fostering Access to Art
            </Text>

            <Text variant="sm" mt={1}>
              The Artsy institutions team is dedicated to building an
              encyclopedic database and fostering free online access to world
              art. Every partner works with an Artsy team member to help you
              promote your organization to Artsy's international audience of art
              lovers, students, and patrons of the arts.
            </Text>
          </Column>
        </GridColumns>
      </Join>
    </>
  )
}

const PROFILES = [
  {
    name: "Erica Lyon",
    title: "Associate Director, Auction & Institutional Partnerships",
    src: "https://files.artsy.net/images/institutions-avatar-erica-lyon.jpg",
  },
  {
    name: "Perry Weber",
    title: "Manager, Auction Partnerships",
    src: "https://files.artsy.net/images/institutions-avatar-perry-weber.jpg",
  },
]
