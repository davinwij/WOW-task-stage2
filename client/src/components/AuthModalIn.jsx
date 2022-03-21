import {Modal, Button, Form, Alert} from 'react-bootstrap'
import { useContext, useState} from 'react'
import { UserContext } from '../context/userContext'
import './AuthModal.css'
import { useNavigate } from 'react-router-dom'
import {API} from "../config/api"

function AuthModalIn(props) {
  

  const {open, setLoginOpen, setSignUpOpen} = props
  const [message, setMessage] = useState(null);

  const switchSignup = (event) => {
      setLoginOpen(false)
      setSignUpOpen(true)
    }

  const handleClose = () => setLoginOpen(false);

  const [state, dispacth] = useContext(UserContext)

  const modal = {
    backgroundColor: "white"
  }

  const navigate = useNavigate()

  

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const config = {
      headers:{
        "Content-Type": "application/json"
      }
    }
    
    const data = {
      email,
      password
    }

    const body = JSON.stringify(data)

    const response = await API.post("/login", body, config)

    if (response?.status == 200) {
      dispacth({
        type: "LOGIN_SUCCESS",
        payload: response.data.data.user,
      });

      if(response.data.data.user.role == "admin"){
        navigate('/dashboard')
      }else{
        navigate('/home')
      }

      const alert = (
        <Alert variant="success" className="py-1">
          Login success
        </Alert>
      );
      setMessage(alert);
    }

    if(response.status == 400){
      dispacth({
        type: "LOGIN_ERROR"
      });

      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
    }


    // if(state.user.email == 'admin@admin.com'){
    //   dispacth({
    //     type: 'LOGIN_SUCCESS'  
    //   })
    //   navigate('/dashboard')
    // }else{
    //   dispacth({
    //     type: 'LOGIN_SUCCESS'  
    //   })
    //   navigate('/home')
    // }
  }


  return (
    <>
      
      <Modal show={open} onHide={handleClose} centered aria-labelledby="contained-modal-title-vcenter">
        <Modal.Body style={modal}>
        {message && message}
          <div className="header">
            <h1>Sign In</h1>
          </div>
            <Form onSubmit={handleOnSubmit}>              
              <Form.Group className="mb-3" controlId="formBasicEmail">        
                <Form.Control size="lg" type="email" placeholder="Email" id='email' className='inputEmail' />            
              </Form.Group>
              <Form.Group className="mb-3"  controlId="formBasicPassword">                
                <Form.Control size="lg" type="password" placeholder="Password" id='password' className='inputEmail' />
              </Form.Group>    
            </Form>
            <Button size="lg" variant="danger" onClick={handleOnSubmit} style={{ width: "100%", marginTop: "20px", backgroundColor: "#D60000", fontFamily: "Avenir Bold" }}>
              Sign In
            </Button>
          <div className="footer">
            <p>Don't have an account? Click <span onClick={switchSignup} style={{ cursor:"pointer"}}><b>Here</b></span></p>
          </div>
        </Modal.Body>    
      </Modal>

      

    </>
  );

}
  
  export default AuthModalIn;