import {
  Box,
  Column,
  Flex,
  FullBleed,
  GridColumns,
  Image,
  Spacer,
  Stack,
  Text,
  useTheme,
} from "@artsy/palette"
import { AboutSection } from "Apps/About/Components/AboutSection"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { RouterLink } from "System/Components/RouterLink"
import { resized } from "Utils/resized"
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
                </Stack>
              </Column>

              <Column span={10} start={2}>
                <Stack gap={1}>
                  <Flex
                    justifyContent="center"
                    gap={1}
                    flexDirection={["column", "row"]}
                  >
                    {TEAM_MEMBERS.slice(0, 3).map(member => (
                      <Box key={member.name} flexBasis={["100%", "25%"]}>
                        <AboutOurTeamItem {...member} />
                      </Box>
                    ))}
                  </Flex>

                  <GridColumns gridColumnGap={1}>
                    {TEAM_MEMBERS.slice(3).map(member => (
                      <AboutOurTeamItem key={member.name} {...member} />
                    ))}
                  </GridColumns>
                </Stack>
              </Column>

              <Column span={10} start={2} py={[4, 6]}>
                <Stack gap={1} textAlign="center">
                  <Text variant="lg-display">Looking to join our team?</Text>

                  <Text variant="lg-display">
                    <AboutOurTeamCareersLink to="/jobs">
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

const TEAM_MEMBERS = [
  {
    name: "Jeffrey Yin",
    title: "CEO",
    src: "https://files.artsy.net/images/about-our-team-jeffrey-yin.png",
  },
  {
    name: "Dustyn Kim",
    title: "President",
    src: "https://files.artsy.net/images/about-our-team-dustyn-kim.png",
  },
  {
    name: "Angela Vinci",
    title: "Chief Product Officer",
    src: "https://files.artsy.net/images/about-our-team-angela-vinci-1.png",
  },
  {
    name: "Joey Aghion",
    title: "VP, Engineering",
    src: "https://files.artsy.net/images/about-our-team-joey-aghion.png",
  },
  {
    name: "Alex Forbes",
    title: "VP, Global Partnerships",
    src: "https://files.artsy.net/images/about-our-team-alex-forbes.png",
  },
  {
    name: "Ani Petrov",
    title: "VP, Marketing & Data Analytics",
    src: "https://files.artsy.net/images/about-our-team-ani-petrov-1.png",
  },
  {
    name: "Christopher Young",
    title: "VP, Finance & Corporate Development",
    src: "https://files.artsy.net/images/about-our-team-christopher-young-1.png",
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
      span={3}
      borderRadius={10}
      overflow="hidden"
      bg={[bg || "transparent", "transparent"]}
      px={[2, 0]}
      pt={[2, 0]}
      pb={[2, 0]}
    >
      <Stack
        gap={1}
        alignItems={["center", "flex-start"]}
        flexDirection={["row", "column"]}
      >
        <>
          {/* Mobile */}
          <Box
            bg="mono60"
            width={100}
            height={100}
            borderRadius="50%"
            overflow="hidden"
            display={["block", "none"]}
            flexShrink={0}
          >
            <Image
              {...resized(src, { width: 300 })}
              width="100%"
              height="100%"
              alt={`${name}, ${title}`}
              style={{ objectFit: "cover", objectPosition: "center 10%" }}
            />
          </Box>
          {/* Desktop */}
          <Box
            bg="mono60"
            width="100%"
            borderRadius={10}
            overflow="hidden"
            display={["none", "block"]}
          >
            <Image
              {...resized(src, { width: 400 })}
              width="100%"
              height="auto"
              alt={`${name}, ${title}`}
            />
          </Box>
        </>

        <Stack gap={0} textAlign={"left"}>
          <Text variant={["lg", "lg-display"]}>{name}</Text>

          <Text variant="sm-display">{title}</Text>
          <Spacer y={[0, 4]} />
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
