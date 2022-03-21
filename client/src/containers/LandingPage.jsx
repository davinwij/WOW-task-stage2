import Logo from '../assets/Icon.png'
import Cover from '../assets/landingpage.png'
import {Button} from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import AuthModalIn from '../components/AuthModalIn'
import AuthModalUp from '../components/AuthModalUp'
import './LandingPage.css'


function LandingPage(){
    const btnSignIn = {
        width: "140px",
        fontSize: "20px",
        backgroundColor: "#CDCDCD",
        color: "black",
        border: "none",
        fontWeigth: "bold"
      }

    const btnSignUp = {
        width: "140px",
        fontSize: "20px",
        backgroundColor: "#D60000",
        color: "white",
        border: "none",
        fontWeigth: "bold"
      }

    const [state, dispacth] = useContext(UserContext)

    const [signInOpen, setSignInOpen] = useState(false)
    const [signUpOpen, setSignUpOpen] = useState(false)

    const handleSignIn = (event) => {
        setSignInOpen(true)
      }
      
    const handleSignUp = (event) => {
        setSignUpOpen(true)
      }

    return(
        <>
        <div className="container">
            <div className="--logo">
                <img src={Logo} alt="" className='logo' />              
            </div>
            <div className="--text">
                <p>
                    Sign-up now and subscribe to enjoy all
                    the cool and latest book - The best book
                    rental service provider in Indonesia
                </p>
            </div>
            <div className="--btn">
                <Button style={btnSignUp} onClick={handleSignUp}>
                    Sign Up
                </Button>
                <Button style={btnSignIn} onClick={handleSignIn}>
                    Sign In
                </Button>

                <AuthModalUp open={signUpOpen} setLoginOpen={setSignInOpen} setSignUpOpen={setSignUpOpen} />
                <AuthModalIn open={signInOpen} setLoginOpen={setSignInOpen} setSignUpOpen={setSignUpOpen} />
            </div>
        </div>  
        <div className="cover">
            <img src={Cover} alt="" />
        </div>
        

        </>
    );
}









export default LandingPage;