import { Text, type TextProps } from "@artsy/palette"

interface SectionHeadingProps
  extends Omit<TextProps, "variant" | "color" | "fontWeight"> {
  children: React.ReactNode
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  children,
  ...rest
}) => {
  return (
    <Text
      color="mono100"
      fontWeight="bold"
      variant={["sm-display", "sm-display", "md"]}
      {...rest}
    >
      {children}
    </Text>
  )
}
