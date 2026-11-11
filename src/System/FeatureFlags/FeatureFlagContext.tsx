import { FlagProvider } from "@unleash/proxy-client-react"
import { useSystemContext } from "System/Hooks/useSystemContext"

export const FeatureFlagProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { unleash } = useSystemContext()

  if (!unleash) {
    // Without a bootstrapped client there is nothing to agree with the server
    // on, so render the provider's offline default: every flag is off. It's
    // never started, because the offline client would poll `http://localhost`.
    return <FlagProvider startClient={false}>{children}</FlagProvider>
  }

  return (
    // `config` isn't used to build a client here, but its `bootstrap` marks
    // flags as ready from the first render, identically on server and client.
    <FlagProvider unleashClient={unleash.client} config={unleash.config}>
      {children}
    </FlagProvider>
  )
}
