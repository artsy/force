import { Box, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowEvents_show } from "v2/__generated__/ShowEvents_show.graphql"

interface ShowEventsProps {
  show: ShowEvents_show
}

export const ShowEvents: React.FC<ShowEventsProps> = ({ show }) => {
  const events = show.events

  if (!events || events.length === 0) {
    return null
  }

  //TODO: flesh out show event details once we have more to QA
  //TODO: include render test??

  return (
    <Box>
      {events && (
        <>
          <Text variant="xs" as="h3" mb={1}>
            Show Events
          </Text>

          {events.map(event => {
            return (
              <Box key={show.internalID}>
                <Text>{event?.eventType}</Text>
              </Box>
            )
          })}
        </>
      )}
    </Box>
  )
}

export const ShowEventsFragmentContainer = createFragmentContainer(ShowEvents, {
  show: graphql`
    fragment ShowEvents_show on Show {
      events {
        title
        eventType
        description
        startAt
        endAt
      }
      internalID
    }
  `,
})
