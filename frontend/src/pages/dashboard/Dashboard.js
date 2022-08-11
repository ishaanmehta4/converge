import React from 'react'
import UserProfile from '../../components/userProfile/UserProfile'
import MyProjects from '../../components/myProjects/MyProjects'
import MyApplications from '../../components/myApplications/MyApplications'
import { GlobalUserContext } from '../../App'

import './style.scss'
function Dashboard() {
    let token = localStorage.getItem('idToken');
  
    // if not token, redirect to static home.
    const HOME_PAGE_URL = (process.env.WEB_URL || `http://${window.location.hostname}:${window.location.port}`) + '/landing'
    if(!token) window.location = HOME_PAGE_URL
    
    let { globalUserData } = React.useContext(GlobalUserContext)
    return (
        <div className="dashboard__grid">
            {/* left panel */}
            <div>
            {
                (globalUserData.user_type && globalUserData.user_type === 'recruiter')  && <MyProjects />
            }
            {
                (globalUserData.user_type && globalUserData.user_type === 'applicant')  && <MyApplications />
            }
            </div>
            {/* right panel */}
            <div>
                <UserProfile />
            </div>
        </div>
    )
}

export default Dashboard
