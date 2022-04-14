import { FC } from "react"
import { SkeletonText, Text, TextProps } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { AuctionDetailsStartTimeQuery } from "v2/__generated__/AuctionDetailsStartTimeQuery.graphql"
import { AuctionDetailsStartTime_sale } from "v2/__generated__/AuctionDetailsStartTime_sale.graphql"

interface AuctionDetailsStartTimeProps extends TextProps {
  sale: AuctionDetailsStartTime_sale
}

/**
 * Because we set timezone to UTC on the server, any SSR rendered datetime will be in UTC.
 * To render the local timezone we need to fetch and render client-side.
 */
const AuctionDetailsStartTime: FC<AuctionDetailsStartTimeProps> = ({
  sale,
  ...rest
}) => {
  return (
    <Text variant="xl" {...rest}>
      {!!sale.cascadingEndTime && sale.cascadingEndTime?.formattedStartDateTime}
    </Text>
  )
}

const AuctionDetailsStartTimeFragmentContainer = createFragmentContainer(
  AuctionDetailsStartTime,
  {
    sale: graphql`
      fragment AuctionDetailsStartTime_sale on Sale {
        cascadingEndTime {
          formattedStartDateTime
        }
      }
    `,
  }
)

const AuctionDetailsStartTimePlaceholder: FC<TextProps> = props => {
  return (
    <SkeletonText variant="xl" {...props}>
      Starts Jan 00 at 12:00pm UTC
    </SkeletonText>
  )
}

interface AuctionDetailsStartTimeQueryRendererProps extends TextProps {
  id: string
}

export const AuctionDetailsStartTimeQueryRenderer: FC<AuctionDetailsStartTimeQueryRendererProps> = ({
  id,
  ...rest
}) => {
  return (
    <SystemQueryRenderer<AuctionDetailsStartTimeQuery>
      variables={{ id }}
      query={graphql`
        query AuctionDetailsStartTimeQuery($id: String!) {
          sale(id: $id) {
            ...AuctionDetailsStartTime_sale
            cascadingEndTimeIntervalMinutes
            formattedStartDateTime
            cascadingEndTime {
              formattedStartDateTime
            }
          }
        }
      `}
      placeholder={<AuctionDetailsStartTimePlaceholder {...rest} />}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.sale) {
          return <AuctionDetailsStartTimePlaceholder {...rest} />
        }

        return (
          <AuctionDetailsStartTimeFragmentContainer
            sale={props.sale}
            {...rest}
          />
        )
      }}
    />
  )
}
