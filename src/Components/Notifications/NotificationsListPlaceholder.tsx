import {
  Flex,
  SkeletonBox,
  Join,
  Separator,
  SkeletonText,
  Spacer,
} from "@artsy/palette"
import { useFeatureFlag } from "System/useFeatureFlag"
import { times } from "lodash"

const NotificationItemPlaceholder = () => {
  const enableNewActivityPanel = useFeatureFlag("onyx_new_notification_page")

  const numberOfImages = Math.floor(Math.random() * 4) + 1

  if (!enableNewActivityPanel) {
    return (
      <Flex flex={1} flexDirection="column" p={2}>
        <SkeletonText variant="xs">Alert</SkeletonText>
        <SkeletonText variant="xs">Works by Helmut Newton</SkeletonText>
        <SkeletonText variant="xs">4 works added</SkeletonText>
        <Spacer y={1} />
        <Flex flexDirection="row" alignItems="center">
          <Join separator={<Spacer x={1} />}>
            {times(numberOfImages).map(index => {
              return (
                <SkeletonBox key={index} width={58} height={58}></SkeletonBox>
              )
            })}
          </Join>
        </Flex>
      </Flex>
    )
  }

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
