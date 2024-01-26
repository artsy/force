import { Clickable, ClickableProps, Flex, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import {
  CareerHighlightKind,
  getCareerHighlight,
} from "Apps/Settings/Routes/Insights/Utils/getCareerHighlight"
import styled from "styled-components"

interface InsightsCareerHighlightCardProps {
  kind: CareerHighlightKind
  count: number
  onClick(): void
}

export const InsightsCareerHighlightCard: React.FC<InsightsCareerHighlightCardProps> = ({
  count,
  kind,
  onClick,
}) => {
  const { label, Icon } = getCareerHighlight(kind, count)

  return (
    <CardWrapper
      onClick={onClick}
      width={[205, 313]}
      height={[135, 178]}
      p={[1, 2]}
    >
      <Flex alignSelf="flex-end" mb={[2, 1]}>
        <Flex
          height={[26, 30]}
          width={[26, 30]}
          alignItems="center"
          justifyContent="center"
          border="1px solid"
          borderColor="black100"
          borderRadius="50%"
        >
          <Icon fill="black100" height={20} width={20} />
        </Flex>
      </Flex>

      <Flex flexDirection="column">
        <Text variant={["lg-display", "xl"]} color="blue100" mb={[0, 1]}>
          {count}
        </Text>

        <Text variant={["xs", "sm-display"]}>{label}</Text>
      </Flex>
    </CardWrapper>
  )
}

interface CardWrapperProps extends ClickableProps {
  onClick?: () => void
}

const CardWrapper: React.FC<CardWrapperProps> = ({
  onClick,
  children,
  ...rest
}) => {
  return (
    <ClickableCard onClick={onClick} {...rest}>
      {children}
    </ClickableCard>
  )
}

const ClickableCard = styled(Clickable)`
  background: ${themeGet("colors.white100")};
  border: 1px solid ${themeGet("colors.black10")};
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: ${themeGet("colors.blue100")};
  }
`
