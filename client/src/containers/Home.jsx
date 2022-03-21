import {Card, Container, Row, Col} from 'react-bootstrap'
import logo from '../assets/Icon.png'
import pp from '../assets/my-img.jpg'
import frameHero from '../assets/framehero.png'
import './Home.css'
import Sidebar from '../components/Sidebar'
import cardData from '../fakeData/cardData'
import book5 from '../assets/book5.png'
import { UserContext } from '../context/userContext'
import book1 from '../assets/book1.png'
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BookDetailModal from '../components/BookDetailModal'
import {API} from "../config/api"

function Home(){

    const cardStyle = {
        width: '12rem', 
        margin:"10px",
        backgroundColor: "#F2F2F2",
        border: "none",
        cursor: "pointer"
    }

    const [status, setStatus] = useState(false)
    const [books, setBook] = useState([])

    const getUserStatus = async () => {
        try {
            const response = await API.get('/user-transaction')        
            const userStatus = response.data.data.transaction.userStatus

            if(userStatus == "Active"){
                setStatus(true)            
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getBook = async () => {
        try {   
            const response = await API.get('/books')    
            setBook(response.data.data.books)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserStatus()
        getBook()
    }, [])




    const navigate = useNavigate()

    const [state, dispacth] = useContext(UserContext)

    const [show, setShow] = useState(false)

    const showSubscribeModal = () => {
        setShow(true)
    }

    const closeModal = () =>{
        setShow(false)
    }

    return(
        <>
            <BookDetailModal show={show} closeModal={closeModal} />
            <Container fluid style={{backgroundColor: "#F2F2F2"}}>
                <Row>
                    <Col xl={3}>             
                        <Sidebar logo={logo} pp={pp} color="" status={status}/>
                    </Col>
                    <Col xl={9}>
                        <Row>
                            <div className="hero">
                                <div className="banner">
                                    <img src={frameHero} alt="" className='hero-banner' />
                                    <img src={book5} alt="" className='hero-new-book' onClick={() => 
                                        {
                                            {status ? 
                                                navigate(`/detail/6`)
                                                :
                                                showSubscribeModal()
                                            }                                                                                                                                                                                                                        
                                        }}/>
                                </div>
                            </div>
                        </Row>
                        <Row className='mt-3'>
                            <div className="list">
                                <h2> <b>List Book</b> </h2>                            
                            </div>
                            <div class="d-flex flex-wrap justify-content-flex-start book-list">
                                {books.map((data, index) => (                                                                                                                                          
                                        <Card body style={cardStyle} onClick={() => 
                                        {
                                            {status ? 
                                                navigate(`/detail/${data.id}`)
                                                :
                                                showSubscribeModal()
                                            }                                                                                                                                                                                                                        
                                        }}>
                                            <img src={"http://localhost:5000/uploads/" + data.bookFile} alt={data.image} />
                                            <h4> <b>{data.title}</b> </h4>
                                            <h6>{data.author}</h6>
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



export default Home