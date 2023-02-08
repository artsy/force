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
import { FC, Fragment, useMemo, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { JobsFilter_viewer$data } from "__generated__/JobsFilter_viewer.graphql"
import { JobLinkFragmentContainer } from "./JobLink"

export const LEADGEN_LOCATION = "Don't See Your Dream Job?"
export const LEADGEN_DEPARTMENT_ID = "84312"

interface JobsFilterProps {
  viewer: JobsFilter_viewer$data
}

const JobsFilter: FC<JobsFilterProps> = ({ viewer }) => {
  const locations = useMemo(
    () =>
      uniq(
        viewer.jobs
          .flatMap(job => job.location.split(","))
          .map(location => location.trim())
          .filter(location => location !== LEADGEN_LOCATION)
      ).sort(),
    [viewer.jobs]
  )

  const departments = useMemo(() => {
    const department = viewer.departments.find(department => {
      return department.id === LEADGEN_DEPARTMENT_ID
    })

    return [
      ...viewer.departments.filter(department => {
        return department.id !== LEADGEN_DEPARTMENT_ID
      }),
      ...(department ? [department] : []),
    ]
  }, [viewer.departments])

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
                selected={selection.includes(location)}
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
                <Join separator={<Spacer y={1} />}>
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
        departments.map(department => {
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
                <Join separator={<Spacer y={2} />}>
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
