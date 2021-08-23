import React, { useMemo } from "react"
import { Column, GridColumns, Separator, Spacer, Text } from "@artsy/palette"
import { moment } from "desktop/lib/template_modules"
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
    endAt,
  } = fair

  const hasEnded = endAt && moment().isAfter(new Date(endAt))
  const hasAboutContent = useMemo(
    () => some(aboutInfoTypes, field => !!fair[field]),
    [fair]
  )

  if (hasEnded && !hasAboutContent) {
    return null
  }

  return (
    <>
      <GridColumns mt={[2, 4]}>
        {!hasEnded && (
          <Column span={6}>
            <FairTimer fair={fair} />
          </Column>
        )}

        {hasAboutContent && (
          <Column span={hasEnded ? 12 : 6}>
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

      <Separator my={4} />
    </>
  )
}

export const FairAboutFragmentContainer = createFragmentContainer(FairAbout, {
  fair: graphql`
    fragment FairAbout_fair on Fair {
      ...FairTimer_fair
      endAt
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
