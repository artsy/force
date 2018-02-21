import { Reveal } from '../Reveal'
import renderTestComponent from 'desktop/apps/auction/__tests__/utils/renderTestComponent'

describe('components/react/masonry_grid/MasonryGrid', () => {
  it('hides revealer if isEnabled is false', () => {
    const { wrapper } = renderTestComponent({
      Component: Reveal,
      props: {
        isEnabled: false,
      },
    })

    wrapper.find('Revealer').length.should.eql(0)
  })

  it('shows revealer if isEnabled is true', () => {
    const { wrapper } = renderTestComponent({
      Component: Reveal,
      props: {
        isEnabled: true,
      },
    })

    wrapper.find('Revealer').length.should.eql(1)
  })

  it('reveals hidden area when button is clicked', () => {
    const { wrapper } = renderTestComponent({
      Component: Reveal,
      props: {
        isEnabled: true,
      },
    })

    const revealer = () => wrapper.find('Revealer')
    const button = wrapper.find('Button')
    revealer().length.should.eql(1)
    button.length.should.eql(1)
    button.simulate('click')
    revealer().length.should.eql(0)
  })
})
