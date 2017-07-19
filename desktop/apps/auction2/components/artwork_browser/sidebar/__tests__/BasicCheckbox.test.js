import renderTestComponent from 'desktop/apps/auction2/__tests__/utils/renderTestComponent'
import BasicCheckbox from 'desktop/apps/auction2/components/artwork_browser/sidebar/BasicCheckbox'
import sinon from 'sinon'

describe('auction/components/artwork_browser/sidebar/BasicCheckbox.test', () => {
  describe('<FilterSort />', () => {
    it('triggers callback onClick', () => {
      const spy = sinon.spy()

      const { wrapper } = renderTestComponent({
        Component: BasicCheckbox,
        props: {
          item: { id: 1 },
          onClick: spy
        }
      })

      wrapper.find('input').simulate('click')
      spy.called.should.eql(true)
    })
  })
})
