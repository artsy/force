import React, { Component } from 'react'

const GeneFamilyNav = ({ geneFamilies }) => {
  return (
    <ul>
      {geneFamilies.map(geneFamily => <li key={geneFamily.id}>TK</li>)}
    </ul>
  )
}

const TAGPContent = ({ geneFamilies }) => {
  return (
    <div>
      <TAGPIntro />
      <GeneFamilies geneFamilies={geneFamilies} />
    </div>
  )
}

const TAGPIntro = () => {
  return (
    <div>
      <h1>The Art Genome Project</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, quidem
        facere doloribus quisquam ducimus alias, consequuntur officia modi
        dolores ipsam distinctio harum facilis, illum fugit ea? Quo illum esse
        et!
      </p>
    </div>
  )
}

const GeneFamilies = ({ geneFamilies }) => {
  return (
    <div>
      {geneFamilies.map(geneFamily =>
        <GeneFamily key={geneFamily.id} {...geneFamily} />
      )}
    </div>
  )
}

const GeneFamily = ({ id, name, genes }) => {
  return (
    <div>
      <h2>
        {name}
      </h2>
      <ul>
        {genes.map(gene => <Gene key={gene.id} {...gene} />)}
      </ul>
    </div>
  )
}

const Gene = ({ id, name }) => {
  return (
    <li>
      {name}
    </li>
  )
}

class App extends Component {
  render() {
    const { geneFamilies } = this.props
    return (
      <div>
        <GeneFamilyNav geneFamilies={geneFamilies} />
        <TAGPContent geneFamilies={geneFamilies} />
      </div>
    )
  }
}

export default App
