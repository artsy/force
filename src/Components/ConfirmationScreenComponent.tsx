import { Text, Flex, Button } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"

export const ConfirmationScreenComponent: React.FC<{
  title: string
  subtitle: string
  buttonTitle: string
  routerLink: string
}> = ({ title, subtitle, buttonTitle, routerLink }) => {
  return (
    <>
      <Text variant="xl" mt={4}>
        {title}
      </Text>
      <Text variant="md" color="black60" mt={1} mb={6}>
        {subtitle}
      </Text>

      <Flex
        flexDirection={["column", "row"]}
        alignItems={["stretch", "center"]}
      >
        <RouterLink to={routerLink}>
          <Button width={["100%", "auto"]} size="large" variant="primaryBlack">
            {buttonTitle}
          </Button>
        </RouterLink>
      </Flex>
    </>
  )
}
