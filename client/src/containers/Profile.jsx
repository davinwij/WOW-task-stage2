import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Sidebar from '../components/Sidebar'
import { UserContext } from '../context/userContext'
import {Card, Container, Row, Col, Button} from 'react-bootstrap'
import logo from '../assets/Icon.png'
import book1 from '../assets/book1.png'
import phone from '../assets/phone.png'
import mail from '../assets/mail.png'
import location from '../assets/location.png'
import gender from '../assets/gender.png'
import pp from '../assets/my-img.jpg'
import './Home.css'
import BookDetailModal from '../components/BookDetailModal'
import { API } from '../config/api'

function Profile() {

    const cardStyle = {
        width: '12rem', 
        margin:"10px",
        backgroundColor: "#F2F2F2",
        border: "none",
        cursor: "pointer"
    }

    const navigate = useNavigate()

    const [state, dispacth] = useContext(UserContext)

    const [show, setShow] = useState(false)

    const [books, setBooks] = useState([])

    const showSubscribeModal = () => {
        setShow(true)
    }

    const closeModal = () =>{
        setShow(false)
    }

    const getBook = async () => {
        try {   
            const response = await API.get('/userbook')    
            setBooks(response.data.data)
            console.log(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBook()
    }, [])


    return(
        <>
        <BookDetailModal show={show} closeModal={closeModal} />
        <Container fluid style={{backgroundColor: "#F2F2F2"}}>
            <Row>
                <Col xl={3}>             
                    <Sidebar logo={logo} pp={pp} color="#D60000"/>
                </Col>
                <Col xl={9}>
                    <Row>
                        <div className="profile">
                            <div className="list">
                                <h2> <b>Profile</b> </h2>                            
                            </div>                                
                            <div className="profile-detail">
                                <Col className='mt-2'>
                                    <Row className="info">
                                        <Col className="img1 col-2">
                                            <img src={mail} alt="" />
                                        </Col>    
                                        <Col className="detail">
                                        <Row className="detail-info col-14">
                                                <h6>egigans@gmail.com</h6>
                                            </Row>
                                            <Row>
                                                <h6 style={{ color:"#8A8C90" }}>Email</h6>
                                            </Row>
                                        </Col>
                                    </Row>                                    
                                    <Row className="info">
                                        <Col className="img1 col-2">
                                            <img src={gender} alt="" />
                                        </Col>    
                                        <Col className="detail">
                                            <Row className="detail-info col-14">
                                                <h6>Male</h6>
                                            </Row>
                                            <Row>
                                                <h6 style={{ color:"#8A8C90" }}>Gender</h6>
                                            </Row>
                                        </Col>
                                    </Row>                                    
                                    <Row className="info">
                                        <Col className="img1 col-2">
                                            <img src={phone} alt="" />
                                        </Col>    
                                        <Col className="detail">
                                            <Row className="detail-info col-14">
                                                <h6>0812-8623-8911</h6>
                                            </Row>
                                            <Row>
                                                <h6 style={{ color:"#8A8C90" }}>Mobile Phone</h6>
                                            </Row>
                                        </Col>
                                    </Row>                                    
                                    <Row className="info">
                                        <Col className="img1 col-2">
                                            <img src={location} alt="" style={{width: "25px"}} />
                                        </Col>    
                                        <Col className="detail">
                                            <Row className="detail-info col-14">
                                                <h6>Perumahan Permata Bintaro Residence C-3</h6>
                                            </Row>
                                            <Row>
                                                <h6 style={{ color:"#8A8C90" }}>Address</h6>
                                            </Row>
                                        </Col>
                                    </Row>                                    
                                </Col>
                                <Col className='right-info'>
                                    <div className="profile-img">
                                        <img src={pp} alt="" />
                                    </div>
                                    <div className="btn-edit">
                                        <Button style={{ width: "160px", backgroundColor:"#D60000", border: "none" }}>Edit Profile</Button>
                                    </div>
                                </Col>
                            </div>
                        </div>
                    </Row>
                    <Row className='mt-3'>
                        <div className="list">
                            <h2> <b>My List Book</b> </h2>                            
                        </div>
                        <div class="d-flex flex-wrap justify-content-flex-start book-list">
                            {books.map((item, index) => (
                                <Card key={index} body style={cardStyle} onClick={() => 
                                        {                                
                                            navigate(`/detail/${item.id}`)                                
                                     
                                        }                                                                                                                                                                                                                        
                                    }>
                                    <img src={"http://localhost:5000/uploads/" + item.bookFile} alt="" />
                                    <h4> <b>{item.title}</b> </h4>
                                    <h6>{item.author}</h6>
                                </Card>                                                                                                                                                                                                                                                                                        
                            ))}
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default Profile