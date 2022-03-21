import React, {useEffect, useState} from 'react'
import {Dropdown} from 'react-bootstrap'
import down from '../assets/poly.png'
import {API} from "../config/api"


function TableActionDD(props) {

  const setTrans = async (confirm) => {
    try {
      
    const config = {
      headers:{
        "Content-Type": "application/json"
      }
    }

    const body = JSON.stringify(confirm)  

    const response = await API.patch(`/transaction/${props.index}`, body , config)            

    window.location.reload()

    } catch (error) {
      console.log(error);
    }
  }

  const confirmPayment = () => {
    const status = {
      paymentStatus: "Approved"
    }    
    setTrans(status)
  }

  const cancelPayment = () => {
    const status = {
      paymentStatus: "Cancel"
    }    
    setTrans(status)  
  }

  return (
    <>
        <td>
        <Dropdown>
            <Dropdown.Toggle variant='white'>
                <img src={down} alt="" className='down' />
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" className='mt-2' style={{ border:"none", borderRadius:"10px", boxShadow:"0px 2px 12px grey"}}>            
                <Dropdown.Item onClick={confirmPayment} className='tafs' style={{ color:"#0acf83" }}><b>Approve</b></Dropdown.Item>
                <Dropdown.Item onClick={cancelPayment} className='tafs' style={{ color:"#ff0724" }}><b>Cancel</b></Dropdown.Item>        
            </Dropdown.Menu>
        </Dropdown>
        </td>
    </>
  )
}

export default TableActionDD