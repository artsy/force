import { storiesOf } from "@storybook/react"
import React from "react"

import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import { Images } from "v2/Components/Publishing/Fixtures/Components"
import Button from "../Buttons/Default"
import Modal from "../Modal/Modal"

class ModalDemo extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: true }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  render(): JSX.Element {
    const { cta, hasLogo, isWide, image, title, scrollable } = this.props
    return (
      <div>
        <Button onClick={this.openModal}>Open Modal</Button>
        <Modal
          cta={cta}
          hasLogo={hasLogo}
          image={image}
          isWide={isWide}
          title={title}
          onClose={this.closeModal}
          show={this.state.isModalOpen}
        >
          <div>
            {scrollable && (
              <div>
                <p>{text}</p>
                <p>{text}</p>
                <p>{text}</p>
              </div>
            )}
            <p>This is modal contents</p>
            <hr />
            <div>Even more contents</div>
          </div>
        </Modal>
      </div>
    )
  }
}

class ErrorModalDemo extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: true }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  render(): JSX.Element {
    return (
      <div>
        <Button onClick={this.openModal}>Open Modal</Button>
        <ErrorModal
          onClose={this.closeModal}
          show={this.state.isModalOpen}
          headerText={this.props.headerText}
          detailText={this.props.detailText}
          closeText={this.props.closeText}
        />
      </div>
    )
  }
}

storiesOf("Components/Modal/Demo", module)
  .add("Modal", () => <ModalDemo />)
  .add("Logo", () => <ModalDemo hasLogo />)
  .add("Title", () => <ModalDemo title="The art world online" />)
  .add("Logo & Title", () => <ModalDemo hasLogo title="The art world online" />)
  .add("Cta", () => (
    <ModalDemo
      cta={{
        text: "Learn More",
        onClick: () => alert("clicked"),
      }}
      hasLogo
      title="The art world online"
    />
  ))
  .add("Cta Scrolling", () => (
    <ModalDemo
      cta={{
        text: "Learn More",
        onClick: () => alert("clicked"),
      }}
      hasLogo
      title="The art world online"
      scrollable
    />
  ))
  .add("Cta isFixed", () => (
    <ModalDemo
      cta={{
        isFixed: true,
        text: "Learn More",
        onClick: () => alert("clicked"),
      }}
      hasLogo
      title="The art world online"
      scrollable
    />
  ))
  .add("Image", () => (
    <ModalDemo
      hasLogo
      image={Images[0].image}
      title="The art world online"
      cta={{
        text: "Learn More",
        onClick: () => alert("clicked"),
      }}
    />
  ))
  .add("Image Scrolling", () => (
    <ModalDemo
      hasLogo
      image={Images[0].image}
      title="The art world online"
      isLong
      cta={{
        isFixed: true,
        text: "Learn More",
        onClick: () => alert("clicked"),
      }}
    />
  ))
  .add("Wide", () => <ModalDemo isWide />)
  .add("Wide Cta", () => (
    <ModalDemo
      cta={{
        text: "Learn More",
        onClick: () => alert("clicked"),
      }}
      isWide
    />
  ))
  .add("Error Modal (Default)", () => <ErrorModalDemo />)
  .add("Error Modal (Custom)", () => (
    <ErrorModalDemo
      closeText="OK"
      headerText="Price changed"
      detailText="The price of the work changed since you started checkout. Please review pricing details before submitting."
    />
  ))

const text =
  "Donec sed odio dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur blandit tempus porttitor. Vestibulum id ligula porta felis euismod semper. Nullam quis risus eget urna mollis ornare vel eu leo."
