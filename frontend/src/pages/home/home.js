import React from 'react'
import {
    // BrowserRouter as Router,
    // Link,
    useHistory,
    useLocation
  } from "react-router-dom";

function HomePage() {

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  
  let query = useQuery();
  
  // get token
  let token = query.get('t')
  
  
  // if not token, redirect to static home.
  const HOME_PAGE_URL = 'http://localhost:5000/'
  if(!token) window.location = HOME_PAGE_URL
  
  // if token, put it in localStorage
  localStorage.setItem('token', token)
  const history = useHistory();
  history.push('/dashboard')
  
  return (
        <div>
            Please wait...
        </div>
    )
}

export default HomePage
