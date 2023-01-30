import { Text } from "@artsy/palette"
import { FC } from "react"
import { useRouter } from "System/Router/useRouter"

export const CollectorProfileSaves2ByIdRoute: FC = () => {
  const { match } = useRouter()

  return <Text>{`/collector-profile/saves2/${match.params.id}`}</Text>
}
