import { RouterLink } from "System/Components/RouterLink"
import { Flex, Spacer } from "@artsy/palette"

export const AdminApp: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <>
      <Flex gap={1} mt={2}>
        <RouterLink to="/admin/navigate-to-route">Navigate to Route</RouterLink>
      </Flex>

      <Spacer y={2} />

      <>{children}</>
    </>
  )
}
