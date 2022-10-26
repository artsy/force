import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Clickable,
  CloseIcon,
  DROP_SHADOW,
  Flex,
  ModalBase,
  ModalBaseProps,
  ProgressDots,
  splitBoxProps,
  useDidMount,
} from "@artsy/palette"
import { useCareerHighlightsStoriesContext } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/Hooks/useCareerHighlightsStoriesContext"
import { omit } from "lodash"

type CareerHighlightModalProps = ModalBaseProps

export const CareerHighlightModal: React.FC<CareerHighlightModalProps> = ({
  onClose,
  children,
  ...rest
}) => {
  const isMounted = useDidMount()
  const [boxProps, modalProps] = splitBoxProps(rest)
  const { dotPosition, total, back, next } = useCareerHighlightsStoriesContext()

  return (
    <ModalBase
      onClose={onClose}
      style={
        isMounted
          ? {
              backgroundColor: "rgba(0, 0, 0, 0.44)",
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
        flexDirection="column"
        width="100%"
        height={["100vh", "90%"]}
        minHeight={["100vh", "90%"]}
        overflowY="auto"
        position="relative"
        bg="white100"
        px={2}
        style={{
          boxShadow: DROP_SHADOW,
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
            px={4}
            amount={total}
            variant="dash"
            activeIndex={dotPosition}
          />
          <Clickable onClick={onClose} aria-label="Close">
            <CloseIcon fill="black100" display="block" />
          </Clickable>
        </Flex>

        <Flex flex={1} overflowY="auto">
          <Clickable justifySelf="center" onClick={back} aria-label="Back">
            <ArrowLeftIcon fill="black100" display="block" />
          </Clickable>

          {children}

          <Clickable alignSelf="center" onClick={next} aria-label="Next">
            <ArrowRightIcon fill="black100" display="block" />
          </Clickable>
        </Flex>
      </Flex>
    </ModalBase>
  )
}
