import React, { Component } from 'react'
import t from './test.jade'

console.log(t(), 'hi')

export default class App extends Component {
  render () {
    return (
      <div>
        hey
      </div>
    )
  }
}
