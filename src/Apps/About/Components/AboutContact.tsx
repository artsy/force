import { Box, Column, GridColumns, Stack, Text } from "@artsy/palette"
import { AboutSection } from "Apps/About/Components/AboutSection"
import type { ReactNode } from "react"

export const AboutContact = () => {
  return (
    <AboutSection id="contact">
      <GridColumns>
        <Column span={4} start={2}>
          <Stack gap={2}>
            <Stack gap={1}>
              <Text variant="lg-display">Quick Info</Text>

              <Text variant="sm" color="mono60">
                Key things you need to know about us at Artsy.
              </Text>
            </Stack>

            <AboutContactDefinitionList
              definitions={[
                { term: "Founded", description: "2009" },
                { term: "Founder", description: "Carter Cleveland" },
                { term: "CEO", description: "Jeffrey Yin" },
                {
                  term: "HQ",
                  description: "Artsy, 401 Broadway, New York, NY 10013",
                },
                { term: "Artworks Available", description: "1.6M+" },
                { term: "Galleries & Partners", description: "3,100+" },
                { term: "Users", description: "3.4M+" },
                {
                  term: "Mission",
                  description: "Expand the art market to support more artists",
                },
              ]}
            />
          </Stack>
        </Column>

        <Column span={4} start={8}>
          <Stack gap={2}>
            <Stack gap={1}>
              <Text variant="lg-display">Contact</Text>

              <Text variant="sm" color="mono60">
                Have a question or want to get involved?
              </Text>
            </Stack>

            <AboutContactDefinitionList
              definitions={[
                {
                  term: "Support",
                  description: (
                    <a href="mailto:support@artsy.net">support@artsy.net</a>
                  ),
                },
                {
                  term: "Press Inquiries",
                  description: (
                    <a href="mailto:press@artsy.net">press@artsy.net</a>
                  ),
                },
                {
                  term: "Partnerships & Galleries",
                  description: (
                    <a href="mailto:partnerships@artsy.net">
                      partnerships@artsy.net
                    </a>
                  ),
                },
                { term: "Phone Number", description: "1-646-291-2683" },
              ]}
            />
          </Stack>
        </Column>
      </GridColumns>
    </AboutSection>
  )
}

interface AboutContactDefinitionListProps {
  definitions: {
    term: string
    description: ReactNode
  }[]
}

export const AboutContactDefinitionList = ({
  definitions,
}: AboutContactDefinitionListProps) => {
  return (
    <Box as="dl">
      {definitions.map(({ term, description }, i) => (
        <GridColumns
          key={term}
          borderBottom={i === definitions.length - 1 ? "none" : "1px solid"}
          borderColor="mono10"
          py={1}
          gridColumnGap={[0, 2]}
        >
          <Column span={[6]} display="flex" alignItems="center">
            <Text as="dt" variant="sm" color="mono60">
              {term}
            </Text>
          </Column>

          <Column span={[6]} display="flex" alignItems="center">
            <Text as="dd" variant="sm">
              {description}
            </Text>
          </Column>
        </GridColumns>
      ))}
    </Box>
  )
}
