import { useState } from "react"
import * as React from "react"
import { Inquiry } from "./Inquiry"
import { MNTNConversionPixel } from "../MNTNPixels"

export interface UseInquiryProps {
  artworkID: string
}

export const useInquiry = ({ artworkID }: UseInquiryProps) => {
  const [isInquiryVisible, setIsInquiryVisible] = useState(false)
  const [askSpecialist, setAskSpecialist] = useState(false)

  const showInquiry = (options: { askSpecialist?: boolean } = {}) => {
    if (options.askSpecialist) setAskSpecialist(true)
    setIsInquiryVisible(true)
  }

  const hideInquiry = () => {
    setAskSpecialist(false)
    setIsInquiryVisible(false)
  }

  const inquiryComponent = (
    <>
      {isInquiryVisible && (
        <>
          <Inquiry
            artworkID={artworkID}
            onClose={hideInquiry}
            askSpecialist={askSpecialist}
          />
          <MNTNConversionPixel forceEmbed />
        </>
      )}
    </>
  )

  return {
    showInquiry,
    hideInquiry,
    isInquiryVisible,
    /**
     * Component that must be included in your calling component
     * <>{inquiryComponent}</>
     */
    inquiryComponent,
  }
}

export type WithInquiryProps = ReturnType<typeof useInquiry> & UseInquiryProps

/** Also exposed as a HOC for older class components */
export function withInquiry<T extends WithInquiryProps = WithInquiryProps>(
  WrappedComponent: React.ComponentType<T>
) {
  const ComponentWithInquiry: React.FC<
    Omit<T, keyof WithInquiryProps> & UseInquiryProps
  > = props => {
    const { artworkID, ...rest } = props
    const inquiry = useInquiry({ artworkID })

    return (
      <WrappedComponent artworkID={artworkID} {...inquiry} {...(rest as any)} />
    )
  }

  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component"

  ComponentWithInquiry.displayName = `withInquiry(${displayName})`

  return ComponentWithInquiry
}
