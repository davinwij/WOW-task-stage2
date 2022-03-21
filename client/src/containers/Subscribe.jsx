import { UserContext } from '../context/userContext'
import { useContext, useState, useEffect } from 'react'
import {Form, Container, Row, Col, Button} from 'react-bootstrap'
import logo from '../assets/Icon.png'
import pp from '../assets/my-img.jpg'
import pin from '../assets/pin.png'
import './Home.css'
import wow from '../assets/wow.png'
import Sidebar from '../components/Sidebar'
import SubscribeModal from '../components/SubscribeModal'
import {API} from "../config/api"

function Subscribe() {

    const [show, setShow] = useState(false)
    const [state, dispacth] = useContext(UserContext)
    const [preview, setPreview] = useState(null)
    const [form, setForm] = useState({
        image: "",
    })

    const handleOnSubmit = async (e) => {
        try {        
            e.preventDefault()
    
            const config = {
                headers:{
                  "Content-Type": "multipart/form-data"
                }
            }
    
            const formData = new FormData()
            formData.set("transferProof", form.image[0], form.image[0].name)
    

            const response = await API.post('/transaction', formData, config)
            console.log(response)

            setShow(true)

        } catch (error) {
            console.log(error)
        }

        
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.files
        })

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
          }
    }



    const closeModal = () =>{
        setShow(false)
    }


  return (
      <>
        <SubscribeModal show={show} closeModal={closeModal} />
        <Container fluid style={{backgroundColor: "#F2F2F2"}}>
            <Row>
                <Col xl={3}>             
                    <Sidebar logo={logo} pp={pp} leftColor="#D60000" color=""/>
                </Col>
                <Col xl={9}>
                    <Row style={{ height: "700px" }}>
                        <div className="subscribe-info">
                            <h3 style={{fontFamily:"Times New Roman, Times, serif", marginTop:"100px"}}> <b>Premium</b> </h3>
                            <div className="line2">
                                <h6>Pay now and access all the latest books from</h6>
                                <img src={wow} alt="" />
                            </div>
                            <div className="line3">
                                <img src={wow} alt=""  />
                                <h6 style={{ marginLeft: "45px"}}> <b>: 0981312323</b> </h6>
                            </div>
                            <div className="line4">
                                <Form onSubmit={handleOnSubmit}>
                                    <Form.Control type="text" name="account" placeholder="Input your account number" style={{ backgroundColor: "#BCBCBC40", color: "black", border: "2px solid #BCBCBC", marginBottom: "10px"}} />
                                    <label htmlFor="inputFile" className='inputFile'>Attache proof of transfer</label>
                                    <img src={pin} alt="" />
                                    <Form.Control type="file" onChange={handleChange} name="image" id='inputFile' style={{ backgroundColor: "#BCBCBC40", color: "black", border: "2px solid #BCBCBC", display: "none"}} />                                                            
                                    <Button onClick={handleOnSubmit} style={{ width: "100%", backgroundColor: "#D60000", marginTop: "50px", border:"none" }}>Send</Button>                                                                    
                                </Form>
                            </div>
                        </div>
                    </Row>                    
                </Col>
            </Row>
        </Container>
      </>
  )
}

export default Subscribe