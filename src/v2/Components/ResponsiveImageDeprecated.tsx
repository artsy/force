import styled from "styled-components"
import {
  MaxWidthProps,
  ResponsiveValue,
  SpaceProps,
  WidthProps,
  maxWidth,
  space,
  system,
  width,
} from "styled-system"

const ratioPadding = system({
  ratio: {
    property: "paddingBottom",
    transform: n => n * 100 + "%",
  },
})

export interface ResponsiveImageDeprecatedProps
  extends SpaceProps,
    WidthProps,
    MaxWidthProps {
  ratio?: ResponsiveValue<number>
  src: string
  style?: object
}

/**
 * @deprecated Use `ResponsiveImage`
 */
export const ResponsiveImageDeprecated = styled.div<
  ResponsiveImageDeprecatedProps
>`
  background: url(${props => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  ${space};
  ${width};
  ${maxWidth};
  ${props =>
    props.ratio
      ? {
          height: 0,
          ...ratioPadding(props),
        }
      : null};
`

ResponsiveImageDeprecated.defaultProps = {
  width: "100%",
  ratio: 1,
}
