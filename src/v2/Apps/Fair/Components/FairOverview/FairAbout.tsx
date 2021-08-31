import React from "react"
import { Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { some } from "lodash"
import { InfoSection } from "v2/Components/InfoSection"
import { FairTimerFragmentContainer as FairTimer } from "./FairTimer"
import { createFragmentContainer, graphql } from "react-relay"
import { FairAbout_fair } from "v2/__generated__/FairAbout_fair.graphql"

const aboutInfoTypes = [
  "about",
  "tagline",
  "location.summary",
  "ticketsLink",
  "hours",
  "links",
  "contact",
  "summary",
  "tickets",
]

interface FairAboutProps {
  fair: FairAbout_fair
}

const FairAbout: React.FC<FairAboutProps> = ({ fair }) => {
  const {
    about,
    tagline,
    location,
    ticketsLink,
    hours,
    links,
    contact,
    summary,
    tickets,
  } = fair
  const hasAboutContent = some(aboutInfoTypes, field => !!fair[field])

  return (
    <>
      <GridColumns mt={[2, 4]}>
        <Column span={6}>
          <FairTimer fair={fair} />
        </Column>

        {hasAboutContent && (
          <Column span={6}>
            <Text variant="md" textTransform="uppercase">
              About
            </Text>
            <Spacer mt={2} />

            {summary && <InfoSection type="html" info={summary} />}
            {about && <InfoSection type="html" info={about} />}
            {tagline && <InfoSection type="text" info={tagline} />}
            {location?.summary && (
              <InfoSection
                label="Location"
                type="text"
                info={location.summary}
              />
            )}
            {hours && <InfoSection label="Hours" type="html" info={hours} />}
            {tickets && (
              <InfoSection label="Tickets" type="html" info={tickets} />
            )}
            {ticketsLink && (
              <a href={ticketsLink}>
                <Text variant="md">Buy Tickets</Text>
              </a>
            )}
            {links && <InfoSection label="Links" type="html" info={links} />}
            {contact && (
              <InfoSection label="Contact" type="html" info={contact} />
            )}
          </Column>
        )}
      </GridColumns>
    </>
  )
}

export const FairAboutFragmentContainer = createFragmentContainer(FairAbout, {
  fair: graphql`
    fragment FairAbout_fair on Fair {
      ...FairTimer_fair
      about(format: HTML)
      tagline
      location {
        summary
      }
      ticketsLink
      hours(format: HTML)
      links(format: HTML)
      tickets(format: HTML)
      summary(format: HTML)
      contact(format: HTML)
    }
  `,
})
