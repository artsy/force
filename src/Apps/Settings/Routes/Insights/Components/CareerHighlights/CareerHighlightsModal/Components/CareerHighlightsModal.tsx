import {
  Clickable,
  Flex,
  ModalBase,
  ModalBaseProps,
  ProgressDots,
  ShelfNext,
  ShelfPrevious,
  splitBoxProps,
  useDidMount,
  useTheme,
} from "@artsy/palette"
import { useCareerHighlightsStoriesContext } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/CareerHighlightsModal/Hooks/useCareerHighlightsStoriesContext"
import { omit } from "lodash"
import { useNextPrevious } from "Utils/Hooks/useNextPrevious"
import CloseIcon from "@artsy/icons/CloseIcon"

type CareerHighlightModalProps = ModalBaseProps

export const CareerHighlightModal: React.FC<CareerHighlightModalProps> = ({
  onClose,
  children,
  ...rest
}) => {
  const isMounted = useDidMount()
  const [boxProps, modalProps] = splitBoxProps(rest)
  const { dotPosition, total, back, next } = useCareerHighlightsStoriesContext()
  const { containerRef } = useNextPrevious({ onNext: next, onPrevious: back })

  const { theme } = useTheme()

  return (
    <ModalBase
      onClose={onClose}
      style={
        isMounted
          ? {
              backgroundColor: theme.effects.backdrop,
              transition: "background-color 250ms",
            }
          : { backgroundColor: "transparent" }
      }
      dialogProps={{
        width: ["100%", 900],
        ...modalProps.dialogProps,
      }}
      {...omit(modalProps, "dialogProps")}
    >
      <Flex
        ref={containerRef as any}
        flexDirection="column"
        width="100%"
        height={["100vh", "90%"]}
        minHeight={["100vh", "90%"]}
        overflowY="auto"
        position="relative"
        bg="white100"
        px={2}
        style={{
          boxShadow: theme.effects.dropShadow,
          maxHeight: "90%",
          ...(isMounted
            ? {
                opacity: 1,
                transform: "trasnaletY(0)",
                transition: "opacity 200ms, transform 250ms",
              }
            : { opacity: 0, transform: "translateY(10px)" }),
        }}
        {...boxProps}
      >
        <Flex py={2} alignItems="center">
          <ProgressDots
            flex={1}
            px={[0, 4]}
            amount={total}
            variant="dash"
            activeIndex={dotPosition}
          />
          <Clickable ml={2} onClick={onClose} aria-label="Close">
            <CloseIcon fill="black100" display="block" />
          </Clickable>
        </Flex>

        <Flex flex={1} overflowY="auto">
          <ShelfPrevious display="flex" alignSelf="center" onClick={back} />

          <Flex flex={1} mt={4}>
            {children}
          </Flex>

          <ShelfNext display="flex" alignSelf="center" onClick={next} />
        </Flex>
      </Flex>
    </ModalBase>
  )
}
