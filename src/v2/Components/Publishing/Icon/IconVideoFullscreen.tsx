import React from "react"
import styled from "styled-components"

interface Props extends React.HTMLProps<HTMLDivElement> {
  color?: string
  onClick?: () => void
}

const Icon: React.SFC<Props> = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28 28"
    onClick={props.onClick}
    width="32px"
    height="32px"
    className={props.className}
  >
    <g fill="none" fillRule="evenodd" transform="translate(-1151 -22)">
      <rect width="1200" height="92" stroke={props.color} rx="4" />
      <path d="M1150 21h30v30h-30z" />
      <g fill="#FFF">
        <path d="M1151 40h2v10h-2z" />
        <path d="M1161 48v2h-10v-2zM1161 22v2h-10v-2z" />
        <path d="M1153 32h-2V22h2z" />
        <g>
          <path d="M1179 32h-2V22h2z" />
          <path d="M1169 24v-2h10v2z" />
        </g>
        <g>
          <path d="M1169 50v-2h10v2z" />
          <path d="M1177 40h2v10h-2z" />
        </g>
      </g>
      <path fill="#FFF" d="M1157 28h16v16h-16z" />
    </g>
  </svg>
)

Icon.defaultProps = {
  color: "black",
}

export const IconVideoFullscreen = styled(Icon).attrs<{
  suppressClassNameWarning?: boolean
}>({
  suppressClassNameWarning: true,
})`
  width: 28px;
  height: 28px;
`
