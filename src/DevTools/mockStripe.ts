const mockElement = () => ({
  mount: jest.fn(),
  destroy: jest.fn(),
  on: jest.fn(),
  update: jest.fn(),
})

const mockElements = () => {
  const elements: Record<string, ReturnType<typeof mockElement>> = {}
  return {
    create: jest.fn((type: string) => {
      elements[type] = mockElement()
      return elements[type]
    }),
    getElement: jest.fn((type: string) => {
      return elements[type] || null
    }),
  }
}

export const mockStripe = () => ({
  elements: jest.fn(() => mockElements()),
  createToken: jest.fn(),
  createSource: jest.fn(),
  createPaymentMethod: jest.fn(),
  confirmCardPayment: jest.fn(),
  confirmCardSetup: jest.fn(),
  paymentRequest: jest.fn(),
  handleCardAction: jest.fn(),
  _registerWrapper: jest.fn(),
})

// Export a singleton mock
const stripeMock = mockStripe()
export default stripeMock
