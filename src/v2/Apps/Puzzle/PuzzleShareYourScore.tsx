import { Button } from "@artsy/palette"
import React from "react"
import { RWebShare } from "react-web-share" // This library is stupid

type PuzzleShareYourScoretype = {
  movesCount: number
  time: number
}

export const PuzzleShareYourScore: React.FC<PuzzleShareYourScoretype> = ({
  movesCount,
  time,
}) => {
  // const handleOnClick = () => {
  //   if (navigator.share) {
  //     console.log("Checkkkk")
  //     navigator
  //       .share({
  //         title: "Artsy puzzle",
  //         text: `I just solved the puzzle in ${movesCount} moves in ${time} moves. Can you top it?`,
  //         url: "http://localhost:5000/puzzle",
  //       })
  //       .then(() => {
  //         console.log("Shared succesfully..")
  //       })
  //       .catch(error => {
  //         console.error("Something went wrong!!!")
  //       })
  //   }
  // }

  return (
    <RWebShare
      data={{
        text: `I just solved the puzzle in ${movesCount} in ${time}. Can you top it?`,
        url: "http://localhost:5000/puzzle",
        title: "Artsy puzzle",
      }}
      onClick={() => console.log("shared successfully!")}
    >
      <Button size="small">Share your Score</Button>
    </RWebShare>
  )
}
