import { Avatar, Flex, UserSingleIcon } from "@artsy/palette"
import { Media } from "Utils/Responsive"

export const CollectorProfileHeaderAvatar: React.FC = ({}) => {
  return (
    <>
      <Media lessThan="sm">
        <Avatar size="xs" />
      </Media>

      <Media greaterThanOrEqual="sm">
        <Avatar size="md" />
      </Media>
    </>
  )
}

const NoAvatarComponent: React.FC = () => {
  return (
    <Flex
      height={[45, 100]}
      width={[45, 100]}
      borderRadius="50%"
      justifyContent="center"
      alignItems="center"
      backgroundColor="black10"
    >
      <UserSingleIcon />
    </Flex>
  )
}
