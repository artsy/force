import React from 'react'
import AppContainer from './AppContainer'
import renderer from 'react-test-renderer'

it ('renders correctly', () => {
  const component = renderer.create(
    <AppContainer />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
