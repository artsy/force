import styled from 'styled-components'

const SectionContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  max-width: ${props => props.layout === 'overflow_fillwidth' ? '780px' : '680px'};
  width: 100%;
  margin-bottom: 20px;
  padding: ${props => props.layout === 'standard' ? '0 60px' : '0'};
  @media (max-width: 600px) {
    padding: 0 20px;
  }
`

export default SectionContainer
