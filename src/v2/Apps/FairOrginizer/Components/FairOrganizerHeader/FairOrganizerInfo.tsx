import React from "react"
import { Join, Link, Spacer, Text } from "@artsy/palette"
import { InfoSection } from "v2/Components/InfoSection"

export const FairOrganizerInfo: React.FC<any> = ({ about, links }) => {
  return (
    <Join separator={<Spacer mt={2} />}>
      {about && <InfoSection type="html" label="About" info={about} />}

      {!!links.length && (
        <InfoSection
          label="Follow"
          info={links.map(({ label, href }) => {
            return (
              <Link href={href}>
                <Text style={{ textDecoration: "underline" }}>{label}</Text>
              </Link>
            )
          })}
        />
      )}
    </Join>
  )
}
