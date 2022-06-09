import {
  Column,
  Join,
  Text,
  Spacer,
  GridColumns,
  Pill,
  Flex,
} from "@artsy/palette"
import { uniq } from "lodash"
import { FC, Fragment, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { JobsFilter_viewer } from "v2/__generated__/JobsFilter_viewer.graphql"
import { JobLinkFragmentContainer } from "./JobLink"

interface JobsFilterProps {
  viewer: JobsFilter_viewer
}

const JobsFilter: FC<JobsFilterProps> = ({ viewer }) => {
  const locations = uniq(
    viewer.jobs
      .flatMap(job => job.location.split(","))
      .map(location => location.trim())
  ).sort()

  const [selection, setSelection] = useState<string[]>([])

  const handleClick = (location: string) => () => {
    setSelection(prevSelection => {
      if (prevSelection.includes(location)) {
        return prevSelection.filter(l => l !== location)
      } else {
        return [...prevSelection, location]
      }
    })
  }

  return (
    <GridColumns gridRowGap={4}>
      <Column span={12}>
        <Flex mb={-1} flexWrap="wrap">
          {locations.map(location => {
            return (
              <Pill
                key={location}
                mr={1}
                mb={1}
                active={selection.includes(location)}
                onClick={handleClick(location)}
              >
                {location}
              </Pill>
            )
          })}
        </Flex>
      </Column>

      {/* Filtered results, grouped by location */}
      {selection.length > 0 &&
        selection.map(location => {
          const filteredJobs = viewer.jobs.filter(job => {
            return job.location
              .split(",")
              .map(location => location.trim())
              .includes(location)
          })

          return (
            <Fragment key={location}>
              <Column span={4}>
                <Text variant="lg-display">{location}</Text>
                <Text variant="lg-display" color="black60">
                  {filteredJobs.length} open position
                  {filteredJobs.length === 1 ? "" : "s"}
                </Text>
              </Column>

              <Column span={8}>
                <Join separator={<Spacer mt={1} />}>
                  {filteredJobs.map(job => (
                    <JobLinkFragmentContainer key={job.id} job={job} />
                  ))}
                </Join>
              </Column>
            </Fragment>
          )
        })}

      {/* Unfiltered results, grouped by department */}
      {selection.length === 0 &&
        viewer.departments.map(department => {
          if (department.jobs.length === 0) {
            return null
          }

          return (
            <Fragment key={department.id}>
              <Column span={4}>
                <Text variant="lg-display">{department.name}</Text>

                <Text variant="lg-display" color="black60">
                  {department.jobs.length} open position
                  {department.jobs.length === 1 ? "" : "s"}
                </Text>
              </Column>

              <Column span={8}>
                <Join separator={<Spacer mt={2} />}>
                  {department.jobs.map(job => {
                    return <JobLinkFragmentContainer key={job.id} job={job} />
                  })}
                </Join>
              </Column>
            </Fragment>
          )
        })}
    </GridColumns>
  )
}

export const JobsFilterFragmentContainer = createFragmentContainer(JobsFilter, {
  viewer: graphql`
    fragment JobsFilter_viewer on Viewer {
      jobs {
        ...JobLink_job
        id
        location
      }
      departments {
        id
        name
        jobs {
          ...JobLink_job
          id
        }
      }
    }
  `,
})
