import React from "react"
import { Box } from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"

export const FairOrganizerHeaderIcon: React.FC<any> = ({ ...rest }) => {
  return (
    <Box {...rest}>
      <Media greaterThanOrEqual="md">
        <img
          src={
            "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=100&height=100&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FpEE751u3-2o0oOfaTHTSYA%2Fsquare140.png"
          }
          srcSet={
            "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=100&height=100&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FpEE751u3-2o0oOfaTHTSYA%2Fsquare140.png 1x, https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=200&height=200&quality=50&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FpEE751u3-2o0oOfaTHTSYA%2Fsquare140.png 2x"
          }
          alt={`Logo of ...`}
          width={100}
          height={100}
        />
      </Media>
      <Media lessThan="md">
        <img
          src={
            "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=60&height=60&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FpEE751u3-2o0oOfaTHTSYA%2Fsquare140.png"
          }
          srcSet={
            "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=60&height=60&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FpEE751u3-2o0oOfaTHTSYA%2Fsquare140.png 1x, https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=120&height=120&quality=50&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FpEE751u3-2o0oOfaTHTSYA%2Fsquare140.png 2x"
          }
          alt={`Logo of ...`}
          width={60}
          height={60}
        />
      </Media>
    </Box>
  )
}
