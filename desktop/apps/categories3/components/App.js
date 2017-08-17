import React, { Component } from 'react'

class App extends Component {
  render() {
    const geneFamilies = this.props.geneFamilies
    const geneCount = geneFamilies.reduce(
      (count, family) => count + family.genes.length,
      0
    )
    return (
      <div>
        I am going to be the new categories page, with {geneFamilies.length}{' '}
        gene families and {geneCount} genes
      </div>
    )
  }
}

export default App
