import { useDidMount } from "@artsy/palette"
import { type FC, type ReactNode, Suspense } from "react"

interface ClientSuspenseProps {
  fallback: NonNullable<ReactNode>
  children: ReactNode
}

export const ClientSuspense: FC<
  React.PropsWithChildren<ClientSuspenseProps>
> = ({ fallback, children }) => {
  const isMounted = useDidMount()

  return (
    <>
      {isMounted ? (
        <Suspense fallback={fallback}>{children}</Suspense>
      ) : (
        fallback
      )}
    </>
  )
}
