import renderTestComponent from "desktop/apps/auction/__tests__/utils/renderTestComponent"
import BasicCheckbox from "desktop/apps/auction/components/artwork_browser/sidebar/BasicCheckbox"

xdescribe("auction/components/artwork_browser/sidebar/BasicCheckbox.test", () => {
  describe("<FilterSort />", () => {
    it("triggers callback onClick", () => {
      const onClick = jest.fn()

      const { wrapper } = renderTestComponent({
        Component: BasicCheckbox,
        props: {
          item: { id: 1 },
          onClick,
          checked: false,
        },
      })

      wrapper.find("input").simulate("click")
      expect(onClick).toBeCalled()
    })
  })
})
