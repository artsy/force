import React from 'react'
// import styled from 'styled-components'

// import colors from 'reaction/Assets/Colors'
// import { Row, Col } from 'reaction/Components/Grid'
// import Text from 'reaction/Components/Text'

import Button from 'reaction/Components/Buttons/Default'
import Modal from 'reaction/Components/Modal/Modal'
import ModalHeader from 'reaction/Components/ModalHeader'
import Title from 'reaction/Components/Title'

const ModalStyle = {
  height: '500px',
  width: '500px',
}

export default class ModalDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: false }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  render() {
    return (
      <div>
        <Button onClick={this.openModal}>Open Modal</Button>
        <Modal
          style={ModalStyle}
          show={this.state.isModalOpen}
          onClose={this.closeModal}
        >
          <ModalHeader>
            <Title>This is a modal title</Title>
          </ModalHeader>
          <div>
            <p>This is modal contents</p>
            <hr />
            <div>Even more contents</div>
          </div>
        </Modal>
      </div>
    )
  }
}
