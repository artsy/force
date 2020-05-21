import React from "react"

export const IconEditSection: React.SFC<{
  fill?: string
  isClosing?: boolean
  width?: string
}> = ({ isClosing, width = "45px", fill = "black" }) => {
  return (
    <svg
      className="edit-section"
      x="0px"
      y="0px"
      width={width}
      viewBox="0 0 1000 1000"
      enableBackground="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="158"
        y="304"
        fill="#FFF"
        strokeMiterlimit="10"
        width="436"
        height="399"
      />
      {isClosing ? (
        <path
          fill={fill}
          d="M379.318,132.208c-194.157,0-355.33,163.644-355.33,359.888s161.173,359.888,355.33,359.888 c42.962,0,213.011-0.984,571.915-359.888C592.329,133.192,422.28,132.208,379.318,132.208z M527.73,451.989v71.963l-311.841,0 v-71.963L527.73,451.989z"
        />
      ) : (
        <path
          fill={fill}
          d="M379.318,132.208c-194.157,0-355.33,163.644-355.33,359.888s161.173,359.888,355.33,359.888 c42.962,0,213.011-0.984,571.915-359.888C592.329,133.192,422.28,132.208,379.318,132.208z M407.791,523.952V643.89h-71.963V523.952 H215.889v-71.963h119.939V332.05h71.963v119.939H527.73v71.963H407.791z"
        />
      )}
    </svg>
  )
}
