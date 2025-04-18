import VerifiedIcon from "@artsy/icons/VerifiedIcon"
import { Banner } from "@artsy/palette"
import { useRouter } from "System/Hooks/useRouter"
import { useEffect, useState } from "react"

export const ArtsyGuaranteeMessage: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { match } = useRouter()
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    setShowBanner(true)

    const timer = setTimeout(() => {
      setShowBanner(false)
    }, 5000)

    return () => {
      clearTimeout(timer)
    }
  }, [match.params.conversationId])

  if (!showBanner) {
    return null
  }

  return (
    <Banner variant="brand">
      <VerifiedIcon mr={1} fill="mono0" />
      To be covered by the Artsy Guarantee, always communicate and pay through
      the Artsy platform.
    </Banner>
  )
}
