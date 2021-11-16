import { useEffect, useState } from "react"
import { useWindowSize } from "v2/Utils/Hooks/useWindowSize"

export const useRailOverflow = (
  railRef: React.MutableRefObject<HTMLDivElement>,
  callback: (val: boolean) => void
) => {
  const { width: viewportWidth } = useWindowSize()
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const [showMore, setShowMore] = useState<boolean>(undefined)

  useEffect(() => {
    if (railRef.current) {
      setShowMore(
        railRef.current?.scrollWidth - 20 > railRef.current?.clientWidth
      )
    }
  }, [viewportWidth])

  useEffect(() => {
    callback(showMore)
  }, [showMore])
}
