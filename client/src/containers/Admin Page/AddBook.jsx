import React, { useState } from 'react'
import { Row, Container, Form, Button } from 'react-bootstrap'
import AdminNavBar from '../../components/AdminNavBar'  
import pin from '../../assets/pin-grey.png'
import book from '../../assets/book.png'
import './Admin.css'
import {API} from "../../config/api"
import { useNavigate } from 'react-router'

function AddBook() {

  const [form, setForm] = useState({
    title:"",
    date: "",
    pages: "",
    author: "",
    isbn: "",
    about: "",
    imageFile: "",
    bookFile: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });    
  }

  const navigate = useNavigate()

  const newBook = async () => {
    try {
      
    const config = {
      headers:{
        "Content-Type": "multipart/form-data"
      }
    }

    const formData = new FormData()
    formData.set("title", form.title)
    formData.set("publicationDate", form.date)
    formData.set("pages", form.pages)
    formData.set("author", form.author)
    formData.set("isbn", form.isbn)
    formData.set("about", form.about)
    formData.set("imageFile", form.imageFile[0], form.imageFile[0].name)
    formData.set("bookFile", form.bookFile[0], form.bookFile[0].name)


    const response = await API.post(`/book`, formData, config)
    console.log(response)


    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit =  (e) => {
    e.preventDefault()
    newBook()
    navigate('/dashboard')
  }

  return (
    <>
      <AdminNavBar />
        <Container fluid style={{ backgroundColor:"#e5e5e5", height:"700px", marginTop:"-10px" }}>
          <Row className='col-2'>            
              <h3 className='input-title'>Add Book</h3>            
          </Row>
          <Row className="col-8 add-form">
            <form onSubmit={handleSubmit}>
              <div className="formAddBook">            
                <div>
                  <input type="text" onChange={handleChange} name='title' placeholder='Title' /> 
                </div>
                <div>
                  <input type="text" onChange={handleChange} name='date' placeholder='Publication Date' />
                </div>
                <div>
                  <input type="text" onChange={handleChange} name='pages' placeholder='Pages' />
                </div>
                <div>
                  <input type="text" onChange={handleChange} name='author' placeholder='Author' />
                </div>
                <div>
                  <input type="text" onChange={handleChange} name='isbn' placeholder='ISBN' />
                </div>
                <div>
                  <textarea name="about" onChange={handleChange} id="" cols="30" rows="10" placeholder='About This Book'></textarea>            
                </div>
                <div className='--input-file'>  
                  <img src={pin} alt="" />
                  <label htmlFor="file"  className='input-file'> Attche Book File</label>
                  <input type="file" onChange={handleChange} name='bookFile' id='file' hidden/>
                </div>
                <div className='--input-file'>
                  <img src={pin} alt="" />
                  <label htmlFor="file2"  className='input-file'> Attche Book Image</label>
                  <input type="file" onChange={handleChange} name='imageFile' id='file2' hidden/>
                </div>
              </div>
              <div className="--input-btn">
                <img src={book} alt="" />
                <button onClick={handleSubmit}>Add Book</button>  
              </div>
            </form> 
          </Row>
        </Container>        
    </>
  )
}

export default AddBook