import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
const OAuthSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const user = JSON.parse(decodeURIComponent(params.get('user')));

    if (token && user) {
      // Save token and user to localStorage or context
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Navigate to dashboard or profile page
      navigate('/');
    } else {
      // Handle invalid token
      console.error("Invalid token or user data");
    }
  }, [location, navigate]);

  return <div className='flex justify-center items-center h-screen'>
    <ClipLoader />
    </div>;
};

export default OAuthSuccess;
