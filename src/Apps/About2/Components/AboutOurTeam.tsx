import {
  Box,
  Column,
  FullBleed,
  GridColumns,
  Image,
  ResponsiveBox,
  Stack,
  Text,
  useTheme,
} from "@artsy/palette"
import { AboutSection } from "Apps/About2/Components/AboutSection"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { RouterLink } from "System/Components/RouterLink"
import { cropped, resized } from "Utils/resized"
import styled from "styled-components"

export const AboutOurTeam = () => {
  return (
    <AboutSection id="our-team">
      <FullBleed bg="mono100" color="mono0">
        <AppContainer>
          <HorizontalPadding>
            <GridColumns py={6} gridRowGap={4}>
              <Column span={5} start={2}>
                <Stack gap={[4, 6]}>
                  <Stack gap={[2, 1]}>
                    <Text variant="xl">Our Team</Text>

                    <Text
                      variant={["sm", "lg"]}
                      width={["100%", "100%", "80%"]}
                    >
                      Our team includes engineers, editors, designers, advisors,
                      and art lovers from around the world—united by a shared
                      belief that art should be part of everyday life.
                    </Text>
                  </Stack>

                  <Stack gap={2} display={["flex", "none"]}>
                    <ResponsiveBox
                      aspectWidth={1}
                      aspectHeight={1}
                      bg="mono60"
                      maxWidth="100%"
                    >
                      <Image
                        {...cropped(
                          "https://files.artsy.net/images/about2-jeffrey-yin.jpg",
                          { width: 700, height: 700 },
                        )}
                        width="100%"
                        height="100%"
                        alt=""
                      />
                    </ResponsiveBox>

                    <Stack gap={1}>
                      <Text variant="sm-display">Chief Executive Officer</Text>

                      <Text variant="xl">Jeffrey Yin</Text>
                    </Stack>
                  </Stack>

                  <Stack gap={2}>
                    <ResponsiveBox
                      aspectWidth={1}
                      aspectHeight={1}
                      bg="mono60"
                      maxWidth="100%"
                    >
                      <Image
                        {...resized(
                          "https://files.artsy.net/images/about2-carter-cleveland.jpg",
                          { width: 700 },
                        )}
                        width="100%"
                        height="100%"
                        alt=""
                      />
                    </ResponsiveBox>

                    <Stack gap={1}>
                      <Text variant={["sm-display", "lg-display"]}>
                        Founder of Artsy
                      </Text>

                      <Text variant="xl">Carter Cleveland</Text>
                    </Stack>
                  </Stack>
                </Stack>
              </Column>

              <Column span={5} display={["none", "block"]}>
                <Stack
                  gap={2}
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <ResponsiveBox
                    aspectWidth={1200}
                    aspectHeight={1532}
                    bg="mono60"
                    maxWidth="100%"
                  >
                    <Image
                      {...resized(
                        "https://files.artsy.net/images/about2-jeffrey-yin.jpg",
                        { width: 700 },
                      )}
                      width="100%"
                      height="100%"
                      alt=""
                    />
                  </ResponsiveBox>

                  <Stack gap={1}>
                    <Text variant="lg-display">Chief Executive Officer</Text>

                    <Text variant="xl">Jeffrey Yin</Text>
                  </Stack>
                </Stack>
              </Column>

              <Column span={10} start={2}>
                <GridColumns>
                  {MORE_TEAM_MEMBERS.map(member => (
                    <AboutOurTeamItem key={member.name} {...member} />
                  ))}
                </GridColumns>
              </Column>

              <Column span={10} start={2} py={[4, 6]}>
                <Stack gap={1} textAlign="center">
                  <Text variant="lg-display">Looking to join our team?</Text>

                  <Text variant="lg-display">
                    <AboutOurTeamCareersLink to="/careers">
                      Careers at Artsy
                    </AboutOurTeamCareersLink>
                  </Text>
                </Stack>
              </Column>
            </GridColumns>
          </HorizontalPadding>
        </AppContainer>
      </FullBleed>
    </AboutSection>
  )
}

const MORE_TEAM_MEMBERS = [
  {
    name: "Dustyn Kim",
    title: "Head of Collector Services & Private Sales",
    src: "https://files.artsy.net/images/about2-dustyn-kim-c.jpg",
  },
  {
    name: "Alex Forbes",
    title: "Head of Collector Services & Private Sales",
    src: "https://files.artsy.net/images/about2-alex-forbes-c.jpg",
  },
  {
    name: "Casey Lesser",
    title: "Head of Collector Services & Private Sales",
    src: "https://files.artsy.net/images/about2-casey-lesser-c.jpg",
  },
]

interface AboutOurTeamItemProps {
  name: string
  title: string
  src: string
}

const AboutOurTeamItem = ({ name, title, src }: AboutOurTeamItemProps) => {
  const { theme } = useTheme()

  const bg = {
    light: "rgba(255, 255, 255, 0.1)",
    dark: "rgba(0, 0, 0, 0.1)",
  }[theme.name]

  return (
    <Column
      span={4}
      borderRadius={10}
      overflow="hidden"
      bg={bg}
      px={2}
      pt={2}
      pb={[2, 4]}
    >
      <Stack gap={2} alignItems="center" flexDirection={["row", "column"]}>
        <Box
          bg="mono60"
          width={[100, "60%", "50%"]}
          style={{ aspectRatio: 1 }}
          borderRadius="50%"
          overflow="hidden"
        >
          <Image
            {...cropped(src, { width: 300, height: 300 })}
            width="100%"
            height="100%"
            alt=""
          />
        </Box>

        <Stack gap={1} textAlign={["left", "center"]}>
          <Text variant="lg-display">{name}</Text>

          <Text variant="sm-display">{title}</Text>
        </Stack>
      </Stack>
    </Column>
  )
}

const AboutOurTeamCareersLink = styled(RouterLink)`
  &:hover {
    color: inherit;
  }
`
