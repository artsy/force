import styled, { keyframes } from "styled-components"

const SCAN_DURATION_MS = 1400

export const ImageSearchScanLine: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  return <ScanLine data-testid="image-search-scan-line" />
}

const scan = keyframes`
  from {
    top: 0;
  }

  to {
    top: calc(100% - 2px);
  }
`

const ScanLine = styled.div`
  animation: ${scan} ${SCAN_DURATION_MS}ms ease-in-out infinite alternate;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
  height: 2px;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    top: calc(50% - 1px);
  }
`
