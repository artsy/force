import * as React from "react"
import { Avatar, Box, Flex, Spacer, Text } from "@artsy/palette"
import { __internal__useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import { RouterLink } from "v2/System/Router/RouterLink"
import { Media } from "v2/Utils/Responsive"
export const MeetTheSpecialistsIndex: React.FC = () => {
  return (
    <>
      <Box mt={4}>
        <Text as="h1" variant={["xl", "xxl"]}>
          Meet the Specialists
        </Text>
        <Spacer my={5} />
        <Text color="black60" variant={["lg", "xl"]} width={["100%", "50%"]}>
          Whether you are seeking a specific artwork for your growing collection
          or wish to sell, our global team of sale directors is ready to source,
          sell, advise and research on your behalf.
        </Text>
      </Box>
      <Spacer mb={120} />
      <Flex flexDirection="column">
        <Media lessThan="md">
          <Text width="100%" variant="xl">
            Advisory and Private Sales
          </Text>
          <Spacer mt={60} />
        </Media>
        {specialists.map((specialist, i) => (
          <>
            <Flex>
              <Box width={["0", "40%"]}>
                {i === 0 && (
                  <>
                    <Spacer mt={60} />
                    <Media greaterThanOrEqual="md">
                      <Text variant="xxl">Advisory and Private Sales</Text>
                    </Media>
                  </>
                )}
                {i === 10 && (
                  <>
                    <Spacer mt={60} />

                    <Media greaterThanOrEqual="md">
                      <Text variant="xxl">Auctions</Text>
                    </Media>
                  </>
                )}
              </Box>

              <Box width="100%">
                {i === 10 && (
                  <Media lessThan="md">
                    <Spacer mt={60} />
                    <Text width="100%" variant="xl">
                      Auctions
                    </Text>
                    <Spacer mt={60} />
                  </Media>
                )}

                <Spacer mb={[10, 60]} />

                <Flex flexDirection={["column", "row"]}>
                  <Avatar
                    size="md"
                    src={specialist.photo}
                    mr={[0, 2]}
                    mb={[2, 0]}
                  />

                  <Flex flexDirection="column">
                    <Text variant="lg">{specialist.name}</Text>
                    <Text variant="md">{specialist.title}</Text>
                    <Text variant="md" color="black60">
                      {specialist.location}
                    </Text>
                    <Spacer my={10} />
                    {specialist.phone && (
                      <RouterLink
                        textDecoration="none"
                        to={`tel:${specialist.phone}`}
                      >
                        {specialist.phone}
                      </RouterLink>
                    )}
                    <RouterLink to={`mailto:${specialist.email}`}>
                      {specialist.email}
                    </RouterLink>
                    <Spacer mb={60} />
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </>
        ))}
      </Flex>
    </>
  )
}

const specialists = [
  {
    name: "Alex Forbes",
    title: "Head of Collector Services & Private Sales",
    location: "New York",
    email: "alexander.forbes@artsy.net",
    photo:
      "http://files.artsy.net/images/alexander-forbes-artsy-headshot-2019.jpg",
  },
  {
    name: "Natasha Prince",
    title: "Senior Advisor",
    location: "London",
    email: "natasha.prince@artsy.net",
    phone: "+1 646 420 4995",
    photo: "http://files.artsy.net/images/natasha.jpeg",
  },
  {
    name: "Robin Roche",
    title: "Senior Advisor, Private Sales",
    location: "New York",
    email: "robin.roche@artsy.net",
    phone: "+1 646 707 9450",
    photo: "http://files.artsy.net/images/robin.jpeg",
  },
  {
    name: "Daniela Bianco-Duppen",
    title: "Advisor",
    location: "London",
    email: "daniela.bianco-duppen@artsy.net",
    phone: "+44 7503 236844",
    photo: "http://files.artsy.net/images/daniela-bianco-duppen.jpeg",
  },
  {
    name: "Alexandra Freedman",
    title: "Advisor",
    location: "New York",
    email: "alexandra.freedman@artsy.net",
    phone: "+1 610 405 7151",
    photo: "http://files.artsy.net/images/alexandra.jpeg",
  },
  {
    name: "Meave Hamill",
    title: "Advisor",
    location: "London",
    email: "meave@artsy.net",
    photo: "http://files.artsy.net/images/meave.jpeg",
  },
  {
    name: "George King",
    title: "Advisor",
    location: "London",
    email: "george.king@artsy.net",
    phone: "+44 7850 739913",
    photo: "http://files.artsy.net/images/george.jpeg",
  },
  {
    name: "Agnieszka Perche",
    title: "Advisor",
    location: "London",
    email: "agnieszka.perche@artsy.net",
    phone: "+44 7842 548576",
    photo: "http://files.artsy.net/images/agnieszka.jpg",
  },
  {
    name: "Caroline Perkins",
    title: "Advisor",
    location: "New York",
    email: "caroline.perkins@artsy.net",
    phone: "+1 540 588 1371",
    photo: "http://files.artsy.net/images/cperkins_headshot-copy.jpg",
  },
  {
    name: "Ipi Ramos Ricoy",
    title: "Advisor, Private Sales",
    location: "London",
    email: "itziar.ramos@artsy.net",
    phone: "+44 7429 093319",
    photo: "http://files.artsy.net/images/itziar.jpeg",
  },
  {
    name: "Shlomi Rabi",
    title: "VP and Head of Auctions",
    location: "New York",
    email: "shlomi.rabi@artsy.net",
    photo: "http://files.artsy.net/images/shlomi.jpg",
  },
  {
    name: "Lauren Carpinelli",
    title: "Specialist, Prints and Contemporary",
    location: "New York",
    email: "lauren.carpinelli@artsy.net",
    photo: "http://files.artsy.net/images/lauren.jpg",
  },
  {
    name: "Erica Lyon",
    title: "Associate Director of Partner Auctions",
    location: "New York",
    email: "erica@artsy.net",
    photo: "http://files.artsy.net/images/ericalyonheadshot.jpeg",
  },
  {
    name: "Laura Martin",
    title: "Specialist, Post-War & Contemporary",
    location: "Los Angeles",
    email: "laura.martin@artsy.net",
    photo: "http://files.artsy.net/images/laura.jpg",
  },
  {
    name: "Adam McCoy",
    title: "Senior Specialist and Head of Prints",
    location: "New York",
    email: "adam.mccoy@artsy.net",
    photo: "http://files.artsy.net/images/adam.jpg",
  },

  {
    name: "Alan Zeng",
    title: "Senior Specialist, Street Art",
    location: "New York",
    email: "alan.zeng@artsy.net",
    photo: "http://files.artsy.net/images/alan.png",
  },
]
