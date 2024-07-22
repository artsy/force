import { Box, Clickable, ModalDialog, THEME, Text } from "@artsy/palette"
import { useState } from "react"
import styled from "styled-components"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"

export const MyCollectionArtworkDetailField = ({
  label,
  value,
  truncateLimit = 0,
}: {
  label: string
  value?: string | null
  truncateLimit?: number
}) => {
  const emptyValue = "----"
  const [expanded, setExpanded] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const isMobile = __internal__useMatchMedia(THEME.mediaQueries.xs)

  const truncatedValue = truncateLimit ? value?.slice(0, truncateLimit) : value
  const canExpand = (truncatedValue?.length ?? 0) < (value?.length ?? 0)

  const toggle = () => {
    if (isMobile) {
      setExpanded(!expanded)
      return
    }
    setModalOpen(true)
  }

  return (
    <Box mb={[1, 0.5]} display="flex">
      <Text color="black60" variant="sm" minWidth={[105, 105, 190]} mr={2}>
        {label}
      </Text>

      <Box display="flex" flex={1} flexDirection="column">
        <WrappedText variant="sm" color={value ? "black100" : "black60"}>
          {expanded ? value || emptyValue : truncatedValue || emptyValue}
        </WrappedText>
        {canExpand && (
          <Clickable mt={0.5} onClick={toggle} textDecoration="underline">
            <Text variant="xs">{expanded ? "Read Less" : "Read More"}</Text>
          </Clickable>
        )}
      </Box>
      {modalOpen && (
        <ModalDialog onClose={() => setModalOpen(false)} title={label}>
          <WrappedText>{value}</WrappedText>
        </ModalDialog>
      )}
    </Box>
  )
}

const WrappedText = styled(Text)`
  white-space: pre-line;
`
