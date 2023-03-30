import { Banner, GuaranteeIcon } from "@artsy/palette"
import { useEffect, useState } from "react"
import { useRouter } from "System/Router/useRouter"

export const ArtsyGuaranteeMessage: React.FC = () => {
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
      <GuaranteeIcon mr={1} fill="white100" />
      To be covered by the Artsy Guarantee, always communicate and pay through
      the Artsy platform.
    </Banner>
  )
}
