import renderTestComponent from 'desktop/apps/auction2/__tests__/utils/renderTestComponent'
import Registration from 'desktop/apps/auction2/components/layout/auction_info/Registration'

describe('auction/components/layout/auction_info/Registration.test', () => {
  it('works', () => {
    const { wrapper, store } = renderTestComponent({
      Component: Registration,
      props: {
        isClosed: true,
        isQualifiedForBidding: false
      }
    })

    console.log(wrapper.find(Registration).props());
  })
})
