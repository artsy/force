import { Spacer, Stack, Text } from "@artsy/palette"
import {
  ArticlesAuthors,
  ArticlesAuthorsPlaceholder,
} from "Apps/Articles/Components/ArticlesAuthors"
import { ClientSuspense } from "Components/ClientSuspense"
import { MetaTags } from "Components/MetaTags"
import { useRouter } from "System/Hooks/useRouter"
import type { FC } from "react"

export const AuthorsApp: FC<React.PropsWithChildren<unknown>> = () => {
  const { match } = useRouter()
  const pathname = match.location.pathname

  return (
    <>
      <MetaTags title="Authors | Artsy" pathname={pathname} />

      <Spacer y={4} />

      <Stack gap={4}>
        <Text as="h1" variant="xl">
          Authors
        </Text>

        <ClientSuspense fallback={<ArticlesAuthorsPlaceholder />}>
          <ArticlesAuthors />
        </ClientSuspense>
      </Stack>
    </>
  )
}
