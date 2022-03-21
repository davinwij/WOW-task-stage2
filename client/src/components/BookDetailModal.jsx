import React from 'react'
import {Modal, Button} from 'react-bootstrap'

function BookDetailModal(props) {
    const {show, closeModal} = props

  return (
    <>
    <Modal show={show} onHide={closeModal} aria-labelledby="contained-modal-title-vcenter" centered>        
        <Modal.Body style={{ textAlign:"center", color:"#D60000"}} id="contained-modal-title-vcenter">
            please make a payment to read the latest books
        </Modal.Body>    
    </Modal>
    </>
  )
}

export default BookDetailModal