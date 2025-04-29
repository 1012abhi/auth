import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Logout() {
    
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            toast.success('Logged out successfully!');
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate('/login')
        })
        .catch((error) => {
            toast.error(error.response?.data?.message || 'Logout failed!');
          });
    }, [navigate, token])
   
    return (
    <div>
            <span className="loading loading-ring loading-lg"></span>
    </div>
  )
}

export default Logout
