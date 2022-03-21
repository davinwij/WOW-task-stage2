import {React, useContext} from 'react'
import pp from '../assets/my-img.jpg'
import {Dropdown} from 'react-bootstrap'
import out from '../assets/out.png'
import addbook from '../assets/addbook.png'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../context/userContext'


function ProfileDD(props) {

    const {directAddBook, directLogout} = props

    // const navigate = useNavigate()

    // const [state, dispacth] = useContext(UserContext)

    // const directAddBook = () => {
    //     navigate('/addbook')
    // }

    // const directLogout = () => {
    //     dispacth({
    //         type: 'LOGOUT',        
    //       })
    //     navigate('/')
    // }

  return (
    <>
        <Dropdown>
            <Dropdown.Toggle variant='white' >
                    <div className="elipse">            
                        <img src={pp} alt="" style={{ cursor: "pointer", width:"100px" }}/>
                    </div>
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" className='mt-4' style={{ border:"none", borderRadius:"10px", boxShadow:"0px 2px 12px grey"}}>            
                <Dropdown.Item onClick={directAddBook}>
                    <img src={addbook} alt="" style={{ cursor: "pointer", width:"20px", margin:"5px" }} />
                    <b>Add Book</b>                
                </Dropdown.Item>
                <Dropdown.Divider />                
                <Dropdown.Item onClick={directLogout}>
                    <img src={out} alt="" style={{ cursor: "pointer", width:"20px", margin:"5px" }} />
                    <b>Logout</b>                                
                </Dropdown.Item>        
            </Dropdown.Menu>
        </Dropdown>
    </>
  )
}

export default ProfileDD