import React from "react"
import { Box, Column, Flex, GridColumns, Spacer, Text } from "@artsy/palette"
import { FairOrganizerHeaderIcon } from "./FairOrganizerHeaderIcon"
import { FairOrganizerTiming } from "./FairOrganizerTiming"
import { FairOrganizerInfo } from "./FairOrganizerInfo"

export const FairOrganizerHeader: React.FC<any> = ({}) => {
  return (
    <Box>
      <GridColumns>
        <Column span={6}>
          <Flex flexDirection="column">
            <Box>
              <FairOrganizerHeaderIcon
                fairOrganizer={{
                  icon: {
                    desktop: {
                      src:
                        "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=100&height=100&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FpEE751u3-2o0oOfaTHTSYA%2Fsquare140.png",
                      srcSet:
                        "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=100&height=100&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FpEE751u3-2o0oOfaTHTSYA%2Fsquare140.png 1x, https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=200&height=200&quality=50&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FpEE751u3-2o0oOfaTHTSYA%2Fsquare140.png 2x",
                    },
                    mobile: {
                      src:
                        "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=60&height=60&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FpEE751u3-2o0oOfaTHTSYA%2Fsquare140.png",
                      srcSet:
                        "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=60&height=60&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FpEE751u3-2o0oOfaTHTSYA%2Fsquare140.png 1x, https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=120&height=120&quality=50&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FpEE751u3-2o0oOfaTHTSYA%2Fsquare140.png 2x",
                    },
                  },
                }}
              />
            </Box>

            <Spacer mt={1} />

            <Box>
              <Text as="h1" variant="xl">
                Explore Art Paris on Artsy
              </Text>

              <FairOrganizerTiming
                fairOrganizer={{
                  status: "upcoming",
                  period: "Aug 8th - 12th",
                  startAt: "2021-08-08T19:00:00+03:00",
                  endAt: "2021-08-12T19:00:00+03:00",
                }}
              />
            </Box>
          </Flex>
        </Column>

        <Column span={6}>
          <FairOrganizerInfo
            about="Art Paris, the leading spring event for modern and contemporary art, supports and celebrates the French art scene and invites visitors to discover the Spanish and Portuguese art from the 1950s to the present day, from modern masters to contemporary artists."
            links={[
              { label: "Facebook", href: "https://www.facebook.com" },
              { label: "Twitter", href: "https://twitter.com" },
            ]}
          />
        </Column>
      </GridColumns>
    </Box>
  )
}
