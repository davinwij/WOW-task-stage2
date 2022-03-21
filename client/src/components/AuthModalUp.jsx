import {Modal, Button, Form, Alert} from 'react-bootstrap'
import { useState , useContext} from 'react'
import { UserContext } from '../context/userContext'
import './AuthModal.css'

import {API} from "../config/api"

function AuthModalUp(props) {

  const {open, setLoginOpen, setSignUpOpen} = props

  const switchSignIn = (event) => {
      setLoginOpen(true)
      setSignUpOpen(false)
    }

  const [state, dispacth] = useContext(UserContext)

  const [message, setMessage] = useState(null);

  const [user, setUser] = useState({
    fullname:"",
    email:"",
    password:""
  })

  const handleClose = async () => setSignUpOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault()

    const config = {
      headers:{
        "Content-Type": "application/json"
      }
    }
    try {
        const body = JSON.stringify(user)
    
        const response = await API.post("/register", body, config)
        console.log(response);
    
        if(response.data.status == "success"){
          const alert = (
            <Alert variant="success" className="py-1">
              Success
            </Alert>
          );
          setMessage(alert);  
        } else {
          const alert = (
            <Alert variant="danger" className="py-1">
              Failed
            </Alert>
          );
          setMessage(alert);
        }
  
      
    } catch (error) {
      
    }
  }

  const handleOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const modal = {
    backgroundColor: "white"
  }
  
  return (
    <>
      
      <Modal show={open} onHide={handleClose} centered aria-labelledby="contained-modal-title-vcenter">
        <Modal.Body style={modal}>
        {message && message}
          <div className="header">
            <h1>Sign Up</h1>
          </div>
            <Form onSubmit={handleOnChange}>
              <Form.Group className="mb-3" controlId="formBasicEmail">        
                <Form.Control name="email" size="lg" type="email" placeholder="Email" className='inputEmail' onChange={handleOnChange}  />            
              </Form.Group>
              <Form.Group className="mb-3"  controlId="formBasicPassword">                
                <Form.Control name="password" size="lg" type="password" placeholder="Password" className='inputPassword' onChange={handleOnChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicName">        
                <Form.Control name="fullname" size="lg" type="text" placeholder="Username" className='inputName' onChange={handleOnChange}  />            
              </Form.Group>
            </Form>
            <Button onClick={handleSubmit} size="lg" variant="danger" style={{ width: "100%", marginTop: "20px", backgroundColor: "#D60000", fontFamily: "Avenir Bold" }}>
              Sign Up
            </Button>
          <div className="footer">
          <p>Already have an account? Click <span onClick={switchSignIn} style={{ cursor:"pointer"}}><b>Here</b></span></p>
          </div>
        </Modal.Body>    
      </Modal>
    </>
  );
  

}

  
  export default AuthModalUp;