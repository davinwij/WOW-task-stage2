import './App.css';
import LandingPage from './containers/LandingPage';
import Home from './containers/Home'
import { useNavigate, BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { UserContext } from './context/userContext'
import { useContext, useEffect } from 'react'
import Profile from './containers/Profile'
import Subscribe from './containers/Subscribe'
import Dashboard from './containers/Admin Page/Dashboard'
import BookDetail from './containers/BookDetail';
import AddBook from './containers/Admin Page/AddBook'
import Book from './containers/Book'
import { API, setAuthToken } from "./config/api"

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const navigate = useNavigate()
  const [state, dispacth] = useContext(UserContext)

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false) {
      navigate("/");
    } else {
      if (state.user.role === "admin") {
        navigate('/dashboard')
      } else if (state.user.role === "user") {
        navigate('/home')
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispacth({
          type: "LOGIN_ERROR",
        });
      }

      console.log(response.data.data.user)

      let payload = response.data.data.user;  
      payload.token = localStorage.token;

      
      return dispacth({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser()
  }, []);


  return (
      // <Routes>
      //   {state?.isLogin ?         
      //   <>
      //   {state.user.role == "user" &&
      //   <>
      //     <Route exact path='/home' element={<Home />} /> 
      //     <Route exact path='/profile' element={<Profile />} />
      //     <Route exact path='/subscribe' element={<Subscribe />} />                
      //     <Route exact path='/detail/:id' element={<BookDetail />} />
      //     <Route exact path='/book' element={<Book />} />
      //   </>
      //   }
      //   {state.user.role == "admin" && 
      //   <>
      //     <Route exact path='/dashboard' element={<Dashboard />} />
      //     <Route exact path='/addbook' element={<AddBook />} />
      //   </>
      //   }
      //   </>
      //   : 
      //   <Route exact path='/' element={<LandingPage />} />}    
      // </Routes>

      <Routes>       
      <>
      {state.user.role == "user" &&
      <>        
        <Route exact path='/home' element={<Home />} /> 
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/subscribe' element={<Subscribe />} />                
        <Route exact path='/detail/:id' element={<BookDetail />} />
        <Route exact path='/book' element={<Book />} />
      </>
      }
      {state.user.role == "admin" && 
      <>
        <Route exact path='/dashboard' element={<Dashboard />} />
        <Route exact path='/addbook' element={<AddBook />} />
      </>
      }
      </>
      <Route exact path='/' element={<LandingPage />} />  
    </Routes>
  );
}

export default App;
