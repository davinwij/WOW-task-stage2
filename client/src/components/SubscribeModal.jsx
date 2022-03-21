import React from 'react'
import {Modal, Button} from 'react-bootstrap'

function SubscribeModal(props) {
    const {show, closeModal} = props

  return (
    <>
    <Modal show={show} onHide={closeModal} aria-labelledby="contained-modal-title-vcenter" centered>        
        <Modal.Body style={{ textAlign:"center", color:"#29BD11"}} id="contained-modal-title-vcenter">
            Thank you for subscribing to premium, your premium package
            will be active after our admin approves your transaction, thank you
        </Modal.Body>    
    </Modal>
    </>
  )
}

export default SubscribeModal