interface PauseIconProps {
  size?: number
}

export const PauseIcon: React.FC<PauseIconProps> = ({ size = 18 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.3 2.25H3.9C3.40294 2.25 3 2.65294 3 3.15V14.85C3 15.3471 3.40294 15.75 3.9 15.75H6.3C6.79706 15.75 7.2 15.3471 7.2 14.85V3.15C7.2 2.65294 6.79706 2.25 6.3 2.25Z" />
      <path d="M14.1 2.25H11.7C11.2029 2.25 10.8 2.65294 10.8 3.15V14.85C10.8 15.3471 11.2029 15.75 11.7 15.75H14.1C14.597 15.75 15 15.3471 15 14.85V3.15C15 2.65294 14.597 2.25 14.1 2.25Z" />
    </svg>
  )
}
