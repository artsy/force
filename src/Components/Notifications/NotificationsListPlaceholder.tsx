import {
  Flex,
  Join,
  Separator,
  SkeletonBox,
  SkeletonText,
  Spacer,
} from "@artsy/palette"
import times from "lodash/times"
import type { FC } from "react"

interface NotificationItemPlaceholderProps {
  index: number
}

const NotificationItemPlaceholder: FC<
  React.PropsWithChildren<NotificationItemPlaceholderProps>
> = ({ index }) => {
  const numberOfImages = [2, 1, 3, 4, 3, 2][index % 6]

  return (
    <Flex flex={1} flexDirection="column" p={2}>
      <Flex flexDirection="row" alignItems="center">
        <Join separator={<Spacer x={1} />}>
          {times(numberOfImages).map(index => {
            return (
              <SkeletonBox key={index} width={58} height={58}></SkeletonBox>
            )
          })}
        </Join>
      </Flex>

      <Spacer y={1} />

      <SkeletonText variant="xs">4 new works by Helmut Newton</SkeletonText>
      <SkeletonText variant="xs">Alert • Today </SkeletonText>
    </Flex>
  )
}

export const NotificationsListPlaceholder = () => {
  return (
    <Join separator={<Separator borderColor="mono5" />}>
      {times(4).map(index => {
        return (
          <NotificationItemPlaceholder
            key={`NotificationItemPlaceholder-${index}`}
            index={index}
          />
        )
      })}
    </Join>
  )
}
