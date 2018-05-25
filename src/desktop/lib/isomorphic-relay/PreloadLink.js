import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link, ResolverUtils, withRouter } from 'found'
import { fetchQuery } from 'react-relay'
import { isEmpty, isUndefined, omit } from 'lodash/fp'
import { injectContext } from './AppProvider'

const { getRouteMatches, getRouteValues } = ResolverUtils

export const PreloadLink = withRouter(
  injectContext(
    context => {
      return {
        environment: context.environment,
        routeConfig: context.routeConfig,
        resolver: context.resolver,
      }
    },
    class extends Component {
      static propTypes = {
        environment: PropTypes.object.isRequired,
        immediate: PropTypes.bool, // load route data transparently in the bg
        routeConfig: PropTypes.array.isRequired,
        resolver: PropTypes.object,
      }

      static defaultProps = {
        immediate: false,
      }

      state = {
        isLoading: false,
      }

      componentDidMount() {
        if (this.props.immediate) {
          this.fetchData()
        }
      }

      getRouteQuery() {
        const { environment, resolver, router, to } = this.props
        const location = router.createLocation(to)
        const match = router.matcher.match(location)
        const routes = router.matcher.getRoutes(match)
        const augmentedMatch = { ...match, routes }
        const routeMatches = getRouteMatches(augmentedMatch)

        const query = getRouteValues(
          routeMatches,
          route => route.getQuery,
          route => route.query
        ).find(query => !isUndefined(query))

        const cacheConfig = getRouteValues(
          routeMatches,
          route => route.getCacheConfig,
          route => route.cacheConfig
        ).find(caches => !isUndefined(caches))

        const routeVariables = resolver
          .getRouteVariables(match, routeMatches)
          .find(variables => !isUndefined(variables) && !isEmpty(variables))

        return {
          environment,
          query,
          cacheConfig,
          routeVariables,
        }
      }

      fetchData() {
        const {
          environment,
          query,
          cacheConfig,
          routeVariables,
        } = this.getRouteQuery()

        // Prime the store cache
        return new Promise(async (resolve, reject) => {
          const missingEnvironmentOrQuery = !(environment && query)
          if (missingEnvironmentOrQuery) {
            return resolve()
          }

          try {
            await fetchQuery(environment, query, routeVariables, cacheConfig)
            resolve()
          } catch (error) {
            console.error(
              '[isomorphic-found-relay] PreloadLink.js Error:',
              error
            )
          }
        })
      }

      handleClick = event => {
        event.preventDefault()

        this.setState({
          isLoading: true,
        })

        this.fetchData().then(() => {
          const { router, replace, to } = this.props

          this.setState({
            isLoading: false,
          })

          if (replace) {
            router.replace(to)
          } else {
            router.push(to)
          }
        })
      }

      render() {
        const props = omit(['immediate', 'routeConfig'], this.props)

        return (
          <Link onClick={this.handleClick} {...props}>
            {this.props.children}
            {this.state.isLoading ? ' [loading...]' : null}
          </Link>
        )
      }
    }
  )
)
