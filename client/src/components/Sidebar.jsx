import userIcon from '../assets/user.png'
import billIcon from '../assets/bill.png'
import outIcon from '../assets/logout.png'
import {useNavigate} from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import {API} from "../config/api"


function Sidebar(props){
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

    useEffect(() => {
        getUserStatus()
    }, [])
    
    const navigate = useNavigate()

    const [state, dispacth] = useContext(UserContext)

    const directLanding = () => {
        dispacth({
            type: 'LOGOUT',        
          })
        navigate('/')
    }

    const directHome = () => {
        navigate('/home')
    }

    const directProfile = () => {
        navigate('/profile')
    }

    const directSubs = () => {
        navigate('/subscribe')
    }

    return(
        <div className="sidebar">
            <div className="logo">
                <img src={props.logo} alt="" style={{ transform: "rotate(-20deg)", cursor: "pointer" }} onClick={directHome}/>
            </div>
            <div className="pp">
                <img src={props.pp} alt="" />
            </div>
            <div className="name">
                <h5><b>{state.user.fullname}</b></h5>
            </div>
            <div className="subscribe">                
                {status ? <h6 style={{color: "#29BD11"}}>Subscribed</h6> 
                :
                <h6 style={{color: "#D60000"}}>Not Subscribed Yet</h6> }                
            </div>
            <hr
            style={{
                width: "200px",
                color: "grey",
                marginBottom: "30px"
            }}
            />
            <div className="profileMenu" >
                <img src={userIcon} alt="" onClick={directProfile}/>
                <p onClick={directProfile} style={{ cursor:"pointer", color: props.color }}>Profile</p>
            </div>
            <div className="profileMenu" style={{ marginBottom:"30px" }}>
                <img src={billIcon} alt="" onClick={directSubs} />
                <p onClick={directSubs} style={{ cursor:"pointer", color: props.leftColor}}>Subscribe</p>
            </div>
            <hr
            style={{
                width: "200px",
                color: "grey",
                marginBottom: "30px"
            }}
            />
            <div className="profileMenu" style={{ marginBottom:"30px" }}>
                <img src={outIcon} alt="" onClick={directLanding} />
                <p onClick={directLanding} style={{ cursor:"pointer"}}>Logout</p>
            </div>
        </div>
    );
}

export default Sidebar