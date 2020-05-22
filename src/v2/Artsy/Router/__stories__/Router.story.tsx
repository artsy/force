import { storiesOf } from "@storybook/react"
import { SystemContextConsumer } from "v2/Artsy"
import { MockRouter } from "v2/DevTools/MockRouter"
import { Link } from "found"
import React from "react"
import { graphql } from "react-relay"

const routes = [
  {
    path: "/",
    query: graphql`
      query RouterQuery($artistID: String!) {
        artist(id: $artistID) {
          name
          bio
        }
      }
    `,
    prepareVariables: params => ({
      artistID: "andy-warhol",
    }),
    Component: ({ artist, children, ...props }) => {
      return (
        <>
          <SystemContextConsumer>
            {context => {
              return (
                <div>
                  <h1>Example Relay Router App</h1>
                  <h3>{artist.name}</h3>
                  <p>{artist.bio}</p>

                  <nav>
                    <ul>
                      <li>
                        <Link to="/home">Link to Home</Link>
                      </li>
                      <li>
                        <Link to="/about">Link to About</Link>
                      </li>
                      <li>
                        <Link to="/artist">Link to Artist</Link>
                      </li>
                    </ul>
                  </nav>

                  {children}
                </div>
              )
            }}
          </SystemContextConsumer>
        </>
      )
    },
    children: [
      {
        path: "/home",
        Component: () => {
          return <h3>Home</h3>
        },
      },
      {
        path: "/about",
        Component: () => {
          return <h3>About</h3>
        },
      },
      {
        path: "/artist",
        Component: () => {
          return <h3>Artist</h3>
        },
      },
    ],
  },
]

storiesOf("Router/Example", module).add("Example Router App", () => {
  return (
    <MockRouter
      routes={routes}
      context={{
        mediator: {
          trigger: x => x,
        },
      }}
    />
  )
})
