import { Column, GridColumns, ResponsiveBox } from "@artsy/palette"

export const About2Hero = () => {
  return (
    <GridColumns gridColumnGap={0}>
      <Column span={[6, 4]}>
        <ResponsiveBox
          bg="mono10"
          aspectWidth={4}
          aspectHeight={5}
          maxWidth="100%"
        />
      </Column>

      <Column span={[6, 4]} pt={[40, 100]}>
        <ResponsiveBox
          bg="mono15"
          aspectWidth={4}
          aspectHeight={5}
          maxWidth="100%"
        />
      </Column>

      <Column span={[6, 4]} display={["none", "block"]}>
        <ResponsiveBox
          bg="mono10"
          aspectWidth={4}
          aspectHeight={5}
          maxWidth="100%"
        />
      </Column>
    </GridColumns>
  )
}
