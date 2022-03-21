import { createContext, useReducer } from "react";

export const UserContext = createContext()

const initialState = {
    isLogin: false,
    isSubscribe: false,
    user: {}
}

const reducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'USER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem("token", payload.token)
            return {
                isLogin: true,
                user: payload            
            }
        case 'REG_SUCCES':
            return{
                user: payload
            }
        case 'LOGIN_ERROR':
        case 'LOGOUT':
            return {
                isLogin: false,
                isSubscribe: false,                
                user: []
            }
        case 'SUBSCRIBED':        
            return {
                isSubscribe: true,
                isLogin: true,            
            }
        default:
            throw new Error()
    }
}

export const UserContextProvider = ({ children }) => {
    const [state, dispacth] = useReducer(reducer, initialState)

    return (
        <UserContext.Provider value={[state, dispacth]}>
            {children}
        </UserContext.Provider>
    )
}