import {
  Flex,
  SkeletonBox,
  Join,
  Separator,
  SkeletonText,
  Spacer,
} from "@artsy/palette"
import { times } from "lodash"

const NotificationItemPlaceholder = () => {
  const numberOfImages = Math.floor(Math.random() * 4) + 1
  return (
    <Flex flex={1} flexDirection="column" p={2}>
      <SkeletonText variant="xs">Alert</SkeletonText>
      <SkeletonText variant="xs">Works by Helmut Newton</SkeletonText>
      <SkeletonText variant="xs">4 works added</SkeletonText>
      <Spacer y={1} />
      <Flex flexDirection="row" alignItems="center">
        <Join separator={<Spacer x={1} />}>
          {times(numberOfImages).map(index => {
            return <SkeletonBox width={58} height={58}></SkeletonBox>
          })}
        </Join>
      </Flex>
    </Flex>
  )
}

export const NotificationsListPlaceholder = () => {
  return (
    <Join separator={<Separator />}>
      {times(4).map(index => {
        return (
          <NotificationItemPlaceholder
            key={`NotificationItemPlaceholder-${index}`}
          />
        )
      })}
    </Join>
  )
}
