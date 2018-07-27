import React from 'react'
import { mount } from 'enzyme'
import { NewsArticle } from 'reaction/Components/Publishing/Fixtures/Articles'
import { InfiniteScrollNewsArticle } from '../InfiniteScrollNewsArticle'

jest.mock('src/desktop/lib/positronql', () => ({ positronql: jest.fn() }))

describe('InfiniteScrollNewsArticle', () => {
  const getWrapper = props => {
    return mount(<InfiniteScrollNewsArticle {...props} />)
  }

  let props
  beforeEach(() => {
    props = {
      article: NewsArticle,
    }
  })

  it('Renders an article', () => {
    const component = getWrapper(props)
    console.log(component.html())
  })
})
