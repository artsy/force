import React from 'react'
import LoadingSpinner from 'desktop/apps/auction2/components/artwork_browser/main/LoadingSpinner'
import renderTestComponent from 'desktop/apps/auction2/__tests__/utils/renderTestComponent'
import { test, __RewireAPI__ } from 'desktop/apps/auction2/components/artwork_browser/main/ArtworkDisplay'

const { ArtworkDisplay } = test

describe('auction/components/artwork_browser/main/ArtworkDisplay.test', () => {
  describe('<ArtworkDisplay />', () => {
    const InfiniteScroll = ({ children }) => <div>{children}</div> // eslint-disable-line
    const Jump = () => <div />
    const MasonryArtwork = () => <div />
    const GridArtwork = () => <div />
    const ListArtwork = () => <div />
    const MasonryGrid = () => <div />

    const infiniteScrollAction = x => x

    beforeEach(() => {
      __RewireAPI__.__Rewire__('InfiniteScroll', InfiniteScroll)
      __RewireAPI__.__Rewire__('Jump', Jump)
      __RewireAPI__.__Rewire__('MasonryArtwork', MasonryArtwork)
      __RewireAPI__.__Rewire__('GridArtwork', GridArtwork)
      __RewireAPI__.__Rewire__('ListArtwork', ListArtwork)
      __RewireAPI__.__Rewire__('MasonryGrid', MasonryGrid)
    })

    afterEach(() => {
      __RewireAPI__.__ResetDependency__('InfiniteScroll')
      __RewireAPI__.__ResetDependency__('Jump')
      __RewireAPI__.__ResetDependency__('MasonryArtwork')
      __RewireAPI__.__ResetDependency__('GridArtwork')
      __RewireAPI__.__ResetDependency__('ListArtwork')
      __RewireAPI__.__ResetDependency__('MasonryGrid')
    })

    it('renders a <ListArtwork /> component if isMobile and isListView', () => {
      const { wrapper } = renderTestComponent({
        Component: ArtworkDisplay,
        props: {
          infiniteScrollAction,
          isMobile: true,
          isListView: true,
          saleArtworks: [1, 2, 3]
        }
      })

      wrapper.find(ListArtwork).length.should.eql(3)
    })

    it('renders a <MasonryGrid /> component if isMobile and !isListView', () => {
      const { wrapper } = renderTestComponent({
        Component: ArtworkDisplay,
        props: {
          infiniteScrollAction,
          isMobile: true,
          isListView: false,
          saleArtworks: [1, 2, 3]
        }
      })

      wrapper.find(MasonryGrid).length.should.eql(1)
    })

    it('renders a <ListArtwork /> if isDesktop and isListView', () => {
      const { wrapper } = renderTestComponent({
        Component: ArtworkDisplay,
        props: {
          infiniteScrollAction,
          isMobile: false,
          isListView: true,
          saleArtworks: [1, 2, 3]
        }
      })

      wrapper.find(ListArtwork).length.should.eql(3)
    })

    it('renders a <GridArtwork /> if isDesktop and isListView', () => {
      const { wrapper } = renderTestComponent({
        Component: ArtworkDisplay,
        props: {
          infiniteScrollAction,
          isMobile: false,
          isListView: false,
          saleArtworks: [1, 2, 3]
        }
      })

      wrapper.find(GridArtwork).length.should.eql(3)
    })

    it('renders a <LoadingSpinner />', () => {
      const { wrapper } = renderTestComponent({
        Component: ArtworkDisplay,
        props: {
          infiniteScrollAction,
          isMobile: true,
          isListView: true,
          saleArtworks: [1, 2, 3]
        }
      })

      wrapper.find(LoadingSpinner).length.should.eql(1)
    })
  })
})
