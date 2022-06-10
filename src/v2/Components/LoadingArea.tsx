import Spinner from "v2/Components/Spinner"
import { ReactNode, SFC } from "react"
import styled from "styled-components"

export interface LoadingAreaState {
  isLoading: boolean
}

interface Props extends LoadingAreaState {
  children: ReactNode
  isLoading: boolean
  transitionTime?: string
}

/**
 * @deprecated Instead build a content-specific skeleton using Skeleton components from Palette
 */
export const LoadingArea: SFC<Props> = props => {
  const { transitionTime } = props
  const loaderClass = props.isLoading ? "loading" : ""

  return (
    <OuterContainer>
      <SpinnerContainer>
        <SpinnerToggle
          transitionTime={transitionTime}
          className={loaderClass}
        />
      </SpinnerContainer>

      <Container transitionTime={transitionTime} className={loaderClass}>
        {props.children}
      </Container>
    </OuterContainer>
  )
}

LoadingArea.defaultProps = {
  transitionTime: "0.0s",
}

const OuterContainer = styled.div`
  position: relative;
`

const SpinnerContainer = styled.div`
  position: absolute;
  top: 100px;
  width: 100%;
  z-index: 1;
`

const Container = styled.div`
  opacity: 1;
  position: relative;

  transition: opacity ${(props: Partial<Props>) => props.transitionTime};

  &.loading {
    opacity: 0.1;
  }
`

const SpinnerToggle = styled(Spinner)`
  position: absolute;

  opacity: 0;
  transition: opacity ${(props: Partial<Props>) => props.transitionTime};

  &.loading {
    opacity: 1;
  }
`
