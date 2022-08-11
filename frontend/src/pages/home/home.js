import React from 'react'
import {
    // BrowserRouter as Router,
    // Link,
    useHistory,
    useLocation
  } from "react-router-dom";

function HomePage() {
  const history = useHistory();
  history.push('/dashboard')
  
  return (
        <div>
            Redirecting you to awesome...
        </div>
    )
}

export default HomePage
