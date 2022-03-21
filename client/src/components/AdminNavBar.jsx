import {React, useContext} from 'react'
import { Navbar, Container,  } from 'react-bootstrap'
import logo from '../assets/Icon.png'
import pp from '../assets/my-img.jpg'
import ProfileDD from './ProfileDD'
import './AdminNavBar.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'

function AdminNavBar() {

    const navigate = useNavigate()

    const [state, dispacth] = useContext(UserContext)

    const directAddBook = () => {
        navigate('/addbook')
    }

    const directLogout = () => {
        dispacth({
            type: 'LOGOUT',        
          })
        navigate('/')
    }

    const backToDash = () => {
        navigate('/dashboard')
    }

  return (
    <div>
        <Navbar style={{ marginTop:"-10px" }}>
            <Container fluid style={{ backgroundColor:"#e5e5e5", margin:"0" }}>
                <Navbar.Brand onClick={backToDash}>
                    <img src={logo} alt="" style={{ transform: "rotate(-20deg)", cursor: "pointer", width:"100px", marginLeft:"10px" }}/>
                </Navbar.Brand>
                <Navbar.Toggle />            
                <Navbar.Collapse className="justify-content-end">                
                <Navbar.Brand>
                    <ProfileDD directAddBook={directAddBook} directLogout={directLogout} />                    
                </Navbar.Brand>                
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default AdminNavBar