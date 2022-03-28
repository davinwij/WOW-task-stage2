import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import {Container, Row, Col, Button} from 'react-bootstrap'
import book4 from '../assets/book4.png'
import logo from '../assets/Icon.png'
import pp from '../assets/my-img.jpg'
import v from '../assets/V.png'
import add from '../assets/add.png'
import Book from './Book'
import './Home.css'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import {API} from "../config/api"

function BookDetail() {

    const { id } = useParams()

    const navigate = useNavigate()

    
    const [status, setStatus] = useState(false)

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

    const [books, setBook] = useState([])
    const [bookData, setBookData] = useState()
    const [show, setShow] = useState(true)

    const getBook = async () => {
        try {   
            const response = await API.get('/userbook')                
            setBookData(response.data.data)              
            
        } catch (error) {
            console.log(error);
        } 
    }

    const checkUserBook = async () => {
        await bookData.find(element => {        
            if(element.id == id){
                setShow(false)
            }
        })        
    }
    
    const setToMyList = async () => {
        try {
            const response = await API.post(`/addlist/${id}`)                        
            navigate('/profile')
        } catch (error) {
            console.log(error)
        }
    }

    const bookDetail = async () => {
        try {   
            const response = await API.get(`/book/${id}`)       
            setBook(response.data.data.book)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkUserBook()
    }, [bookData])

    const bookFile = books.bookFile

    useEffect(() => {
        getUserStatus()
        getBook()        
        bookDetail() 
    }, [])

    const [state, dispacth] = useContext(UserContext)

  return (
    <>
         <Container fluid style={{backgroundColor: "#F2F2F2"}}>
                <Row>
                    <Col xl={3}>             
                        <Sidebar logo={logo} pp={pp} color=""/>
                    </Col>
                    <Col xl={9}>
                        <Row>
                            <Col className='detail-info d-flex mt-5'>
                                <div className="left-detail">
                                    <img src={"http://localhost:5000/uploads/" + books.imageFile} alt="" />
                                </div>
                                <div className="right-detail">
                                    <Row className="book-info mt-4">                                        
                                        <Col className="detail">
                                            <Row className="detail-info col-14">
                                                <h6 style={{ fontFamily: "Times New Roman, Times, serif", fontSize: "40px" , fontWeight:"bold"}}>{books.title}</h6>
                                                <h6 style={{ color:"#8A8C90", fontWeight:"400", marginTop:"-5px" }}>{books.author}</h6>
                                            </Row>                                    
                                        </Col>
                                    </Row>                
                                    <Row className="book-info mt-4">                                        
                                        <Col className="detail">
                                            <Row className="detail-info col-14">
                                                <h6 style={{fontSize: "20px" , fontWeight:"bold"}}>Publication Date</h6>
                                                <h6 style={{ color:"#8A8C90", fontWeight:"400" }}>{books.publicationDate}</h6>
                                            </Row>                                    
                                        </Col>
                                    </Row>                                                                        
                                    <Row className="book-info mt-4">                                        
                                        <Col className="detail">
                                            <Row className="detail-info col-14">
                                                <h6 style={{fontSize: "20px" , fontWeight:"bold"}}>Pages</h6>
                                                <h6 style={{ color:"#8A8C90", fontWeight:"400" }}>{books.pages}</h6>
                                            </Row>                                    
                                        </Col>
                                    </Row>                                                                        
                                    <Row className="book-info mt-4">                                        
                                        <Col className="detail">
                                            <Row className="detail-info col-14">
                                                <h6 style={{fontSize: "20px" , fontWeight:"bold", color:"#D60000"}}>ISBN</h6>
                                                <h6 style={{ color:"#8A8C90", fontWeight:"400" }}>{books.isbn}</h6>
                                            </Row>                                    
                                        </Col>
                                    </Row>                                                                        
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-3 ml-1'>
                            <Col>
                                <div className="book-desc">
                                    <h6 style={{ fontFamily: "Times New Roman, Times, serif", fontSize: "25px" , fontWeight:"bold"}}>About This Book</h6>
                                    <br/>
                                    <p>
                                    
                                    {books.about}
                                    
                                    </p>
                                </div>
                            </Col>                    
                        </Row>
                        <Row className='col-4 mb-5'>
                            <div className="book-btn">                        
                                <Col>
                                    {show &&
                                    <Button onClick={setToMyList} style={{ backgroundColor:"#D60000", fontWeight:"600", textAlign:"left", width:"140px", border:"none" }}>
                                        Add My List 
                                        <img src={add} alt="" />  
                                    </Button>                            
                                    }
                                </Col>
                                <Col>
                                    <Button onClick={() => {
                                         navigate('/book', { bookFile })
                                    }}                                  
                                    style={{ backgroundColor:"#CDCDCDB2", color:"black", fontWeight:"600", textAlign:"left", width:"130px", border:"none", marginLeft:"20px"}}>
                                        Read Book
                                        <img src={v} alt="" />  
                                    </Button>
                                </Col>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
    </>
  )
}

export default BookDetail