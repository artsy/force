import { SkeletonText, Text, type TextProps } from "@artsy/palette"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { AuctionDetailsStartTimeQuery } from "__generated__/AuctionDetailsStartTimeQuery.graphql"
import type { AuctionDetailsStartTime_sale$data } from "__generated__/AuctionDetailsStartTime_sale.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface AuctionDetailsStartTimeProps extends TextProps {
  sale: AuctionDetailsStartTime_sale$data
}

/**
 * Because we set timezone to UTC on the server, any SSR rendered datetime will be in UTC.
 * To render the local timezone we need to fetch and render client-side.
 */
const AuctionDetailsStartTime: FC<
  React.PropsWithChildren<AuctionDetailsStartTimeProps>
> = ({ sale, ...rest }) => {
  if (!sale.cascadingEndTime) {
    return null
  }

  return (
    <Text variant={["lg-display", "xl"]} {...rest}>
      {sale.cascadingEndTime.formattedStartDateTime}
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
  },
)

const AuctionDetailsStartTimePlaceholder: FC<
  React.PropsWithChildren<TextProps>
> = props => {
  return (
    <SkeletonText variant={["lg-display", "xl"]} {...props}>
      Starts Jan 00 at 12:00pm UTC
    </SkeletonText>
  )
}

interface AuctionDetailsStartTimeQueryRendererProps extends TextProps {
  id: string
}

export const AuctionDetailsStartTimeQueryRenderer: FC<
  React.PropsWithChildren<AuctionDetailsStartTimeQueryRendererProps>
> = ({ id, ...rest }) => {
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
