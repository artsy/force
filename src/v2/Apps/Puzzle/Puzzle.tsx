import React, { useState, useEffect } from "react"
import PuzzleBoard from "./PuzzleBoard"
import { updateURLParameter } from "./utils/helpers"

function PuzzleApp() {
  const [imgUrl, setImgUrl] = useState("")

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has("img")) {
      setImgUrl(urlParams.get("img")!)
    }
  }, [])

  const handleImageChange = e => {
    setImgUrl(e.target.value)
    window.history.replaceState(
      "",
      "",
      updateURLParameter(window.location.href, "img", e.target.value)
    )
  }

  return (
    <div style={{ display: "grid", placeItems: "center", height: "100" }}>
      <h1>React sliding puzzle</h1>
      <PuzzleBoard imgUrl={imgUrl} />
      <input value={imgUrl} onChange={handleImageChange} />
    </div>
  )
}

export default PuzzleApp
