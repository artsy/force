import React from 'react'

function Intro({className}){
  return (
    <div className={className}>
      <h2>The Art Genome Project</h2>
      <p>The Art Genome Project is the classification system and technological framework that powers Artsy.</p>
      <p>It maps the characteristics (we call them “genes”) that connect artists, artworks, architecture, and design objects across history.</p>
      <p>There are currently over 1,000 characteristics in The Art Genome Project, including art historical movements, subject matter, and formal qualities.</p>
    </div>
  )
}

export default Intro
