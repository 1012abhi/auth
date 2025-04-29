import React, { useEffect } from 'react'
// import { UserDatacontext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const UserProtectedWrapper = ({children}) => {

    const token = localStorage.getItem('token')
    // const { user, setUser } = useContext(UserDatacontext)
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!token) {
            navigate('/login')
            // return null;
        }                                    
        
        axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            const data = response.data;
            // setUser(data)
        })


    }, [token, navigate]);

    return (
       <>
        {children}
       </>
    )
}

export default UserProtectedWrapper
